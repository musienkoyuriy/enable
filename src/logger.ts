import chalk from 'chalk';
import { TemplatesWithWarnings, Warning } from './models';

const { log, warn } = console;
const error = chalk.bold.red;
const warning = chalk.keyword('orange');
const success = chalk.keyword('green');
const yellow = chalk.keyword('yellow');
const { underline } = chalk;

const spacedLog = (text: string) => {
  log();
  log(text);
  log()
}

function isWarningsEmpty(templatesWithWarnings: TemplatesWithWarnings): boolean {
  return Object.values(templatesWithWarnings).every(
    (warnings: Warning[]) => warnings.length === 0
  );
}

function printForTemplate(templateName: string, warnings: Warning[]): void {
  if (!warnings.length) {
    return;
  }

  log(underline(templateName));
  log();

  warnings.forEach((warnData: Warning) => {
    const templateWarnInfo = `${yellow('Line: %s')} ${warnData.message}`;
    warn(error(templateWarnInfo), warnData.line);
  });
}

export function printWarnings(templatesWithWarnings: TemplatesWithWarnings): void {
  let totalWarns = 0;

  if (isWarningsEmpty(templatesWithWarnings)) {
    spacedLog(success('\tAccesibility issues not found.'));
    return;
  }

  spacedLog(warning('Potential accessibility issues: '));

  Object.entries(templatesWithWarnings)
    .forEach((template: [string, Warning[]]) => {
      const templateUrl = template[0];
      const warns = template[1];
      totalWarns += warns.length;

      printForTemplate(templateUrl, warns);
    });

  log();
  warn(error(`   ✖ ${totalWarns} problems.`));
}
