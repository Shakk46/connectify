import { useState, useEffect } from 'react'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { LoadingContext } from '../../context/LoaderContext';
import { useLocation, useNavigate } from "react-router-dom";
import { db } from '../../firebase'
import styles from './profile.module.css'
import { useContext } from 'react';
import { FriendButton } from '../../components/FriendButton/FriendButton';
import { UserAuth } from '../../context/AuthContext';

export const Profile = () => {
    const location = useLocation();
    const id = location.state
    const userAuth = UserAuth()
    const currentUser = userAuth.user

    const [editing, setEditing] = useState(false)

    const [isMyProfile, setMyProfile] = useState(false)


    const loader = useContext(LoadingContext)
    const navigate = useNavigate()
    

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

    // isMyProfile
    useEffect(() => {
        console.log('effect worked')
        setMyProfile(id === currentUser.uid)
    }, [currentUser])

    const handleLogOut = () => {
        userAuth.logOut()

        navigate('/auth')
    }

    const updateUserInfo = (info) => {
        console.log(info)
        const userRef = doc(db, 'users', currentUser.uid)
        updateDoc(userRef, info).then(() => {
            console.log('changed info')
        })

        setUser({...user, ...info})
    }

    useEffect(() => {

    }, [])


    return (
        editing ? 
        <EditingUser user={user} updateUserInfo={updateUserInfo} setEditing={setEditing}/>
        :
        <div className={styles.container}>
            <img src={user.photoURL} alt="" className={styles.image} />
            <h2 className={styles.name}>{user.name}</h2>

            <hr className={styles.hr}/> 

            <div className={styles.bio}>
                <h3>Bio</h3>
                <p>{user.bio}</p>
            </div>

            {isMyProfile ? 
                <div className={styles.actionButtons}>
                    <button onClick={handleLogOut} className={`${styles.signOut} ${styles.button}`}>Sign Out</button>
                    <button onClick={() => {setEditing(!editing)}} className={`${styles.editButton} ${styles.button}`}>Edit</button>
                </div>
            :
            <FriendButton user={{...user, id:id}}/>}
        </div>
        
    )
}

const EditingUser = ({user, updateUserInfo, setEditing}) => {
    const [newUser, setNewUser] = useState({...user})

    const handleSubmit = (event) => {
        event.preventDefault()

        if(JSON.stringify(newUser) !== JSON.stringify(user)) {
            console.log('worked', newUser, {...user})
            updateUserInfo(newUser)
        }
        setEditing(false)
    }
    return (
    <form className={styles.container}>
            <label htmlFor="photoURL">Photo url</label> 
            <input
            name='photoURL'
            defaultValue={user.photoURL}
            className={`${styles.editing}`}
            onInput={(event) => {setNewUser({...user, photoURL:event.target.value})}}/>

            <label htmlFor="name">Name</label>
            <input 
            name='name'
            className={`${styles.name} 
            ${styles.editing}`}
            defaultValue={user.name} 
            onInput={(event) => {setNewUser({...user, name:event.target.value})}}/>

            <hr className={styles.hr}/> 

            <div className={styles.bio}>
                <h3>Bio</h3>
                <textarea 
                defaultValue={user.bio} 
                className={`${styles.editing}`}
                onInput={(event) => {setNewUser({...user, bio:event.target.value})}}/>
            </div>

            <input
                type='submit' 
                value={'Done'} 
                className={`${styles.submitButton} ${styles.button}`}
                onClick={handleSubmit} />
    </form>
)
}