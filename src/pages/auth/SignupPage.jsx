import React, { useEffect, useRef, useState } from 'react'
import { MainActionButton } from '../../components'
import { GoogleIcon } from '../../assets'
import EyeSlashIcon from '../../assets/EyeSlashIcon'
import EyeIcon from '../../assets/EyeIcon'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap/gsap-core'
import { horizontalLoop } from '../../utils/GSAPUtils'
import { registerAccount } from '../../utils/api'
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {

    const navigate = useNavigate()
    // state

    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordRedo, setShowPasswordRedo] = useState(false)
    const [passwordRedoValue, setPasswordRedoValue] = useState('')
    const [formValue, setFormValue] = useState({
        username: '',
        password: '',
        phone: '',
        email: '',
    })

    const [errorMsg, setErrorMsg] = useState('')

    // ref
    const textLoopRef = useRef()
    const containerRef = useRef()
    const passwordInputRef = useRef()
    const passwordRedoInputRef = useRef()

    //

    useGSAP(() => {
        gsap.from(containerRef.current, {
            opacity: 0,
            duration: 0.7,
            ease: 'power2.inOut',
        })
    })
    useGSAP(
        () => {
            const loop1 = horizontalLoop('.textUpper', {
                paused: false,
                repeat: -1,
                speed: 0.5,
                paddingRight: 20,
            })
            const loop2 = horizontalLoop('.textLower', {
                paused: false,
                repeat: -1,
                speed: 0.5,
                paddingRight: 20,
                reversed: true,
            })
        },
        { scope: textLoopRef }
    )

    // func

    const handleToggleShowPassword = () => {
        setShowPassword((prev) => !prev)
        if (!showPassword) {
            passwordInputRef.current.type = 'text'
        } else {
            passwordInputRef.current.type = 'password'
        }
    }

    const handleToggleShowPasswordRedo = () => {
        setShowPasswordRedo((prev) => !prev)
        if (!showPasswordRedo) {
            passwordRedoInputRef.current.type = 'text'
        } else {
            passwordRedoInputRef.current.type = 'password'
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        if (formValue.password !== passwordRedoValue) {
            setErrorMsg('Passwords do not match!!')
            return
        }
        setErrorMsg('')

        console.log('Form submitted:', formValue)

        const result = await registerAccount(formValue)
        console.log(result)
        setFormValue({
            username: '',
            email: '',
            password: '',
            phone: '',
        })

        setPasswordRedoValue('')
        navigate('/login', {replace: true})
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormValue({ ...formValue, [name]: value })
    }

    return (
        <section className="w-full flex-center h-svh min-h-svh ">
            <div
                ref={textLoopRef}
                className="absolute inset-0 z-0 flex flex-col text-secondary-theme"
            >
                <div className="flex h-fit w-fit select-none gap-20 text-nowrap text-[50svh] uppercase ">
                    <span className="textUpper leading-none [word-spacing:-100px]">
                        sign up
                    </span>
                    <span className="textUpper leading-none [word-spacing:-100px]">
                        sign up
                    </span>
                </div>
                <div className="flex h-fit  w-fit select-none gap-20 text-nowrap text-[50svh] uppercase ">
                    <span className="textLower leading-none [word-spacing:-100px]">
                        sign up
                    </span>
                    <span className="textLower leading-none [word-spacing:-100px] ">
                        sign up
                    </span>
                </div>
            </div>

            <div
                ref={containerRef}
                className="flex-center relative flex min-h-fit w-1/2 min-w-[500px] flex-col  gap-2 rounded-sm border border-secondary-theme/70  bg-secondary-bg-color  p-5 shadow-lg"
            >
                <h1 className="text-4xl font-medium">Sign Up</h1>

                <form
                    onSubmit={handleFormSubmit}
                    className="flex flex-col w-2/3 gap-2"
                >
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={handleInputChange}
                        type="email"
                        id="email"
                        name="email"
                        value={formValue.email}
                        placeholder="Email"
                        className="block w-full p-3 text-sm text-gray-900 border rounded-full border-secondary-theme bg-primary-bg-color ps-4 focus:ring-secondary-theme"
                        required
                    />
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
                        placeholder="Phone number"
                        className="block w-full p-3 text-sm text-gray-900 border rounded-full border-secondary-theme bg-primary-bg-color ps-4 focus:ring-secondary-theme"
                        required
                    />
                    {/* UserName */}
                    <label htmlFor="username">User name</label>
                    <input
                        onChange={handleInputChange}
                        type="text"
                        id="username"
                        name="username"
                        value={formValue.username}
                        placeholder="User name"
                        required
                        className="block w-full p-3 text-sm text-gray-900 border rounded-full border-secondary-theme bg-primary-bg-color ps-4 focus:ring-secondary-theme"
                    />
                    {/* password */}
                    <label htmlFor="password">Password</label>
                    <div className="relative w-full">
                        <input
                            ref={passwordInputRef}
                            onChange={handleInputChange}
                            name="password"
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={formValue.password}
                            required
                            className="block w-full p-3 text-sm text-gray-900 border rounded-full border-secondary-theme bg-primary-bg-color ps-4 focus:ring-secondary-theme"
                        />
                        <button
                            type="button"
                            onClick={handleToggleShowPassword}
                            className="absolute top-0 bottom-0 right-0 m-2 transition-all text-secondary-theme"
                        >
                            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                        </button>
                    </div>
                    <div className="relative w-full">
                        <input
                            ref={passwordRedoInputRef}
                            onChange={(e) =>
                                setPasswordRedoValue(e.target.value)
                            }
                            name="passwordRedo"
                            type="password"
                            placeholder="Confirm password"
                            value={passwordRedoValue}
                            required
                            className="block w-full p-3 text-sm text-gray-900 border rounded-full border-secondary-theme bg-primary-bg-color ps-4 focus:ring-secondary-theme"
                        />
                        <button
                            type="button"
                            onClick={handleToggleShowPasswordRedo}
                            className="absolute top-0 bottom-0 right-0 m-2 transition-all text-secondary-theme"
                        >
                            {showPasswordRedo ? <EyeSlashIcon /> : <EyeIcon />}
                        </button>
                    </div>
                    {/*  */}

                    {/* error msg */}
                    <div className="font-medium text-red-600">
                        {errorMsg && errorMsg.trim() !== '' && errorMsg}
                    </div>

                    <MainActionButton
                        type="submit"
                        className="self-center w-52 min-w-max"
                    >
                        Sign up
                    </MainActionButton>
                    <span className="w-full divider text-secondary-theme/70">
                        or
                    </span>
                </form>

                <button
                    type="button"
                    className="flex items-center justify-center gap-4 px-4 py-2 font-semibold transition-colors rounded-full shadow-md bg-neutral-50 text-secondary-theme hover:bg-primary-bg-color focus:bg-neutral-200"
                >
                    Sign Up with Google
                    <span className="text-xl">
                        <GoogleIcon />
                    </span>
                </button>
            </div>
        </section>
    )
}

export default SignupPage
