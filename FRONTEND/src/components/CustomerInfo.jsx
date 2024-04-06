const CustomerInfo = ({customer}) => {


    return (
        <div>
            <div className="max-w-md">
                <div>
                <label className="mb-2 mt-4 block font-semibold">
                    Company Name
                </label>
                <input
                    readOnly={true} 
                    type="text"
                    value={customer.companyName || ''}
                    className="font-semibold text-xl mb-2 block text-center"
                />
                </div>
                <div>
                <label className="mb-2 block font-semibold">
                    Phone Number
                </label>
                <input
                    readOnly={true}
                    type="text"
                    value={customer.phoneNumber || ''}
                    className="font-semibold text-xl mb-2 block text-center"
                />
                </div>
                <div>
                <label className="mb-2 block font-semibold">
                    Contact Name
                </label>
                <input
                    readOnly={true}
                    type="text"
                    value={customer.contactName || ''}
                    className="font-semibold text-xl mb-2 block text-center"
                />
                </div>
                <div>
                <label className="mb-2 block font-semibold">
                    Image URL
                </label>
                <input
                    readOnly={true}
                    type="text"
                    value={customer.image || ''}
                    className="w-full font-semibold text-xl mb-2 block text-center"
                />

                {customer.image && (
                    <div className="w-1/2 border rounded p-2 mt-4 ">
                    <img className="w-full" src={customer.image} />
                    </div>
                )}
                </div>
                <div>
                <label className="mb-2 mt-2 block font-semibold">
                    Street Address
                </label>
                <input
                    readOnly={true}
                    type="text"
                    value={customer.streetAddress || ''}
                    className="font-semibold text-xl mb-2 block text-center"
                />
                </div>
                <div>
                <label className="mb-2 block font-semibold">
                    City
                </label>
                <input
                    readOnly={true}
                    type="text"
                    value={customer.cityAddress || ''}
                    className="font-semibold text-xl mb-2 block text-center"
                />
                </div>
                <div>
                <label className="mb-2 block font-semibold">
                    State
                </label>
                <input
                    readOnly={true}
                    type="text"
                    value={customer.stateAddress || ''}
                    className="font-semibold text-xl mb-2 block text-center"
                />
                </div>
                <div>
                <label className="mb-2 block font-semibold">
                    Zip Code
                </label>
                <input
                    readOnly={true}
                    type="text"
                    value={customer.zipAddress || ''}
                    className="font-semibold text-xl mb-2 block text-center"
                />
                </div>
            </div>
        </div>
    )
}

export default CustomerInfo