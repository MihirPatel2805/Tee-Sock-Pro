// import React, {useEffect, useState} from 'react';
// import {Link, useNavigate,Outlet} from 'react-router-dom';
// import axios from "axios";
// const Dashboard = () => {
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState('');
//     const [showSaleDropdown, setShowSaleDropdown] = useState(false);
//     const [showPurchaseDropdown, setShowPurchaseDropdown] = useState(false);
//     const navigate = useNavigate();
//
//
//     useEffect(() => {
//         const getName = async () => {
//             try {
//                 const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/user/`, {
//                     withCredentials: true,
//                 });
//                 setUsername(response.data.name);
//                 setEmail(response.data.email);
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         };
//         getName();
//     }, []);
//
//     const handleLogout = async () => {
//         try {
//             await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/logout/`, {}, {
//                 withCredentials: true,
//             });
//             navigate('/');
//         } catch (error) {
//             console.error('Error logging out:', error);
//         }
//     };
//     return (
//         <div className="flex bg-sec h-[100vh] w-[100vw] ">
//             {/* Sidebar */}
//             <aside className="w-[20%] bg-sec text-tri font-bold flex-shrink-0 rounded-2xl fixed h-full">
//                 <div className="flex items-center justify-center p-4 border-b border-gray-700">
//                     {/* Logo or Profile Image */}
//                     <div className="rounded-full bg-gray-300 h-10 w-10"></div>
//                     <span className="ml-3 text-xl font-bold font-semibold">My Company</span>
//                 </div>
//
//                 {/* Navigation Links */}
//                 <nav className="p-4 space-y-4">
//                     {/* Home Link */}
//                     {/*<FontAwesomeIcon icon="fa-solid fa-house" style={{color: "#808080",}} />*/}
//                     <Link to="/dashboard" className="flex items-center text-tri font-bold hover:text-white">
//                         {/*<span className="material-icons">home</span>*/}
//                         <span className="ml-2">Home</span>
//                     </Link>
//
//                     <div className="relative">
//                         <button
//                             className="flex items-center text-tri font-bold hover:text-white w-full"
//                             onClick={() => setShowPurchaseDropdown(!showPurchaseDropdown)}
//                         >
//                             {/*<span className="material-icons">receipt_long</span>*/}
//                             <span className="ml-2">Parties</span>
//                             <span className="ml-auto material-icons">{showPurchaseDropdown ? '^' : 'V'}</span>
//                         </button>
//                         {showPurchaseDropdown && (
//                             <div className="pl-8 mt-2 space-y-2">
//                                 <Link to="/dashboard/addParty"
//                                       className="block text-tri hover:text-white">Add Party</Link>
//                                 <Link to="/dashboard/viewParties"
//                                       className="block text-pri font-bold hover:text-white">Views Parties</Link>
//                             </div>
//                         )}
//                     </div>
//                     {/* Items Link */}
//                     <div className="relative">
//                         <button
//                             className="flex items-center text-tri font-bold hover:text-white w-full"
//                             onClick={() => setShowPurchaseDropdown(!showPurchaseDropdown)}
//                         >
//                             {/*<span className="material-icons">receipt_long</span>*/}
//                             <span className="ml-2">Items</span>
//                             <span className="ml-auto material-icons">{showPurchaseDropdown ? '^' : 'V'}</span>
//                         </button>
//                         {showPurchaseDropdown && (
//                             <div className="pl-8 mt-2 space-y-2">
//                                 <Link to="/dashboard/addItems"
//                                       className="block text-tri hover:text-white">Add Items</Link>
//                                 <Link to="/dashboard/viewItems"
//                                       className="block text-pri font-bold hover:text-white">View Items</Link>
//                             </div>
//                         )}
//                     </div>
//                     {/* Sale Dropdown */}
//                     <div className="relative">
//                         <button
//                             className="flex items-center text-tri font-bold hover:text-white w-full"
//                             onClick={() => setShowSaleDropdown(!showSaleDropdown)}
//                         >
//                             {/*<span className="material-icons">shopping_cart</span>*/}
//                             <span className="ml-2">Sale</span>
//                             <span className="ml-auto material-icons">{showSaleDropdown ? '^' : 'V'}</span>
//                         </button>
//                         {showSaleDropdown && (
//                             <div className="pl-8 mt-2 space-y-2">
//                                 <Link className="block text-tri font-bold hover:text-white"
//                                       to="/dashboard/addOrderList"
//                                 >New Order</Link>
//                                 <Link to="/dashboard/orderHistory"
//                                     className="block text-gray-300 font-bold hover:text-white">Sale History</Link>
//                             </div>
//                         )}
//                     </div>
//
//                     {/* stock Dropdown */}
//                     <div className="relative">
//                         <button
//                             className="flex items-center text-tri font-bold hover:text-white w-full"
//                             onClick={() => setShowPurchaseDropdown(!showPurchaseDropdown)}
//                         >
//                             {/*<span className="material-icons">receipt_long</span>*/}
//                             <span className="ml-2">Stock</span>
//                             <span className="ml-auto material-icons">{showPurchaseDropdown ? '^' : 'V'}</span>
//                         </button>
//                         {showPurchaseDropdown && (
//                             <div className="pl-8 mt-2 space-y-2">
//                                 <Link to="/dashboard/addStock"
//                                       className="block text-tri hover:text-white">Add Stock</Link>
//                                 <Link to="/dashboard/viewStock"
//                                       className="block text-pri font-bold hover:text-white">View Stock</Link>
//                             </div>
//                         )}
//                     </div>
//
//                     {/* Purchase Dropdown */}
//                     <div className="relative">
//                         <button
//                             className="flex items-center text-tri font-bold hover:text-white w-full"
//                             onClick={() => setShowPurchaseDropdown(!showPurchaseDropdown)}
//                         >
//                             {/*<span className="material-icons">receipt_long</span>*/}
//                             <span className="ml-2">Purchase</span>
//                             <span className="ml-auto material-icons">{showPurchaseDropdown ? '^' : 'V'}</span>
//                         </button>
//                         {showPurchaseDropdown && (
//                             <div className="pl-8 mt-2 space-y-2">
//                                 <Link to="/dashboard/purchaseitemsList"
//                                       className="block text-tri hover:text-white">New Purchase</Link>
//                                 <Link to="/dashboard/purchaseHistory"
//                                       className="block text-pri font-bold hover:text-white">Purchase History</Link>
//                             </div>
//                         )}
//                     </div>
//                 </nav>
//             </aside>
//
//             {/* Main Content Area */}
//             <div className=" flex-auto ml-5 bg-sec ml-[21%] w-[70%] mr-[2%] overflow-x-hidden">
//                 {/* Content Header */}
//                 <div className="bg-sec h-[10vh] text-tri flex justify-start pl-5 items-center fixed w-full">
//                     <h1 className="text-2xl font-bold text-tri">Welcome to <span
//                         className='text-tri font-bold-2'>TeeStockPro</span></h1>
//                     {/*<p className="text-gray-600">Enter details to make your first sale...</p>*/}
//
//                 </div>
//
//                 {/* Placeholder for Right Side Content */}
//                 <div className="bg-pri p-6  mt-[7%] overflow-x-hidden">
//                     {/*<div className="mt-5  h-[80vh] flex justify-center">*/}
//                     <Outlet/>
//                     {/*</div>*/}
//                 </div>
//             </div>
//
//         </div>
//
//     );
// };
//
// export default Dashboard;
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import axios from "axios";

