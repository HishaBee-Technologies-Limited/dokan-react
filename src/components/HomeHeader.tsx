'use client';
import React from 'react';
import { PageTitle } from '@/components/common/text';
import PDFDownloader from '@/components/common/PDFDownloader';
import { DueHistoryPDF } from '@/components/pdf/DueHistoryPDF';

const HomeHeader = () => {
  return (
    <div className="flex items-center justify-between gap-space24">
      <PageTitle title="Dashboard" />

      <PDFDownloader name="Due_history_pdf">
        <DueHistoryPDF />
      </PDFDownloader>
    </div>
  );
};

export default HomeHeader;
