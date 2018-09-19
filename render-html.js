const views = require('koa-views');

module.exports = (app, data) => {
    const root = process.cwd();

    app.use(views(root, {
        map: {
            html: 'ejs'
        }
    }));

    return async(ctx, next) => {
        const filepath = ctx.request.path;
        if (filepath === '' || filepath === '/' || filepath === '/index.html') {
            await ctx.render('index', data);
        } else {
            await next()
        }
    }
}