/* eslint-disable indent */

import { query } from './util';
import { 
    createUserInfoQuery,
    createContributedRepoQuery,
    createCommittedDateQuery,
    createUserStatsQuery, 
    createMostUsedLanguageQuery
} from './queries';
import { 
    CommitedDate,
    OwnerRepository,
    UserStats,
    MostUsedLanguages
 } from './model';
import {
    loadCommitStats,
    loadUserStat,
    loadMostUsedLanguages
} from './load-material';


interface IRepo {
    name: string;
    owner: string;
}

interface UserInfo {
    username: string,
    id: string
}

/**
 * 获取用户信息
 */
const retrieveUserInfo = async(): Promise<UserInfo> => {
    try {
        const userResponse = await query(createUserInfoQuery);
        if (!userResponse || !userResponse.data || !userResponse.data.viewer) {
            return null;
        }
        return {
            username: userResponse.data.viewer.login,
            id: userResponse.data.viewer.id
        };
    } catch(error) {
        throw Error(JSON.stringify(error));
    }
};


/**
 * retrieve repositories whose owner is `username`
 * @param username 
 */
const retrieveOwnerRepos = async(username: string): Promise<IRepo[]>  => {
    try {
        const repoResponse: OwnerRepository = await query(createContributedRepoQuery(username));
        const repos: IRepo[] = repoResponse.data.user.repositoriesContributedTo.nodes
        .filter(repoInfo => (!repoInfo?.isFork))
        .map(repoInfo => ({
            name: repoInfo.name,
            owner: repoInfo.owner.login,
        }));

        return repos;
    } catch(error) {
        throw Error(JSON.stringify(error));
    }

};


export const retriveCommitStats = async (): Promise<string> => {

    let committedTimeList: CommitedDate[] = [];

    try {

        const userInfo = await retrieveUserInfo();
        const { username, id } = userInfo;

        const repos: IRepo[] = await retrieveOwnerRepos(username);
        // TODO: 需要获取所有分支，计算所有分支的commit，现在只是计算了master分支的commit
        committedTimeList = await Promise.all(
            repos.map(({ name, owner }) => query(createCommittedDateQuery(id, name, owner)))
        );

        committedTimeList = committedTimeList.filter(commitedDate => {
            try {
                if (Array.isArray(commitedDate.data.repository.ref.target.history.edges)) {
                    return true;
                }
                return false;
            } catch(error) {
                return false;
            }
        });

        return loadCommitStats(committedTimeList);

    } catch(error) {
        console.log(JSON.stringify(error));
    }
};

export const retriveUserStats = async(): Promise<string> => {

    try {

        const userInfo = await retrieveUserInfo();
        const { username } = userInfo;

        const res = await query(createUserStatsQuery(username));
        if (!res || !res.data) return null;
        const data: UserStats = res.data as UserStats;

        const stars = data.user.repositories.nodes.map(node => node.stargazers.totalCount).reduce((pre, cur) => pre + cur, 0);

        const result = {
            stars: stars,
            commits: data.user.contributionsCollection.totalCommitContributions,
            prs: data.user.pullRequests.totalCount,
            issues: data.user.issues.totalCount,
            contributedTo: data.user.repositoriesContributedTo.totalCount,
            repositories: data.user.repositories.totalCount
        };

        return loadUserStat(result);
    } catch(error) {
        return '';
    }
};

export const retrieveMostUsedLanguages = async (): Promise<string> => {
    try {
        const userInfo = await retrieveUserInfo();
        const { username } = userInfo;

        const res: MostUsedLanguages = await query(createMostUsedLanguageQuery(username));
        const langStasMap: {[name: string]: number} = {}
        res.data.user.repositories.nodes.map(language => {
            language.languages.edges.forEach(edge => {
                const size = langStasMap[edge.node.name] || 0;
                langStasMap[edge.node.name] = size + edge.size;
            });
        });

        return loadMostUsedLanguages(langStasMap);

    } catch (error) {
        console.log(JSON.stringify(error));
        return '';
    }
}