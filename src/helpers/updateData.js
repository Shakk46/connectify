import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"

export const updateData = (info, category, id ) => {
    const userRef = doc(db, category, id)
    updateDoc(userRef, info).then(() => {
        console.log('changed info')
    })
}