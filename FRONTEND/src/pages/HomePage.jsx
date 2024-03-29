import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Customer from "../components/Customer";
import TableCustomer from "../components/TableCustomer";

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

  return (
    <div>
      <div>
        <Link
          to="/create"
          className="inline-block mt-4 shadow-md bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer"
        >
          Create a Customer
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
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
              <div className="mt-4 bg-gray-800 text-white font-serif p-4">
                There is no customer
              </div>
            )}
          </>
        )}
      </div>

      <TableCustomer customers={customers}  getCustomers={getCustomers}/>
    </div>
  );
};

export default HomePage;
