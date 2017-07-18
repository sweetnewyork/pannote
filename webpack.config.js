const path = require('path')

module.exports = {
    entry:{
        main:'./public/src/app.jsx'
    },
    output:{
        path:path.resolve(__dirname, 'public'),
        filename:'bin/[name].bundle.js'
    },
    module:{
        rules:[
            {
                test:/\.jsx?/,
                loader:'babel-loader'
            }
        ]
    },
    devServer:{
        contentBase:path.join(__dirname, 'public'),
        compress:true
    }
}