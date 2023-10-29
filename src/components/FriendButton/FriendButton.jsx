import { getUserData } from "../../helpers/getFunctions"
import { useState, useEffect } from "react"
import { LoadingContext } from "../../context/LoaderContext"
import { UserAuth } from "../../context/AuthContext"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase"
import styles from './friendButton.module.css'
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
export const FriendButton = ({user, style}) => {
    const loader = useContext(LoadingContext)
    const [currentUserData, setCurrentUserData] = useState({})
    const currentUser = UserAuth().user

    const navigate = useNavigate()

    const isFriend = () => {
        return currentUserData.friends.find(friend => friend.id === user.id)
    }

    const updateCurrentUserData = async() => {
        const result = await getUserData(currentUser.uid)
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
        const deletingFriend = friendsList.indexOf(friendsList.find(friend => {return friend.id === user.id}))
        updateDoc(userRef, {
            friends: [...friendsList.slice(0, deletingFriend), ...friendsList.slice(deletingFriend + 1, friendsList.length)]
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
            <button style={style} onClick={() => {navigate('/auth')}} className={styles.addFriend}>
                Add to friends
            </button>
    )
}