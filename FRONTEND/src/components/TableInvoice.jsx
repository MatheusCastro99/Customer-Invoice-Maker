import { Switch, FormControlLabel } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";
import Collapsible from 'react-collapsible';
import { useState } from "react";

const TableInvoice = ({ invoices, getInvoices, customers}) => {
    
  const [delCheckBox, setDelCheckBox] = useState(true);
  let invoicesArr = [];

  const deleteInvoice = async (id) => {
    const result = await Swal.fire({
      title: "Do you want to delete this invoice?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/generateInvoice/${id}`);
        toast.success("Invoice Deleted Successfully");
        getInvoices();
      } catch (error) {
        toast.error(error.message);
        }
    }
  };

    const handleCheckBox = () => {
      loadInvoicesArr();
      if (delCheckBox) {
        try {
          setDelCheckBox(false);
        for(let invoiceIndex=0; invoiceIndex<invoicesArr.length; invoiceIndex++) {
          for(let customerIndex=0; customerIndex<customers.length; customerIndex++) {
            if(customers[customerIndex].companyName == invoices[invoiceIndex].companyName) {
              invoices.splice(invoiceIndex, 1)
              invoiceIndex=0
            }
          }
        }
        } catch (error) {
          }
      }

      else {
        setDelCheckBox(true);
        getInvoices()
      }
    }
    const loadInvoicesArr = () => {
      invoices.map((currInvoice) => {
        invoicesArr.push(currInvoice)
      })
    }

    let tableItem = () => { 
      return invoices.map((currInvoice) => {
        if(customers.companyName==undefined) {
          return(
            <tr key={currInvoice._id}>
              <td className="p-4 border-b ">{currInvoice.companyName}</td>
              <td className="p-4 border-b ">{currInvoice.finalPrice}</td>
              <td className="p-4 border-b ">{currInvoice.dateOfService}</td>
              <td className="p-4 border-b ">{currInvoice.invoiceNumber}</td>
              <td className="p-4 border-b ">
                <div className="flex gap-2">
                  <button onClick={() => deleteInvoice(currInvoice._id)} className="inline-block text-sm font-semibold text-white px-2 py-1 bg-red-500 rounded transition ease-in-out duration-300 hover:bg-red-700">Delete</button>
                  <Link
                      to = {`/pdfPage`}
                      state= {{companyName: currInvoice.companyName, phoneNumber: currInvoice.phoneNumber, companyEmail: currInvoice.companyEmail, streetAddress: currInvoice.streetAddress, cityAddress: currInvoice.streetAddress, stateAddress: currInvoice.stateAddress, zipAddress: currInvoice.zipAddress,
                                subtotal: currInvoice.subtotal, taxRate: currInvoice.taxRate, jobDescription: currInvoice.jobDescription, finalPrice: currInvoice.finalPrice, 
                                dateOfService: currInvoice.dateOfService, invoiceNumber: currInvoice.invoiceNumber}}
                      className="inline-block text-center text-sm bg-blue-500 font-semibold text-white rounded px-2 py-1 transition ease-in-out duration-300 hover:bg-blue-600 hover:cursor-pointer">
                      PDF
                  </Link>
                </div>
              </td>
              <td className="p-4 border-b ">
                <Collapsible trigger={"Show"}>
                  <p>Job Breakdown: {currInvoice.jobDescription}</p>
                  <p>Subtotal: ${currInvoice.subtotal}</p>
                  <p>Tax: ${(currInvoice.subtotal*(currInvoice.taxRate/100)).toFixed(2)}</p>  
                </Collapsible>
              </td>
            </tr>
          )
        }
        else if ((currInvoice.companyName===customers.companyName)) {
          return (
            <tr key={index}>
              <td className="p-4 border-b ">{currInvoice.companyName}</td>
              <td className="p-4 border-b ">{currInvoice.finalPrice}</td>
              <td className="p-4 border-b ">{currInvoice.dateOfService}</td>
              <td className="p-4 border-b ">{currInvoice.invoiceNumber}</td>
              <td className="p-4 border-b ">
                <div className="flex gap-2">
                  <button onClick={() => deleteInvoice(currInvoice._id)} className="inline-block text-sm font-semibold text-white px-2 py-1 bg-red-500 rounded transition ease-in-out duration-300 hover:bg-red-700">Delete</button>
                  <Link
                      to = {`/pdfPage`}
                      state= {{customerInfo: customers, subtotal: currInvoice.subtotal, taxRate: currInvoice.taxRate, jobDescription: currInvoice.jobDescription, finalPrice: currInvoice.finalPrice, dateOfService: currInvoice.dateOfService}}
                      className="inline-block text-center text-sm bg-blue-500 font-semibold text-white rounded px-2 py-1 transition ease-in-out duration-300 hover:bg-blue-600 hover:cursor-pointer">
                      PDF
                  </Link>
                </div>
              </td>
              <td className="p-4 border-b ">
                <Collapsible trigger={"Show"}>
                  <p>Job Breakdown: {currInvoice.jobDescription}</p>
                  <p>Subtotal: ${currInvoice.subtotal}</p>
                  <p>Tax: ${(currInvoice.subtotal*(currInvoice.taxRate/100)).toFixed(2)}</p>
                </Collapsible>
              </td>
            </tr>
          );
        }
    })}
  
    return (
      <div className="mt-6 overflow-auto">
        <div className="ml-2"><FormControlLabel control={<Switch onChange={handleCheckBox}/>} label="Deleted Companies" /></div>
        <table className="table-auto mx-auto bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left px-4 py-2">Company Name</th>
              <th className="text-left px-4 py-2">Final Price</th>
              <th className="text-left px-4 py-2">Date</th>
              <th className="text-left px-4 py-2">Invoice #</th>
              <th className="px-4 py-2">Actions</th>
              <th className="text-left px-4 py-2">Detail</th>
            </tr>
          </thead>
          <tbody>
            {tableItem()}
          </tbody>
        </table>
      </div>
    );
  };

  export default TableInvoice