import { resolve } from 'path';
import { config } from 'dotenv';
import { retriveCommitStats } from './commit-stats';
import * as fs from 'fs';
import { createMarkerRegExp } from './util'

/**
 * get environment variable
 */
config({ path: resolve(__dirname, '../.env') });


(async () => {
  let mdContent = fs.readFileSync('README.md', { encoding: 'utf-8' }).toString();
  const commitStat = await retriveCommitStats();
  mdContent = mdContent.replace(createMarkerRegExp('Commit stats'), (matchText) => {
    // TODO: 添加模板内容填充函数
    return commitStat.header ? commitStat.lines.join('\n') : matchText;
  });
  fs.writeFileSync('README.md', mdContent, { encoding: 'utf-8' });
})()

