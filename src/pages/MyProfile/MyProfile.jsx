import { Header } from "../../components/Header/Header";
import { UserAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom";
import styles from './myprofile.module.css'

export const MyProfile = () => {
    const userAuth = UserAuth()
    const user = userAuth.user

    const navigate = useNavigate()
    
    const handleLogOut = () => {
        userAuth.logOut()

        navigate('/auth')
    }

    return(
        <>
            <div className={styles.container}>
                <div className={styles.card}>
                    <img src={user.photoURL} alt="" className={styles.image} />
                    <hr className={styles.hr} />
                    <h2 className={styles.name}>{user.displayName}</h2>

                    <button onClick={handleLogOut} className={styles.signOut}>Sign Out</button>
                </div>
            </div>
        </>
        
    )
}