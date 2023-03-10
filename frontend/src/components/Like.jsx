import axios from 'axios';
import { toast } from 'react-toastify';
import { LikeIcon } from '../icons/icons';
import { PRODUCT_URL } from '../constants';


const Like = ({ setLikes, likes, img }) => {
    const showToast = (text, type) => {
        toast(text, {
            position: "top-right",
            type: type,
        });
    };
    const handleLike = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const username = localStorage.getItem("username");
        try {
            const response = await axios.post(PRODUCT_URL.likeimage, {
                id: img.imgId,
                user: username
            }, {
                headers: { "Authorization": `Bearer ${token}` },
            }
            );
            if (response.status === 200) {
                setLikes(likes + 1);
            }
        } catch (err) {
            showToast("Cannot Like Photo", 'fail');
        }
    }
    return (
        <div className="flex flex-row justify-end" onClick={handleLike} >
            <div
                className="bg-green-500 shadow-lg shadow- shadow-green-600 text-white cursor-pointer px-3 text-center items-center py-1 rounded-xl flex space-x-2 flex-row">
                <LikeIcon />
                <span>{likes}</span>
            </div>
        </div>
    );
}

export default Like;