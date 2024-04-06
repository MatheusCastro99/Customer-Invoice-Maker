import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Line, Svg } from '@react-pdf/renderer';
import Divider from '@mui/material/Divider'

const pageBox = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "white",
    },
})

const headerBox = StyleSheet.create({
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },

    header: {
        margin: 10,
        padding: 10,
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "row"
    },

    logo: {
        height: "50px",
        width: "50px"
    },

    titleAddressBox: {
        flexDirection: "column",
        alignItems: "center",
    },

    addressNumber: {
        fontSize: "12px",
        marginTop: 3
    },

    dateInvoiceBox: {
        flexDirection: "column",
        alignItems: "left",
    },

    dateInvoice: {
        fontSize: "13px"
    }
})

const companyInfoBox = StyleSheet.create({
    info: {
        margin: 10,
        padding: 10,
        alignItems: "left",
        flexDirection: "column",
    },

    title: {
        fontSize: "17px",
        marginBottom: 6
    },

    textBox: {
        marginTop: 2
    },

    text: {
        fontSize: "15px",
        marginBottom: 3,
        marginLeft: 25
    },

    spacingCityState: {
        paddingLeft: 88,
        marginBottom: 3,
        fontSize: "15px"
    }
})

const jobInfoBox = StyleSheet.create({
    jobInfoFields: {
        margin: 10,
        padding: 10,
        alignItems: "left",
        flexDirection: "column",
    },

    title: {
        fontSize: "17px",
        marginBottom: 6
    },

    jobDescription: {
        fontSize: "15px",
        marginBottom: 3,
        marginLeft: 25
    }
})

const priceInfoBox = StyleSheet.create({
    fields: {
        margin: 10,
        padding: 10,
        alignItems: "left",
        flexDirection: "column",
    },

    title: {
        fontSize: "17px",
        marginBottom: 6
    },

    text: {
        fontSize: "15px",
        marginBottom: 3,
        marginLeft: 25
    }
})

const MyDocument = () => (
    <Document>
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
                    <Text style={companyInfoBox.text}>Name: Company Name Here</Text>
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
);

export default MyDocument