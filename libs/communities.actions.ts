import { realtimeClient } from "./realtime_supabase";

const supabase = realtimeClient();
export async function joinCommunity(roomId: number) {
    // Use a private channel for room messages
    const channel = supabase.channel(`room:${roomId}:messages`, {
        config: { private: true }
    })
    // Listen for broadcasts (INSERT/UPDATE/DELETE come through as events)
    try{
    channel.on('broadcast', { event: 'INSERT' }, (payload) => {
     console.log('message inserted', payload);
    });
    channel.on('broadcast', { event: 'UPDATE' }, (payload) => {
      console.log('message updated', payload);
    });
    channel.on('broadcast', { event: 'DELETE' }, (payload) => {
      console.log('message deleted', payload);
    });
        channel.subscribe();
    }catch(err) {
        console.error(err);
        return "Error";
    }
    
    return channel
}
