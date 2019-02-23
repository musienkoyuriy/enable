"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var validator_1 = require("../validator");
function noDuplicatedAttributes($, content) {
    return new validator_1.default({
        $template: $,
        content: content,
        selectors: '*',
        isInvalid: function ($elem) {
            var duplicatedAttrs = utils_1.getDuplicateAttributes($elem, content);
            return Boolean(duplicatedAttrs.length);
        },
        warningMessage: 'Element should not have duplicated attributes.'
    });
}
exports.default = noDuplicatedAttributes;
//# sourceMappingURL=no-duplicated-attributes.js.map