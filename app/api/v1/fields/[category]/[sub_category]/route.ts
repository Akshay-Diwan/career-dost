import { createSupabaseClient } from '@/libs/supabase';
import { NextRequest, NextResponse } from 'next/server';

// Initialize the Supabase client using your service role key
// to bypass RLS.
// Make sure these are in your .env.local file

const supabase = createSupabaseClient();
export async function GET(
  request: NextRequest,
  // The 'params' object gets its values from the folder names
  { params }: { params: { category: string; sub_category: string } }
) {
  try {
    // 1. Destructure the dynamic parameters from the URL
    const { category, sub_category } = await params;
    console.log(category + ' ' + sub_category)
    // 2. Build the Supabase query to filter on BOTH fields
    //
    //    IMPORTANT: Change 'items_table' to your actual table name
    //    (e.g., 'users', 'products', etc.)
    //
    const { data, error } = await supabase
      .from('fields') // <-- RENAME THIS to your table
      .select() // Fetches all fields
       .eq('category', category) // Filter by the first parameter
       .eq('sub_category', sub_category); // Filter by the second parameter

    // 3. Handle any database errors
    if (error) {
      console.error('Supabase error:', error.message);
      return NextResponse.json(
        { error: 'Database error', details: error.message },
        { status: 500 }
      );
    }

    // 4. Return the data
    return NextResponse.json({ data }, { status: 200 });

  } catch (err) {
    console.error('Server error:', err);
    return NextResponse.json(
      { error: 'An unexpected server error occurred' },
      { status: 500 }
    );
  }
}