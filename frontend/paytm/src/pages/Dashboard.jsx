import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

export const Dashboard = () => {
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get("https://payment-app-c9n0.onrender.com/api/v1/account/balance", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                setBalance(response.data.balance);
                setLoading(false);
            } catch (error) {
                setError("Error fetching balance."); 
                setLoading(false);
            }
        };

        fetchBalance();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <Appbar />
            <div className="m-8">
                <Balance value={balance} />
                <Users />
            </div>
        </div>
    );
};
