import { doc, getDoc } from 'firebase/firestore'
import { useState, useContext, useEffect } from 'react'
import { FriendButton } from '../../components/FriendButton/FriendButton'
import { AuthContext} from '../../context/AuthContext'
import { LoadingContext } from '../../context/LoaderContext'
import { db } from '../../firebase'
import { getUserData } from '../../helpers/getFunctions'
import styles from './friends.module.css'
import {useQuery} from 'react-query'

export const Friends = () => {
    const loader = useContext(LoadingContext)
    const currentUser = useContext(AuthContext).user


    const getCurrentUserData = async () => {
        const currentUserData = await getUserData(currentUser.uid)

        return currentUserData
    }

    const {data:currentUserData} = useQuery({queryKey:['userData', currentUser.uid], queryFn:currentUser && getCurrentUserData})
    
    return (
        <div className={styles.container}>
            <h3 className={styles.heading}>Friends</h3>

            {/* List of friends */}
            {
                currentUserData?.friends.map((friendId) => {
                    return <Friend friendId={friendId} key={friendId}/>
                })
            }
            
        </div>
    )
}

const Friend = ({friendId}) => {

    const getFriendData = async() => {
        return await getUserData(friendId)
    }

    const {data:friend} = useQuery({queryKey:['userData', friendId], queryFn: getFriendData})
    
    return (
        <div className={styles.friend}>
            <img src={friend?.photoURL} alt="" className={styles.photo}/>
        
            <div className={styles.right}>
                <h3 className={styles.name}>{friend?.name}</h3>
                <FriendButton userId={friendId}/>
            </div>
        </div>
    )
}