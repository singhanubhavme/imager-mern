import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import LikeIcon from '../icons/likeIcon';
import Comment from './Comment';
import { PRODUCT_URL } from '../constants';

const ImageModel = ({ img, setModel, setCommentAdded }) => {
    const [open, setOpen] = useState(true);
    const cancelButtonRef = useRef(null);

    const [likes, setLikes] = useState(img.likes);


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
            showToast('Cannot Like Photo', 'fail');
        }
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <ToastContainer />
                                <div className="mx-auto transform overflow-hidden rounded-lg bg-white">
                                    <img className="h-full w-full object-center" src={img.url} alt="pic" />
                                    <div className="p-4">

                                        <div className="flex flex-row justify-end" onClick={handleLike} >
                                            <div
                                                className="bg-green-500 shadow-lg shadow- shadow-green-600 text-white cursor-pointer px-3 text-center items-center py-1 rounded-xl flex space-x-2 flex-row">
                                                <LikeIcon />
                                                <span>{likes}</span>
                                            </div>
                                        </div>

                                        <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">
                                            {img.title}
                                        </h2>
                                        {/* <p className="mb-2 text-base dark:text-gray-300 text-gray-700">
                                            Product description goes here.
                                        </p> */}
                                        {/* <div className="flex items-center">
                                            <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">$20.00</p>
                                            <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">$25.00</p>
                                            <p className="ml-auto text-base font-medium text-green-500">20% off</p>
                                        </div> */}

                                        <p className="relative text-xl whitespace-nowrap truncate overflow-hidden pb-2">Comments</p>
                                        <hr className='pb-2' />
                                        {
                                            img.comments.map((comment) => {
                                                return (
                                                    <div key={comment} className="flex gap-3 space-y-1 pb-3">
                                                        <img src="https://www.pngmart.com/files/21/Admin-Profile-PNG-Clipart.png" className="rounded-full h-8 w-8" alt='profile pic' />
                                                        <span className="text-sm">{comment}</span>
                                                    </div>
                                                );
                                            })
                                        }

                                    </div>
                                </div>

                                <Comment imgId={img.imgId} setCommentAdded={setCommentAdded} />

                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
                                        onClick={() => { setOpen(false); setModel(false) }}
                                        ref={cancelButtonRef}
                                    >
                                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                            Close
                                        </span>
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root >
    )
}

export default ImageModel;
