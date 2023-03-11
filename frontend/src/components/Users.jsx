import React from "react";
import axios from "axios";
import { USER_URL } from "../constants";
import { showToast } from "../utils/showToast";


const Users = ({ users, setUpdateUI }) => {

    const blockUser = async (user, username, token) => {
        try {
            const response = await axios.post(USER_URL.blockuser + user, { username: username }, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (response.status === 200) {
                showToast('User Blocked', 'success');
                setUpdateUI(true);
                setTimeout(() => {
                    setUpdateUI(false);
                }, 2000);
            }
        } catch (err) {
            showToast('Cannot block User', 'fail');
        }
    }

    const unblockUser = async (user, username, token) => {
        try {
            const response = await axios.post(USER_URL.unblockuser + user, { username: username }, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (response.status === 200) {
                showToast('User Unblocked', 'success');
                setUpdateUI(true);
                setTimeout(() => {
                    setUpdateUI(false);
                }, 2000);
            }
        } catch (err) {
            showToast('Cannot unblock User', 'fail');
        }
    }

    const handleBlock = async (e, username) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('username');
        if (e.target.innerText === 'Block') {
            await blockUser(user, username, token);
        } else {
            await unblockUser(user, username, token);
        }
    }

    return (
        users.map((user) => {
            return (
                <tbody key={user.userid} className="divide-y divide-gray-100 border-t border-gray-100">
                    <tr className="hover:bg-gray-50">
                        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                            <div className="relative h-10 w-10">
                                <img
                                    className="h-full w-full rounded-full object-cover object-center"
                                    src={user.profilePicUrl}
                                    alt="profile pic"
                                />
                                <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                            </div>
                            <div className="text-sm">
                                <div className="font-medium text-gray-700">{user.name}</div>
                                <div className="text-gray-400">{user.email}</div>
                            </div>
                        </th>
                        <td className="px-6 py-4">
                            {
                                user.blocked ?
                                    <React.Fragment>
                                        <span
                                            className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600"
                                        >
                                            <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                                            Blocked
                                        </span>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <span
                                            className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
                                        >
                                            <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                            Active
                                        </span>
                                    </React.Fragment>
                            }

                        </td>
                        <td className="px-6 py-4">{user.userid}</td>

                        <td className="px-6 py-4">{user.role.toUpperCase()}</td>

                        <td className="px-6 py-4">
                            <div className="flex justify-center gap-2 pr-2 align-middle">
                                <div className='flex flex-col items-center'>

                                    {user.blocked ?
                                        <button className="flex px-3 py-2 bg-green-400 mr-1 text-black rounded" onClick={(e) => handleBlock(e, user.userid)}>

                                            <span className="text-center text-base">Unblock</span>
                                        </button>
                                        :
                                        <button className="flex px-3 py-2 bg-red-400 mr-1 text-black rounded" onClick={(e) => handleBlock(e, user.userid)}>
                                            <span className="text-center text-base">Block</span>
                                        </button>
                                    }

                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody >
            );
        })

    );
}

export default Users;