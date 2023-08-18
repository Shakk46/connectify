import { LoadingContext } from '/src/context/LoaderContext.jsx'
import {WritePost} from '../components/WritePost/WritePost'
import { Post } from '../components/Post/Post'
import { useEffect, useState, useContext } from "react"
import { collection, getDocs, query, orderBy, arrayRemove } from "firebase/firestore";
import { db } from '../firebase';
  
export const Home = () => {
    const [notes, setNotes] = useState([])
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

    const updateNotes = async () => {
      
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
                    key={note.id}
                  />
              })}
            </div>
          </div>
        </>
    )
}