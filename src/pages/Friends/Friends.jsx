import { doc, getDoc } from 'firebase/firestore'
import { useState, useContext, useEffect } from 'react'
import { FriendButton } from '../../components/FriendButton/FriendButton'
import { UserAuth } from '../../context/AuthContext'
import { LoadingContext } from '../../context/LoaderContext'
import { db } from '../../firebase'
import styles from './friends.module.css'

export const Friends = () => {
    const loader = useContext(LoadingContext)
    const currentUser = UserAuth().user
    const [friends, setFriends] = useState([])

    const getFriends = async () => {
        loader.setLoading(true)
        const userRef = doc(db, 'users', currentUser.uid)
        const userFriends = (await getDoc(userRef)).data()
        setFriends(userFriends.friends)
        loader.setLoading(false)
    }
    
    useEffect(() => {
        getFriends()
    }, [currentUser])
    return (
        <div className={styles.container}>
            <h3 className={styles.heading}>Friends</h3>
            {friends.map((friend) => {
                return (
                    <div className={styles.friend}>
                        <img src={friend.photoURL} alt="" className={styles.photo}/>
                    
                        <div className={styles.right}>
                            <h3 className={styles.name}>{friend.name}</h3>
                            <FriendButton user={friend}/>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}