function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    },
    body: JSON.stringify(body)
  };
}

exports.handler = async () => {
  const fallbackTestPublishableKey = 'pk_test_51TeycBPJOp8s8XsSvgsYs2KtFZt1F2fUg9W32bxS2rDcORtp4F89PUj54Dz1WJbhPS1i8vnouVLeSiUX9cWfzp4v00RLV2KMcT';
  const envPublishableKey = process.env.STRIPE_PUBLISHABLE_KEY || '';
  const publishableKey = envPublishableKey || fallbackTestPublishableKey;

  if (!publishableKey) {
    return json(500, {
      error: 'Stripe publishable key is not configured. Add STRIPE_PUBLISHABLE_KEY with your pk_test_ key for test mode or pk_live_ key for live mode.'
    });
  }

  return json(200, {
    publishableKey,
    mode: publishableKey.startsWith('pk_test_') ? 'test' : 'live'
  });
};
