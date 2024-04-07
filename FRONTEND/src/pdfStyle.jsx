import { StyleSheet } from '@react-pdf/renderer';

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

export {pageBox, headerBox, jobInfoBox, priceInfoBox, companyInfoBox}