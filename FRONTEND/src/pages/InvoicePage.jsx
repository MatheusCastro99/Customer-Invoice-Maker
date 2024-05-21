import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {Select} from "flowbite-react"
import Divider from '@mui/material/Divider'
import { Chip } from "@mui/material";
import Collapsible from 'react-collapsible';
import CustomerInfo from "../components/CustomerInfo";

const InvoicePage = () => {
    const [jobPrice, setJobPrice] = useState(Number)
    const [jobDescription, setJobDescription] = useState();
    const [customers, setCustomers] = useState([]);
    const [tempCustomer, setTempCustomer] = useState([]);
    const [correspondingTax, setCorrespondingTax] = useState();
    const [finalPrice, setFinalPrice] = useState();
    const [dateOfService, setDateOfService] = useState('');
    const [invoiceNumber, setInvoiceNumber]= useState();
    const [dateValidity, setDateValidity] = useState(false);

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

    const handleJobPrice = async(e) => {
      setJobPrice(e.target.value)
      const getFinalPrice = await axios.put(`http://localhost:3000/api/taxinfo/getTaxAmount`, 
        {jobPrice:e.target.value, taxRate: correspondingTax, jobDescription: jobDescription})
      setFinalPrice(getFinalPrice.data)
    }
    const handleTax = async(state) => {
      const getTaxRate = await axios.put(`http://localhost:3000/api/taxinfo/getTaxRate`, {state:state});
      setCorrespondingTax(getTaxRate.data);
    }
    
    const validateDate = (date) => {
      const valDate = '^\\d{2}/?\\d{2}/?\\d{4}$'
      var dateField = document.getElementById('dateField')
      if (!date.match(valDate)) {
        toast.error(
          <div>
              <p>Please input date in the following format:</p> <br/>
              <p>MMDDYYYY</p>
          </div>
      )

      dateField.classList.add('border', 'border-red-500')
      setDateValidity(false)
      }

      else {
        dateField.classList.remove('border', 'border-red-500')
        let chars = [...date]
        if(chars.length<10){
          chars.splice(2, 0, "/")
          chars.splice(5, 0, "/")
        }
        setDateOfService(chars.join(''))
        setDateValidity(true)
      }
    }

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/customer");
            setCustomers(response.data)
        } catch (error) {
            
        }}

    useEffect( () => {fetchData()},[]);
        return (
            <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
                <h2 id="home" className="font-semibold text-2xl mb-4 block text-center">
                    Generate Invoice
                </h2>
                <div className="max-w-md">
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
                      <div className="mt-3">
                          <div>
                            <CustomerInfo
                              customer = {tempCustomer}/>
                          </div>
                          <div className="w-full flex justify-center px-10 mt-5">
                            <Link
                              to={`/edit/${tempCustomer._id}`}
                              className="inline-block w-1/2 text-center shadow-md text-sm bg-blue-500 text-white rounded-lg px-4 py-1 font-bold transition ease-in-out duration-300 hover:scale-110 hover:bg-blue-600 hover:cursor-pointer">
                              Update
                            </Link>
                          </div>
                      </div>
                </div>
                <div className="mt-7 mb-3">
                  <Collapsible trigger={<Divider variant="middle" className="bg-color-red"><Chip label="Job Information ⤵" size="small" /></Divider>} open={true}>
                    <div className="rows mt-2">
                        <label className="mb-2 block font-semibold row">
                          Date of Service:
                        </label>
                        <input
                          type="text"
                          id="dateField"
                          value={dateOfService || ''}
                          onChange={(e) => setDateOfService(e.target.value)}
                          onBlur={(e) => {validateDate(e.target.value)}}
                          className="w-1/2 font-semibold text-lg mb-2 ml-4 block row"
                          placeholder="Date of Service: mmddyyyy"
                        />
                        <label className="mb-2 block font-semibold row">
                          Invoice Number:
                        </label>
                        <input
                          type="text"
                          value={invoiceNumber || ''}
                          onChange={(e) => setInvoiceNumber(e.target.value)}
                          className="w-1/2 font-semibold text-lg mb-2 ml-4 block row"
                          placeholder="Enter Invoice Number"
                        />
                      </div>
                    <div>
                        <label className="mb-2 block font-semibold">
                          Job Description
                        </label>
                        <textarea
                          type="text"
                          value={jobDescription || ''}
                          onChange={(e) => setJobDescription(e.target.value)}
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
                            {"$"+(parseFloat((jobPrice*(correspondingTax/100)).toFixed(2))||0)}
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
                          value={[finalPrice || '']}
                          className="w-full font-semibold text-lg mb-2 block text-center"
                          placeholder="Total Price"
                        />
                    </div>
                  </Collapsible>
                </div>
                <div className="w-full flex justify-center">
                    <Link
                      to = {`/pdfPage`}
                      state= {{customerInfo: tempCustomer, subtotal: jobPrice, taxRate: correspondingTax, jobDescription: jobDescription, finalPrice: finalPrice, dateOfService: dateOfService, invoiceNumber: invoiceNumber}}
                      className="inline-block w-1/2 text-center shadow-md text-sm bg-blue-500 text-white rounded-lg px-4 py-1 font-bold transition ease-in-out duration-300 hover:scale-110 hover:bg-blue-600 hover:cursor-pointer">
                      Generate PDF
                  </Link>
                </div>      
            </div>
        );
}

export default InvoicePage;