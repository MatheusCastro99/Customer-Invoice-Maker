/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";

const TableCustomer = ({ customers, getCustomers }) => {
  const deleteCustomer = async (id) => {
    const result = await Swal.fire({
      title: "Do you want to delete the customer?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });
  
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/customer/${id}`);
        toast.success("Delete a Customer Successfully");
        getCustomers();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="mt-6 overflow-auto">
      <table className="table-auto mx-auto bg-white">
        <thead className="bg-gray-200">
          <tr>
            <th className="text-left px-4 py-2">Name</th>
            <th className="text-left px-4 py-2">Age</th>
            <th className="text-left px-4 py-2">Occupation</th>
            <th className="w-20 px-4 py-2">Image</th>
            <th className="text-left px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => {
            return (
              <tr key={index}>
                <td className="p-4 border-b ">{customer.name}</td>
                <td className="p-4 border-b ">{customer.age}</td>
                <td className="p-4 border-b ">{customer.occupation}</td>
                <td className="p-4 border-b ">
                    <img src={customer.image} className="w-full"/>
                </td>
                <td className="p-4 border-b ">
                  <div className="flex gap-2">
                    <Link  to={`/edit/${customer._id}`} className="inline-block text-sm font-semibold text-white px-2 py-1 bg-blue-500 rounded hover:bg-blue-600">Edit</Link>
                    <button onClick={() => deleteCustomer(customer._id)} className="inline-block text-sm font-semibold text-white px-2 py-1 bg-red-500 rounded hover:bg-red-600">Delete</button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableCustomer;
