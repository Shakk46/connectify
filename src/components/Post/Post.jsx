import { useReducer, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from '/src/firebase';
import styles from './post.module.css'
import { useEffect } from 'react';
import { UserAuth } from '../../context/AuthContext';
export function Post({props}) {
    const note = props
    const user = note.userData
    
    const navigate = useNavigate()


    const currentUser = UserAuth().user
    const [liked, setLiked] = useState(false)
    const [commentOpened, setComment] = useState(false)

    

    useEffect(() => {
        const checkLiked = () => {
            if(currentUser) {
                return note.likes.find(id => {
                    return id === currentUser.uid
                }) === currentUser.uid
            }else {
                return false
            }
            
        }

        console.log(checkLiked());

        
        if(checkLiked()) {
            setLiked(true)
        }
        
        
    }, [])

    const handleLiked = async () => {
        if(currentUser) {
            const noteRef = doc(db, "notes", note.id);
            if(!liked) {
                await updateDoc(noteRef, {
                    likes:[...note.likes, currentUser.uid]
                });
            }else {
                const userId = note.likes.indexOf(currentUser.uid)
                await updateDoc(noteRef, {
                    likes:[...note.likes.slice(0, userId - 1), ...note.likes.slice(userId, note.likes.length)]
                });
            }

            setLiked(!liked)
        }else {
            navigate('/auth')
        }
        
    }

    return(
        <div className={`${styles.container} `}>
            <div className={styles.profile}>
                <img src={user.photoURL} />
                <p>{user.name}</p>
            </div>
            <div className={styles.content}>
                {note.content}
            </div>
            <div className={styles.actions}>
                <div className={styles.like}>
                    <button onClick={handleLiked}><span className="material-icons">{liked ?'thumb_up_alt' :  'thumb_up_off_alt'}</span></button>
                    <p>{note.likesNumber}</p>
                </div>
                <div className={styles.comment}>
                    <button onClick={() => setComment(!commentOpened)}><span className="material-icons">{commentOpened ?'chat' :  'chat_bubble_outline'}</span></button>
                    <p>{note.commentsNumber}</p>
                </div>
            </div>
        </div>
    )
}