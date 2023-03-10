import axios from 'axios';
import { LikeIcon } from '../icons/icons';
import { IMAGE_URL } from '../constants';
import { showToast } from '../utils/showToast';

const Like = ({ setLikes, likes, img }) => {
    const handleLike = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const username = localStorage.getItem("username");
        try {
            const response = await axios.post(IMAGE_URL.likeimage, {
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