import React, { useEffect, useRef, useState } from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../../config/firebase'
import { setUser } from '../../state/users/userSlice'
import { GoogleIcon } from '../../assets'
import EyeIcon from '../../assets/EyeIcon'
import EyeSlashIcon from '../../assets/EyeSlashIcon'
import { MainActionButton, MainActionLink } from '../../components'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap/gsap-core'
import { horizontalLoop } from '../../utils/GSAPUtils'

const LoginPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    // state

    const [showPassword, setShowPassword] = useState(false)

    // ref
    const textLoopRef = useRef()
    const containerRef = useRef()
    const passwordInputRef = useRef()

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .then((result) => {
                const name = result.user.displayName
                const avatarUrl = result.user.photoURL
                const uid = result.user.uid
                const email = result.user.email

                dispatch(setUser({ name, uid, avatarUrl, email }))

                console.log('usersignin', result)
                console.log('userredux', user)

                navigate('/', { replace: true })
                return
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.error(errorCode, errorMessage)
            })
    }

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
                speed: 0.4,
            })
            const loop2 = horizontalLoop('.textLower', {
                paused: false,
                repeat: -1,
                speed: 1,
                paddingRight: 20,
            })
        },
        { scope: textLoopRef }
    )

    useEffect(() => {
        console.log('userredux', user)
    }, [user])

    // onClick={signInWithGoogle}

    // func

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    const handleToggleShowPassword = () => {
        setShowPassword((prev) => !prev)
        if (!showPassword) {
            passwordInputRef.current.type = 'text'
        } else {
            passwordInputRef.current.type = 'password'
        }
    }

    return (
        <section className="w-full flex-center h-svh min-h-svh">
            <div
                ref={textLoopRef}
                className="absolute inset-0 z-0 flex flex-col text-secondary-theme"
            >
                <div className=" flex h-fit w-fit gap-20 text-nowrap text-[50svh] uppercase ">
                    <span
                        className="textUpper leading-none [word-spacing:-100px]
"
                    >
                        Log in
                    </span>
                    <span className="textUpper leading-none [word-spacing:-100px]">
                        Log in
                    </span>
                </div>
                <div className=" flex  h-fit w-fit gap-20 text-nowrap text-[50svh] uppercase ">
                    <span className="textLower leading-none [word-spacing:-100px]">
                        Log in
                    </span>
                    <span className="textLower leading-none [word-spacing:-100px] ">
                        Log in
                    </span>
                </div>
            </div>
            <div
                ref={containerRef}
                className="relative flex w-2/3 overflow-hidden border rounded-sm shadow-lg h-3/4 min-w-max border-secondary-theme/70 bg-secondary-bg-color"
            >
                <div
                    onSubmit={handleSubmit}
                    className="relative flex-col w-2/3 h-full gap-2 p-5 flex-center"
                >
                    <h1 className="absolute left-5 top-3">efurniture</h1>
                    <h1 className="text-4xl font-medium">
                        Login to Your Account
                    </h1>
                    <button
                        type="button"
                        onClick={signInWithGoogle}
                        className="flex items-center justify-center gap-4 px-4 py-2 font-semibold transition-colors rounded-full shadow-md bg-neutral-50 text-secondary-theme hover:bg-primary-bg-color focus:bg-neutral-200"
                    >
                        Sign In with Google
                        <span className="text-xl">
                            <GoogleIcon />
                        </span>
                    </button>
                    <form
                        onSubmit={handleSubmit}
                        className="flex-col w-2/3 gap-2 flex-center"
                    >
                        <span className="w-full divider text-secondary-theme/70">
                            or
                        </span>
                        <input
                            type="text"
                            placeholder="Email"
                            className="block w-full p-3 text-sm text-gray-900 border rounded-full border-secondary-theme bg-primary-bg-color ps-4 focus:ring-secondary-theme"
                            required
                        />
                        <div className="relative w-full">
                            <input
                                ref={passwordInputRef}
                                type="password"
                                placeholder="Password"
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
                        <MainActionButton
                            type="submit"
                            onClick={handleSubmit}
                            className="w-52 min-w-max"
                        >
                            Sign in
                        </MainActionButton>
                    </form>
                </div>
                <div className="flex-col w-1/3 h-full gap-4 flex-center bg-secondary-theme">
                    <h1 className="text-4xl font-medium text-white">
                        New Here?
                    </h1>
                    <h5 className="text-center text-secondary-bg-color/70 ">
                        Sign up and discover a whole selection of furnitures
                    </h5>
                    <MainActionLink
                        to="/signup"
                        className="w-52 min-w-max border-secondary-bg-color"
                        textColor="text-primary-bg-color"
                        arrowColor="text-secondary-theme bg-primary-bg-color"
                    >
                        Sign up
                    </MainActionLink>
                </div>
            </div>
        </section>
    )
}

export default LoginPage
