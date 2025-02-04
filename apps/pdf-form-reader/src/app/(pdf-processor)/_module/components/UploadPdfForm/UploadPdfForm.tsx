import { Button, Fieldset, FileInput, rem } from '@mantine/core';
import { useForm, isNotEmpty } from '@mantine/form';
import { useState } from 'react';
import { TbFileTypePdf } from 'react-icons/tb';

export const UploadPdfForm = () => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      pdfFile: '',
    },
    validate: {
      pdfFile: isNotEmpty('Please select the PDF file.'),
    },
  });

  const [submittedValues, setSubmittedValues] = useState<
    typeof form.values | null
  >(null);

  console.log('submittedvalues', submittedValues);

  return (
    <Fieldset legend="Upload PDF file">
      <form onSubmit={form.onSubmit(setSubmittedValues)}>
        <FileInput
          {...form.getInputProps('pdfFile')}
          leftSection={
            <TbFileTypePdf
              style={{ width: rem(18), height: rem(18), stroke: '1.5' }}
            />
          }
          label="Attach PDF file"
          leftSectionPointerEvents="none"
          accept="application/pdf"
        />

        <Button type="submit" justify="right">
          Submit
        </Button>
      </form>
    </Fieldset>
  );
};
