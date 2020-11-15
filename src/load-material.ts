import { CommitStats } from './commit-stats';
export const loadCpmmitStats = (stats: CommitStats): string => {
  return stats.lines.join('\n');
}