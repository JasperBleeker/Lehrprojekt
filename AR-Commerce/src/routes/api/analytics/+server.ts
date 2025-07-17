import clientPromise from '$lib/server/mongo';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
  try {
    const client = await clientPromise;
    const db = client.db('ar-commerce');
    const collection = db.collection('analytics');

    const productName = url.searchParams.get('product');
    const filter: Record<string, unknown> = { arDuration: { $exists: true } };

    if (productName) {
      filter.product = productName;
    }

    const logs = await collection.find(filter).toArray();

    if (!logs || logs.length === 0) {
      return new Response(JSON.stringify({
        avgDuration: 0,
        sessionCount: 0,
        browserPercent: {}
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const sessionCount = logs.length;
    const totalDuration = logs.reduce((acc, log) => acc + (log.arDuration || 0), 0);
    const avgDuration = totalDuration / sessionCount / 1000; // Sekunden

    function parseBrowser(ua: string = ''): string {
      ua = ua.toLowerCase();
      if (ua.includes('chrome') && ua.includes('safari') && !ua.includes('edge')) return 'Chrome';
      if (ua.includes('firefox')) return 'Firefox';
      if (ua.includes('safari') && !ua.includes('chrome')) return 'Safari';
      if (ua.includes('edg')) return 'Edge';
      return 'Andere';
    }

    const browserCounts = new Map<string, number>();
    for (const log of logs) {
      const browser = parseBrowser(log.userAgent);
      browserCounts.set(browser, (browserCounts.get(browser) || 0) + 1);
    }

    const browserPercent: Record<string, number> = {};
    for (const [browser, count] of browserCounts.entries()) {
      browserPercent[browser] = parseFloat(((count / sessionCount) * 100).toFixed(1));
    }

    return new Response(JSON.stringify({
      avgDuration,
      sessionCount,
      browserPercent
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    console.error(err);
    return new Response('Error connecting to MongoDB: ' + (err instanceof Error ? err.message : String(err)), { status: 500 });
  }
};
