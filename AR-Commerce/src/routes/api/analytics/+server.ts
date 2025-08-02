import clientPromise from '$lib/server/mongo';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
  try {
    const client = await clientPromise;
    const db = client.db('ar-commerce');
    const collection = db.collection('analytics');

    const productName = url.searchParams.get('product');
    const analyticsType = url.searchParams.get('type') || 'ar'; // Default to AR analytics
    
    const filter: Record<string, unknown> = { type: analyticsType };

    if (productName) {
      filter.product = productName;
    }

    const logs = await collection.find(filter).toArray();

    if (!logs || logs.length === 0) {
      return new Response(JSON.stringify({
        avgDuration: 0,
        sessionCount: 0,
        browserPercent: {},
        type: analyticsType
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const sessionCount = logs.length;

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
      const browser = parseBrowser(log.userAgent || '');
      browserCounts.set(browser, (browserCounts.get(browser) || 0) + 1);
    }

    const browserPercent: Record<string, number> = {};
    for (const [browser, count] of browserCounts.entries()) {
      browserPercent[browser] = parseFloat(((count / sessionCount) * 100).toFixed(1));
    }

    // Calculate different metrics based on type
    let avgDuration = 0;
    let totalViews = sessionCount;
    let uniqueSessions = sessionCount;
    
    if (analyticsType === 'ar') {
      const totalDuration = logs.reduce((acc, log) => acc + (log.arDuration || 0), 0);
      avgDuration = totalDuration / sessionCount / 1000; // Convert to seconds
      // For AR, calculate unique sessions
      const uniqueSessionIds = new Set(logs.map(log => log.sessionId));
      uniqueSessions = uniqueSessionIds.size;
      totalViews = sessionCount; // Total AR interactions
    } else if (analyticsType === 'static-image') {
      // For static images, calculate unique sessions
      const uniqueSessionIds = new Set(logs.map(log => log.sessionId));
      uniqueSessions = uniqueSessionIds.size;
      totalViews = sessionCount; // Total interactions
      avgDuration = 0; // No duration tracking for static images
    }

    return new Response(JSON.stringify({
      avgDuration,
      sessionCount,
      browserPercent,
      type: analyticsType,
      totalViews,
      uniqueSessions
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: 'Error connecting to MongoDB', message: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
