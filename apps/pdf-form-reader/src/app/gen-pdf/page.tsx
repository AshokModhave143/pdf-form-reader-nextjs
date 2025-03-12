// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Table,
  FileInput,
  Button,
  LoadingOverlay,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';

interface FormData {
  id: string;
  formData: Record<string, string>;
  createdAt: string;
}

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [forms, setForms] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/forms');
      const data = await response.json();
      setForms(data);
    } catch (error) {
      showNotification({ color: 'red', message: 'Failed to load forms' });
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const newForm = await response.json();
      setForms([newForm, ...forms]);
      setFile(null);
      showNotification({
        color: 'green',
        message: 'PDF processed successfully',
      });
    } catch (error) {
      showNotification({ color: 'red', message: 'Failed to process PDF' });
    }
    setLoading(false);
  };

  const tableHeaders = forms[0]?.formData ? Object.keys(forms[0].formData) : [];

  console.log('forms', forms);

  return (
    <Container size="lg">
      <LoadingOverlay visible={loading} />
      <FileInput
        value={file}
        onChange={setFile}
        accept="application/pdf"
        label="Upload PDF Form"
        mb="md"
      />
      <Button onClick={handleSubmit} disabled={!file} mb="xl">
        Process PDF
      </Button>

      <Table
        striped
        highlightOnHover
        withTableBorder
        withColumnBorders
        withRowBorders
        width={'500px'}
      >
        <thead>
          <tr>
            <th>Date Submitted</th>
            {tableHeaders.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {forms.map((form) => (
            <tr key={form.id}>
              <td>{new Date(form.createdAt).toLocaleString()}</td>
              {tableHeaders.map((header) => (
                <td key={header}>{form.formData[header] || '-'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
