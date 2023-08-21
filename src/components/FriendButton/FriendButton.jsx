import { getCurrentUserData } from "../../helpers/getFunctions"
import { useState, useEffect, useContext } from "react"
import { LoadingContext } from "../../context/LoaderContext"
import { UserAuth } from "../../context/AuthContext"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase"
import styles from './friendButton.module.css'
export const FriendButton = ({user, style}) => {
    const loader = useContext(LoadingContext)
    const [currentUserData, setCurrentUserData] = useState({})
    const currentUser = UserAuth().user
    console.log('current User data', currentUserData);

    const isFriend = () => {
        return currentUserData.friends.find(friend => friend.id === user.id)
    }

    const updateCurrentUserData = async() => {
        const result = await getCurrentUserData(currentUser)
        setCurrentUserData(result)
    }   

    useEffect(() => {
        updateCurrentUserData()
    }, [currentUser])

    const addFriend = () => {
        loader.setLoading(true)

        const userRef = doc(db, "users", currentUser.uid)
        updateDoc(userRef, {
            friends: [...currentUserData.friends, {
                photoURL: user.photoURL,
                name: user.name,
                id: user.id
            }]
        }).then(() => {
            updateCurrentUserData()
            console.log('Added to friends')
            loader.setLoading(false)
        })
    }

    const removeFriend = () => {
        loader.setLoading(true)

        const userRef = doc(db, "users", currentUser.uid)
        const friendsList = currentUserData.friends
        const delFriend = friendsList.map((friend) => {
            if(friend.id == user.id) {
                return friendsList.indexOf(friend)
            }
        })
        updateDoc(userRef, {
            friends: [...friendsList.slice(0, delFriend), ...friendsList.slice(delFriend + 1, friendsList.length)]
        }).then(() => {
            updateCurrentUserData()
            console.log('removed from friends')
            loader.setLoading(false)
        })

        
    }

    return (
        currentUserData && currentUserData.friends  ? 
            <button style={style} onClick={isFriend() ? removeFriend : addFriend} className={styles.addFriend}>
                {isFriend() ? 'Delete from friends' : 'Add to friends'}
            </button>
            :
            <button onClick={() => {alert('user is not defiend yet')}} className={styles.addFriend}>
                {'Add to friends'}
            </button>
    )
}