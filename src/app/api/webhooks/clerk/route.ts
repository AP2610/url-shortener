import { Webhook } from 'svix';
import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import prisma from '@/lib/db/prisma';

/**
 * This endpoint receives webhook events from Clerk when user-related actions occur
 * (like user creation, updates, deletions). It allows us to keep our database
 * in sync with Clerk's user data.
 *
 * Webhook Flow:
 * 1. Clerk sends a POST request to this endpoint when a user event occurs. This is configured in the Clerk dashboard.
 * 2. We verify the webhook signature to ensure it's actually from Clerk
 * 3. We process the event and update our database accordingly
 */
export async function POST(req: Request) {
  try {
    // Get the webhook signing secret from environment variables
    // This secret is provided by Clerk and used to verify webhook authenticity
    const secret = process.env.SIGNING_SECRET;

    if (!secret) {
      return new Response('Missing secret', { status: 500 });
    }

    // Create a webhook verifier using the svix library
    // Svix is Clerk's webhook delivery partner, and we use their verification system to ensure webhook security and authenticity.
    const webhook = new Webhook(secret);
    const body = await req.text();
    const headerPayload = await headers();

    // Verify the webhook signature to ensure it's actually from Clerk
    // This prevents malicious actors from spoofing webhook events
    let event: WebhookEvent;
    try {
      event = webhook.verify(body, {
        'svix-id': headerPayload.get('svix-id')!,
        'svix-timestamp': headerPayload.get('svix-timestamp')!,
        'svix-signature': headerPayload.get('svix-signature')!,
      }) as WebhookEvent;
    } catch (error) {
      console.error('Webhook signature verification failed:', error);
      return new Response('Invalid signature', { status: 400 });
    }

    // Handle different webhook event types
    // Currently, we only handle user creation, but you can add more event types
    if (event.type === 'user.created') {
      const { id, email_addresses } = event.data;

      if (!email_addresses || email_addresses.length === 0) {
        console.error('No email addresses found in webhook data');
        return new Response('No email address found', { status: 400 });
      }

      try {
        // Use upsert to either create a new user or update existing one
        // This ensures we don't create duplicate users if the webhook is sent multiple times
        await prisma.user.upsert({
          where: { clerkId: id }, // Find user by their Clerk ID
          update: {}, // Don't update anything if user already exists
          create: {
            clerkId: id, // Store Clerk's user ID for future reference
            email: email_addresses[0].email_address, // Store the user's email
          },
        });
      } catch (dbError) {
        console.error('Database error during user creation:', dbError);
        return new Response('Database error', { status: 500 });
      }
    }

    if (event.type === 'user.deleted') {
      const { id } = event.data;

      try {
        await prisma.user.delete({
          where: { clerkId: id },
        });
      } catch (dbError) {
        console.error('❌ Database error during user deletion:', dbError);
        return new Response('Database error', { status: 500 });
      }
    }

    // Return success response to Clerk
    // Clerk expects a 200 OK response to confirm the webhook was processed
    return new Response('OK');
  } catch (error: unknown) {
    console.error('Webhook processing error:', error);
    return new Response('Webhook processing failed', { status: 500 });
  }
}
