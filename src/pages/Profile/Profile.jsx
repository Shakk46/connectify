import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { LoadingContext } from '../../context/LoaderContext';
import { useLocation } from "react-router-dom";
import { db } from '../../firebase'
import styles from './profile.module.css'
import { useContext } from 'react';
import { FriendButton } from '../../components/FriendButton/FriendButton';

export const Profile = () => {
    const location = useLocation();
    const id = location.state

    const loader = useContext(LoadingContext)
    

    const [user, setUser] = useState({name:'Name of the user will appear here', bio:'Bio of the user will appear here'})

    // get the information from database about user's profile
    useEffect(() => {
        const getUser = async () => {
            loader.setLoading(true)

            const userRef = doc(db, "users", id)
            const userSnap = await getDoc(userRef)
            const userData = userSnap.data()

            setUser(userData)
            loader.setLoading(false)
        }
        getUser()
    }, [])

    return (
        <div className={styles.container}>
            <img src={user.photoURL} alt="user profile picture" className={styles.image} />
            <h2 className={styles.name}>{user.name}</h2>

            <hr className={styles.hr}/> 

            <div className={styles.bio}>
                <h3>Bio</h3>
                {user.bio ? <p>{user.bio}</p> : <p>User didn't write anything here yet</p>}
            </div>

            <FriendButton user={{...user, id:id}}/>
        </div>
    )
}