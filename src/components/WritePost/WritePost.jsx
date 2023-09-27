import { useState } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { db } from '../../firebase';
import styles from './writePost.module.css'
import { UserAuth } from '../../context/AuthContext';
import { Loading } from '../../context/LoaderContext';
import { useNavigate } from 'react-router-dom';
export function WritePost({updateNotes}) {
    const currentUser = UserAuth().user

    const navigate = useNavigate()

    const loader = Loading()

    const [inputValue, setValue] = useState('')

    function adjustHeight(e) {
        let block = e.target
        block.style.height = "auto";
        block.style.height = block.scrollHeight + "px";
    }

    const handleSubmit = async(event) => {
        event.preventDefault()

        if(currentUser) {
            loader.setLoading(true)
            const formData = {
                content: inputValue,
                date:Date.now(),
                likes: [],
                comments: [],
                userId:currentUser.uid
            }
            setValue('')
            await addDoc(collection(db, "notes"), formData);
            updateNotes()
            loader.setLoading(false)
            navigate('/auth')
        }else {
            navigate('/auth')
        }

    }

    return(
        <div className={styles.container}>
            <form action="#" className={styles.form} onSubmit={handleSubmit}>
              <textarea value={inputValue} onChange={(event) => {setValue(event.target.value)}} type="text" className={styles.input} placeholder='Write what is up. (max. characters: 120)' onInput={adjustHeight} maxLength='120'/>
              <button type="submit" className={styles.submit}>Submit</button>
            </form>
        </div>
    )
}