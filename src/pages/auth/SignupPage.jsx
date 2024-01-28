import React, { useEffect, useRef, useState } from 'react'
import { MainActionButton } from '../../components'
import { GoogleIcon } from '../../assets'
import EyeSlashIcon from '../../assets/EyeSlashIcon'
import EyeIcon from '../../assets/EyeIcon'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap/gsap-core'
import { horizontalLoop } from '../../utils/GSAPUtils'

const SignupPage = () => {
    // state

    const [showPassword, setShowPassword] = useState(false)

    // ref
    const textLoopRef = useRef()
    const containerRef = useRef()
    const passwordInputRef = useRef()

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

    // func

    const handleToggleShowPassword = () => {
        setShowPassword((prev) => !prev)
        if (!showPassword) {
            passwordInputRef.current.type = 'text'
        } else {
            passwordInputRef.current.type = 'password'
        }
    }
    return (
        <section className="w-full flex-center h-svh min-h-svh ">
            <div
                ref={textLoopRef}
                className="absolute inset-0 z-0 flex flex-col text-secondary-theme"
            >
                <div className=" flex h-fit w-fit gap-20 text-nowrap text-[50svh] uppercase ">
                    <span className="textUpper leading-none [word-spacing:-100px]">
                        sign up
                    </span>
                    <span className="textUpper leading-none [word-spacing:-100px]">
                        sign up
                    </span>
                </div>
                <div className=" flex  h-fit w-fit gap-20 text-nowrap text-[50svh] uppercase ">
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
                className="relative flex flex-col w-1/2 gap-2 p-5 overflow-hidden border rounded-sm shadow-lg flex-center h-3/4 min-w-max border-secondary-theme/70 bg-secondary-bg-color"
            >
                <h1 className="absolute left-5 top-3">efurniture</h1>
                <h1 className="text-4xl font-medium">Sign Up</h1>

                <form className="flex-col w-2/3 gap-2 flex-center">
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
                    <MainActionButton type="submit" className="w-52 min-w-max">
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
