import { useState } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { db } from '../../firebase';
import styles from './writeNote.module.css'
import { UserAuth } from '../../context/AuthContext';
import { LoadingContext } from '../../context/LoaderContext';
import { useNavigate } from 'react-router-dom';
import { SubmitButton } from '../SubmitButton';
import { adjustHeight } from '../../helpers/adjustHeight';
import { useContext } from 'react';
export function WriteNote({updateNotes}) {
    const currentUser = UserAuth().user

    const navigate = useNavigate()

    const loader = useContext(LoadingContext)

    const [inputValue, setValue] = useState('')

    

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
        }else {
            navigate('/auth')
        }

    }

    return(
        <div className={styles.container}>
            <form action="#" className={styles.form} onSubmit={handleSubmit}>
              <textarea 
                value={inputValue}
                onChange={(event) => {setValue(event.target.value)}}
                className={styles.input}
                placeholder='Write what is up. (max. characters: 120)'
                onInput={adjustHeight}
                maxLength='120'
              />
              <SubmitButton />
            </form>
        </div>
    )
}