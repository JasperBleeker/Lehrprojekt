// import { Db, MongoClient } from 'mongodb';
// import { env } from '$env/dynamic/private';

// let client: MongoClient;
// let db: Db;

// export async function connectToDatabase() {
// 	if (db) return db;

// 	client = new MongoClient(env.MONGODB_URI as string);
// 	await client.connect();

// 	db = client.db(); // Optional: pass db name if not in URI
// 	return db;
// }
