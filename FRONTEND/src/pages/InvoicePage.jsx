import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SearchBar from "../components/SearchBar";
import Customer from "../components/Customer";
import axios from "axios";


const InvoicePage = () => {
    const jobPrice = typeof(Number);
    const jobDescription = typeof(String);

    const [input, setInput] = useState('');
    const [companyListDefault, setCompanyListDefault] = useState();
    const [companyList, setCompanyList] = useState();
    const [customers, setCustomers] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/customer");
            console.log(response.data);
        } catch (error) {
            
        }}
        
        /*return await fetch('http://localhost:3000/api/customer')
          .then(data => {
             setCompanyList(data) 
             setCompanyListDefault(data)
           })
           .then(response => response.json());
        }*/
    
    const updateInput = async (input) => {
        const filtered = companyListDefault.filter(customers => {
            return customers.companyName.toLowerCase().includes(input.toLowerCase())
        })
            setInput(input);
            setCompanyList(filtered);
    }

    useEffect( () => {fetchData()},[]);

        return (
            <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
                <h2 className="font-semibold text-2xl mb-4 block text-center">
                    Generate Invoice
                </h2>
                <SearchBar
                    input={input} 
                    onChange={updateInput} //SHIT NOT WORKING
                />
                {customers.map((companyList, index) => {
                  return (
                    <Customer
                      key={index}
                      companyList={companyList}
                      fetchData={fetchData}
                    />
                  );
                })}    
            </div>
        );
}

export default InvoicePage;