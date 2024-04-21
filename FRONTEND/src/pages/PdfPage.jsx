import React from "react";
import { useLocation } from "react-router-dom";
import { StyleSheet, PDFViewer } from '@react-pdf/renderer';
import MyDocument from "../components/PdfDocument";
import axios from "axios";
import { toast } from "react-toastify";

const styles = StyleSheet.create({
    viewer: {
      width: "100%",
      height: "880px",
    },
  });

const PdfPage = () => {
    const location = useLocation();
    const customerInfo = location.state.customerInfo;
    const {subtotal} = location.state;
    const {taxRate} = location.state;
    const {jobDescription} = location.state;
    const {finalPrice} = location.state;
    const {dateOfService} = location.state;
    

    const saveInvoice = async(e) => { 
      e.preventDefault()
      try {
        const pdfInfo = await axios.post(`http://localhost:3000/api/generateInvoice`, 
            {
                companyName:customerInfo.companyName,
                subtotal:subtotal,
                taxRate:taxRate,
                jobDescription:jobDescription,
                finalPrice:finalPrice,
                dateOfService:dateOfService,
            });

        toast.success(`Saved ${customerInfo.companyName}'s Job Successfully`); 
      } catch (error) {}     
    }

    return (
        <div >
            <div>
                <button onClick={saveInvoice}>save</button>
            </div>
            <PDFViewer style={styles.viewer}>
                <MyDocument
                    customerInfo={customerInfo}
                    subtotal={subtotal}
                    taxRate={taxRate}
                    jobDescription={jobDescription}
                    finalPrice={finalPrice}
                    dateOfService={dateOfService}/>
            </PDFViewer>
        </div>
    )
}
export default PdfPage

/**/