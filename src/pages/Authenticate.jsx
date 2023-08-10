import { useContext } from 'react'
import GoogleButton from 'react-google-button'
import { UserAuth} from '../context/AuthContext'
import { auth } from '../firebase'
import {Header} from '/src/components/Header/Header.jsx'
export const Authenticate = () => {
    const userAuth = UserAuth()

    const googleButton = <GoogleButton onClick={() => {
        userAuth.googleSignIn()
    }}/>

    const profile = <div></div>
    return (
        <>
            <div>
                {googleButton}
            </div>
        </>
    )
}