import React, {useEffect, useState} from 'react'
import axios from "axios";
import ViewStocks from "../components/ViewStocks";
import Product from "../components/Product";
import ViewItems from "../components/ViewItems";

function ViewStockPage() {
    const [email, setEmail] = useState('');
    useEffect(() => {
        const getName = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/user/`, {
                    withCredentials: true,
                });

                setEmail(response.data.email);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        getName();
    }, []);
    return (
        <>
            { email && <ViewStocks Email={email} />}
        </>
    )
}

export default ViewStockPage
