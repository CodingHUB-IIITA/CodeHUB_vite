// import React, { useEffect, useState } from 'react';
// import { firestore } from '../firebase';
// import { collection, where, query, getDocs } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth'; // Import the authentication context

// const UserBlogsPage = () => {
//     const auth = getAuth(); // Get the authentication object
//     const user = auth.currentUser; // Get the current user from the authentication object
//     const userBlogsRef = collection(firestore, 'blogs');
//     const [userBlogs, setUserBlogs] = useState([]);
   

//     console.log(user.uid);
//     // const q = query(userBlogsRef, where('userId', '==', user.uid));
//     // console.log(q);
//     useEffect(() => {
       
//         const fetchUserBlogs = async () => {
//             try {
//                 const q = query(userBlogsRef, where('userId', '==', user.uid));
//                 const querySnapshot = await getDocs(q);
//                 const userBlogsData = querySnapshot.docs.map(doc => ({
//                     id: doc.id,
//                     ...doc.data()
//                 }));
//                 setUserBlogs(userBlogsData);
//                 console.log("data retrived");
//                 console.log(userBlogs);
//             } catch (error) {
//                 console.error('Error fetching user blogs:', error);
               
//             }
//         };

//         fetchUserBlogs();
//     }, [user]);

//     return (
//         <div>
//             <h1>User Blogs Page</h1>
//             {user && userBlogs.map(blog => (
//                 <div key={blog.id}>
//                     <h2>{blog.title}</h2>
//                     <p>{blog.body}</p>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default UserBlogsPage;
