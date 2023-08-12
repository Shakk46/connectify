import {WritePost} from '../components/WritePost/WritePost'
import { Post } from '../components/Post/Post'
import { Nav } from "../components/Nav/Nav"
import { useEffect, useState } from "react"
import { collection, doc, getDocs, query, orderBy } from "firebase/firestore";
import { db } from '../firebase';
  
export const Home = () => {
    const [notes, setNotes] = useState([])

    const getNotes = async () => {
      // a query to order notes by date of creation
      const q = query(collection(db, "notes"), orderBy("date", 'desc'));

      const querySnapshot = await getDocs(q);

      const data = []

      querySnapshot.forEach((doc) => {
        data.push({...doc.data(), id:doc.id})
      });

      console.log(data);
      
      setNotes(data)
    }

    useEffect(() => {
      getNotes()
    }, [])

    return(
        <>
          <div>
            <WritePost updateNotes={getNotes}/>
            <h2 className='heading'>Feed</h2>
            <div className='posts'>
              {notes.map(note => {
                return <Post 
                    props={note}
                  />
              })}
            </div>
          </div>
        </>
    )
}