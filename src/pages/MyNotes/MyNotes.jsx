import { collection, getDocs, query, where } from 'firebase/firestore'
import { useContext } from 'react'
import { useEffect } from 'react'
import { Note } from '../../components/Note/Note'
import { UserAuth } from '../../context/AuthContext'
import { LoadingContext } from '../../context/LoaderContext'
import { db } from '../../firebase'
import styles from './myNotes.module.css'
import {useQuery} from 'react-query'
import { getNotes } from '../../helpers/getFunctions'

export const MyNotes = () => {
    const currentUser = UserAuth().user
    const loader = useContext(LoadingContext)
    
    // const getMyNotes = async() => {
    //     loader.setLoading(true)
    //     let notes = [];

    //     // Create a reference to the users collection
    //     const notesRef = collection(db, "notes");

    //     // Execute the query and get the results
    //     const querySnapshot = await getDocs(query(notesRef, where('userId', '==', currentUser.uid)))

    //     // Loop through the documents in the querySnapshot
    //     querySnapshot.forEach((doc) => {
    //         notes.push({...doc.data(), id:doc.id})
    //     });

    //     loader.setLoading(false)

    //     return notes
    // }

    const getMyNotes = () => {
        return getNotes('my', currentUser)
    }


    const {data:myNotes} = useQuery({ queryKey: ['notes', 'myNotes'], queryFn: currentUser && getMyNotes})

    // useEffect(() => {
    //     if(currentUser.uid) {
    //         console.log(getMyNotes())
    //     }
    // }, [currentUser])

    return (
        <div className={styles.container}>
            {
                myNotes?.length ?
                    myNotes.map(post => {
                        return <Note props={{...post}} currentUser={currentUser} key={post.id} />
                    }) : null
            }
        </div>
    )
}