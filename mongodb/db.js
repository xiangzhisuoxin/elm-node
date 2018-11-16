let mongoose = require('mongoose');
let config = require('config-lite')('elm-node');
let chalk = require('chalk');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodbUrl,{useNewUrlParser:true,useCreateIndex: true});

const db = mongoose.connection;

db.once('open' ,() => {
    console.log(
        chalk.green('连接数据库成功')
    );
})

db.on('error', function(error) {
    console.error(
        chalk.red('Error in MongoDb connection: ' + error)
    );
    mongoose.disconnect();
});

db.on('close', function() {
    console.log(
        chalk.red('数据库断开，重新连接数据库')
    );
    mongoose.connect(config.mongodbUrl, {server:{auto_reconnect:true}});
});

module.exports = db;