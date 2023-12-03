import { LoadingContext } from "../../context/LoaderContext"
import { AuthContext} from "../../context/AuthContext"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase"
import styles from './friendButton.module.css'
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import {useQuery, useQueryClient} from 'react-query'
import { getUserData } from "../../helpers/getFunctions"

export const FriendButton = ({userId, style}) => {
    const loader = useContext(LoadingContext)
    const navigate = useNavigate()
    const currentUser = useContext(AuthContext).user
    const queryClient = useQueryClient()

    const getCurrentUserData = async() => {
        console.log(await getUserData(currentUser.uid))
        return await getUserData(currentUser.uid)
    }

    const {data:currentUserData} = useQuery({queryKey:['userData', currentUser.uid], queryFn:getCurrentUserData})

    const isFriend = currentUserData?.friends.includes(userId)


    const addFriend = () => {
        loader.setLoading(true)

        const userRef = doc(db, "users", currentUser.uid)
        updateDoc(userRef, {
            friends: [...currentUserData.friends, userId]
        }).then(() => {
            queryClient.invalidateQueries({queryKey:['userData', currentUser.uid]})
            console.log('Added to friends')
            loader.setLoading(false)
        })
    }

    const removeFriend = () => {
        loader.setLoading(true)

        const userRef = doc(db, "users", currentUser.uid)
        const friendsList = currentUserData.friends
        const deletingFriend = friendsList.indexOf(friendsList.find(friend => {return friend.id === userId}))

        updateDoc(userRef, {
            friends: [...friendsList.slice(0, deletingFriend), ...friendsList.slice(deletingFriend + 1, friendsList.length)]
        }).then(() => {
            queryClient.invalidateQueries({queryKey:['userData', currentUser.uid]})
            console.log('removed from friends')
            loader.setLoading(false)
        })

        
    }

    return (
        currentUserData?.friends ? 
            <button style={style} onClick={isFriend ? removeFriend : addFriend} className={styles.addFriend}>
                {isFriend ? 'Delete from friends' : 'Add to friends'}
            </button>
            :
            <button style={style} onClick={() => {navigate('/auth')}} className={styles.addFriend}>
                Add to friends
            </button>
    )
}