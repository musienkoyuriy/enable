'use strict';

const Validator = require('../validator');

function pageTitle($, content) {
  return new Validator({
    $template: $,
    content: content,
    selectors: 'html head',
    isInvalid: function(selector) {
      const hasHead = selector.length;
      const title = selector.children('title');
      const hasTitle = (hasHead && !title.length) || (hasHead && !title.text());

      return hasTitle;
    },
    warningMessage: 'Page should have a title.'
  });
}

module.exports = pageTitle;