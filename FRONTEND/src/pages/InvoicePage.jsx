import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {Select} from "flowbite-react"
import Divider from '@mui/material/Divider'
import CustomerInfo from "../components/CustomerInfo";
//REFACTOR THROUGH CORS

const InvoicePage = () => {
    const [jobPrice, setJobPrice] = useState(Number)
    const [jobDescription, setJobDescription] = useState();
    const [customers, setCustomers] = useState([]);
    const [tempCustomer, setTempCustomer] = useState([]);
    const [correspondingTax, setCorrespondingTax] = useState()
    let totalPrice = Number(jobPrice)+jobPrice*(correspondingTax/100)

    const requestInfo = async (e) => { //refactor
        try {
            if(e.target.value == "Select Company") {
              setTempCustomer([]);
              setCorrespondingTax();
              return;
            }
            const info = await axios.get(`http://localhost:3000/api/customer/${e.target.value}`);
            setTempCustomer(info.data);
            handleTax(info.data.stateAddress);
            <CustomerInfo
              customer = {tempCustomer}/>;
        } catch (error) {
            setTempCustomer([])
        }
        
    }

    const handleJobDescription = (e) => {
    setJobDescription(e.target.value)
    }
    const handleJobPrice = (e) => {
      setJobPrice(e.target.value)
      }
    const handleTax = (state) => {
      switch (state) {
        case "NJ":
          setCorrespondingTax(6.625)
          break;
        case "PA":
          setCorrespondingTax(6)
          break;
        case "NY":
          setCorrespondingTax(8.53)
          break;
        case "FL":
          setCorrespondingTax(6)
          break;
      
        default:
          setCorrespondingTax("Please add tax rate manually")
          break;
      }
    }

    const fetchData = async () => { //refactor
        try {
            const response = await axios.get("http://localhost:3000/api/customer");
            setCustomers(response.data)
            console.log(customers)
        } catch (error) {
            
        }}

    useEffect( () => {fetchData()},[]);
                                            //ADD ID TO ALL FORM FIELDS
        return (
            <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
                <h2 className="font-semibold text-2xl mb-4 block text-center">
                    Generate Invoice
                </h2>
                <div className="max-w-md">
                    <div className="mt-2 mb-2 block font-semibold">Company info</div>
                    <div>
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
                      <input
                        readOnly = {true}
                        type="text"
                        value={[tempCustomer.stateAddress+":  "+ correspondingTax+"%                "+ "$"+(jobPrice*correspondingTax/100)]|| ''} //retrieve from selected company and add the corresponding tax percentage
                        className="w-full font-semibold text-lg mb-2 block text-center"
                        placeholder="State Taxes"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block font-semibold">
                        Total
                      </label>
                      <input
                        readOnly = {true}
                        type="text"
                        value={totalPrice|| ''} //retrieve from selected company and add the corresponding tax percentage
                        className="w-full font-semibold text-lg mb-2 block text-center"
                        placeholder="Total Price"
                      />
                    </div>
                </div>
                    
            </div>
        );
}

export default InvoicePage;