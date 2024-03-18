import React, { useState, useEffect } from "react";
import { firestore, storage } from "../firebase";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";

const BlogsUploadPage = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const blogsCollectionRef = collection(firestore, 'blogs');
    const storageRef = ref(storage, 'images');

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState(null);
    const [userName, setUserName] = useState(""); 
    console.log(user);
    useEffect(() => {
        const fetchUserName = async () => {
            try {
                if (user) {
                    const userDoc = await getDoc(doc(firestore, "Users", user.uid)); 
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUserName(userData.name); 
                    } else {
                        console.log("User document does not exist");
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserName(); 
    }, [user]); 

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            let imageUrl = '';
            if (image) {
                const imageRef = ref(storageRef, image.name);
                await uploadBytes(imageRef, image);
                imageUrl = await getDownloadURL(imageRef);
            }

            const blogData = {
                title: title,
                body: body,
                author: userName, // Use the user's name instead of UID
                imageUrl: imageUrl,
                likes: 0,
                comments: [],
                createdAt: new Date()
            };

            await addDoc(blogsCollectionRef, blogData);

            alert("Data successfully submitted");
            setTitle("");
            setBody("");
            setImage(null);

        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="max-w-screen-lg mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">Blog Upload</h1>
            <form onSubmit={submit} className="mb-8">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full mb-4 p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <textarea
                    name="content"
                    placeholder="Write your content here"
                    rows="5"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                    className="w-full mb-4 p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                    type="file"
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="mb-4"
                />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit</button>
            </form>
        </div>
    );
}

export default BlogsUploadPage;
