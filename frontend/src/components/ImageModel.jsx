import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

const ImageModel = ({ url }) => {
    const [open, setOpen] = useState(true)

    const cancelButtonRef = useRef(null)

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
                                    <img className="h-full w-full object-center" src={url} alt="pic" />
                                    <div className="p-4">
                                        <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">Product Name</h2>
                                        <p className="mb-2 text-base dark:text-gray-300 text-gray-700">Product description goes here.</p>
                                        <div className="flex items-center">
                                            <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">$20.00</p>
                                            <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">$25.00</p>
                                            <p className="ml-auto text-base font-medium text-green-500">20% off</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">

                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Close
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
