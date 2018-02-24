const utils = require('../utils');

class Validator {
  constructor(options) {
    this.warnings = [];

    this.$template = options.$template;
    this.selectors = options.selectors;
    this.isInvalid = options.isInvalid;
    this.warningMessage = options.warningMessage;
    this.content = options.content;

    const elements = this.$template(this.selectors.join(','));
    const that = this;
    let element;

    if (elements.length) {
      elements.each(function() {
        element = that.$template(this);

        if (that.isInvalid(element)) {
          that.addWarning(element);
        }
      });
    }

    return {
      warnings: this.warnings
    };
  }

  addWarning(el) {
    let warningMessage;

    if (typeof this.warningMessage === 'function') {
      warningMessage = this.warningMessage(el);
    } else {
      warningMessage = this.warningMessage;
    }

    this.warnings.push({
      message: warningMessage,
      line: utils.getLineNumberByHTMLSegment(
        this.$template,
        this.content,
        el
      )
    });
  }
}

module.exports = Validator;