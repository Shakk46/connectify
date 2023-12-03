import { useState, useEffect, useContext } from 'react'
import { LoadingContext } from '../../context/LoaderContext';
import { useNavigate, Link } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from '/src/firebase';
import styles from './note.module.css'
import { CommentSection } from '../CommentSection/CommentSection';
import { SubmitButton } from '../SubmitButton';
import { updateData } from '../../helpers/updateData';
import { adjustHeight } from '../../helpers/adjustHeight';
import { getUserData } from '../../helpers/getFunctions';
import { useQuery } from 'react-query';


export function Note({props, currentUser}) {

    const reducer = (state, action) => {
        switch (action.type) {
            case 'openComment':
                return (
                    {...state, commentOpend:state.commentOpened}
                )
            case 'editing':

                return (
                    {...state, editing:!state.editing}
                )
            case 'changeInputValue':
                return (
                    {...state, inputValue:action.value}
                )
            case 'addLike':
                updateDoc(noteRef, {
                    likes:[...likes, currentUser.uid]
                });
                return (
                    {...state, likes:[...likes, currentUser.uid]}
                )
            case 'removeLike':
                updateDoc(noteRef, {
                    likes:newLikes
                });
                return (
                    {...state, likes:[...likes.slice(0, userId), ...likes.slice(userId + 1, likes.length)]}
                )
        
            default:
                break;
        }
    }

    const noteState = {
        commentOpened:false,
        editing:false,
        inputValue: props.content,
        likes: props.likes
    }


    const [note, setNote] = useState(props)
    
    

    const isMyPost = currentUser && currentUser.uid == note.userId


    const loader = useContext(LoadingContext)
    

    const [commentOpened, setCommentStatus] = useState(false)
    
    const [editing, setEditing] = useState(false)
    const [inputValue, setValue] = useState(note.content)
    
    const navigate = useNavigate()

    const [likes, setLikes] = useState(note.likes)
    const isLiked = currentUser ? likes.includes(currentUser.uid) : false

    




    const handleLiked = async () => {
        if(currentUser) {
            loader.setLoading(true)
            const noteRef = doc(db, "notes", note.id);
            
            if(!isLiked) {
                setLikes([...likes, currentUser.uid])
                await updateDoc(noteRef, {
                    likes:[...likes, currentUser.uid]
                });
            }else {
                const userId = likes.indexOf(currentUser.uid)
                const newLikes = [...likes.slice(0, userId), ...likes.slice(userId + 1, likes.length)]

                dispatch()
            }
        }else {
            navigate('/auth')
        }
        
        loader.setLoading(false)
    }

    const handleEditing = () => {
        setEditing(!editing)
    }
    
    const handleEdited = async () => {
        updateData({content:inputValue}, 'notes', note.id)

        setNote({...note, content:inputValue})

        handleEditing()
    }

    return(
        <div className={`${styles.container}`}>
            <div className={styles.upper}>

                <ProfileData userId={note.userId} />
                
                {
                // Edit Button
                isMyPost && 
                <div className={styles.edit} onClick={handleEditing}>
                    <img src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-editor-pen-pencil-write-icon--4.png" alt="" />
                </div>
                }
            </div>

            <div className={styles.content}>
                {
                    editing ? 
                    <div className={styles.editForm}>
                        <textarea 
                        type="text" 
                        value={inputValue} 
                        onChange={(event) => {setValue(event.target.value)}} 
                        onInput={adjustHeight}
                        maxLength={120}
                        minLength={1}
                        />
                        <SubmitButton onClick={handleEdited}/>
                    </div>
                    :
                    <p>{note.content}</p>
                }
            </div>

            

            <div className={styles.actions}>
                <div className={styles.like}>
                    <button onClick={handleLiked}>
                        <span className="material-icons">{isLiked ? 'thumb_up_alt' :  'thumb_up_off_alt'}</span>
                    </button>
                    <p>{likes.length}</p>
                </div>
                
                <div className={styles.comment}>
                    <button onClick={() => setCommentStatus(!commentOpened)}><span className="material-icons">{commentOpened ?'chat' :  'chat_bubble_outline'}</span></button>
                    <p>{note.comments.length}</p>
                </div>
            </div>
            {commentOpened && <CommentSection comments={note.comments}/>}
        </div>
    )
}

const ProfileData = ({userId}) => {

    const {data:userData} = useQuery({ queryKey: ['userData', userId], queryFn: async() => {return await getUserData(userId)}})

    return (
        <Link to={`/profile?id=${userId}`} state={userId} className={styles.profile}>
            <img src={userData?.photoURL} />
            <p>{userData?.name}</p>
        </Link>
    )
}