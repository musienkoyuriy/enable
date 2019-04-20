const ecranizeForRegexp = (strToEcranize: string): string => strToEcranize.replace(/-/g, '\\-');

export const maybePluralize = (count: number, noun: string): string =>
  `${count} ${noun}${count !== 1 ? 's' : ''}`;

export function getLineNumberByHTMLSegment($elem: any, template: string): number {
  const start = $elem.startIndex;
  const lineNumber = template.substr(0, start).split('\n').length;

  return lineNumber;
}

export const getDuplicates = (list: any[]): string[] => {
  return list.reduce((acc, el, i, arr) => {
    if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) { acc.push(el); } return acc;
  }, []);
};

export const getExtension = (fileName: string): string => {
  return fileName.slice((Math.max(0, fileName.lastIndexOf(".")) || Infinity) + 1);
};

export function getDuplicateAttributes($elem: Cheerio, content: string) {
  const dom = $elem.get(0);
  const start = dom.startIndex;
  const end = dom.children.length
    ? dom.children[0].startIndex
    : dom.endIndex + 1;
  const html = content.slice(start, end);

  return Object.keys(dom.attribs)
    .map(attr => {
      let regexp;
      const attrForRegexp = ecranizeForRegexp(attr);

      try {
        regexp = new RegExp(`\\s${attrForRegexp}="(.*?)"`, 'gi');
      } catch (ex) {
        console.log(ex);
        console.log(html);
      }
      const matched = html.match(regexp as any);

      return matched !== null && matched.length > 1 ? attr : null;
    })
    .filter(Boolean);
}

export function hasAttribute($elem: Cheerio, attrs: string[]): boolean {
  return attrs.some((attr: string) => attr in $elem.attr());
}

export function hasNonEmptyAttribute($elem: Cheerio, attrs: string[]): boolean {
  return attrs.some((attr: string) => (attr in $elem.attr() && $elem.attr(attr).trim() !== ""));
}

export function getAttrValue($elem: Cheerio, attrs: string[]): string {
  const filledAttrs = attrs.filter(attr => $elem.attr(attr));

  return filledAttrs.length ? $elem.attr(filledAttrs[0]) : '';
}

export function isAngular(): boolean {
  return (global as any).framework === 'angular';
}

export function isVue(): boolean {
  return (global as any).framework === 'vue';
}

export function getFrameworkName(): string {
  return (global as any).framework;
}
