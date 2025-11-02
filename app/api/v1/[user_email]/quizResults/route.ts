import { createSupabaseClient } from "@/libs/supabase";
import { NextRequest, NextResponse } from "next/server";

const supabase = createSupabaseClient();
export async function POST(request: NextRequest, 
    {params}: {params: {user_email: string}}
){
    const body = await request.json();
    try{
    const {user_email} = await params
    const {data, error} = await supabase.from('career_scores').insert({...body, user_email: user_email}).select();
    if(!data || error) {
        console.log(error.message || "Count not insert scores")
        return new NextResponse(JSON.stringify({
            message: "Could not insert scores"
        }),
    {
        status: 500
    })
    }
    return new NextResponse(JSON.stringify({
        message: "Scores Saved successfully"
    }), {
        status: 200
    })
}
catch(err) {
    console.error(err);
    return new NextResponse(JSON.stringify({
        message: "Internal Server Error"
    }),{
        status: 500
    })
}

}
export async function GET(request: NextRequest, 
    {params}: {params: {user_email: string}}
)
    {
        try{
        const {user_email} = await params
        const {data, error} = await supabase.from('career_scores').select("*").eq("user_email", user_email);
        if(error || !data) {
            return new NextResponse(JSON.stringify({
                message: "Could not get scores"
            }),{
                status: 500
            })
        }
        if(data.length == 0) {
            return new NextResponse(JSON.stringify({
                message: "No entry found for user"
            }),{
                status: 500
            })
        }
        console.log("Data");
        console.log(data);
        return new NextResponse(JSON.stringify(data), {
            status: 200
        })
    }catch(err) {
        console.log(err);
        return new NextResponse(JSON.stringify({
            message: "Internal Server Error"
        }),
    {
    status: 500
})
    }
}
export async function PUT(request: NextRequest, 
    {params}: {params: {user_email: string}}
){
    const body = await request.json();
    try{
        const {user_email} = await params
    const {data, error} = await supabase.from('career_scores').update(body).eq("user_email", user_email).select();
    if(!data || error) {
        return new NextResponse(JSON.stringify({
            message: "Could not insert scores"
        }),
    {
        status: 500
    })
    }
    return new NextResponse(JSON.stringify({
        message: "Scores Saved successfully"
    }), {
        status: 200
    })
}
catch(err) {
    console.error(err);
    return new NextResponse(JSON.stringify({
        message: "Internal Server Error"
    }),{
        status: 500
    })
}

}