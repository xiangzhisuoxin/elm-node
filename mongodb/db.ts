
import * as mongoose from 'mongoose'
import * as configLite from 'config-lite';
import * as chalk from 'chalk'

let config = configLite(__dirname);
// mongoose.Promise = global.Promise;
mongoose.connect(config.mongodbUrl,{useNewUrlParser:true,useCreateIndex: true});

const db = mongoose.connection;

db.once('open' ,() => {
    console.log(
        (chalk as any).green('连接数据库成功')
    );
})

db.on('error', function(error) {
    console.error(
        (chalk as any)('Error in MongoDb connection: ' + error)
    );
    mongoose.disconnect();
});

db.on('close', function() {
    console.log(
        (chalk as any).red('数据库断开，重新连接数据库')
    );
    mongoose.connect(config.mongodbUrl, {server:{auto_reconnect:true}});
});

export default db;