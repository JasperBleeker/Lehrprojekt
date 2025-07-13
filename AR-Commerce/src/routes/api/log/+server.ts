import clientPromise from '$lib/server/mongo';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    try {
    const client = await clientPromise;
    const db = client.db('ar-commerce');
    const collection = db.collection('analytics');

    const { product, arDuration, userAgent, screen, sessionId, timestamp } = await request.json();
    console.log('Log saved', { product, arDuration, sessionId, timestamp });

    await collection.insertOne({ product, arDuration, userAgent, screen, sessionId, timestamp });

    return new Response('Log saved', { status: 200 });
    } catch (err) {
        console.error('API log error:', err);
        return new Response('Error saving log', { status: 500 });
    }
}