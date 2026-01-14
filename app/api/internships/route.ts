import { NextRequest, NextResponse } from 'next/server';
import { createInternship } from '@/lib/internships';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { companyId, title, location, applyUrl, notes, dateFound } = body;

    if (!companyId || !title || !location || !applyUrl) {
      return NextResponse.json(
        {
          error:
            'Missing required fields: companyId, title, location, applyUrl',
        },
        { status: 400 }
      );
    }

    const internship = await createInternship({
      companyId,
      title,
      location,
      applyUrl,
      notes,
      dateFound: dateFound ? new Date(dateFound) : undefined,
    });

    return NextResponse.json(internship, { status: 201 });
  } catch (error) {
    console.error('Error creating internship:', error);
    return NextResponse.json(
      { error: 'Failed to create internship' },
      { status: 500 }
    );
  }
}
