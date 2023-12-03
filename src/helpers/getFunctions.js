import { collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore"
import { db } from "../firebase"

export const getUserData = async (userId) => {
    const userRef = doc(db, 'users', userId)
    const userData = (await getDoc(userRef)).data()

    console.log('fetched user data')

    return userData
}

export const getNotes = async (condition, currentUser) => {
    console.log(currentUser)
    let q
    switch (condition) {
        case 'my':
            q = query(collection(db, "notes"), orderBy("date", 'desc'), where('userId', '==', currentUser.uid));
            break;
    
        default:
            q = query(collection(db, "notes"), orderBy("date", 'desc'));
            break;
    }

    const querySnapshot = await getDocs(q);

    const data = []

    console.log('fetched notes')

    querySnapshot.forEach((doc) => {
        data.push({...doc.data(), id:doc.id})
    });

    console.log(data)

    return data
}
