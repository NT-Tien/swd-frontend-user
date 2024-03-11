import React, { useEffect, useRef, useState } from 'react'
import { MainActionButton, PageBanner, SimpleLoading } from '../../components'
import clsx from 'clsx'
import { ArrowUpTrayIcon } from '../../assets'
import { MAX_FILE_SIZE } from '../../config/image'
import usePopup from '../../hooks/usePopup'
import { orderCustomDesign, uploadFile } from '../../utils/api'
import { useAuth } from '../../hooks/useAuth'

const CustomOrderPage = () => {
    const [dragActive, setDragActive] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [fileWithPreview, setFileWithPreview] = useState({
        file: null,
        preview: '',
    })
    const [formValue, setFormValue] = useState({
        name: '',
        phone: '',
        address: '',
    })
    const { openPopupFunc } = usePopup()
    const { user, token } = useAuth()

    const fileInputRef = useRef()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormValue({ ...formValue, [name]: value })
    }

    const handleDrag = (e) => {
        console.log(e.type)
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()

        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            if (!fileWithPreview.file && e.dataTransfer.files.length === 1) {
                const files = Array.from(e.dataTransfer.files)

                files.forEach((file) => {
                    if (file.type.split('/')[0] !== 'image') {
                        openPopupFunc(
                            'You cannot send anything other than an image',
                            'Got it, thanks!'
                        )
                        return
                    }
                    if (file.size > MAX_FILE_SIZE) {
                        openPopupFunc(
                            'You cannot send an image that is larger than 5MB',
                            'Got it, thanks!'
                        )
                    } else {
                        const reader = new FileReader()
                        reader.readAsDataURL(file)
                        reader.onloadend = () => {
                            if (typeof reader.result === 'string') {
                                setFileWithPreview({
                                    file: file,
                                    preview: reader.result,
                                })
                            }
                        }
                    }
                })
            } else {
                openPopupFunc(
                    'You cannot send more than 1 image',
                    'Got it, thanks!'
                )
            }
        } else {
            setFileWithPreview([])
        }
    }

    const handleFileInput = (event) => {
        if (event.target.files && event.target.files[0]) {
            const files = Array.from(event.target.files)
            files.forEach((file) => {
                if (file.type.split('/')[0] !== 'image') {
                    openPopupFunc(
                        'You cannot send anything other than an image',
                        'Got it, thanks!'
                    )
                    return
                }
                const reader = new FileReader()
                reader.onloadend = () => {
                    if (typeof reader.result === 'string') {
                        setFileWithPreview({
                            file: file,
                            preview: reader.result,
                        })
                    }
                }
                reader.readAsDataURL(file)
            })
        }
        event.target.value = ''
    }

    const removeFile = () => {
        setFileWithPreview({
            file: null,
            preview: '',
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isLoading) {
            return
        }

        setIsLoading(true)

        if (!fileWithPreview.file) {
            setErrorMsg('Please upload an image first!')
            setIsLoading(false)
            return
        }

        const file = await uploadFile(fileWithPreview.file)

        if (!file) {
            setErrorMsg('There is an unexpected error uploading your image')
            setIsLoading(false)

            return
        }

        const userid = user.accountId
        const result = await orderCustomDesign(
            userid,
            formValue.name,
            formValue.phone,
            formValue.address,
            file.path,
            token
        )

        if (result.statusCode === 201) {
            setErrorMsg('')
            setFormValue({
                name: '',
                phone: '',
                address: '',
            })
            setFileWithPreview({
                file: null,
                previe: '',
            })
            fileInputRef.current.value = ''
            openPopupFunc('Your order has been received', 'Got it, thanks')
        } else {
            setErrorMsg('There is an unexpected error submiting your order')
        }
        setIsLoading(false)
    }

    return (
        <section className="flex flex-col px-[5svw] min-h-svh text-secondary-theme">
            <PageBanner title="Custom order" />
            <div className="flex w-full h-full gap-10">
                <div className='flex flex-col w-full h-full gap-10 lg:flex-row'>

                <div className="h-full lg:w-1/3  w-full lg:max-w-[33%]">
                    <h5 className="mb-2 font-medium">
                        Upload your furniture design here
                    </h5>
                    <div
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        className={clsx(
                            'relative h-80 w-full p-2 transition-colors',
                            dragActive
                                ? 'bg-[#d7c9c3]'
                                : 'bg-secondary-bg-color'
                        )}
                    >
                        <div className="w-full h-full border-2 border-dashed border-secondary-theme text-secondary-theme">
                            {!fileWithPreview.file ? (
                                <div className="flex-col w-full h-full px-4 flex-center">
                                    <ArrowUpTrayIcon style="mb-2 w-8 h-8" />
                                    <p className="text-sm">
                                        Drag your image of your furniture design
                                        here.
                                    </p>
                                    <p className="text-sm">
                                        Or click on this area to select an
                                        image.
                                    </p>
                                </div>
                            ) : (
                                <div className="relative w-full h-full overflow-hidden ">
                                    <img
                                        src={fileWithPreview.preview}
                                        className="object-cover w-full h-full object- center"
                                    />
                                    <button
                                        onClick={removeFile}
                                        type="button"
                                        className="absolute z-10 w-6 h-6 text-sm text-white border border-black rounded-full right-1 top-1 aspect-square bg-secondary-theme hover:bg-neutral-800"
                                    >
                                        &#x2715;
                                    </button>
                                </div>
                            )}
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileInput}
                            name="file"
                            className="absolute inset-0 z-0 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
                        />
                    </div>
                </div>

                <div className="flex flex-col w-full h-full gap-2 lg:w-1/3">
                    <h5 className="underline uppercase texl-xl">
                        Enter your contact information
                    </h5>
                    <form onSubmit={handleSubmit} className="gap-1">
                        {/* phone */}
                        <label htmlFor="phone">Phone number</label>
                        <input
                            onChange={handleInputChange}
                            type="tel"
                            size="20"
                            minLength="9"
                            maxLength="12"
                            id="phone"
                            name="phone"
                            value={formValue.phone}
                            placeholder="Phone number..."
                            className="block p-3 text-sm text-gray-900 border rounded-full min-w-96 border-secondary-theme bg-primary-bg-color ps-4 focus:ring-secondary-theme"
                            required
                        />
                        {/* Name */}
                        <label htmlFor="name">Your name</label>
                        <input
                            onChange={handleInputChange}
                            type="text"
                            id="name"
                            name="name"
                            value={formValue.name}
                            placeholder="Name..."
                            required
                            className="block p-3 text-sm text-gray-900 border rounded-full min-w-96 border-secondary-theme bg-primary-bg-color ps-4 focus:ring-secondary-theme"
                        />

                        <label htmlFor="address">Address</label>
                        <input
                            onChange={handleInputChange}
                            type="text"
                            id="address"
                            name="address"
                            value={formValue.address}
                            placeholder="Address..."
                            className="block p-3 text-sm text-gray-900 border rounded-full min-w-96 border-secondary-theme bg-primary-bg-color ps-4 focus:ring-secondary-theme"
                            required
                        />

                        {isLoading && <SimpleLoading />}

                        <MainActionButton
                            type="submit"
                            className="mt-4 max-w-96"
                        >
                            Order a design
                        </MainActionButton>
                        <div className="font-medium text-red-600">
                            {errorMsg}
                        </div>
                    </form>
                </div>
                </div>
                <div className="w-1/3 h-full p-2 px-4 border shadow-lg border-secondary-theme">
                    <h2 className="mb-4 text-3xl font-light">
                        Upload your design, enter your contact information.
                    </h2>
                    <p className="font-medium">
                        We will contact you shortly after we have received your
                        order.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default CustomOrderPage
