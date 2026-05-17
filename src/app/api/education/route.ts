import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    const education = await prisma.education.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(education);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch education' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const data = await request.json();
    const ed = await prisma.education.create({ data });
    return NextResponse.json(ed);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create education' }, { status: 500 });
  }
}
