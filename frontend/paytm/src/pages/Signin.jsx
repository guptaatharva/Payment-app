import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            setError(null);

            if (!username || !password) {
                setError("Please fill in all fields.");
                return;
            }

            console.log("Sending request:", { username, password });

            const response = await axios.post("https://payment-app-c9n0.onrender.com/api/v1/user/signin", {
                username,
                password,
            });

            console.log("Response received:", response.data);

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
            }
        } catch (err) {
            console.error("Error occurred:", err.response?.data || err.message);
            setError(err.response?.data?.message || "Invalid username or password");
        }
    };

    return (
        <div className="bg-cyan-400 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-[40px] bg-white p-5 px-7 w-[450px] text-center">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your credentials to access your account"} />
                    <InputBox
                        placeholder="JohnXDoe"
                        label={"Username"}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <InputBox
                        placeholder="123456"
                        label={"Password"}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <div className="text-red-500 mt-2">{error}</div>}
                    <div className="pt-4 mb-2">
                        <Button label={"Sign in"} onClick={handleSubmit} />
                    </div>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
                </div>
            </div>
        </div>
    );
};
