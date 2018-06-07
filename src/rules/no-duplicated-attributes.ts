import Validator from '../validator';
import { getDuplicateAttributes } from '../utils';

export default function noDuplicatedAttributes($: any,content: string) {
  return new Validator({
    $template: $,
    content,
    selectors: '*',
    isInvalid: ($elem: any) => {
      const duplicatedAttrs = getDuplicateAttributes($elem, content);

      return duplicatedAttrs.length;
    },
    warningMessage: 'Element should not have duplicated attributes.'
  });
}
