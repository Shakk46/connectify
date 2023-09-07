import { useState, useEffect, useContext } from 'react'
import { Loading } from '../../context/LoaderContext';
import { useNavigate, Link } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '/src/firebase';
import styles from './post.module.css'
import { CommentSection } from '../CommentSection/CommentSection';
export function Post({props, currentUser}) {
    const note = props
    const [userData, setUserData] = useState({photoURL:'', name:'Loading...'})

    const loader = Loading()

    const [commentOpened, setCommentStatus] = useState(false)
    
    const navigate = useNavigate()

    const [likes, setLikes] = useState(note.likes)
    const isLiked = () => {
        if(currentUser) {
            return likes.includes(currentUser.uid)
        }else {
            return false
        }
        
    }

    //get userData
    useEffect(() => {
        const getUserData = async() => {
            const userRef = doc(db, 'users', note.userId)
            const data = (await getDoc(userRef)).data()

            setUserData(data)
        }
        getUserData()
    }, [])


    const handleLiked = async () => {
        if(currentUser) {
            loader.setLoading(true)
            const noteRef = doc(db, "notes", note.id);
            
            
            if(!isLiked()) {
                setLikes([...likes, currentUser.uid])
                await updateDoc(noteRef, {
                    likes:[...likes, currentUser.uid]
                });
            }else {
                const userId = likes.indexOf(currentUser.uid)
                setLikes([...likes.slice(0, userId), ...likes.slice(userId + 1, likes.length)])

                await updateDoc(noteRef, {
                    likes:[...likes.slice(0, userId), ...likes.slice(userId + 1, likes.length)]
                });
            }
        }else {
            navigate('/auth')
        }
        
        loader.setLoading(false)
    }

    return(
        <div className={`${styles.container}`}>
            <Link to={`/profile?id=${note.userId}`} state={note.userId} className={styles.profile}>
                <img src={userData.photoURL} />
                <p>{userData.name}</p>
            </Link>

            <div className={styles.content}>
                {note.content}
            </div>

            <div className={styles.actions}>
                <div className={styles.like}>
                    <button onClick={handleLiked}><span className="material-icons">{isLiked() ? 'thumb_up_alt' :  'thumb_up_off_alt'}</span></button>
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