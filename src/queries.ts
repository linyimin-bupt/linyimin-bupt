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


export const queryCommitRepositories = (name: string) => `
  query {
    repositoryOwner(login: "${name}") {
      repositories(first: 5, orderBy: {field: PUSHED_AT, direction: DESC}) {
        edges {
          node {
            name
            primaryLanguage {
              name
            }
          }
        }
      }
    }
  }
`;

export const queryRepositoryCommit = (name: string, repository: string) => `
  query {
    repository(owner: "${name}", name: "${repository}") {
      ref(qualifiedName: "main") {
        target {
          ... on Commit {
            history(first: 100) {
              edges {
                node {
                  committedDate
                  message
                  changedFiles
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const createQueryUserStats = (username: string) => `
  {
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