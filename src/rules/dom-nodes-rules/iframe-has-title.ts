import DOMNodesValidator from '../../dom-nodes-validator';
import { hasNonEmptyAttribute } from '../../utils';

export default function iFrameHasTitle($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: 'iframe',
    assocAttrs: ['title'],
    isInvalid: (elem: CheerioElement, attrs?: string[]) => attrs ? !hasNonEmptyAttribute($(elem), attrs) : false,
    warningMessage: '<iframe> element should have a unique non-empty title attribute'
  });
}
