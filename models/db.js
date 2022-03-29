const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.

const uri = "mongodb+srv://nttrung:19127080@cluster0.0yxhy.mongodb.net/test?authSource=admin&replicaSet=atlas-b49ubx-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

const client = new MongoClient(uri);


exports.connect = () => {
  return client.connect();
}

exports.db = () => {
  return client.db('FreshStore');
}

