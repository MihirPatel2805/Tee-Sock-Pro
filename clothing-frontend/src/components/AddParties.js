import React, { useState } from 'react';
import axios from 'axios';

const PartiesForm = (prop) => {
    const [partyName, setPartyName] = useState('');
    const [mobile, setMobile] = useState('');
    const [gstNumber, setGstNumber] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');

        const formData = {
            email: prop.Email,
            party_name: partyName,
            mobile: mobile,
            gst_number: gstNumber,
            address: address,
        };

        try {
            await axios.post(`http://localhost:5000/parties/add`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setSuccessMessage('Party added successfully!');
            setError('');
        } catch (error) {
            console.error('Error adding party:', error);
            setError(error.response.data.error);
        }
    };

    return (
        <div className="bg-[#FFFFFF] p-6 rounded-lg h-full w-full text-[#3A0A3E]">
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-[#3A0A3E] font-bold">Add Party</h1>
                <p className="text-gray-400">Fill out the details to add a new party.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex gap-10 mt-10 flex-col">
                <div className="grid grid-cols-2 gap-20 w-full">
                    {/* Party Name Input */}
                    <div className="space-y-5">
                        <label htmlFor="party_name" className="block text-sm font-semibold text-[#3A0A3E]">
                            Party Name
                        </label>
                        <input
                            type="text"
                            id="party_name"
                            name="party_name"
                            value={partyName}
                            onChange={(e) => setPartyName(e.target.value)}
                            className="w-full border border-gray-600 p-2 rounded bg-[#F8F8FC] text-[#3A0A3E]"
                            required
                        />
                    </div>

                    {/* Mobile Input */}
                    <div className="space-y-5">
                        <label htmlFor="mobile" className="block text-sm font-semibold text-[#3A0A3E]">
                            Mobile
                        </label>
                        <input
                            type="text"
                            id="mobile"
                            name="mobile"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            className="w-full border border-gray-600 p-2 rounded bg-[#F8F8FC] text-[#3A0A3E]"
                            required
                        />
                    </div>

                    {/* GST Number Input */}
                    <div className="space-y-5">
                        <label htmlFor="gst_number" className="block text-sm font-semibold text-[#3A0A3E]">
                            GST Number
                        </label>
                        <input
                            type="text"
                            id="gst_number"
                            name="gst_number"
                            value={gstNumber}
                            onChange={(e) => setGstNumber(e.target.value)}
                            className="w-full border border-gray-600 p-2 rounded bg-[#F8F8FC] text-[#3A0A3E]"
                            required
                        />
                    </div>

                    {/* Address Input */}
                    <div className="space-y-5">
                        <label htmlFor="address" className="block text-sm font-semibold text-[#3A0A3E]">
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full border border-gray-600 p-2 rounded bg-[#F8F8FC] text-[#3A0A3E]"
                            required
                        />
                    </div>
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500">{error}</p>}

                {/* Success Message */}
                {successMessage && <p className="text-green-500">{successMessage}</p>}

                {/* Submit Button */}
                <div className='flex justify-end'>
                    <button
                        type="submit"
                        className="w-[20%]  bg-[#181818] text-white p-2 rounded mt-4 hover:bg-[#E6859E]"
                    >
                        Add Party
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PartiesForm;
