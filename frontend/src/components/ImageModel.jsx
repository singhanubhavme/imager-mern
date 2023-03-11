import { Fragment, useRef, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import Comment from './Comment';
import { CloseIcon, DeleteIcon } from '../icons/icons';
import Like from './Like';
import { IMAGE_URL } from '../constants';
import { showToast } from '../utils/showToast';
import { useNavigate } from 'react-router-dom';

const ImageModel = ({ img, setModel, setCommentAdded }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const cancelButtonRef = useRef(null);
    const [likes, setLikes] = useState(img.likes);

    const handleDelete = async (e, img) => {
        e.preventDefault();
        const username = localStorage.getItem('username');
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(IMAGE_URL.deleteimage, {
                id: img.imgId,
                uploader: username,
            }, {
                headers: { "Authorization": `Bearer ${token}` },
            });
            if (response.status === 200) {
                showToast('Image Deleted Successfully', 'success');
                navigate('/');
            } else {
                showToast('Cannot Delete Image', 'fail');
            }
        } catch (err) {
            console.log(err);
            if (err.response.data.message === "You do not have enough privileges to perform this action") {
                showToast('You cannot delete images uploaded by others', 'fail');
            } else {
                showToast('Cannot Delete Image', 'fail');
            }
        }
    }

    useEffect(() => {
        open ? setModel(true) : setModel(false);
    }, [open, setModel]);

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
                                <div className="mx-auto transform overflow-hidden rounded-lg bg-white">
                                    <img className="h-full w-full object-center" src={img.url} loading="lazy" alt="pic" />

                                    <button type="button" className="bg-gray-100 rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 absolute top-0 right-0 outline-none"
                                        onClick={() => { setOpen(false); setModel(false) }}
                                        ref={cancelButtonRef}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <CloseIcon />
                                    </button>

                                    <div className="p-4">
                                        <div className='flex flex-col items-center'>
                                            <button className="flex px-3 py-2 bg-red-400 mr-1 text-white font-semibold rounded" onClick={(e) => handleDelete(e, img)}>
                                                <DeleteIcon />
                                                <span className="ml-1">Delete</span>
                                            </button>
                                        </div>

                                        <Like
                                            setLikes={setLikes}
                                            likes={likes}
                                            img={img}
                                        />

                                        <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">
                                            {img.title}
                                        </h2>
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

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root >
    )
}

export default ImageModel;
