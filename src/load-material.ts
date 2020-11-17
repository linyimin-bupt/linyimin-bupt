// eslint-disable-next-line no-unused-vars
import { CommitStats } from './service';
export const loadCpmmitStats = (stats: CommitStats): string => {
  return stats.lines.join('\n');
};