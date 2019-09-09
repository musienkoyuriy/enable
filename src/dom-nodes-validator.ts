import { DOMNodesValidatorOptions } from './models/validator';
import { Warning } from './models/warnings';
import { getLineNumberByHTMLSegment, isAngular, isVue } from './utils';

function completeAttrsWithFrameworkSpecific(attrs: string[]): string[] {
  if (isAngular()) {
    const additionalAttrs = attrs.map(attr => `[${attr}]`);
    const additionalAttrsFullSign = attrs.map(attr => `bind-${attr}`);

    return [
      ...attrs,
      ...additionalAttrs,
      ...additionalAttrsFullSign
    ];
  }

  if (isVue()) {
    const additionalAttrs = attrs.map(attr => `:${attr}`);
    const additionalAttrsWithBind = attrs.map(attr => `v-bind:${attr}`);

    return [
      ...attrs,
      ...additionalAttrs,
      ...additionalAttrsWithBind
    ];
  }

  return attrs;
}

function completeEventsWithFrameworkSpecific(events: string[]): string[] {
  const nativeEventBindings = events.map(event => `on${event}`);

  if (isAngular()) {
    const additionalEvents = events.map(event => `(${event})`);
    const additionalEventsFullSign = events.map(event => `on-${event}`);

    return [
      ...nativeEventBindings,
      ...additionalEvents,
      ...additionalEventsFullSign
    ];
  }

  if (isVue()) {
    const additionalEventsViaAt = events.map(event => `@${event}`);
    const additionalEventsViaBind = events.map(event => `v-on:${event}`);

    return [
      ...nativeEventBindings,
      ...additionalEventsViaAt,
      ...additionalEventsViaBind
    ];
  }

  return nativeEventBindings;
}

export default class DOMNodesValidator implements DOMNodesValidatorOptions {
  isInvalid: (template: any, attrs?: string[], events?: string[]) => boolean;
  selector: string[] | string;
  $template: any;
  warnings: Warning[];
  warningMessage: string | ((el: any) => string);
  assocAttrs: string[];
  assocEvents: string[];

  content = ''

  constructor(options: DOMNodesValidatorOptions) {
    this.warnings = [];

    this.selector = options.selector;
    this.isInvalid = options.isInvalid;
    this.warningMessage = options.warningMessage;
    this.assocAttrs = options.assocAttrs || [];
    this.assocEvents = options.assocEvents || [];
  }

  validateAsHTML($: any, content = ''): Warning[] {
    this.$template = $;
    this.content = content;

    const selector = this._normalizeSelector(this.selector);
    const elements = this.$template(selector);

    let attrs: string[];
    let events: string[];

    if (elements.length) {
      elements.each((_: number, element: any) => {
        if (this.assocAttrs.length) {
          attrs = completeAttrsWithFrameworkSpecific(this.assocAttrs);
        }

        if (this.assocEvents.length) {
          events = completeEventsWithFrameworkSpecific(this.assocEvents);
        }

        if (this.isInvalid(this.$template(element), attrs, events)) {
          this._addWarning(element);
        }
      });
    }

    return this.warnings
  }

  private _normalizeSelector(selector: string | string[]): string {
    // @ts-ignore
    return Array.isArray(this.selector) ? selector.join(', ') : selector;
  }

  private _addWarning(el: any): void {
    const message =
      typeof this.warningMessage === 'function'
        ? this.warningMessage(el)
        : this.warningMessage;

    this.warnings.push({
      message,
      line: getLineNumberByHTMLSegment(el, this.content)
    });
  }
}
