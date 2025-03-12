// app/api/upload/route.ts
import { NextResponse } from 'next/server';
import {
  PDFCheckBox,
  PDFDocument,
  PDFDropdown,
  PDFRadioGroup,
  PDFTextField,
} from 'pdf-lib';
import dbConnect from '../../../lib/mongodb';
import PdfForm from '../../../models/PdfForm';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(new Uint8Array(buffer));
    const form = pdfDoc.getForm();

    const extractedData: Record<string, string> = {};
    form.getFields().forEach((field) => {
      const fieldType = field.constructor.name;
      const name = field.getName().replace(/\./g, '-');
      let value = '';
      if (field instanceof PDFTextField) {
        value = field.getText() || '';
        // fieldType = 'input';
      } else if (field instanceof PDFCheckBox) {
        value = field.isChecked() ? 'Checked' : 'Unchecked';
        // fieldType = 'checkbox';
      } else if (field instanceof PDFDropdown) {
        value = field.getSelected()?.join(', ') || '';
        // fieldType = 'dropdown';
      } else if (field instanceof PDFRadioGroup) {
        value = field.getSelected() || '';
        // fieldType = 'radio';
      }

      extractedData[name] = value;
    });

    const newForm = await PdfForm.create({ formData: extractedData });

    console.log('Form data', newForm);

    return NextResponse.json({
      id: newForm._id,
      data: Object.fromEntries(newForm.formData as any),
      createdAt: newForm.createdAt,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to process PDF' },
      { status: 500 }
    );
  }
}
