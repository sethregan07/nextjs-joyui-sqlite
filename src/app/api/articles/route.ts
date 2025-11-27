import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(): Promise<Response> {
  try {
    const getArticlesQuery = `
      SELECT * FROM articles ORDER BY published_date DESC;
    `;
    const articles = await db.all(getArticlesQuery);
    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<Response> {
  const { title, content, author } = await request.json();
  if (!title || !content) {
    return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
  }
  return new Promise((resolve) => {
    db.run('INSERT INTO articles (title, content, author) VALUES (?, ?, ?)', [title, content, author || null], function(err) {
      if (err) {
        resolve(NextResponse.json({ error: err.message }, { status: 500 }));
      } else {
        resolve(NextResponse.json({ id: this.lastID, message: "Article created successfully" }, { status: 201 }));
      }
    });
  });
}