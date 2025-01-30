import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState("");
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const navigate = useNavigate();


    const handleTransfer = async () => {

        const transferAmount = Number(amount);
        if (!id || !amount || amount <= 0) {
            setMessage("Invalid transfer details. Please check the amount and recipient.");
            return;
        }

        try {
            const response = await axios.post("https://payment-app-c9n0.onrender.com/api/v1/account/transfer", {
                to: id,
                amount: transferAmount
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });


            setMessage(response.data.message);
            
            navigate('/dashboard');

        } catch (error) {

            setMessage(error.response?.data?.message || "An error occurred while processing the transaction.");
        }
    };

    return (
        <div className="bg-cyan-400 h-screen flex justify-center">
            <div className="h-full flex flex-col justify-center">
                <div className="border h-min text-card-foreground max-w-md p-4 space-y w-96 bg-white shadow-lg rounded-lg">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="flex justify-center font-[arial] text-3xl font-bold">Send Money</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="rounded-full border w-12 h-12 bg-green-400 flex items-center justify-center">
                                <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                            </div>
                            <h3 className="flex text-2xl font-semibold font-sans">{name}</h3>
                        </div>
                        <div className="flex">
                            <h2 className="font-semibold">Amount</h2>
                            <label className="flex ml-1 font-semibold">(in ₹)</label>
                        </div>
                        <div>
                            <input
                                type="number"
                                onChange={(e) => setAmount(Number(e.target.value))}
                                id="amount"
                                className="border border-input bg-background rounded-lg py-2 px-3 mt-2 w-full h-10"
                                placeholder="Enter amount"
                            />
                        </div>
                        <div>
                            <button onClick={handleTransfer}
                                className="h-10 w-full px-3 py-2 mt-3 rounded-lg bg-cyan-400 text-white text-lg hover:bg-green-400 transition-all">
                                Initiate Transfer
                            </button>
                            <BottomWarning label="Cancel Transaction?" buttonText="Cancel" to="/dashboard" />
                        </div>
                        {message && <div className="text-center text-red-500 mt-4">{message}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};
