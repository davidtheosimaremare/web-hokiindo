export async function register() {
  if (process.env.NEXT_PHASE === 'phase-production-build') return;
  
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const env = process.env as any;
    const originalEnv = env.NODE_ENV;
    // Trick Payload into pushing the schema automatically on boot
    env.NODE_ENV = 'development';
    try {
      const { getPayload } = await import('payload');
      // @ts-ignore
      const configPromise = (await import('./payload.config')).default;
      await getPayload({ config: configPromise });
      console.log('Payload database schema synced successfully on startup.');
    } catch (err) {
      console.error('Failed to sync Payload schema on startup:', err);
    } finally {
      env.NODE_ENV = originalEnv;
    }
  }
}
