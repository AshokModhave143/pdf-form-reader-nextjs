// app/api/forms/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import PdfForm from '../../../models/PdfForm';

export async function GET() {
  await dbConnect();

  try {
    const forms = await PdfForm.find().sort({ createdAt: -1 });
    return NextResponse.json(forms);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch forms' },
      { status: 500 }
    );
  }
}
