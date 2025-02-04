'use client';

import { Box } from '@mantine/core';
import { PdfReader } from './_module/components/PdfReader';

export default function Index() {
  return (
    <Box bg={'primary'}>
      <PdfReader />
    </Box>
  );
}
