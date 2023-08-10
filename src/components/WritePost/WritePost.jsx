import { useState } from 'react';
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { db } from '../../firebase';
import styles from './writePost.module.css'
import { UserAuth } from '../../context/AuthContext';
export function WritePost({updateNotes}) {
    const currentUser = UserAuth().user

    const [inputValue, setValue] = useState('')

    function adjustHeight(e) {
        let block = e.target
        block.style.height = "auto";
        block.style.height = block.scrollHeight + "px";
    }

    const handleSubmit = async(event) => {
        event.preventDefault()

        await addDoc(collection(db, "notes"), {
            content: inputValue,
            likes: [],
            userData: {
                id:currentUser.uid,
                name:currentUser.displayName,
                photoURL:currentUser.photoURL
            }
          });

        updateNotes()
        
          

        setValue('')
    }
    return(
        <div className={styles.container}>
            <form action="#" className={styles.form} onSubmit={handleSubmit}>
              <textarea value={inputValue} onChange={() => {setValue(event.target.value)}} type="text" className={styles.input} placeholder='Write what is up.' onInput={adjustHeight}/>
              <button type="submit" className={styles.submit}>Submit</button>
            </form>
        </div>
    )
}