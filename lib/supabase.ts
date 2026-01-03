import { createClient } from '@supabase/supabase-js';

// Public client for client-side operations
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Admin client for server-side operations (webhooks, etc.)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Helper function to generate signed upload URL
export async function getSignedUploadUrl(fileName: string): Promise<{ signedUrl: string; path: string }> {
  const path = `uploads/${Date.now()}-${fileName}`;
  
  const { data, error } = await supabaseAdmin.storage
    .from('pitch-decks')
    .createSignedUploadUrl(path);

  if (error) {
    throw new Error(`Failed to create signed URL: ${error.message}`);
  }

  return {
    signedUrl: data.signedUrl,
    path: path,
  };
}

// Helper function to download file from storage
export async function downloadFile(path: string): Promise<ArrayBuffer> {
  const { data, error } = await supabaseAdmin.storage
    .from('pitch-decks')
    .download(path);

  if (error) {
    throw new Error(`Failed to download file: ${error.message}`);
  }

  return await data.arrayBuffer();
}
