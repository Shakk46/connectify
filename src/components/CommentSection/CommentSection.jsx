import styles from './comment.module.css'
import { useEffect, useState, useContext } from 'react'
import { db } from '../../firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { LoadingContext } from '../../context/LoaderContext' 
import { Link, useNavigate } from 'react-router-dom'
import { getUserData } from '../../helpers/getFunctions'

export const CommentSection = ({comments, currentUser}) => {
    const [inputValue, setInputValue] = useState('')

    const loader = useContext(LoadingContext)
    const navigate = useNavigate()

    const handleSubmit = async() => {
        if(currentUser) {
            loader.setLoading(true)
            setInputValue('')
            
            const noteRef = doc(db, 'notes', id)
            const comment = {
                photoURL:currentUser.photoURL,
                id:currentUser.uid,
                content:inputValue
            }

            await updateDoc(noteRef, {
                comments:[...comments, comment]
            });

            getComments()
            loader.setLoading(false)
        }else {
            navigate('/auth')
        }
        
    }

    return (
        <div className={styles.container}>
            {/* <h2 className={styles.heading}>Comments</h2> */}
            { comments.length ?
            comments.map((comment) => {
                return (
                    <Comment comment={comment} />
                )
            })
            
            : 

            "There are no comments"
        }

            <div className={styles.writeComment}>
                <input value={inputValue} maxLength={120} onChange={(event) => {
                    setInputValue(event.target.value)
                }}/>
                <button className={styles.submitComment} onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

const Comment = ({comment}) => {
    const [userData, setUserData] = useState()
    const updateUserData = async() => {
        setUserData(await getUserData(comment.id))
    }

    useEffect(() => {
        updateUserData()
    }, [])
    return (
        <div className={styles.comment}>
            <Link to={'/profile?id=' + comment.id} state={comment.id}>
                <img src={userData?.photoURL} alt="Ava" className={styles.photo} />
            </Link>
            
            <p className={styles.content}>{comment.content}</p>
        </div>
    )
}