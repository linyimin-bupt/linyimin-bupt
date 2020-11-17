

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