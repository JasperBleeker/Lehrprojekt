import clientPromise from '$lib/server/mongo';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const client = await clientPromise;
        const db = client.db('ar-commerce');
        const collection = db.collection('analytics');

        const body = await request.json();
        const { product, arDuration, userAgent, screen, sessionId, timestamp, event } = body;
        let type = 'ar';
        if (event === 'static-image-view') {
            type = 'static-image';
        } else if (arDuration !== undefined) {
            type = 'ar';
        }
        // fallback: if neither, keep 'ar' as default

        console.log('Log saved', { product, arDuration, sessionId, timestamp, type });

        await collection.insertOne({ product, arDuration, userAgent, screen, sessionId, timestamp, event, type });

        return new Response('Log saved', { status: 200 });
    } catch (err) {
        console.error('API log error:', err);
        return new Response('Error saving log', { status: 500 });
    }
}