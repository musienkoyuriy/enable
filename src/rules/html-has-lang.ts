import { hasAttribute } from '../utils';
import Validator from '../validator';

export default function htmlHasLang($: any, content: string): Validator {
  return new Validator({
    $template: $,
    content,
    selectors: 'html',
    assocAttrs: ['lang'],
    isInvalid: ($elem: Cheerio, attrs?: string[], events?: string[]) => {
      return attrs ? !hasAttribute($elem, attrs) : false;
    },
    warningMessage: '<html> tag should have "lang" attribute.'
  });
}
