import clientPromise from '$lib/server/mongo';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  try {
    const client = await clientPromise;
    const db = client.db('test'); // or your db name
    const collection = db.collection('demo');

    const docs = await collection.find().limit(5).toArray();

    return new Response(JSON.stringify(docs), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error(err);
    return new Response('Error connecting to MongoDB: ' + (err instanceof Error ? err.message : String(err)), { status: 500 });
  }
};