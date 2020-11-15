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