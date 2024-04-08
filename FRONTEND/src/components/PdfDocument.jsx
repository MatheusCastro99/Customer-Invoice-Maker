import React from 'react';
import { Page, Text, View, Document, Image, Line, Svg } from '@react-pdf/renderer';
import {pageBox, headerBox, jobInfoBox, priceInfoBox, companyInfoBox} from "../pdfStyle";
import Logo from "../assets/KenTechLogo.jpg"

const MyDocument = (info) => {
    const customerInfo = info.customerInfo;
    const {subtotal} = info;
    const {taxRate} = info;
    const {jobDescription} = info;
    const {finalPrice} = info;
    console.log(customerInfo)
    return (
            <Document file = "FRONTEND\src\components\output.pdf">
                <Page size="a4" style={pageBox.page}>
            <View style={headerBox.header}>
                <Image style={headerBox.logo} src= {Logo}/>
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
                        <Text style={companyInfoBox.text}>Address: {customerInfo.streetAddress}</Text>
                        <Text style={companyInfoBox.spacingCityState}>{customerInfo.cityAddress}</Text>
                        <Text style={companyInfoBox.spacingCityState}>{customerInfo.stateAddress} - {customerInfo.zipAddress}</Text>
                    </View>
                    <Text style={companyInfoBox.text}>Phone: {customerInfo.phoneNumber}</Text>
                </View>
            </View>

            <View style={jobInfoBox.jobInfoFields}>
                <Text style={jobInfoBox.title}>Job Breakdown:</Text>
                <View>
                    <Text style={jobInfoBox.jobDescription}>{jobDescription}</Text>
                </View>
            </View>
            <View style={priceInfoBox.fields}>
                <Text style={priceInfoBox.title}>Price:</Text>
                <View>
                    <Text style={priceInfoBox.text}>Subtotal: {subtotal}</Text>
                    <Text style={priceInfoBox.text}>Tax Rate: {taxRate}% (TaxAmount)</Text>
                    <Text style={priceInfoBox.text}>Total: {finalPrice}</Text>
                </View>
            </View>
        </Page>
        
    </Document>
    )
};

export default MyDocument

/* */