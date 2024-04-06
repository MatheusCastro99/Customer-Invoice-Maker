import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreatePage = () => {

    const [companyName, setCompanyName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [contactName, setContactName] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [cityAddress, setCityAddress] = useState("");
    const [stateAddress, setStateAddress] = useState("");
    const [zipAddress, setZipAddress] = useState("");
    let [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const saveCustomer = async(e) => { //ADD VALIDATION TO CHECK FORMAT OF FIELDS ON SAVE BUTTON CLICKED
        e.preventDefault();
        if(companyName === "" || phoneNumber === ""){
            toast.error('Please fill out all input completely');
            return;
        }

        else if(image ==="") {
            image = 
                "https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png";
        }

        try {
            setIsLoading(true);
            const response = await axios.post("http://localhost:3000/api/customer", 
            {
                companyName: companyName, phoneNumber: phoneNumber, contactName: contactName, image: image, streetAddress:streetAddress, cityAddress: cityAddress, stateAddress: stateAddress, zipAddress: zipAddress
            });
            toast.success(`Save ${response.data.companyName} Successfully`);
            setIsLoading(false);
            navigate("/");
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
        }
    }


    return (
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
            <h2 className="font-semibold text-2xl mb-4 block text-center">
                Create a Customer
            </h2>
            <form onSubmit={saveCustomer}>
                <div className="space-y-2">
                    <div>
                        <label className="text-gray-600 blockInfoStyle">Contact Info</label>
                        <div>
                            <label className="text-gray-600 mb-2 block font-semibold">Company Name</label>
                            <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Company Name" />
                        </div>
                        <div>
                            <label className="text-gray-600 mb-2 block font-semibold">Phone Number</label>
                            <input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Phone Number" />
                        </div>
                        <div>
                            <label className="text-gray-600 mb-2 block font-semibold">Contact Name</label>
                            <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Contact Name" />
                        </div>
                        <div>
                            <label className="text-gray-600 mb-2 block font-semibold">Image URL</label>
                            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Image URL" />
                        </div>
                    </div>
                    <div>
                        <label className="text-gray-600 blockInfoStyle">Address Info</label>
                        <div>
                            <label className="text-gray-600 mb-2 block font-semibold">Street</label>
                            <input type="text" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Street Address" />
                        </div>
                        <div>
                            <label className="text-gray-600 mb-2 block font-semibold">City</label>
                            <input type="text" value={cityAddress} onChange={(e) => setCityAddress(e.target.value)} className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="City" />
                        </div>
                        <div>
                            <label className="text-gray-600 mb-2 block font-semibold">State</label>
                            <input type="text" value={stateAddress} onChange={(e) => setStateAddress(e.target.value)} className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="State" />
                        </div>
                        <div>
                            <label className="text-gray-600 mb-2 block font-semibold">Zip Code</label>
                            <input type="text" value={zipAddress} onChange={(e) => setZipAddress(e.target.value)} className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Zip Code" />
                        </div>
                    </div>
                    <div>
                        { !isLoading &&  (<button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">Save</button>)}
                        
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreatePage;
