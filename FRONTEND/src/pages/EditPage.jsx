import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditPage = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [customer, setCustomer] = useState({
    companyName: "",
    phoneNumber: "",
    contactName: "",
    image: "",
    streetAddress: "",
    cityAddress: "",
    stateAddress: "",
    zipAddress: "",
  });

  const getCustomer = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/customer/${id}`);
      setCustomer({
        companyName: response.data.companyName,
        phoneNumber: response.data.phoneNumber,
        contactName: response.data.contactName,
        image: response.data.image,
        streetAddress: response.data.streetAddress,
        cityAddress: response.data.cityAddress,
        stateAddress: response.data.stateAddress,
        zipAddress: response.data.zipAddress,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const updateCustomer = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/customer/${id}`, customer);
      toast.success("Updated a customer successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
      <h2 className="font-semibold text-2xl mb-4 block text-center">
        Edit a Customer
      </h2>
      {isLoading ? (
        "Loading"
      ) : (
        <>
          <form onSubmit={updateCustomer}>
            <div className="space-y-2">
              <div>
                <label className="text-gray-600 mb-2 block font-semibold">
                  Company Name
                </label>
                <input
                  type="text"
                  value={customer.companyName}
                  onChange={(e) =>
                    setCustomer({ ...customer, companyName: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Company Name"
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block font-semibold">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={customer.phoneNumber}
                  onChange={(e) =>
                    setCustomer({ ...customer, phoneNumber: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Phone Number"
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block font-semibold">
                  Contact Name
                </label>
                <input
                  type="text"
                  value={customer.contactName}
                  onChange={(e) =>
                    setCustomer({ ...customer, contactName: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Contact Name"
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block font-semibold">
                  Image URL
                </label>
                <input
                  type="text"
                  value={customer.image}
                  onChange={(e) =>
                    setCustomer({ ...customer, image: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Image URL"
                />

                {customer.image && (
                  <div className="w-1/2 border rounded p-2 mt-4 ">
                    <img className="w-full" src={customer.image} />
                  </div>
                )}
              </div>
              <div>
                <label className="text-gray-600 mb-2 block font-semibold">
                  Street Address
                </label>
                <input
                  type="text"
                  value={customer.streetAddress}
                  onChange={(e) =>
                    setCustomer({ ...customer, streetAddress: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Street Address"
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block font-semibold">
                  City
                </label>
                <input
                  type="text"
                  value={customer.cityAddress}
                  onChange={(e) =>
                    setCustomer({ ...customer, cityAddress: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="City"
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block font-semibold">
                  State
                </label>
                <input
                  type="text"
                  value={customer.stateAddress}
                  onChange={(e) =>
                    setCustomer({ ...customer, stateAddress: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="State Address"
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block font-semibold">
                  Zip Code
                </label>
                <input
                  type="text"
                  value={customer.zipAddress}
                  onChange={(e) =>
                    setCustomer({ ...customer, zipAddress: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Zip Code"
                />
              </div>
              <div>
                <button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">
                  Update
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default EditPage;
