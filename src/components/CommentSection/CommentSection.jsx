import styles from './comment.module.css'
import { useEffect, useState, useContext } from 'react'
import { db } from '../../firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { LoadingContext } from '../../context/LoaderContext' 
import { Link, useNavigate } from 'react-router-dom'

export const CommentSection = ({id, currentUser}) => {
    const [commentData, setCommentData] = useState([])
    const [inputValue, setInputValue] = useState('')

    const navigate = useNavigate()

    const loader = useContext(LoadingContext)

    const getComments = async () => {
        loader.setLoading(true)
        const noteRef = doc(db, 'notes', id)
        const noteData = (await getDoc(noteRef)).data()


        if(noteData.comments.length) {
            setCommentData(noteData.comments)
            loader.setLoading(false)
        }else {
            return loader.setLoading(false)
        }
    }
    
    useEffect(() => {
        getComments()
    }, [])

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
                comments:[...commentData, comment]
            });

            getComments()
            loader.setLoading(false)
        }else {
            navigate('/auth')
        }
        
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Comments</h2>
            { commentData.length ?
            commentData.map((comment) => {
                return (
                    <div className={styles.comment}>
                        <Link to={'/profile?id=' + comment.id} state={comment.id}>
                            <img src={comment.photoURL} alt="" className={styles.photo} />
                        </Link>
                        
                        <p className={styles.content}>{comment.content}</p>
                    </div>
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