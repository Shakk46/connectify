import { useReducer, useState, useEffect, useContext } from 'react'
import { LoadingContext } from '../../context/LoaderContext';
import { UserAuth } from '../../context/AuthContext';
import { useNavigate, Link } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from '/src/firebase';
import styles from './post.module.css'
import { CommentSection } from '../CommentSection/CommentSection';
export function Post({props, currentUser}) {
    const note = props
    const user = note.userData

    const loader = useContext(LoadingContext)
    
    const navigate = useNavigate()

    const [likes, setLikes] = useState(note.likes)
    const checkLiked = () => {
        if(currentUser) {
            return likes.includes(currentUser.uid)
        }else {
            return false
        }
        
    }
    let isLiked = checkLiked()

    const [commentOpened, setCommentStatus] = useState(false)

    // currentUser && user.id === currentUser.uid ? '/MyProfile' : `/profile?id=${user.id}`
    // 

    useEffect(() => {
        isLiked = checkLiked()
    }, [likes])

    

    const handleLiked = async () => {
        if(currentUser) {
            loader.setLoading(true)
            const noteRef = doc(db, "notes", note.id);
            
            
            if(!isLiked) {
                await updateDoc(noteRef, {
                    likes:[...likes, currentUser.uid]
                });
                setLikes([...likes, currentUser.uid])
            }else {
                const userId = likes.indexOf(currentUser.uid)
                await updateDoc(noteRef, {
                    likes:[...likes.slice(0, userId), ...likes.slice(userId + 1, likes.length)]
                });
                setLikes([...likes.slice(0, userId), ...likes.slice(userId + 1, likes.length)])
            }

            
            
            loader.setLoading(false)
        }else {
            navigate('/auth')
        }
        
    }
    return(
        <div className={`${styles.container}`}>
            <Link to={`/profile?id=${user.id}`} state={user.id} className={styles.profile}>
                <img src={user.photoURL} />
                <p>{user.name}</p>
            </Link>
            <div className={styles.content}>
                {note.content}
            </div>
            <div className={styles.actions}>
                <div className={styles.like}>
                    <button onClick={handleLiked}><span className="material-icons">{isLiked ? 'thumb_up_alt' :  'thumb_up_off_alt'}</span></button>
                    <p>{likes.length}</p>
                </div>
                <div className={styles.comment}>
                    <button onClick={() => setCommentStatus(!commentOpened)}><span className="material-icons">{commentOpened ?'chat' :  'chat_bubble_outline'}</span></button>
                    <p>{note.comments.length}</p>
                </div>
            </div>
            {commentOpened && <CommentSection id={note.id} currentUser={currentUser}/>}
        </div>
    )
}