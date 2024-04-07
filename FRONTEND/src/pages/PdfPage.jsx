import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ReactDOM, { render } from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import MyDocument from "../components/PdfDocument";

const styles = StyleSheet.create({
    viewer: {
      width: "100%", //the pdf viewer will take up all of the width and height
      height: "880px",
    },
  });


const PdfPage = () =>{
    return (
        <div >
            <PDFViewer style={styles.viewer}>
                <MyDocument />
            </PDFViewer>
        </div>
    )

}

export default PdfPage
