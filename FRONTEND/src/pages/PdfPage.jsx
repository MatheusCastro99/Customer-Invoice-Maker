import React from "react";
import { useLocation } from "react-router-dom";
import { StyleSheet, PDFViewer } from '@react-pdf/renderer';
import MyDocument from "../components/PdfDocument";

const styles = StyleSheet.create({
    viewer: {
      width: "100%",
      height: "880px",
    },
  });

const PdfPage = () => {
    const location = useLocation();
    const customerInfo = location.state.customerInfo;
    const jobInfo = location.state.jobInfo;
    return (
        <div >
            <PDFViewer style={styles.viewer}>
                <MyDocument customerInfo={customerInfo} jobInfo={jobInfo} />
            </PDFViewer>
        </div>
    )
}
export default PdfPage

/**/