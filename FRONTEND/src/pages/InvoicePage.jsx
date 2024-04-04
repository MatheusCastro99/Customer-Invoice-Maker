import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {Label, Select, Dropdown, DropdownItem} from "flowbite-react"
//import customerController from "../../../NODEAPI/controllers/customerController" REFACTOR THROUGH CORS

const InvoicePage = () => {
    const [jobPrice, setJobPrice] = useState(Number)
    const [jobDescription, setJobDescription] = useState();

    const [customers, setCustomers] = useState([]);
    const [tempCustomer, setTempCustomer] = useState([]);
    const requestInfo = async (e) => { //refactor
        try {
            if(e.target.value == "Select Company") {
              setTempCustomer([]);
              return;
            }
            const info = await axios.get(`http://localhost:3000/api/customer/${e.target.value}`);
            setTempCustomer(info.data);
            console.log(tempCustomer);
        } catch (error) {
            setTempCustomer([])
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
                      <label className="mb-2 mt-4 block font-semibold">
                        Company Name
                      </label>
                      <input
                        readOnly={true} 
                        type="text"
                        value={tempCustomer.companyName || ''}
                        className="font-semibold text-xl mb-2 block text-center"
                        //placeholder="Company Name"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block font-semibold">
                        Phone Number
                      </label>
                      <input
                        readOnly={true}
                        type="text"
                        value={tempCustomer.phoneNumber || ''}
                        className="font-semibold text-xl mb-2 block text-center"
                        //placeholder="Phone Number"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block font-semibold">
                        Contact Name
                      </label>
                      <input
                        readOnly={true}
                        type="text"
                        value={tempCustomer.contactName || ''}
                        className="font-semibold text-xl mb-2 block text-center"
                        //placeholder="Contact Name"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block font-semibold">
                        Image URL
                      </label>
                      <input
                        readOnly={true}
                        type="text"
                        value={tempCustomer.image || ''}
                        className="font-semibold text-xl mb-2 block text-center"
                        //placeholder="Image URL"
                      />

                      {tempCustomer.image && (
                        <div className="w-1/2 border rounded p-2 mt-4 ">
                          <img className="w-full" src={tempCustomer.image} />
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="mb-2 block font-semibold">
                        Street Address
                      </label>
                      <input
                        readOnly={true}
                        type="text"
                        value={tempCustomer.streetAddress || ''}
                        className="font-semibold text-xl mb-2 block text-center"
                        //placeholder="Street Address"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block font-semibold">
                        City
                      </label>
                      <input
                        readOnly={true}
                        type="text"
                        value={tempCustomer.cityAddress || ''}
                        className="font-semibold text-xl mb-2 block text-center"
                        //placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block font-semibold">
                        State
                      </label>
                      <input
                        readOnly={true}
                        type="text"
                        value={tempCustomer.stateAddress || ''}
                        className="font-semibold text-xl mb-2 block text-center"
                        //placeholder="State Address"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block font-semibold">
                        Zip Code
                      </label>
                      <input
                        readOnly={true}
                        type="text"
                        value={tempCustomer.zipAddress || ''}
                        className="font-semibold text-xl mb-2 block text-center"
                        //placeholder="Zip Code"
                      />
                    </div>
                </div>
                    
            </div>
        );
}

export default InvoicePage;