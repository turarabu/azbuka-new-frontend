const fs = require('fs')
const path = require('path')

var file

module.exports = {
    productionSourceMap: false,
    devServer: {
        proxy: {
            '^/images/dynamic': {
                target: 'http://localhost:8081'
            }
        }
    }
}