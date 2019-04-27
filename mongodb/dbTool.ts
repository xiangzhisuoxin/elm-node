//DB库
// let MongoDB = require('mongodb');
// let MongoClient = MongoDB.MongoClient;
// const ObjectID = MongoDB.ObjectID;

import {MongoClient,ObjectID, Db} from 'mongodb';
import * as configLite from 'config-lite';

let config = configLite(__dirname);


class db{
  static instance: db;
  dbClient: Db;

  static getInstance():any {   /*1、单例  多次实例化实例不共享的问题*/

    if (!db.instance) {
      db.instance = new db();
    }
    return db.instance;
  }

  constructor() {

    this.dbClient = undefined; /*属性 放db对象*/
    this.connect();   /*实例化的时候就连接数据库*/

  }
  connect() {  /*连接数据库*/

    let _that = this;
    return new Promise((resolve, reject) => {
      if (!_that.dbClient) {         /*1、解决数据库多次连接的问题*/
        MongoClient.connect(config.mongodbUrl, { useNewUrlParser: true }, (err, client) => {

          if (err) {
            reject(err)

          } else {

            // _that.dbClient = client.db(config.dbName);
            _that.dbClient = client.db();
            resolve(_that.dbClient)
          }
        })

      } else {
        resolve(_that.dbClient);

      }


    })

  }
  /*

   DB.find('user',{})  返回所有数据


   DB.find('user',{},{"title":1})    返回所有数据  只返回一列


   DB.find('user',{},{"title":1},{   返回第二页的数据
      page:2,
      pageSize:20,
      sort:{"add_time":-1}
   })
   js中实参和形参可以不一样      arguments 对象接收实参传过来的数据

  * */

  find(collectionName, json1, json2, json3) {
    let attr,slipNum,pageSize,page,sortJson
    if (arguments.length == 2) {
      attr = {};
      slipNum = 0;
      pageSize = 0;
    } else if (arguments.length == 3) {
      attr = json2;
      slipNum = 0;
      pageSize = 0;
    } else if (arguments.length == 4) {
      attr = json2;
      page = parseInt(json3.page) || 1;
      pageSize = parseInt(json3.pageSize) || 20;
      slipNum = (page - 1) * pageSize;

      if (json3.sort) {
        sortJson = json3.sort;
      } else {
        sortJson = {}
      }



    } else {
      console.log('传入参数错误')
    }
    return new Promise((resolve, reject) => {
      this.connect().then((db:Db) => {
        //let result=db.collection(collectionName).find(json);
        let result = db.collection(collectionName).find(json1, { fields: attr }).skip(slipNum).limit(pageSize).sort(sortJson);
        result.toArray(function (err, docs) {
          if (err) {
            reject(err);
            return;
          }
          resolve(docs);
        })

      })
    })
  }
  update(collectionName, json1, json2) {
    return new Promise((resolve, reject) => {


      this.connect().then((db:Db) => {

        //db.user.update({},{$set:{}})
        db.collection(collectionName).updateOne(json1, {
          $set: json2
        }, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        })

      })

    })

  }
  insert(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then((db:Db) => {

        db.collection(collectionName).insertOne(json, function (err, result) {
          if (err) {
            reject(err);
          } else {

            resolve(result);
          }
        })


      })
    })
  }

  remove(collectionName, json) {

    return new Promise((resolve, reject) => {
      this.connect().then((db:Db) => {

        db.collection(collectionName).removeOne(json, function (err, result) {
          if (err) {
            reject(err);
          } else { 

            resolve(result);
          }
        })


      })
    })
  }
  getObjectId(id) {    /*mongodb里面查询 _id 把字符串转换成对象*/

    return new ObjectID(id);
  }
  //统计数量的方法
  count(collectionName, json) {

    return new Promise((resolve, reject) => {
      this.connect().then((db:Db) => {

        let result:any = db.collection(collectionName).count(json);
        result.then(function (count) {

          resolve(count);
        }
        )
      })
    })

  }
}


// module.exports = Db.getInstance();
export default db.getInstance();
