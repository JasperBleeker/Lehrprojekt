import { MongoClient } from 'mongodb';
import { MONGODB_URI } from '$env/static/private';
import fs from 'fs';

// Prefer Docker secret if available, otherwise use environment variable
let uri = MONGODB_URI;
try {
  uri = fs.readFileSync('/run/secrets/mongo_uri', 'utf8').trim();
} catch (err) {
  // Ignore if file does not exist
}

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable or Docker secret');
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!globalThis._mongoClientPromise) {
  client = new MongoClient(uri);
  globalThis._mongoClientPromise = client.connect();
}
clientPromise = globalThis._mongoClientPromise as Promise<MongoClient>;

export default clientPromise;