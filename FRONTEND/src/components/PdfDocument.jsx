import React from 'react';
import { Page, Text, View, Document, Image, Line, Svg } from '@react-pdf/renderer';
import {pageBox, headerBox, jobInfoBox, priceInfoBox, companyInfoBox} from "../pdfStyle";

const MyDocument = (info) => {
    const customerInfo = info.customerInfo;
    const jobInfo = info.jobInfo;
    console.log(jobInfo)
    console.log(customerInfo)
    return (
            <Document file = "FRONTEND\src\components\output.pdf">
                <Page size="a4" style={pageBox.page}>
            <View style={headerBox.header}>
                <Image style={headerBox.logo} src="https://cdn.pixabay.com/photo/2014/06/03/19/38/road-sign-361514_960_720.png"/>
                <View style={headerBox.titleAddressBox}>
                    <Text>Ken-Tech Maintenance</Text>
                    <Text style={headerBox.addressNumber}>692 Selfmaster PKWY, Union, NJ - 07083</Text>
                    <Text style={headerBox.addressNumber}>908-838-5832</Text>
                </View>
                <View style={headerBox.dateInvoiceBox}>
                    <Text style={headerBox.dateInvoice}>DATE</Text>
                    <Text style={headerBox.dateInvoice}>Invoice #</Text>
                </View>
            </View>

            <Svg height="5">
                <Line 
                    x1="50"
                    y1="0"
                    x2="550"
                    y2="0"
                    strokeWidth={3}
                    stroke= "gray"/>
            </Svg>
            
            <View style={companyInfoBox.info}>
                <View style={companyInfoBox.textBox}>
                    <Text style={companyInfoBox.title}>Customer Info:</Text>
                    <Text style={companyInfoBox.text}>Name: {customerInfo.companyName}</Text>
                    <View>
                        <Text style={companyInfoBox.text}>Address: Street</Text>
                        <Text style={companyInfoBox.spacingCityState}>City</Text>
                        <Text style={companyInfoBox.spacingCityState}>Address: State - Zip</Text>
                    </View>
                    <Text style={companyInfoBox.text}>Phone : Company Phone Number Here</Text>
                </View>
            </View>

            <View style={jobInfoBox.jobInfoFields}>
                <Text style={jobInfoBox.title}>Job Breakdown:</Text>
                <View>
                    <Text style={jobInfoBox.jobDescription}>JOB DESCRIPTION HERE</Text>
                </View>
            </View>
            <View style={priceInfoBox.fields}>
                <Text style={priceInfoBox.title}>Price:</Text>
                <View>
                    <Text style={priceInfoBox.text}>Subtotal: </Text>
                    <Text style={priceInfoBox.text}>Tax Rate:  (TaxAmount)</Text>
                    <Text style={priceInfoBox.text}>Total: </Text>
                </View>
            </View>
        </Page>
        
    </Document>
    )
};

export default MyDocument

/* */