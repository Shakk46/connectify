import { LoadingContext } from '/src/context/LoaderContext.jsx'
import {WriteNote} from '../components/WriteNote/WriteNote'
import { Note } from '../components/Note/Note'
import { useEffect, useState, useContext } from "react"
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from '../firebase';
import { UserAuth } from '../context/AuthContext';
import {QueryClient, useQuery, useQueryClient} from 'react-query'
  
export const Home = () => {
    const currentUser = UserAuth().user
    const loader = useContext(LoadingContext)
    const queryClient = useQueryClient()

    const getNotes = async () => {
      loader.setLoading(true)
      // a query to order notes by date of creation
      const q = query(collection(db, "notes"), orderBy("date", 'desc'));

      const querySnapshot = await getDocs(q);

      const data = []

      querySnapshot.forEach((doc) => {
        data.push({...doc.data(), id:doc.id})
      });

      loader.setLoading(false)

      return data
    }

    const updateNotes = () => {
      queryClient.invalidateQueries({queryKey:['notes']})
    }

    const {data:notes} = useQuery({ queryKey: ['notes'], queryFn: getNotes})

    return(
        <>
          <div>
            <WriteNote updateNotes={updateNotes}/>
            <div className='posts'>
              {notes?.map(note => {

              return (
                <Note 
                  props={note}
                  currentUser={currentUser}
                  userId
                  key={note.id}
                />
              )

              })}
            </div>
          </div>
        </>
    )
}