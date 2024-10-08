import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewParties = (props) => {
    const [parties, setParties] = useState([]);
    const [error, setError] = useState('');
    const userEmail = props.Email;
    const [design_no, setDesign_no] = useState('');

    useEffect(() => {
        const fetchParties = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}stock/viewParties/?email=${userEmail}`, {
                    withCredentials: true,
                });
                setParties(response.data);
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };
        fetchParties();
    }, [userEmail]);

    return (
        <div className="container mx-auto mt-5 h-full overflow-y-scroll bg-[#FFFFFF] p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-left text-xl text-[#3A0A3E] font-bold">Parties Details</h1>
                
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="overflow-x-auto mt-5 shadow-md rounded-lg">
                <table className="min-w-full bg-[#FFFFFF] border-collapse border-gray-700 rounded-lg shadow-lg">
                    <thead className="bg-[#181818] text-white">
                    <tr>
                        <th scope="col" className="py-2 px-4 text-center border border-gray-700">Sr No.</th>
                        <th scope="col" className="py-2 px-4 text-center border border-gray-700">Partie Name</th>
                        <th scope="col" className="py-2 px-4 text-center border border-gray-700">Mobile</th>
                        <th scope="col" className="py-2 px-4 text-center border border-gray-700">GST NUMBER</th>
                        <th scope="col" className="py-2 px-4 text-center border border-gray-700">Address</th>
                    </tr>
                    </thead>
                    <tbody>
                    {parties.map((party,index) => (
                        <tr key={party._id} className="text-white border-t-2 border-b-2 border-gray-700">
                            <td className="py-2 px-4 text-center text-[#3A0A3E]">{index+1}</td>
                            <td className="py-2 px-4 text-center text-[#3A0A3E]">{party.party_name}</td>
                            <td className="py-2 px-4 text-center text-[#3A0A3E]">{party.mobile}</td>
                            <td className="py-2 px-4 text-center text-[#3A0A3E]">{party.gst_number}</td>
                            <td className="py-2 px-4 text-center text-[#3A0A3E]">{party.address}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewParties;
