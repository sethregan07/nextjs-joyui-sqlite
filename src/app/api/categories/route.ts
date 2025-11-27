import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(): Promise<Response> {
  try {
    const getCategoriesQuery = `
      SELECT category, COUNT(*) as count
      FROM articles
      WHERE category IS NOT NULL AND category != ''
      GROUP BY category
      ORDER BY count DESC;
    `;
    const categories = await db.all(getCategoriesQuery);
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}