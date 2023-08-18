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

        console.log(Date.now())

        await addDoc(collection(db, "notes"), {
            content: inputValue,
            date:Date.now(),
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
              <textarea value={inputValue} onChange={() => {setValue(event.target.value)}} type="text" className={styles.input} placeholder='Write what is up. (max. characters: 120)' onInput={adjustHeight} maxLength='120'/>
              <button type="submit" className={styles.submit}>Submit</button>
            </form>
        </div>
    )
}