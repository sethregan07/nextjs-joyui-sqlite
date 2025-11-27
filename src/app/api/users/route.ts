import db from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(): Promise<Response> {
  return new Promise((resolve) => {
    db.all('SELECT * FROM users', (err, rows) => {
      if (err) {
        resolve(NextResponse.json({ error: err.message }, { status: 500 }));
      } else {
        resolve(NextResponse.json(rows));
      }
    });
  });
}

export async function POST(request: NextRequest): Promise<Response> {
  const { name, email } = await request.json();
  return new Promise((resolve) => {
    db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function(err) {
      if (err) {
        resolve(NextResponse.json({ error: err.message }, { status: 500 }));
      } else {
        resolve(NextResponse.json({ id: this.lastID }, { status: 201 }));
      }
    });
  });
}