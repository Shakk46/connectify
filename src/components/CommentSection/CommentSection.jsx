import styles from './comment.module.css'
import { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { LoadingContext } from '../../context/LoaderContext' 
import { useContext } from 'react'

export const CommentSection = ({id}) => {
    const [commentData, setCommentData] = useState([])
    const loader = useContext(LoadingContext)
    
    useEffect(() => {
        const getComments = async () => {
            loader.setLoading(true)
            const noteRef = doc(db, 'notes', id)
            const noteData = (await getDoc(noteRef)).data()

            console.log(noteData.comments.length);

            if(noteData.comments.length) {
                setCommentData(noteData.comments)
                loader.setLoading(false)
            }else {
                return loader.setLoading(false)
            }
        }
        getComments()
    }, [])

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Comments</h2>
            { commentData.length ?
            commentData.map((comment) => {
                return (
                    <div className={styles.comment}>
                        <img src={comment.photoURL} alt="" className={styles.photo} />
                        <p className={styles.content}>{comment.content}</p>
                    </div>
                )
            }) : 

            "There is no comments"
        }
        </div>
    )
}