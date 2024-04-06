import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {Select} from "flowbite-react"
import Divider from '@mui/material/Divider'
import CustomerInfo from "../components/CustomerInfo";

//SWICH DROPDOWN BY AUTOCOMPLETE SEARCHBAR

const InvoicePage = () => {
    const [jobPrice, setJobPrice] = useState(Number)
    const [jobDescription, setJobDescription] = useState();
    const [customers, setCustomers] = useState([]);
    const [tempCustomer, setTempCustomer] = useState([]);
    const [correspondingTax, setCorrespondingTax] = useState();
    const [finalPrice, setFinalPrice] = useState();

    const requestInfo = async (e) => {
        try {
            if(e.target.value == "Select Company") {
              setTempCustomer([]);
              setCorrespondingTax();
              return;
            }
            const info = await axios.get(`http://localhost:3000/api/customer/${e.target.value}`);
            console.log(info)
            setTempCustomer(info.data);
            handleTax(info.data.stateAddress);
            console.log(info.data.stateAddress);
            <CustomerInfo
              customer = {tempCustomer}/>;
        } catch (error) {
            setTempCustomer([])
        }    
    }

    const handleJobDescription = (e) => {
      setJobDescription(e.target.value)
    }
    const handleJobPrice = async(e) => {
      setJobPrice(e.target.value)
      const getFinalPrice = await axios.put(`http://localhost:3000/api/taxinfo/getTaxAmount`, {jobPrice:e.target.value, taxRate: correspondingTax})
      console.log(getFinalPrice)
      setFinalPrice(getFinalPrice.data)
    }
    const handleTax = async(state) => {
      const getTaxRate = await axios.put(`http://localhost:3000/api/taxinfo/getTaxRate`, {state:state});
      console.log(getTaxRate.data)
      setCorrespondingTax(getTaxRate.data);
    }

    const fetchData = async () => { //refactor
        try {
            const response = await axios.get("http://localhost:3000/api/customer");
            setCustomers(response.data)
            console.log(customers)
        } catch (error) {
            
        }}

    useEffect( () => {fetchData()},[]);
        return (
            <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
                <h2 className="font-semibold text-2xl mb-4 block text-center">
                    Generate Invoice
                </h2>
                <div className="max-w-md">
                  <Divider className="mb-3">Company Information</Divider>
                    <div className="mt-3">
                        <Select onChange = {(e)=>(requestInfo(e))} id="customers" required>
                            <option>Select Company</option>
                            {customers?.map((customers, index) => {
                                return(
                                    <option value={customers._id} key={index}> {customers.companyName} </option>
                                )
                            })}
                        </Select>
                    </div>
                    <div>
                      <CustomerInfo
                        customer = {tempCustomer}/>
                    </div>
                </div>
                <div className="w-full px-10 mt-5">
                <Link
                  to={`/edit/${tempCustomer._id}`}
                  className="inline-block w-full text-center shadow-md text-sm bg-blue-500 text-white rounded-lg px-4 py-1 font-bold hover:bg-blue-600 hover:cursor-pointer">
                  Update
                </Link>
                </div>
                <div className="mt-4">
                  <Divider className="bg-color-red">Job Information</Divider>
                  <div>
                      <label className="mb-2 block font-semibold">
                        Job Description
                      </label>
                      <textarea
                        type="text"
                        value={jobDescription || ''}
                        onChange={handleJobDescription}
                        className="w-full font-semibold text-lg mb-2 block text-center"
                        placeholder="Enter Job Description"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block font-semibold">
                        Subtotal
                      </label>
                      <input
                        type="text"
                        value={jobPrice || ''}
                        onChange={handleJobPrice}
                        className="w-full font-semibold text-lg mb-2 block text-center"
                        placeholder="Enter Job Subtotal"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block font-semibold">
                        Taxes
                      </label>
                      <div style ={{display:"flex", justifyContent: "space-evenly"}}>
                      <label 
                        readOnly = {true}
                        type="text"
                        className="inline-block font-semibold mb-2 block text-center"
                        placeholder="State Taxes">
                          {tempCustomer.stateAddress||"Select a State for this company"}
                      </label>
                      <label 
                        readOnly = {true}
                        type="text"
                        className="inline-block font-semibold mb-2 block text-center"
                        placeholder="State Taxes">
                          {correspondingTax||0}%
                      </label>
                      <label 
                        readOnly = {true}
                        type="text"
                        className="inline-block font-semibold mb-2 block text-center"
                        placeholder="State Taxes">
                          {"$"+((jobPrice*(correspondingTax/100))||0)}
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block font-semibold">
                        Total
                      </label>
                      <input
                        readOnly = {true}
                        type="text"
                        value={[finalPrice || '']} //retrieve from selected company and add the corresponding tax percentage
                        className="w-full font-semibold text-lg mb-2 block text-center"
                        placeholder="Total Price"
                      />
                    </div>
                </div>
                <div>
                    <Link to={`/generatePdf`}
                  className="inline-block w-full text-center shadow-md text-sm bg-blue-500 text-white rounded-lg px-4 py-1 font-bold hover:bg-blue-600 hover:cursor-pointer">
                    Generate PDF
                  </Link>
                </div>      
            </div>
        );
}

export default InvoicePage;