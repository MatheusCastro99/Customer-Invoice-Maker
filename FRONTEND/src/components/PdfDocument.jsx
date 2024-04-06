import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "white",
    },

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
    }
})

const MyDocument = () => (
    <Document>
        <Page size="a4" style={styles.page}>
            <View style={styles.header}>
                <Image style={styles.logo} src="https://cdn.pixabay.com/photo/2014/06/03/19/38/road-sign-361514_960_720.png"/>
                <Text>Ken-Tech Maintenance</Text>
                <Text>Date</Text>
            </View>
            <View style={styles.section}>
                <Text>Section #2</Text>
            </View>
            <View style={styles.section}>
                <Text>Section #3</Text>
            </View>
            <View style={styles.section}>
                <Text>Section #4</Text>
            </View>
        </Page>
    </Document>
);

export default MyDocument