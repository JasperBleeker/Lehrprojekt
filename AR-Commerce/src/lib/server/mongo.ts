import { MongoClient } from 'mongodb';
import { env } from '$env/dynamic/private';
import fs from 'fs';

function readIfExists(p?: string | null): string | null {
  if (!p) return null;
  try {
    if (fs.existsSync(p)) {
      const v = fs.readFileSync(p, 'utf8').trim();
      return v || null;
    }
  } catch {
    // ignore
  }
  return null;
}

// 1) Secrets vorziehen: erst per Env-Zeiger, dann gängige Default-Pfade
const secretCandidates = [
  env.MONGODB_URI_FILE,            // z.B. /run/secrets/mongodb_uri
  '/run/secrets/mongodb_uri',
  '/run/secrets/mongo_uri'
];

// Prefer Docker secret if available, otherwise use environment variable
let uri =
  secretCandidates.map(readIfExists).find(Boolean) ||
  env.MONGODB_URI ||
  null;

if (!uri) {
  // Nichts Leaky-Loggen. Nur klar failen.
  throw new Error('MONGODB_URI ist nicht gesetzt (weder Secret noch Env).');
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