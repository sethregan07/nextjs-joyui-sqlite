import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams): Promise<Response> {
  try {
    const { id } = await params;
    const getArticleQuery = `
      SELECT * FROM articles WHERE id = ?;
    `;
    const article = await db.get(getArticleQuery, id);
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    return NextResponse.json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams): Promise<Response> {
  const { id } = await params;
  const { title, content, author } = await request.json();
  if (!title || !content) {
    return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
  }
  return new Promise((resolve) => {
    db.run('UPDATE articles SET title = ?, content = ?, author = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?;', [title, content, author || null, id], function(err) {
      if (err) {
        resolve(NextResponse.json({ error: err.message }, { status: 500 }));
      } else {
        resolve(NextResponse.json({ message: "Article updated successfully" }));
      }
    });
  });
}

export async function DELETE(request: NextRequest, { params }: RouteParams): Promise<Response> {
  const { id } = await params;
  return new Promise((resolve) => {
    db.run('DELETE FROM articles WHERE id = ?;', [id], function(err) {
      if (err) {
        resolve(NextResponse.json({ error: err.message }, { status: 500 }));
      } else {
        resolve(NextResponse.json({ message: "Article deleted successfully" }));
      }
    });
  });
}