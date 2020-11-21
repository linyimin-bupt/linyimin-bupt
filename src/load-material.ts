import { CommitedDate } from './model';
import { UserStatsVO } from './model';
import { generateBarChart } from './util';

const iconUrl = 'https://github.com/linyimin-bupt/linyimin-bupt/blob/main';

/**
 * load commit stats material
 * @param stats 
 */
export const loadCommitStats = async (commitedStats: CommitedDate[]): Promise<string> => {

  const commitDateTotal = {
    morning: 0,     // 06 - 12,
    daytime: 0,     // 12 - 18,
    evening: 0,     // 18 - 24,
    midnight: 0,    // 24 - 06
  };

  commitedStats.forEach(committedTimeResponse => {
    committedTimeResponse.data.repository.ref.target.history.edges.forEach(edge => {
      const committedDate = edge.node.committedDate;
      const timeString = new Date(committedDate).toLocaleTimeString('en-US', { hour12: false, timeZone: process.env.TIMEZONE });
      const hour = +(timeString.split(':')[0]);

      /**
           * voting and counting
           */
      if (hour >= 6 && hour < 12) commitDateTotal.morning++;
      if (hour >= 12 && hour < 18) commitDateTotal.daytime++;
      if (hour >= 18 && hour < 24) commitDateTotal.evening++;
      if (hour >= 0 && hour < 6) commitDateTotal.midnight++;
    });
  });

  /**
   * Next, generate diagram
   */
  const sum = Object.keys(commitDateTotal).reduce((pre, cur) => pre + commitDateTotal[cur], 0);
  if (!sum) return;

  const oneDay = [
    { label: 'Morning', commits: commitDateTotal.morning, icon: `${iconUrl}/icons/morning.svg` },
    { label: 'Daytime', commits: commitDateTotal.daytime, icon: `${iconUrl}/icons/daytime.svg` },
    { label: 'Evening', commits: commitDateTotal.evening, icon: `${iconUrl}/icons/evening.svg` },
    { label: 'Midnight', commits: commitDateTotal.midnight, icon: `${iconUrl}/icons/midnight.svg` },
  ];

  const lines = oneDay.reduce((prev, cur) => {
    const percent = cur.commits / sum * 100;
    const line = [
      `<img src='${cur.icon}' height='16px'>`,
      `${cur.label}`.padEnd(10),
      `${cur.commits.toString().padStart(5)} commits`.padEnd(14),
      generateBarChart(percent, 17),
      String(percent.toFixed(1)).padStart(5) + '%',
    ];

    return [...prev, line.join(' ')];
  }, []);

  const json = {
    header: (commitDateTotal.morning + commitDateTotal.daytime) > (commitDateTotal.evening + commitDateTotal.midnight) ? 'I\'m an early 🐤' : 'I\'m a night 🦉',
    lines: lines,
  };

  return json.lines.join('\n');
};

export const loadUserStat = (stats: UserStatsVO): string => {
  
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
      `<img src='${cur.icon}' height='16px'> ${cur.label.padEnd(maxLenOfLabel + 5)}`,
      ` ${cur.count.toString().padStart(20)}`
    ];

    return [...pre, line.join('')];
  }, []);

  return lines.join('\n');
};
