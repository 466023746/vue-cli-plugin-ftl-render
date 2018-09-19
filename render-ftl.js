const {Render} = require('fast-ftl');
const path = require('path');

module.exports = (options = {}) => {
    const {root} = options;
    const render = Render(options);

    return async (ctx, next) => {
        const ftl = path.join(root, ctx.request.path);

        if (/\.ftl$/.test(ftl)) {
            try {
                const result = await render.parse(ftl);
                ctx.type = 'text/html; charset=utf-8';
                ctx.body = result;
            } catch (msg) {
                const html500 = getHtml500(msg);
                this.body = html500;
            }
        } else {
            await next();
        }
    }

    function getHtml500(msg) {
        return (
            '<!DOCTYPE html>' +
            '<html>' +
            '<head>' +
                '<meta charset="UTF-8">' +
                '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
                '<meta http-equiv="X-UA-Compatible" content="ie=edge">' +
            '<title>出错了</title>' +
            '</head>' +
            '<body>' +
            '<pre>' +
                (msg.stack || msg) +
            '</pre>' +
            '</body>' +
            '</html>'
        )
    }
}