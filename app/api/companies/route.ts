import { NextRequest, NextResponse } from 'next/server';
import { getAllCompanies, createCompany } from '@/lib/companies';

export async function GET() {
  try {
    const companies = await getAllCompanies();
    return NextResponse.json(companies);
  } catch (error: any) {
    console.error('Error fetching companies:', error);
    // Return empty array instead of error object to prevent frontend crashes
    // Check if it's a database connection error
    if (error?.code === 'P1001' || error?.message?.includes('connect')) {
      return NextResponse.json(
        { error: 'Database connection failed. Please check your DATABASE_URL environment variable.' },
        { status: 503 }
      );
    }
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, careersUrl, targetRoles, preferredLocation, logoUrl } = body;

    if (!name || !careersUrl || !targetRoles) {
      return NextResponse.json(
        { error: 'Missing required fields: name, careersUrl, targetRoles' },
        { status: 400 }
      );
    }

    const company = await createCompany({
      name,
      careersUrl,
      targetRoles,
      preferredLocation,
      logoUrl,
    });

    return NextResponse.json(company, { status: 201 });
  } catch (error) {
    console.error('Error creating company:', error);
    return NextResponse.json(
      { error: 'Failed to create company' },
      { status: 500 }
    );
  }
}
