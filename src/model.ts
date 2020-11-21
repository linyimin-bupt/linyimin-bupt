

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
  data: {
    user: {
      repositories: {
        nodes: {
          languages:{
            edges: {
              size: number
              node: {
                name: string
              }
            }[]
          }
        }[]
      }
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
export interface CommitStats {
  header: string,
  lines: string[]
}

export interface UserStatsVO {
  stars: number,
  commits: number,
  prs: number,
  issues: number,
  contributedTo: number,
  repositories: number
}

export interface RecentlyPushRepositories {
  data: {
    repositoryOwner: {
      repositories: {
        nodes: {
          name: string,
          refs: {
            nodes: {
              name: string,
              target: {
                changedFiles: number,
                committedDate: string
              }
            }[]
          },
          primaryLanguage: {
            name: string
          }
        }[]
      }
    }
  }
}

export interface RecentlyPushed {
  repository: string,
  branch: string,
  changeFiles: number,
  pushedAt: string,
  primaryLanguage: string,
}