import Validator from '../validator';
import { getAttrValue } from '../utils';

export default function noPositiveTabindex($: any,content: string) {
  return new Validator({
    $template: $,
    content,
    selectors: '*',
    assocAttrs: ['tabindex'],
    isInvalid: ($elem: any, attrs: string[]) => {
      let tabIndex = getAttrValue($elem, attrs);
      tabIndex = tabIndex ? Number(tabIndex) : 0;

      return tabIndex > 0;
    },
    warningMessage: 'Avoid positive tabindex.'
  });
}
