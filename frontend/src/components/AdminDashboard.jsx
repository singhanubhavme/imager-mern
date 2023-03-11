import React, { useState, useEffect } from "react";
import Users from "./Users";
import axios from "axios";
import { USER_URL } from "../constants";

const AdminDashboard = ({ isLoggedIn, setIsLoggedIn }) => {
    const [mods, setMods] = useState([]);
    const [updateUI, setUpdateUI] = useState(false);


    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');
            try {
                const response = await axios.post((USER_URL.getallmoderators + username), {}, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (response.status === 200) {
                    console.log(response.data.data.users);
                    const mod = [];
                    for (let i = 0; i < response.data.data.users.length; i++) {
                        mod.push(response.data.data.users[i]);
                    }
                    setMods(mod);
                }
            } catch (err) {
                console.log(err);
            }
        })();
    }, [updateUI]);


    return (
        isLoggedIn &&
        <React.Fragment>
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
                <h2 className="text-gray-800 font-semibold text-center text-3xl py-2">Moderators</h2>
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Name</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Status</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Username</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Role</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
                        </tr>
                    </thead>
                    <Users users={mods} setUpdateUI={setUpdateUI} />
                </table>
            </div>
        </React.Fragment>
    );
}

export default AdminDashboard;