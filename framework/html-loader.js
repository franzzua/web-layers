const fs = require('fs');

module.exports = function loader(source) {

    this.cacheable && this.cacheable();
    this.value = source;
    return `module.exports = (html, state, events) => html\`${source}\`;`;
};
// module.exports.seperable = true;