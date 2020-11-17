// eslint-disable-next-line no-unused-vars
import { CommitStats, UserStatsVO } from './service';

/**
 * load commit stats material
 * @param stats 
 */
export const loadCommitStats = (stats: CommitStats): string => {
  return stats.lines.join('\n');
};

export const loadUserStat = (stats: UserStatsVO): string => {
  
  const template = [
    { label: 'Total Stars', count: stats.stars, icon: 'stars.svg' },
    { label: 'Total Commits', count: stats.commits, icon: 'commits.svg' },
    { label: 'Total Pull Requests', count: stats.prs, icon: 'prs.svg' },
    { label: 'Total Issues', count: stats.issues, icon: 'issue.svg' },
    { label: 'Contributed To', count: stats.contributedTo, icon: 'contributedTo.svg' },
    { label: 'Total Repositories', count: stats.repositories, icon: 'repositories.svg' }
  ];
  const maxLenOfLabel = template.reduce((pre, cur) => cur.label.length > pre ? cur.label.length : pre, 0);

  const lines = template.reduce((pre, cur): string[] => {
    const line = [
      `<img src='${cur.icon}' height='16px'><font size=4.5>${cur.label.padEnd(maxLenOfLabel + 5)}</font>`,
      `<font size=4.5>${cur.count.toString().padStart(20)}</font>`
    ];

    return [...pre, line.join('')];
  }, []);

  return lines.join('\n');
};
