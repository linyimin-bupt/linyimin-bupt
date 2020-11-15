import { resolve } from 'path';
import { config } from 'dotenv';
import { retriveCommitStats } from './commit-stats';
import * as fs from 'fs';
import { createMarkerRegExp } from './util'
import { loadCpmmitStats } from './load-material';

/**
 * get environment variable
 */
config({ path: resolve(__dirname, '../.env') });


(async () => {
  let mdContent = fs.readFileSync('README.md', { encoding: 'utf-8' }).toString();
  const commitStat = await retriveCommitStats();
  mdContent = mdContent.replace(createMarkerRegExp('Commit stats'), (matchText) => {
    return commitStat.header ? loadCpmmitStats(commitStat) : matchText;
  });
  fs.writeFileSync('README.md', mdContent, { encoding: 'utf-8' });
})()

