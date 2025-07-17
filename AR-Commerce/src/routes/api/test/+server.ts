import clientPromise from '$lib/server/mongo';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  try {
    const client = await clientPromise;
    const db = client.db('ar-commerce'); // or your db name
    const collection = db.collection('analytics');

    const docs = await collection.find().sort({ _id: -1 }).limit(10).toArray();

    return new Response(JSON.stringify(docs), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error(err);
    return new Response('Error connecting to MongoDB: ' + (err instanceof Error ? err.message : String(err)), { status: 500 });
  }
};