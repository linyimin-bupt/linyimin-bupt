// Reference: https://developer.github.com/v4/explorer/

export const createUserInfoQuery = `
  query {
    viewer {
      login
      id
    }
  }
`;

export const createContributedRepoQuery = (username: string) => `
  query {
    user(login: "${username}") {
      repositoriesContributedTo(last: 100, includeUserRepositories: true) {
        nodes {
          isFork
          name
          owner {
            login
          }
        }
      }
    }
  }
`;

export const createCommittedDateQuery = (id: string, name: string, owner: string) => `
  query {
    repository(owner: "${owner}", name: "${name}") {
      ref(qualifiedName: "master") {
        target {
          ... on Commit {
            history(first: 100, author: { id: "${id}" }) {
              edges {
                node {
                  committedDate
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const createRepositoriesCommitQuery = (username: string) => `
  query {
    repositoryOwner(login: "linyimin-bupt") {
      repositories(first: 4, orderBy: {field: PUSHED_AT, direction: DESC}, isFork: false, ownerAffiliations: OWNER) {
        nodes {
          name
          refs(refPrefix: "refs/heads/", first: 100, orderBy: {field: TAG_COMMIT_DATE, direction: DESC}) {
            nodes {
              name
              target {
                ... on Commit {
                  changedFiles
                  committedDate
                }
              }
            }
          }
          primaryLanguage {
            name
          }
        }
      }
    }
  }
`;

export const createUserStatsQuery = (username: string) => `
  query {
    user(login: "${username}") {
      name
      login
      contributionsCollection {
        totalCommitContributions
      }
      repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
        totalCount
      }
      pullRequests(first: 1) {
        totalCount
      }
      issues(first: 1) {
        totalCount
      }
      followers {
        totalCount
      }
      repositories(first: 100, ownerAffiliations: OWNER, orderBy: {direction: DESC, field: STARGAZERS}) {
        totalCount
        nodes {
          stargazers(first: 1) {
            totalCount
          }
          name
        }
      }
      starredRepositories(first: 1) {
        totalCount
      }
    }
  }
`;


export const createMostUsedLanguageQuery = (username: string): string => `
  query {
    user(login: "${username}") {
      repositories(first: 100, isFork: false, ownerAffiliations: OWNER) {
        nodes {
          languages(orderBy: {field: SIZE, direction: DESC}, first: 10) {
            edges {
              size
              node {
                name
              }
            }
          }
        }
      }
    }
  }    
`;