import DOMNodesValidator from '../../dom-nodes-validator';
import { UIFrameworkManager } from '../../ui-framework-manager';
import { RuleData } from './../../models/rule';

const frameworkManager = UIFrameworkManager.Instance;

export default function clickWithKeyboardEvent($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: '*',
    isInvalid: (rule: RuleData) => {
      const { elem } = rule;
      let eventsPairs = [
        {
          targetEvent: 'onclick',
          assocEvents: ['onkeyup', 'onkeydown', 'onkeypress']
        }
      ];

      if (frameworkManager.isAngular()) {
        eventsPairs = [
          ...eventsPairs,
          {
            targetEvent: '(click)',
            assocEvents: ['(keyup)', '(keydown)', '(keypress)']
          }
        ];
      }

      return Boolean(
        eventsPairs.filter(eventPair => {
          const { targetEvent, assocEvents } = eventPair;
          const hasAssociatedListener = assocEvents.some(eventName => Boolean($(elem).attr(eventName)));

          return $(elem).attr(targetEvent) && !hasAssociatedListener;
        }).length
      );
    },
    warningMessage:
      'Visible, non-interactive elements with click handlers must have at least one keyboard listener.'
  });
}
