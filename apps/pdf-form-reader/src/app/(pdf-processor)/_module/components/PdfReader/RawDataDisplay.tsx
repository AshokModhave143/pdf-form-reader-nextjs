import { Box, Stack, Title } from '@mantine/core';
import { FileDetails } from '../../types/PdfProcessor.types';

export interface RawDataDisplayProps {
  excelFile: FileDetails | null;
  pdfFile?: FileDetails | null;
}

export const RawDataDisplay = ({ pdfFile, excelFile }: RawDataDisplayProps) => {
  const xyz: Record<string, string> = {};
  pdfFile?.fileData?.forEach((item) => {
    xyz[`${item.label}`] = item.value;
  });

  return (
    <Stack dir="row">
      <Title>PDf File data: {pdfFile?.fileName}</Title>
      <Box
        style={{
          height: '300px',
          border: '1px solid gray',
          background: 'white',
          overflow: 'scroll',
        }}
      >
        {pdfFile?.fileData && (
          <code>
            <pre>{JSON.stringify(pdfFile?.fileData, null, 1)} </pre>
          </code>
        )}
      </Box>

      <Title>Excel file data: {excelFile?.fileName} </Title>
      <Box
        style={{
          height: '300px',
          border: '1px solid gray',
          background: 'white',
          overflow: 'scroll',
        }}
      >
        {excelFile?.fileData && (
          <code>
            <pre>{JSON.stringify(excelFile.fileData, null, 1)} </pre>
          </code>
        )}
      </Box>
    </Stack>
  );
};
