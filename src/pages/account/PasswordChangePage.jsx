import React, { useRef, useState } from 'react'
import { MainActionButton, PageBanner } from '../../components'
import EyeSlashIcon from '../../assets/EyeSlashIcon'
import EyeIcon from '../../assets/EyeIcon'
import { useAuth } from '../../hooks/useAuth'
import { changePassword } from '../../utils/api'
import {useNavigate} from 'react-router-dom'

const PasswordChangePage = () => {


    const passwordInputRef = useRef()
    const passwordRedoInputRef = useRef()

    const navigate = useNavigate()
    const {logoutHook, token} = useAuth()

    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordRedo, setShowPasswordRedo] = useState(false)
    const [passwordRedoValue, setPasswordRedoValue] = useState('')
    const [formValue, setFormValue] = useState({
        password: '',
        passwordOld: '',
    })

    const [errorMsg, setErrorMsg] = useState('')

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

        const result = await changePassword(formValue, token)
        console.log(result)
        if(result.statusCode === 200){
            setFormValue({
                password: '',
                passwordOld: '',
            })
    
            setPasswordRedoValue('')
            logoutHook()
            navigate('/login')
        } else if(result.statusCode === 400){
            setErrorMsg(result.message)
        }
       
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormValue({ ...formValue, [name]: value })
    }

    return (
        <section className="flex flex-col px-20 min-h-svh text-secondary-theme">
            <PageBanner title="Password change" />

            <form
                onSubmit={handleFormSubmit}
                className="flex-col w-full gap-2 flex-center"
            >
                <label htmlFor="passwordOld">Old Password</label>
                <div className="relative w-1/3">
                    <input
                        onChange={handleInputChange}
                        name="passwordOld"
                        id="passwordOld"
                        type="password"
                        placeholder="Old password..."
                        value={formValue.passwordOld}
                        required
                        className="block w-full p-3 text-sm text-gray-900 border rounded-full border-secondary-theme bg-primary-bg-color ps-4 focus:ring-secondary-theme"
                    />
                    
                </div>
               
                {/* password */}
                <label htmlFor="password">New Password</label>
                <div className="relative w-1/3">
                    <input
                        ref={passwordInputRef}
                        onChange={handleInputChange}
                        name="password"
                        id="password"
                        type="password"
                        placeholder="New password..."
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
                <div className="relative w-1/3">
                    <input
                        ref={passwordRedoInputRef}
                        onChange={(e) => setPasswordRedoValue(e.target.value)}
                        name="passwordRedo"
                        type="password"
                        placeholder="Confirm password..."
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
            </form>
        </section>
    )
}

export default PasswordChangePage