const Dashboard = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState('');
    const [showSaleDropdown, setShowSaleDropdown] = useState(false);
    const [showPurchaseDropdown, setShowPurchaseDropdown] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getName = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/user/`, {
                    withCredentials: true,
                });
                setUsername(response.data.name);
                setEmail(response.data.email);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        getName();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/logout/`, {}, {
                withCredentials: true,
            });
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="flex h-screen w-full bg-[#F4F4F8]">
            {/* Sidebar */}
            <aside className="w-[250px] bg-[#FFFFFF] text-white fixed h-full shadow-lg">
                <div className="flex items-center justify-center py-6 bg-[#181818] w-full ">
                    {/* Logo or Profile Image */}
                    <div className="rounded-full bg-gray-300 h-12 w-12"></div>
                    <span className="ml-4 text-xl font-bold">Your Company</span>
                </div>

                {/* Navigation Links */}
                <nav className="mt-8 space-y-6 p-4">
                    <Link to="/dashboard"
                          className="flex items-center text-[#3A0A3E] font-bold hover:text-[#E6859E]">
                        <span className="ml-2">Home</span>
                    </Link>

                    <div className="relative">
                        <button
                            className="flex items-center text-[#3A0A3E] font-bold hover:text-[#E6859E] w-full"
                            onClick={() => setShowPurchaseDropdown(!showPurchaseDropdown)}
                        >
                            <span className="ml-2">Parties</span>
                            <span className="ml-auto">{showPurchaseDropdown ? '▴' : '▾'}</span>
                        </button>
                        {showPurchaseDropdown && (
                            <div className="pl-6 mt-2 space-y-2">
                                <Link to="/dashboard/addParty" className="block text-[#3A0A3E] font-bold hover:text-[#E6859E]">Add
                                    Party</Link>
                                <Link to="/dashboard/viewParties"
                                      className="block text-[#3A0A3E] font-bold hover:text-[#E6859E]">View Parties</Link>
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <button
                            className="flex items-center text-[#3A0A3E] font-bold hover:text-[#E6859E] w-full"
                            onClick={() => setShowPurchaseDropdown(!showPurchaseDropdown)}
                        >
                            <span className="ml-2">Items</span>
                            <span className="ml-auto">{showPurchaseDropdown ? '▴' : '▾'}</span>
                        </button>
                        {showPurchaseDropdown && (
                            <div className="pl-6 mt-2 space-y-2">
                                <Link to="/dashboard/addItems" className="block text-[#3A0A3E] font-bold hover:text-[#E6859E]">Add
                                    Items</Link>
                                <Link to="/dashboard/viewItems"
                                      className="block text-[#3A0A3E] font-bold hover:text-[#E6859E]">View Items</Link>
                            </div>
                        )}
                    </div>

                    {/* Sale Dropdown */}
                    <div className="relative">
                        <button
                            className="flex items-center text-[#3A0A3E] font-bold hover:text-[#E6859E] w-full"
                            onClick={() => setShowSaleDropdown(!showSaleDropdown)}
                        >
                            <span className="ml-2">Sale</span>
                            <span className="ml-auto">{showSaleDropdown ? '▴' : '▾'}</span>
                        </button>
                        {showSaleDropdown && (
                            <div className="pl-6 mt-2 space-y-2">
                                <Link to="/dashboard/addOrderList"
                                      className="block text-[#3A0A3E] font-bold hover:text-[#E6859E]">New Order</Link>
                                <Link to="/dashboard/orderHistory"
                                      className="block text-[#3A0A3E] font-bold hover:text-[#E6859E]">Sale History</Link>
                            </div>
                        )}
                    </div>

                    {/* Stock Dropdown */}
                    <div className="relative">
                        <button
                            className="flex items-center text-[#3A0A3E] font-bold hover:text-[#E6859E] w-full"
                            onClick={() => setShowPurchaseDropdown(!showPurchaseDropdown)}
                        >
                            <span className="ml-2">Stock</span>
                            <span className="ml-auto">{showPurchaseDropdown ? '▴' : '▾'}</span>
                        </button>
                        {showPurchaseDropdown && (
                            <div className="pl-6 mt-2 space-y-2">
                                <Link to="/dashboard/addStock" className="block text-[#3A0A3E] font-bold hover:text-[#E6859E]">Add
                                    Stock</Link>
                                <Link to="/dashboard/viewStock"
                                      className="block text-[#3A0A3E] font-bold hover:text-[#E6859E]">View Stock</Link>
                            </div>
                        )}
                    </div>

                    {/* Purchase Dropdown */}
                    <div className="relative">
                        <button
                            className="flex items-center text-[#3A0A3E] font-bold hover:text-[#E6859E] w-full"
                            onClick={() => setShowPurchaseDropdown(!showPurchaseDropdown)}
                        >
                            <span className="ml-2">Purchase</span>
                            <span className="ml-auto">{showPurchaseDropdown ? '▴' : '▾'}</span>
                        </button>
                        {showPurchaseDropdown && (
                            <div className="pl-6 mt-2 space-y-2">
                                <Link to="/dashboard/purchaseitemsList"
                                      className="block text-[#3A0A3E] font-bold hover:text-[#E6859E]">New Purchase</Link>
                                <Link to="/dashboard/purchaseHistory"
                                      className="block text-[#3A0A3E] font-bold hover:text-[#E6859E]">Purchase
                                    History</Link>
                            </div>
                        )}
                    </div>
                    <div className="p-2 text-center bg-gray-900 my-5">
                    <a href="#" className="text-white no-underline text-lg font-bold block  p-2 bg-[#181818] rounded-md hover:bg-[#E6859E] transition-colors duration-300" onClick={handleLogout}>Log Out</a>
                </div>
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-grow bg-[#F8F8FC] ml-[250px] p-6">
                {/* Content Header */}
                <div className="bg-[#FFFFFF] h-[10vh] flex items-center pl-4 border-b border-gray-300 shadow-md">
                    <h1 className="text-2xl font-bold text-[#3A0A3E]">Welcome to <span
                        className="text-[#E6859E]">TeeStockPro</span></h1>
                </div>

                {/* Placeholder for Right Side Content */}
                <div className="mt-6 bg-[#FFFFFF] p-6 h-[85%] rounded-lg shadow-md">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

