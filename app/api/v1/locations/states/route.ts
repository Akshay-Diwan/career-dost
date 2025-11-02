'use server'
import { createSupabaseClient } from "@/libs/supabase";
import { NextRequest, NextResponse } from "next/server";

const supabase = createSupabaseClient();
export async function GET(
    request: NextRequest)
{
    try{
        const {data, error} = await supabase.from('locations').select("id, name").eq("type", "state");
        if(!data || error){
            return new NextResponse(JSON.stringify({
                message: "Could not fetch data from db"
            }), {
                status: 500
            })
        }
        return new NextResponse(JSON.stringify(data))
    }
    catch(err) {
        console.error(err);
        return new NextResponse(JSON.stringify({
            message: `Internal Server error\n ${err} `
        }))
    }
    
}