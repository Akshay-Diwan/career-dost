import { createSupabaseClient } from "@/libs/supabase";
import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from "next/server";



const supabase = createSupabaseClient();
export async function POST(request: Request) {
  console.log("Inside POST");
  const { isAuthenticated, userId } = await auth();
  if(!isAuthenticated || !userId){
    return new Response(JSON.stringify({
      message: "Unauthenticated"
    }),{
      status: 400
    })
  }
  const client = await clerkClient();
  try {
    const body = await request.json();
    console.log(request)
    console.log(" Received body:", JSON.stringify(body, null, 2));
    console.log(typeof body);
    
    
    const { data, error } = await supabase.from("users").insert(body).select();
    
    console.log(" Data:", data);
    console.log(" Error:", error);
    
    if (error) {
      console.error("Supabase error details:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      
      return new Response(JSON.stringify({
        message: error.message,
        details: error.details,
        hint: error.hint
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (!data) {
      return new Response(JSON.stringify({
        message: "No data returned"
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
      },
    })
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (err: any) {
    console.error("Catch error:", err);
    return new Response(JSON.stringify({
      message: "Internal server error",
      error: err.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
export async function GET(request: Request){
  console.log("Working...");
  return new Response(JSON.stringify(
    {
    message: "working"
  }),{
    status: 200,
    headers: {'Content-Type': 'application/json'}
  })
}