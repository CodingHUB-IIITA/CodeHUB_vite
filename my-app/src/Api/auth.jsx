//imports
import { collection, doc, getDocs, setDoc ,query,where} from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import app from "../firebase.jsx"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
const db = getFirestore();
const usersCollection = collection(db, "Users"); 

//Create User 
const registerUser = async (values) => {
   const auth = getAuth();
    
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
                name: user.displayName,
                email: user.email,
                pic: pic || 'default-pic-url',
                handles: handles || [],
                role: role || 0
            };
         
            await setDoc(doc(usersCollection, name), userData);

            console.log("User registered Successfully",userData);
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
   // const {setUserData}=useUserData();
    const { email, password } = values;
    const auth = getAuth();
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        // console.log("User signed in successfully:", user);
        if(user){
            localStorage.setItem('user',JSON.stringify(user));
            const token=await user.getIdToken();
            const q = query(usersCollection, where("uid", "==", user.uid));

            const querySnapshot = await getDocs(q);
            // console.log(querySnapshot);
            
            
            localStorage.setItem('token',token);
            return querySnapshot;
        }
        // Perform any additional actions after successful sign-in
    } catch (error) {
        console.error("Error signing in:", error.code, error.message);
        return null;
        // Handle sign-in error appropriately
    }
}

const getUserProfile=async(uid)=>{
    try{
        const docRef=doc(usersCollection,uid);
        const userDocSnap=await getDoc(docRef);
        if(userDocSnap.exists()){
            console.log(userDocSnap.data());
           return userDocSnap.data();
        }

        else{
            console.error("No profile found");
        }

    }
    catch(err){
        console.log("Error in fetching profile",err);
    }
}


export  { registerUser, signin, getUserProfile};