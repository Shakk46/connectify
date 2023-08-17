import { useState, useEffect } from 'react'
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { LoadingContext } from '../../context/LoaderContext';
import { UserAuth } from '../../context/AuthContext';
import { useLocation } from "react-router-dom";
import { db } from '../../firebase'
import styles from './profile.module.css'
import { useContext } from 'react';

export const Profile = () => {
    const location = useLocation();
    const id = location.state

    const loader = useContext(LoadingContext)
    

    const [user, setUser] = useState({name:'Name of the user will appear here', bio:'Bio of the user will appear here'})
    const [currentUserData, setCurrentUserData] = useState({friends:[]})
    const currentUser = UserAuth().user

    
    const getCurrentUserData = async () => {
        const userRef = doc(db, "users", currentUser.uid)
        const userSnap = await getDoc(userRef)
        const userData = userSnap.data()
        

        setCurrentUserData(userData)
        console.log('data has been fetched');
    }
    

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

    useEffect(() => {
        
        getCurrentUserData()
    }, [])

    // add user's id to list of friends
    const addFriend = () => {
        loader.setLoading(true)

        const userRef = doc(db, "users", currentUser.uid)
        updateDoc(userRef, {
            friends: [...currentUserData.friends, id]
        }).then(() => {
            getCurrentUserData()
            console.log('Added to friends')
            loader.setLoading(false)
        })

        
    }

    //remove from friends
    const removeFriend = () => {
        loader.setLoading(true)

        const userRef = doc(db, "users", currentUser.uid)
        const friendsList = currentUserData.friends
        updateDoc(userRef, {
            friends: [...friendsList.slice(0, friendsList.indexOf(id)), ...friendsList.slice(friendsList.indexOf(id) + 1, friendsList.length)]
        }).then(() => {
            getCurrentUserData()
            console.log('removed from friends')
            loader.setLoading(false)
        })

        
    }
    return (
        <div className={styles.container}>
            <img src={user.photoURL} alt="user profile picture" className={styles.image} />
            <h2 className={styles.name}>{user.name}</h2>

            <hr className={styles.hr}/> 

            <div className={styles.bio}>
                <h3>Bio</h3>
                {user.bio ? <p>{user.bio}</p> : <p>User didn't write anything here yet</p>}
            </div>

            <button onClick={currentUserData.friends.includes(id) ? removeFriend : addFriend} className={styles.addFriend}>
                {currentUserData.friends.includes(id) ? 'Delete from friends' : 'Add to friends'}
            </button>
        </div>
    )
}