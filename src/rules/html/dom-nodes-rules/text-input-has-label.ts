import DOMNodesValidator from '../../../dom-nodes-validator';
import { getAttrValue } from '../../../utils';

export default function textInputHasLabel($: any, content: string): DOMNodesValidator {
  return new DOMNodesValidator({
    $template: $,
    content,
    selector: 'input[type="text"]',
    assocAttrs: ['id'],
    isInvalid: (elem: CheerioElement, attrs?: string[]) => {
      const inputId = attrs ? getAttrValue($(elem), attrs) : '';

      if (!inputId) {
        return false;
      }

      const associatedLabel = $(`label[for="${inputId}"]`);

      return !associatedLabel.length;
    },
    warningMessage: 'Inputs with "text" type should have a label.'
  });
}