import { Button, Table, Text } from '@mantine/core';
import React from 'react';
import './style.module.scss';
import { FileDetails } from '../../types/PdfProcessor.types';

interface ComparisonTableProps {
  comparisonResult: any[];
  pdfFile?: FileDetails | null;
  excelFile?: FileDetails | null;
  onExportToExcel?: (data: any[], fileName: string) => void;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({
  pdfFile,
  excelFile,
  comparisonResult,
  onExportToExcel,
}) => {
  const pdfData = pdfFile?.fileData;
  const excelData = excelFile?.fileData;

  return (
    <Table
      stickyHeader
      striped
      withTableBorder
      highlightOnHover
      withColumnBorders
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th colSpan={4} style={{ textAlign: 'center' }}>
            Mapping - {pdfFile?.fileName}
          </Table.Th>
          <Table.Th colSpan={4} style={{ textAlign: 'center' }}>
            Mapping - {excelFile?.fileName}
          </Table.Th>
          <Table.Th></Table.Th>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>PDF Label</Table.Th>
          <Table.Th>PDF Field type</Table.Th>
          <Table.Th>PDF Mapped Name</Table.Th>
          <Table.Th>PDF Value</Table.Th>
          <Table.Th>Excel Label</Table.Th>
          <Table.Th>Excel Field type</Table.Th>
          <Table.Th>Excel Mapped Name</Table.Th>
          <Table.Th>Excel Value</Table.Th>
          <Table.Th>Comparison Result</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {comparisonResult.map((row, index) => (
          <Table.Tr
            key={`row-${index}`}
            style={{
              ...(row.comparison === 'Match'
                ? {
                    backgroundColor: ' #d4edda',
                    color: '#155724',
                  }
                : {
                    backgroundColor: '#f8d7da',
                    color: '#721c24',
                  }),
            }}
          >
            <Table.Td>{row.pdfFieldName}</Table.Td>
            <Table.Td>{row.pdfFieldType}</Table.Td>
            <Table.Td>{row.pdfMappedName}</Table.Td>
            <Table.Td>{row.pdfValue}</Table.Td>
            <Table.Td>{row.excelFieldName}</Table.Td>
            <Table.Td>{row.excelFieldType}</Table.Td>
            <Table.Td>{row.excelMappedName}</Table.Td>
            <Table.Td>{row.excelValue}</Table.Td>
            <Table.Td>{row.comparison}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
      <Table.Caption style={{ margin: '1rem' }}>
        <Text className="summary">
          {`Comparison Summary:
            ${
              comparisonResult.filter((row) => row.comparison === 'Mismatch')
                .length
            }
            mismatches found.`}
        </Text>

        <Button
          onClick={() =>
            onExportToExcel &&
            onExportToExcel(comparisonResult, 'comparison-result.xlsx')
          }
          className="export-button"
        >
          Export Result to Excel
        </Button>
      </Table.Caption>
    </Table>
  );
};

export default ComparisonTable;
