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

  const iconUrl = 'https://github.com/linyimin-bupt/linyimin-bupt/blob/main';
  
  const template = [
    { label: 'Total Stars', count: stats.stars, icon: `${iconUrl}/icons/total-star.svg` },
    { label: 'Total Commits', count: stats.commits, icon: `${iconUrl}/icons/total-commits.svg` },
    { label: 'Total Pull Requests', count: stats.prs, icon: `${iconUrl}/icons/total-prs.svg` },
    { label: 'Total Issues', count: stats.issues, icon: `${iconUrl}/icons/total-issue.svg` },
    { label: 'Contributed To', count: stats.contributedTo, icon: `${iconUrl}/icons/contributed-to.svg` },
    { label: 'Total Repositories', count: stats.repositories, icon: `${iconUrl}/icons/contributed-to.svg` }
  ];
  const maxLenOfLabel = template.reduce((pre, cur) => cur.label.length > pre ? cur.label.length : pre, 0);

  const lines = template.reduce((pre, cur): string[] => {
    const line = [
      `<img src='${cur.icon}' height='16px'><font size=4.5> ${cur.label.padEnd(maxLenOfLabel + 5)}</font>`,
      `<b size=4.5> ${cur.count.toString().padStart(20)}</b>`
    ];

    return [...pre, line.join('')];
  }, []);

  return lines.join('\n');
};
