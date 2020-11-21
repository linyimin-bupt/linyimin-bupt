

export interface UserStats {
  user: {
    name: string,
    login: string,
    contributionsCollection: {
      totalCommitContributions: number,
    },
    repositoriesContributedTo: {
      totalCount: number
    },
    pullRequests: {
      totalCount: number,
    },
    issues: {
      totalCount: number,
    },
    followers: {
      totalCount: number,
    },
    repositories: {
      totalCount: number,
      nodes: {
        stargazers: {
          totalCount: number,
        },
        name: string
      }[]
    },
    starredRepositories: {
      totalCount: number
    }
  }
}

export interface MostUsedLanguages {
  user: {
    repositories: {
      nodes: {
        languages:{
          totalSize: number
          edges: {
            size: number
            node: {
              name: string
            }
          }[]
        }
        name: string
      }[]
    }
  }
}


export interface OwnerRepository {
  data: {
    user: {
      repositoriesContributedTo: {
        nodes: {
          isFork: boolean,
          name: string,
          owner: {
            login: string
          }
        }[]
      }
    }
  }
}

export interface CommitedDate {
  data: {
    repository: {
      ref: {
        target: {
          history: {
            edges: {
              node: {
                committedDate: string
              }
            }[]
          }
        }
      }
    }
  }
}