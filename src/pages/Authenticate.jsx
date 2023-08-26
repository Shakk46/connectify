import GoogleButton from 'react-google-button'
import { UserAuth} from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
export const Authenticate = () => {
    const userAuth = UserAuth()
    const navigate = useNavigate()

    const googleButton = <GoogleButton onClick={async() => {
        const user = await userAuth.googleSignIn()

        console.log(user);

        if(user) navigate('/MyProfile')
    }}/>

    return (
        <>
            <div>
                {googleButton}
            </div>
        </>
    )
}