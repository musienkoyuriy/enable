const cheerio = require('cheerio');
import rules from './rules';
import { isFunction } from 'util';

function _flattenWarnings(warnings: {message: string}[][]) {
  const messages: any = [];

  warnings.forEach(ruleWarnings => {
    ruleWarnings.forEach(warn => {
      if (warn.message) {
        messages.push(warn);
      }
    });
  });

  return messages;
}

export function getContentFromVueFile(templateContent: string) {
  const templateLines = templateContent.split('\n');

  const templateOpenTag = templateLines.indexOf('<template>');
  const templateCloseTag = templateLines.indexOf('</template>');
  const vueTemplate = templateLines
    .slice(templateOpenTag + 1, templateCloseTag)
    .join('\n');

  return vueTemplate;
}

export function getTemplateFromComponentDecorator(fileContent: string) {
  const fileAsArray = fileContent.split('\n');

  const decoratorLine = fileAsArray.find((line: string) => line.includes('@Component'));

  if (!decoratorLine) {
    return '';
  }

  const decoratorLineNumber = fileAsArray.indexOf(decoratorLine) + 1;
  const templatePropPattern = /template\s{0,}:\s{0,}`/;

  const stringExceptComponentDecorator = fileAsArray.slice(decoratorLineNumber);
  const templateStartLine = stringExceptComponentDecorator.find(line =>
    templatePropPattern.test(line)
  );

  if (!templateStartLine) {
    return '';
  }

  const templateStartLineNumber = stringExceptComponentDecorator.indexOf(
    templateStartLine
  );

  const joinedTemplateString = stringExceptComponentDecorator
    .slice(templateStartLineNumber)
    .join('\n');

  const templateMatches = templatePropPattern.exec(joinedTemplateString);
  const matchedString = templateMatches ? templateMatches[0] : '';
  const stringExceptTemplateLiteral = joinedTemplateString.replace(
    matchedString,
    ''
  );

  const angularTemplate = stringExceptTemplateLiteral.slice(
    0,
    stringExceptTemplateLiteral.indexOf('`')
  );

  return angularTemplate;
}

export function getA11yWarnings(template: string, options: any) {
  const parsed = cheerio.load(template, {
    xmlMode: true,
    withStartIndices: true,
    withEndIndices: true
  });

  const warnings: any = [];

  Object.values(rules).forEach((r: any) => {
    const rule = r(parsed, template, options);
    const warns = rule.getWarnings();

    if (rule.warnings.length) {
      warnings.push(rule.warnings);
    }
  });

  return _flattenWarnings(warnings);
}
