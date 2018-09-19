const webpackDevServer = require('webpack-serve');
const renderFtl = require('./render-ftl')
const renderHtml = require('./render-html');
const proxy = require('./proxy');

module.exports = (api, projectOptions) => {
    api.registerCommand('serve:ftl', args => {
        const {pluginOptions = {}, pages} = projectOptions;
        const {ftlRender = {}} = pluginOptions;
        const {ftlOption = {}, serverOption = {}, proxyOption = {}} = ftlRender;
        let config = api.resolveChainableWebpackConfig();

        // delete hmr option because webpack-serve already has
        config.plugins.delete('hmr');
        config = config.toConfig();
        
        const devServerOptions = Object.assign({}, {config, ...serverOption}, {
            add(app, middleware) {
                app.use(renderHtml(app, {pages, config}));

                middleware.webpack();
                middleware.content();

                app.use(renderFtl(ftlOption));
                
                proxy(app, proxyOption);
            }
        });
        const server = webpackDevServer({}, devServerOptions);

        server.then((obj) => {
            obj.on('listening', ({options}) => {
                const {host, port} = options;
                console.log(`Starting server on http://${host}:${port}`);
            })
        })
    })
};