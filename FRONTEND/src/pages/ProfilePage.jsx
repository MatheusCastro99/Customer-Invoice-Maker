import React, {useState, useEffect}from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import CustomerInfo from "../components/CustomerInfo";
import TableInvoice from "../components/TableInvoice";
import Divider from '@mui/material/Divider'
import Collapsible from 'react-collapsible';

const ProfilePage = () => {
    let { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);

    const [customer, setCustomer] = useState({
        companyName: "",
        phoneNumber: "",
        contactName: "",
        image: "",
        streetAddress: "",
        cityAddress: "",
        stateAddress: "",
        zipAddress: "",
    });
    const [invoices, setInvoices] = useState([]);

    const getInvoices = async() => {
        try {
            setIsLoading(true);
            const response = await axios.get("http://localhost:3000/api/generateInvoice");
            console.log(response.data);
            setInvoices(response.data);
            setIsLoading(false);
          } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
          }
    }

    const getCustomer = async () => { //ADD VALIDATION TO CHECK FORMAT OF FIELDS ON UPDATE BUTTON CLICKED
        setIsLoading(true);
        try {
        const response = await axios.get(`http://localhost:3000/api/customer/${id}`);
        setCustomer({
            companyName: response.data.companyName,
            phoneNumber: response.data.phoneNumber,
            contactName: response.data.contactName,
            image: response.data.image,
            streetAddress: response.data.streetAddress,
            cityAddress: response.data.cityAddress,
            stateAddress: response.data.stateAddress,
            zipAddress: response.data.zipAddress,
        });
        setIsLoading(false);
        } catch (error) {
        setIsLoading(false);
        toast.error(error.message);
        }
    };

    useEffect(() => {
        getCustomer();
        getInvoices();
      }, []);


    return(
        <div className="max-w-xl bg-white shadow-lg mx-auto p-5 rounded mt-6">
            <div className="inline-flex">
                <div className="w-1/2 inline-block">
                    {customer.image && (
                    <div className="rounded p-2 mt-2 ">
                        <img className="w-full" src={customer.image} />
                    </div>
                    )}
                </div>
                <div className="w-1/2 ml-4 inline-block">
                    <div>
                        <div>
                            <label className="mb-2 mt-4 block font-semibold">
                                Company Name
                            </label>
                            <input
                                readOnly={true} 
                                type="text"
                                value={customer.companyName || ''}
                                className="text-lg mb-2 block text-center"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block font-semibold">
                                Phone Number
                            </label>
                            <input
                                readOnly={true}
                                type="text"
                                value={customer.phoneNumber || ''}
                                className="text-lg mb-2 block text-center"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block font-semibold">
                                Contact Name
                            </label>
                            <input
                                readOnly={true}
                                type="text"
                                value={customer.contactName || ''}
                                className="text-lg mb-2 block text-center"
                            />
                        </div>
                        <div>
                            <Collapsible className="mb-2 block font-semibold" trigger={"Address ⤵"}>
                                <div>
                                    <label className="mb-2 mt-2 block font-semibold">
                                        Street
                                    </label>
                                    <input
                                        readOnly={true}
                                        type="text"
                                        value={customer.streetAddress || ''}
                                        className="text-lg mb-2 block text-center"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block font-semibold">
                                        City
                                    </label>
                                    <input
                                        readOnly={true}
                                        type="text"
                                        value={customer.cityAddress || ''}
                                        className="text-lg mb-2 block text-center"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block font-semibold">
                                        State
                                    </label>
                                    <input
                                        readOnly={true}
                                        type="text"
                                        value={customer.stateAddress || ''}
                                        className="text-lg mb-2 block text-center"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block font-semibold">
                                        Zip Code
                                    </label>
                                    <input
                                        readOnly={true}
                                        type="text"
                                        value={customer.zipAddress || ''}
                                        className="text-lg mb-2 block text-center"
                                    />
                                </div>
                            </Collapsible>
                        </div>
                    </div>
                </div>
            </div>
            <Divider className="mb-3">Invoices </Divider>
            <div>
                <TableInvoice
                    invoices={invoices}
                    getInvoices={getInvoices}
                    customer={customer}
                />
            </div>
        </div>
    )
    
}

export default ProfilePage;