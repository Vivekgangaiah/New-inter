import { NextRequest, NextResponse } from 'next/server';
import { createApplication } from '@/lib/applications';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      internshipId,
      status,
      resumeVersion,
      referralDetails,
      followUpDate,
      notes,
    } = body;

    if (!internshipId) {
      return NextResponse.json(
        { error: 'Missing required field: internshipId' },
        { status: 400 }
      );
    }

    const application = await createApplication({
      internshipId,
      status,
      resumeVersion,
      referralDetails,
      followUpDate: followUpDate ? new Date(followUpDate) : undefined,
      notes,
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json(
      { error: 'Failed to create application' },
      { status: 500 }
    );
  }
}
