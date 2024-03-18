//imports
import { collection, doc, getDocs, setDoc ,query,where} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import app from "../firebase.jsx"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import userData from "../context/auth.jsx"
import { useUserData } from "../Context/user.jsx";
const db = getFirestore(app);
const usersCollection = collection(db, "Users"); 

//Create User 
const registerUser = async (values) => {
    const auth = getAuth(app);
    const { name, email, password, pic, handles, role } = values;
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(user);
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            const token = await user.getIdToken();
            console.log(token);
            localStorage.setItem('token', token);
            const userData = {
                uid: user.uid,
                name: name,
                email: email,
                pic: pic || 'default-pic-url',
                handles: handles || [],
                role: role || 0
            };
         
            await setDoc(doc(usersCollection, name), userData);

            console.log("User registered Successfully");
        } else {
            console.error("Error registering user: User object is undefined");
            console.log("Failed to register user");
        }
    } catch (error) {
        console.error("Error registering user:", error.code, error.message);
        console.log("Failed to register user");
    }
};


const signin = async (values) => {
    const { email, password } = values;
   
    const auth = getAuth(app);
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User signed in successfully:", user);
        if(user){
            localStorage.setItem('user',JSON.stringify(user));
            const token=await user.getIdToken();
            const q = query(usersCollection, where("uid", "==", user.uid));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
              });
            localStorage.setItem('token',token);
        }
        // Perform any additional actions after successful sign-in
    } catch (error) {
        console.error("Error signing in:", error.code, error.message);
        // Handle sign-in error appropriately
    }
}



export  { registerUser, signin};