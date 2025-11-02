 // Subscribe to room channel and send a broadcast message
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export function realtimeClient(){
    return createClient(supabaseUrl, supabaseAnonKey);
}






// Sending a message (HTTP before subscribing, or WebSocket after subscribed)
// await channel.send({
//   type: 'broadcast',
//   event: 'INSERT',
//   payload: {
//     id: 'temporary-id',
//     room_id: roomId,
//     user_id: USER_ID,
//     content: 'Hello world',
//     metadata: {},
//     created_at: new Date().toISOString()
//   }
// });