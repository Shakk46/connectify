import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase"

export const getUserData = async (userId) => {
    const userRef = doc(db, 'users', userId)
    const userData = (await getDoc(userRef)).data()

    return userData
}

