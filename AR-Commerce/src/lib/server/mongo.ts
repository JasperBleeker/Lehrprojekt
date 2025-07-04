import { MongoClient } from 'mongodb';
import { MONGODB_URI } from '$env/static/private';
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = MONGODB_URI;
console.log('MONGODB_URI:', uri);
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// const uri = 'mongodb://jasper:Jrja6ks9iJGcDB7L@192.168.178.111:27017/test'

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!globalThis._mongoClientPromise) {
  client = new MongoClient(uri);
  globalThis._mongoClientPromise = client.connect();
}
clientPromise = globalThis._mongoClientPromise as Promise<MongoClient>;

export default clientPromise;