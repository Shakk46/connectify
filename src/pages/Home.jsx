import { LoadingContext } from '/src/context/LoaderContext.jsx'
import {WritePost} from '../components/WritePost/WritePost'
import { Post } from '../components/Post/Post'
import { useEffect, useState, useContext } from "react"
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from '../firebase';
import { UserAuth } from '../context/AuthContext';
  
export const Home = () => {
    const [notes, setNotes] = useState([])
    const currentUser = UserAuth().user
    const loader = useContext(LoadingContext)


    const getNotes = async () => {
      loader.setLoading(true)
      // a query to order notes by date of creation
      const q = query(collection(db, "notes"), orderBy("date", 'desc'));

      const querySnapshot = await getDocs(q);

      const data = []

      querySnapshot.forEach((doc) => {
        data.push({...doc.data(), id:doc.id})
      });
      
      setNotes(data)
      loader.setLoading(false)
    }

    useEffect(() => {
      getNotes()
    }, [])

    return(
        <>
          <div>
            <WritePost updateNotes={getNotes}/>
            <div className='posts'>
              {notes.map(note => {
                return <Post 
                    props={note}
                    currentUser={currentUser}
                    userId
                    key={note.id}
                  />
              })}
            </div>
          </div>
        </>
    )
}