import { collection, getDocs, query, where } from 'firebase/firestore'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Post } from '../../components/Post/Post'
import { UserAuth } from '../../context/AuthContext'
import { LoadingContext } from '../../context/LoaderContext'
import { db } from '../../firebase'
import styles from './myPosts.module.css'
export const MyPosts = () => {
    const [myNotes, setMyNotes] = useState([])
    const currentUser = UserAuth().user
    const loader = useContext(LoadingContext)
    
    const getMyNotes = async() => {
        loader.setLoading(true)
        let notes = [];

        // Create a reference to the users collection
        const notesRef = collection(db, "notes");

        // Create a query that filters by the id field in the userData subcollection
        console.log(currentUser.uid);

        // Execute the query and get the results
        const querySnapshot = await getDocs(query(notesRef, where('userData.id', '==', currentUser.uid)))
        console.log('snapshot:', querySnapshot);

        // Loop through the documents in the querySnapshot
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            
            notes.push({...doc.data(), id:doc.id})
        });
        console.log(querySnapshot.docs.length)
        console.log('notes are:', notes);

        setMyNotes(notes)
        loader.setLoading(false)
    }

    useEffect(() => {
        if(currentUser.uid) {
            getMyNotes()
        }
    }, [currentUser])

    return (
        <div className={styles.container}>
            {
                myNotes.length ?
                    myNotes.map((post) => {
                        return <Post props={...post} currentUser={currentUser} key={post.id} />
                    }): null
            }
        </div>
    )
}