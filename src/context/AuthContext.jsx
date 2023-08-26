import { useContext, createContext, useEffect, useState } from "react";
import { 
    GoogleAuthProvider, 
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import { auth, db } from '../firebase'
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({})

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth, provider)
    }

    const logOut = () => {
        signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            console.log('User', currentUser);
        });
        return () => {
            unsubscribe();
        }
    }, [])

    useEffect(() => {
        if(user && Object.keys(user)[0]) {
            // Get a reference to the document with user id
            const userRef = doc(collection(db, "users"), user.uid);
    
            // Fetch the document snapshot
            getDoc(userRef).then((docSnap) => {
                // Check if the document exists
                if (!docSnap.exists()) {
                    setDoc(userRef, {
                        bio: "",
                        name: user.displayName,
                        photoURL: user.photoURL,
                        friends: [],
                        
                    }).then(() => {
                        // The document was created successfully
                        console.log("user was created");
                    }).catch((error) => {
                        // There was an error creating the document
                        console.error(error);
                    });
                }
            }).catch((error) => {
            // Handle any errors
            console.error(error);
            });
        }
    }, [user])

    

    return(
        <AuthContext.Provider value={{googleSignIn, logOut, user}}>
            {children}
        </AuthContext.Provider>
    )
};

export function UserAuth() {
    return useContext(AuthContext)
}