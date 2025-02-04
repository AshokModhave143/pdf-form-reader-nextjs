import {
  PDFCheckBox,
  PDFDocument,
  PDFDropdown,
  PDFRadioGroup,
  PDFTextField,
} from 'pdf-lib';
import { useState } from 'react';
import { read, utils } from 'xlsx';
import { FileData, FileDetails } from '../../types/PdfProcessor.types';
import { getCustomLabels, getFileNameType } from '../../utils/getCustomLabels';

export const usePdfReader = () => {
  const [pdfFile, setPdfFile] = useState<FileDetails | null>(null);
  const [excelFile, setExcelFile] = useState<FileDetails | null>(null);
  const [comparisonResult, setComparisonResult] = useState<any[]>([]);
  const [mismatchCount, setMismatchCount] = useState<number>(0);

  const handlePdfUpload = async (file: File | null) => {
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      try {
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const form = pdfDoc.getForm();
        const fields = form.getFields();
        const { fileName, fileType } = getFileNameType(file.name);
        const customLabels = await getCustomLabels(`${fileName}.json`);

        console.log('handlePdfUpload', file.name, customLabels);

        const formData: FileData[] = fields.map((field) => {
          let value = '';
          let fieldType = '';
          const fieldName = field.getName();

          if (field instanceof PDFTextField) {
            value = field.getText() || '';
            fieldType = 'input';
          } else if (field instanceof PDFCheckBox) {
            value = field.isChecked() ? 'Checked' : 'Unchecked';
            fieldType = 'checkbox';
          } else if (field instanceof PDFDropdown) {
            value = field.getSelected()?.join(', ') || '';
            fieldType = 'dropdown';
          } else if (field instanceof PDFRadioGroup) {
            value = field.getSelected() || '';
            fieldType = 'radio';
          }

          return {
            label: fieldName,
            fieldType,
            customLabel: customLabels?.[fieldName] ?? '',
            value,
          };
        });

        const fileDetails: FileDetails = {
          fileName: file.name,
          fileType,
          fileRef: file,
          fileData: formData,
        };

        setPdfFile(fileDetails);
      } catch (error) {
        console.error('Error parsing PDF:', error);
      }
    }
  };

  const handleExcelUpload = (file: File | null) => {
    if (file) {
      const { fileName, fileType } = getFileNameType(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = utils.sheet_to_json(worksheet);

        const excelFileDetails: FileDetails = {
          fileName: file.name,
          fileType,
          fileRef: file,
          fileData: jsonData as FileData[],
        };
        setExcelFile(excelFileDetails);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const exportToExcel = (data: any[], filename: string) => {
    const workbook = utils.book_new();
    const worksheet = utils.json_to_sheet(data);
    utils.book_append_sheet(workbook, worksheet, 'Comparison Result');
    const excelBlob = new Blob([utils.sheet_to_csv(worksheet)], {
      type: 'application/octet-stream',
    });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(excelBlob);
    link.download = filename;
    link.click();
  };

  const compareData = () => {
    const result = pdfFile?.fileData.map((pdfRow) => {
      const excelRow = excelFile?.fileData.find((row: FileData) =>
        pdfRow.label.includes(row.label)
      );
      if (excelRow) {
        return {
          pdfFieldName: pdfRow.label,
          pdfFieldType: pdfRow.fieldType,
          pdfMappedName: pdfRow.customLabel, // Assuming mapped name is the same
          pdfValue: pdfRow.value,
          excelFieldName: excelRow.label,
          excelFieldType: excelRow.fieldType,
          excelMappedName: excelRow.customLabel, // Assuming mapped name is the same
          excelValue: excelRow.value,
          comparison: getComparisionValue(pdfRow.value, excelRow.value), // pdfRow.value === excelRow.value ? 'Match' : 'Mismatch',
        };
      }
      return {
        pdfFieldName: pdfRow.label,
        pdfFieldType: pdfRow.fieldType,
        pdfMappedName: pdfRow.customLabel,
        pdfValue: pdfRow.value,
        // TODO: look into this mapping later
        excelFieldName: '',
        excelFieldType: '',
        excelMappedName: '',
        excelValue: '',
        comparison: 'No Match in Excel',
      };
    });

    const mismatches = result?.filter(
      (row) => row.comparison === 'Mismatch'
    ).length;
    setMismatchCount(mismatches ?? 0);
    setComparisonResult(result ?? []);
  };

  return {
    pdfFile,
    excelFile,
    comparisonResult,
    mismatchCount,
    handlePdfUpload,
    handleExcelUpload,
    exportToExcel,
    compareData,
  };
};

const getComparisionValue = (value1?: string, value2?: string) => {
  if (!value1?.length && !value2?.length) return '-';

  return value1 === value2 ? 'Match' : 'Mismatch';
};
