import { hasNonEmptyAttribute } from '../../utils';
import DOMNodesValidator from '../../validator';

export default function iFrameHasTitle($: any, content: string): DOMNodesValidator {
  return new DOMNodesValidator({
    $template: $,
    content,
    selectors: 'iframe',
    assocAttrs: ['title'],
    isInvalid: (elem: CheerioElement, attrs?: string[]) => attrs ? !hasNonEmptyAttribute($(elem), attrs) : false,
    warningMessage: '<iframe> element should have a unique non-empty title attribute'
  });
}
