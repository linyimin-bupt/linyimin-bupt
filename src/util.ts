import fetch from 'node-fetch';

/* eslint-disable indent */
/**
 * clone from https://github.com/matchai/waka-box
 */
export const generateBarChart = (percent: number, size: number): string => {
    const syms = '░▏▎▍▌▋▊▉█';

    const frac = Math.floor((size * 8 * percent) / 100);
    const barsFull = Math.floor(frac / 8);
    if (barsFull >= size) {
        return syms.substring(8, 9).repeat(size);
    }
    const semi = frac % 8;

    return [syms.substring(8, 9).repeat(barsFull), syms.substring(semi, semi + 1)]
        .join('')
        .padEnd(size, syms.substring(0, 1));
};

export const createMarkerRegExp = (type: string) => new RegExp(`<!-- ${type} starts -->\n<pre>\n((.|\n)*?)\n</pre>\n<!-- ${type} ends -->`);

/**
 * String format function
 * @param content 
 * @param format 
 */
export const format = (content: string, ...format: string[]) => {
    const args = format;
    return content.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
};

/**
 * API query entrance
 * @param query 
 */
export const query =  async (query: string) => {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${process.env.GH_TOKEN}`,
      },
      body: JSON.stringify({ query }).replace(/\\n/g, ''),
    });
    return res.json();
  };
