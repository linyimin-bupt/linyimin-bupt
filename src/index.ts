import { resolve } from 'path';
import { config } from 'dotenv';
import { retriveCommitStats, retriveUserStats } from './service';
import * as fs from 'fs';
import { createMarkerRegExp } from './util';
import { loadCommitStats } from './load-material';

/**
 * get environment variable
 */
config({ path: resolve(__dirname, '../.env') });


(async () => {

  let mdContent = fs.readFileSync('README.md', { encoding: 'utf-8' }).toString();

  // user stas query
  const userStats =  await retriveUserStats();
  console.log(userStats);
  let matchResult = mdContent.match(createMarkerRegExp('github stats'));
  if (Array.isArray(matchResult) && matchResult.length > 0) {
    mdContent = mdContent.replace(matchResult[1], userStats);
  }

  // commit stats
  const commitStat = await retriveCommitStats();
  console.log(commitStat);
  matchResult = mdContent.match(createMarkerRegExp('Commit stats'));
  if (Array.isArray(matchResult) && matchResult.length > 0) {
    mdContent = mdContent.replace(matchResult[1], loadCommitStats(commitStat));
  }
  fs.writeFileSync('README.md', mdContent, { encoding: 'utf-8' });
})();

