const proxy = require('koa-proxies')

module.exports = (app, options = {}) => {
    for (let key in options) {
        app.use(proxy(key, options[key]));
    }
}