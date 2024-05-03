import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocument from "./pdfgeneratorpage";

const PdfDownloadButton = ({ data, subjectName, interviewId, scores }) => {
  return (
    <PDFDownloadLink
      document={
        <PdfDocument
          data={data}
          subjectName={subjectName}
          interviewId={interviewId}
          scores={scores}
        />
      }
      fileName="document.pdf"
    >
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "Download PDF"
      }
    </PDFDownloadLink>
  );
};

export default PdfDownloadButton;
