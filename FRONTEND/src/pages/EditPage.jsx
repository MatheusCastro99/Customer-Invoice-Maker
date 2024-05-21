import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditPage = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [phoneValidity, setPhoneValidity] = useState(true);
  const [emailValidity, setEmailValidity] = useState(true);

  const [customer, setCustomer] = useState({
    companyName: "",
    phoneNumber: "",
    contactName: "",
    companyEmail: "",
    image: "",
    streetAddress: "",
    cityAddress: "",
    stateAddress: "",
    zipAddress: "",
  });

  const getCustomer = async () => { //ADD VALIDATION TO CHECK FORMAT OF FIELDS ON UPDATE BUTTON CLICKED
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/customer/${id}`);
      setCustomer({
        companyName: response.data.companyName,
        phoneNumber: response.data.phoneNumber,
        contactName: response.data.contactName,
        companyEmail: response.data.companyEmail,
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
    try {
      await axios.put(`http://localhost:3000/api/customer/${id}`, customer);
      toast.success(`Updated ${customer.companyName} Successfully`);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const validateNumber = (tempNumber) => {
    const valNumber = '^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$'
    var phoneTempField = document.getElementById(`phoneField`)

    if (!tempNumber.match(valNumber)) {
        toast.error(
            <div>
                <p>Please input phone number in one of the following format:</p> <br/>
                <p>XXX XXX XXXX</p> <br/>
                <p>(XXX) XXX-XXXX</p> <br/>
                <p>XXX-XXX-XXXX</p>
            </div>
        )

        phoneTempField.classList.remove('border-green-500')
        phoneTempField.classList.add('border-red-500')
        setPhoneValidity(false)
    }

    else {
        phoneTempField.classList.remove('border-2', 'border-red-500')
        phoneTempField.classList.add('border-green-500')

        let chars = [...tempNumber]
        if (chars.length<14) {
            chars.splice(0, 0, "(");
            chars.splice(4, 1, ") ");
            chars.splice(8, 1, "-");
            setPhoneNumber(chars.join(''));
        }

        setPhoneValidity(true)
    }
  }

  const validateEmail = (tempEmail) => {
    const valEmail = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
        var emailTempField = document.getElementById(`emailField`)
        if(!tempEmail.match(valEmail)) {
            toast.error(
                <div>
                    <p>Please input email in the following format:</p> <br/>
                    <p>emailAddress@domain.type</p>
                </div>
            )

            emailTempField.classList.remove('border-green-500')
            emailTempField.classList.add('border-red-500')
            setEmailValidity(false)
        }
        else {
            emailTempField.classList.remove('border-2', 'border-red-500')
            emailTempField.classList.add('border-green-500')
            setEmailValidity(true)
        }
  }

  const validateInfo = (e) => {
    e.preventDefault();

    if(customer.companyName == "" || customer.phoneNumber == "" || customer.contactName==""){
      toast.error("Please fill make sure all essential fields are filled");
      var companyTemp = document.getElementById(`nameField`)
      var contactTemp = document.getElementById(`contactField`)
      var phoneTemp = document.getElementById(`phoneField`)

      companyTemp.classList.add('border-2', 'border-red-500');
      contactTemp.classList.add('border-2', 'border-red-500');
      phoneTemp.classList.add('border-2', 'border-red-500');
      return;
    }

    else if(!phoneValidity || !emailValidity) {
        toast.error('Check phone number and email for correct format');
        var phoneTemp = document.getElementById(`phoneField`);
        var emailTemp = document.getElementById(`emailField`);
        phoneTemp.classList.add('border-2', 'border-red-500');
        emailTemp.classList.add('border-2', 'border-red-500');
        return;
    }

    else updateCustomer();
  }

  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
      <h2 id="home" className="font-semibold text-2xl mb-4 block text-center">
        Edit a Customer
      </h2>
      {isLoading ? (
        "Loading"
      ) : (
        <>
          <form onSubmit={validateInfo}>
            <div className="space-y-2">
              <div>
                <label className="text-gray-600 mb-2 block font-semibold">
                  Company Name
                </label>
                <input
                  id="nameField"
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
                  id="phoneField"
                  type="text"
                  value={customer.phoneNumber}
                  onChange={(e) => setCustomer({ ...customer, phoneNumber: e.target.value })}
                  onBlur={(e) => validateNumber(e.target.value)}
                  className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Phone Number"
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block font-semibold">
                  Email
                </label>
                <input
                  id="emailField"
                  type="text"
                  value={customer.companyEmail}
                  onChange={(e) =>
                    setCustomer({ ...customer, companyEmail: e.target.value })
                  }
                  onBlur={(e) => {validateEmail(e.target.value)}}
                  className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Email"
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block font-semibold">
                  Contact Name
                </label>
                <input
                  id="contactField"
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
              <div className="flex justify-center">
                <button className="block w-1/2 mt-6 bg-blue-700 text-white rounded-sm py-2 font-bold transition ease-in-out duration-300 hover:scale-110 hover:bg-blue-600 hover:cursor-pointer">
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
