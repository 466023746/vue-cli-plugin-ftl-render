# vue-cli-plugin-ftl-render

ftl render for vue cli plugin, use [webpack-serve](https://www.npmjs.com/package/webpack-serve)、[fast-ftl](https://www.npmjs.com/package/fast-ftl) and [koa-proxies](https://www.npmjs.com/package/koa-proxies).

## Support

- start a dev server
- render ftl file
- proxy request

## Install

```bash
vue add ftl-render
```

## Usage

```js
// vue.config.js

module.exports = {
    pluginOptions: {
        ftlRender: {
            ftlOption: {
                root: path.resolve(__dirname, 'dist/pages'),
                paths: [
                    path.resolve(__dirname, 'node_modules/@kaola/mobileweb-ftl')
                ]
            },
            serverOption: {
                port,
                devMiddleware: {
                    writeToDisk: true
                }
            },
            proxyOption: {
                '/api': {
                    target: 'http:localhost:8080/api.json'
                }
            }
        }
    }
}
```

## Options

### serverOption

see [webpack-serve](https://www.npmjs.com/package/webpack-serve) option

### ftlOption

see [fast-ftl](https://www.npmjs.com/package/fast-ftl) option

### proxyOption

see [koa-proxies](https://www.npmjs.com/package/koa-proxies) option