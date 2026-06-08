import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import { pushDevSchema } from '@payloadcms/drizzle';

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise });
    
    if (payload.db.name === 'postgres') {
      // @ts-ignore
      await pushDevSchema(payload.db);
      return NextResponse.json({ success: true, message: "Dev schema pushed successfully" });
    }
    
    return NextResponse.json({ success: false, error: "Not using Postgres adapter" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, stack: err.stack });
  }
}
