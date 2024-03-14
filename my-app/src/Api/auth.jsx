//imports
import { collection, doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import app from "../firebase.jsx"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import userData from "../context/auth.jsx"

const db = getFirestore(app);
const usersCollection = collection(db, "Users"); 

//Create User 
const registerUser = async (values ) => {
    const {name, email, password, pic, handles, role} = values;
    const auth = await getAuth(app);
    try {
        createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const userData = {
                name: name,
                email: email,
                pic: pic || 'default-pic-url', 
                handles: handles || [], 
                role: role || 0 
            };

            await setDoc(doc(usersCollection, name), userData);

            const token = await userCredential.user.getIdToken();
            
            console.log("User registered Successfully");
        })
        .catch((error) => {  
            console.error("Error registering user:", error);
            console.log("Failed to register user"); 
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Failed to register user"); 
    }
};

const signin = async (values) => {
    const { email, password } = values;
    const auth = getAuth(app);
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User signed in successfully:", user);
        // Perform any additional actions after successful sign-in
    } catch (error) {
        console.error("Error signing in:", error.code, error.message);
        // Handle sign-in error appropriately
    }
}



export  { registerUser, signin};