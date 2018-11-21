module.exports = function loader(source) {

    this.cacheable && this.cacheable();
    this.value = source;
    return `module.exports = (html, state, events) => html\`<style>${source}</style>\`;`;
};
// module.exports.seperable = true;