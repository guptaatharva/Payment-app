import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SendButton } from "./SendButton";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then((response) => {
                console.log(response.data);
                setUsers(response.data.users || []);
            })
            .catch((error) => {
                console.error("Error fetching users:", error.message);
                setUsers([]);
            });
    }, [filter]);

    return (
        <div className="w-[90%] mt-10">
            <div className="font-bold text-xl mb-4">Users</div>
            <div className="my-4">
                
                <input
                    type="text"
                    placeholder="Search users..."
                    className="w-[110%] px-3 py-2 border rounded border-gray-300"
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>
            <div>
                {Array.isArray(users) && users.length > 0 ? ( 
                    users.map((user) => <User key={user._id} user={user} />)
                ) : (
                    <p className="text-gray-500">No users found.</p>
                )}
            </div>
        </div>
    );
};


function User({ user }) {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between items-center border-b py-4 w-[110%] pl-4">
            
            <div className="flex items-center">
                <div className="rounded-full h-12 w-12 bg-gray-200 flex justify-center items-center mr-4">
                    <span className="text-xl font-bold text-gray-600">
                        {user.firstName?.[0]?.toUpperCase() || "?"}
                    </span>
                </div>
                <div>
                    <p className="font-medium text-lg">
                        {user.firstName} {user.lastName}
                    </p>
                </div>
            </div>
            
            <div>
                <SendButton
                    onClick={() =>
                        navigate(`/send?id=${user._id}&name=${user.firstName}`)
                    }
                    label="Send Money"
                />
            </div>
        </div>
    );
}
