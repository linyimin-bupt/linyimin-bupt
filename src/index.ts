import { resolve } from 'path';
import { config } from 'dotenv';
import { retriveCommitStats, retriveUserStats } from './service';
import * as fs from 'fs';
import { createMarkerRegExp } from './util';
import { loadCpmmitStats } from './load-material';

/**
 * get environment variable
 */
config({ path: resolve(__dirname, '../.env') });


(async () => {

  // user stas query
  await retriveUserStats();

  let mdContent = fs.readFileSync('README.md', { encoding: 'utf-8' }).toString();
  const commitStat = await retriveCommitStats();
  console.log(commitStat);
  const matchResult = mdContent.match(createMarkerRegExp('Commit stats'));
  if (Array.isArray(matchResult) && matchResult.length > 0) {
    mdContent = mdContent.replace(matchResult[1], loadCpmmitStats(commitStat));
  }
  fs.writeFileSync('README.md', mdContent, { encoding: 'utf-8' });
})();

