import { Container, FileInput, Button, Title, Box, Stack } from '@mantine/core';
import ComparisonTable from './ComparisionTable'; // Import ComparisonTable component
import './style.module.scss';
import { usePdfReader } from './usePdfReader';

const Home = () => {
  const {
    pdfFile,
    excelFile,
    comparisonResult,
    handlePdfUpload,
    handleExcelUpload,
    exportToExcel,
    compareData,
  } = usePdfReader();

  return (
    <Container className="pdf-reader" fluid>
      <Title order={1} className="title" my={12}>
        PDF and Excel Comparison Tool
      </Title>

      <Stack
        align="flex-start"
        justify="flex-start"
        display={'inline-flex'}
        gap={'lg'}
        p={16}
        style={{ border: '1px solid black', flexDirection: 'row' }}
      >
        <FileInput
          placeholder="Upload a PDF file"
          accept="application/pdf"
          onChange={handlePdfUpload}
          className="file-input"
          w={200}
        />
        <FileInput
          placeholder="Upload an Excel file"
          accept=".xlsx"
          onChange={handleExcelUpload}
          className="file-input"
          w={200}
        />

        <Button onClick={compareData} className="compare-button">
          Compare Files
        </Button>
      </Stack>

      {comparisonResult.length > 0 && (
        <ComparisonTable
          pdfFile={pdfFile}
          excelFile={excelFile}
          comparisonResult={comparisonResult}
          onExportToExcel={exportToExcel}
        />
      )}
    </Container>
  );
};

export default Home;
