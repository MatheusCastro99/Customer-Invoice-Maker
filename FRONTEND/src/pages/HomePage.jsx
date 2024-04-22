import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Customer from "../components/Customer";
import TableCustomer from "../components/TableCustomer";
import Divider from '@mui/material/Divider'

//IMPLEMENT INVOICE COUNT (COUNT IN RESPECT TO KENTECH/NOT INDIVIDUAL || OPEN MANUAL COUNT)!!!
//IMPLEMENT VERIFICATIONS/VALIDATIONS
//COMPANY PAGE (EDIT OPTIONS)
//IMPLEMENT EMAIL ON CUSTOMER MODEL (AND OTHER PAGES)

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState([]);

  const getCustomers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:3000/api/customer");
      console.log(response.data)
      setCustomers(response.data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return ( //ADD A SEARCHBAR BY GENERATE INVOICE SIDE
    <div id="home" className="">
      <div className="flex justify-between">
        <div className="inline-block">
        <Link
          to="/create"
          className="inline-block mt-4 shadow-md bg-blue-700 text-white rounded-sm px-4 py-2 font-bold transition ease-in-out duration-300 hover:bg-blue-600 hover:cursor-pointer hover:scale-110"
        >
          Create Customer
        </Link>
        <Link
          to="/invoice"
          className="inline-block mt-4 ml-5 shadow-md bg-gray-400 text-white rounded-sm px-4 py-2 font-bold transition ease-in-out duration-300 hover:bg-gray-300 hover:cursor-pointer hover:scale-110"
        >
          Generate Invoice
        </Link>
        </div>
        <div className="seeTable">
          <a
            href="#companyTable"
            className="inline-flex mt-4 ml-5 mb-4 shadow-md bg-gray-400 text-white rounded px-4 py-2 font-bold transition ease-in-out duration-300 hover:bg-gray-300 hover:cursor-pointer hover:scale-110">
              See Table
          </a>
        </div>
      </div>
      <Divider 
        sx={{fontSize:20, fontWeight:"bold", color:"white", "&::before, &::after": {borderColor: "gray", borderBottomWidth: 3,},}}>
        Company Cards
      </Divider>
      <div className="companyCard">
        <div className="grid grid-cols-2 lg:grid-cols-4 flex gap-4 mt-5">
          {isLoading ? (
            "Loading"
          ) : (
            <>
              {customers.length > 0 ? (
                <>
                  {customers.map((customer, index) => {
                    return (
                      <Customer
                        key={index}
                        customer={customer}
                        getCustomers={getCustomers}
                      />
                    );
                  })}
                </>
              ) : (
                <div className="mt-4 bg-gray-600 text-white text-center font-serif p-4">
                  There is no customer
                </div>
                
              )}
            </>
          )}
        </div>
      </div>
      <div id="companyTable" className="companyTable">
      <Divider 
        sx={{fontSize:20, fontWeight:"bold", color:"white", "&::before, &::after": {borderColor: "gray", borderBottomWidth: 3,},}}>
        Company Table
      </Divider>
        <TableCustomer 
          customers={customers} 
          getCustomers={getCustomers}
        />
      </div>
    </div>
  );
};

export default HomePage;
