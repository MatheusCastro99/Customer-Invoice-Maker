import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";
import Collapsible from 'react-collapsible';

const TableInvoice = ({ invoices, getInvoices, customers, getCustomers }) => {
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
  
    return (
      <div className="mt-6 overflow-auto">
        {console.log(invoices, customers)}
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

            {invoices.map((invoices, index) => 
               {
                if(Object.keys(customers).length != 10) {
                  return (
                    <tr key={index}>
                        <td className="p-4 border-b ">{invoices.companyName}</td>
                        <td className="p-4 border-b ">{invoices.finalPrice}</td>
                        <td className="p-4 border-b ">{invoices.dateOfService}</td>
                        <td className="p-4 border-b ">{invoices.invoiceNumber}</td>
                        <td className="p-4 border-b ">
                          <div className="flex gap-2">
                            <button onClick={() => deleteInvoice(invoices._id)} className="inline-block text-sm font-semibold text-white px-2 py-1 bg-red-500 rounded transition ease-in-out duration-300 hover:bg-red-700">Delete</button>
                            <Link
                                to = {`/pdfPage`}
                                state= {{customerInfo: customers, subtotal: invoices.subtotal, taxRate: invoices.taxRate, jobDescription: invoices.jobDescription, finalPrice: invoices.finalPrice, dateOfService: invoices.dateOfService, invoiceNumber: invoices.invoiceNumber}}
                                className="inline-block text-center text-sm bg-blue-500 font-semibold text-white rounded px-2 py-1 transition ease-in-out duration-300 hover:bg-blue-600 hover:cursor-pointer">
                                PDF
                            </Link>
                          </div>
                        </td>
                        <td className="p-4 border-b "><Collapsible trigger={"Show"}>
                            <p>Job Breakdown: {invoices.jobDescription}</p>
                            <p>Subtotal: ${invoices.subtotal}</p>
                            <p>Tax: ${(invoices.subtotal*(invoices.taxRate/100)).toFixed(2)}</p>
                            
                        </Collapsible></td>
                      </tr>
                  )
                }
                else if ((invoices.companyName===customers.companyName)) {
                    return (
                        <tr key={index}>
                        <td className="p-4 border-b ">{invoices.companyName}</td>
                        <td className="p-4 border-b ">{invoices.finalPrice}</td>
                        <td className="p-4 border-b ">{invoices.dateOfService}</td>
                        <td className="p-4 border-b ">{invoices.invoiceNumber}</td>
                        <td className="p-4 border-b ">
                          <div className="flex gap-2">
                            <button onClick={() => deleteInvoice(invoices._id)} className="inline-block text-sm font-semibold text-white px-2 py-1 bg-red-500 rounded transition ease-in-out duration-300 hover:bg-red-700">Delete</button>
                            <Link
                                to = {`/pdfPage`}
                                state= {{customerInfo: customers, subtotal: invoices.subtotal, taxRate: invoices.taxRate, jobDescription: invoices.jobDescription, finalPrice: invoices.finalPrice, dateOfService: invoices.dateOfService}}
                                className="inline-block text-center text-sm bg-blue-500 font-semibold text-white rounded px-2 py-1 transition ease-in-out duration-300 hover:bg-blue-600 hover:cursor-pointer">
                                PDF
                            </Link>
                          </div>
                        </td>
                        <td className="p-4 border-b "><Collapsible trigger={"Show"}>
                            <p>Job Breakdown: {invoices.jobDescription}</p>
                            <p>Subtotal: ${invoices.subtotal}</p>
                            <p>Tax: ${(invoices.subtotal*(invoices.taxRate/100)).toFixed(2)}</p>
                            
                        </Collapsible></td>
                      </tr>
                      );
                }
               }
            )}
          </tbody>
        </table>
      </div>
    );
  };

  export default TableInvoice