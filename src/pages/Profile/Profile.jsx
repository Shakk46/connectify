import { collection, doc, getDoc, query, where } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { db } from '../../firebase'
import styles from './profile.module.css'

export const Profile = () => {
    const location = useLocation();
    const id = location.state
    console.log(id)
    const [user, setUser] = useState({name:'LOL', })

    useEffect(() => {
        const getUser = async () => {
            const docRef = doc(db, "users", id)
            const userSnap = await getDoc(docRef)
            console.log(userSnap.exists(),userSnap.data());
            setUser(userSnap.data())
        }
        getUser()
    }, [])

    return (
        <div className={styles.container}>
            <img src={user.photoURL} alt="Avatarka" className={styles.image} />
            <h2 className={styles.name}>{user.name}</h2>

            <hr className={styles.hr}/>

            <div className={styles.bio}>
                <h3>Bio</h3>
                {user.bio && <p>{user.bio}</p>}
            </div>

            <button className={styles.addFriend}>
                Add to friends
            </button>
        </div>
    )
}