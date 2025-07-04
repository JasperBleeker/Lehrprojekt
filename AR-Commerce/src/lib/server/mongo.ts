import { MongoClient } from 'mongodb';
import { MONGODB_URI } from '$env/static/private';
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = MONGODB_URI;
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!globalThis._mongoClientPromise) {
  client = new MongoClient(uri);
  globalThis._mongoClientPromise = client.connect();
}
clientPromise = globalThis._mongoClientPromise as Promise<MongoClient>;

export default clientPromise;