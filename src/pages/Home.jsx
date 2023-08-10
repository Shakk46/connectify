import {WritePost} from '../components/WritePost/WritePost'
import { Post } from '../components/Post/Post'
import { Nav } from "../components/Nav/Nav"
import { useEffect, useState } from "react"
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from '../firebase';
  
export const Home = () => {
    const [notes, setNotes] = useState([])

    const getNotes = async () => {
      const querySnapshot = await getDocs(collection(db, "notes"));

      const data = []

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
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