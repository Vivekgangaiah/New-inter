import { NextRequest, NextResponse } from 'next/server';
import {
  getInternshipById,
  updateInternship,
  deleteInternship,
} from '@/lib/internships';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const internship = await getInternshipById(params.id);
    if (!internship) {
      return NextResponse.json(
        { error: 'Internship not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(internship);
  } catch (error) {
    console.error('Error fetching internship:', error);
    return NextResponse.json(
      { error: 'Failed to fetch internship' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { dateFound, ...rest } = body;
    const updateData = {
      ...rest,
      ...(dateFound && { dateFound: new Date(dateFound) }),
    };

    const internship = await updateInternship(params.id, updateData);
    return NextResponse.json(internship);
  } catch (error) {
    console.error('Error updating internship:', error);
    return NextResponse.json(
      { error: 'Failed to update internship' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deleteInternship(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting internship:', error);
    return NextResponse.json(
      { error: 'Failed to delete internship' },
      { status: 500 }
    );
  }
}
