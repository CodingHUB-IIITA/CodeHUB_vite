import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import { collection, doc, getDocs, updateDoc, increment, arrayUnion } from "firebase/firestore";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';

const BlogList = () => {
    const Blogs = collection(firestore, 'blogs');
    const [blogs, setBlogs] = useState([]);
    const [commentInput, setCommentInput] = useState("");
    const [activeCommentId, setActiveCommentId] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false); // State to control dropdown visibility

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(Blogs);
                const blogData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setBlogs(blogData);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchData();
        return () => {}
    }, []);

    const handleLike = async (blogId) => {
        try {
            const blogRef = doc(firestore, "blogs", blogId);
            await updateDoc(blogRef, { likes: increment(1) });

            console.log("liked");
        }
        catch (error) {
            console.log("error", error);
        }
    }

    const handleComment = async (blogId, comment) => {
        try {
            const blogRef = doc(firestore, "blogs", blogId);
            await updateDoc(blogRef, {
                comments: arrayUnion(comment)

            });
            console.log("Comment added successfully");
        }
        catch (err) {
            console.log("error", err);
        }
    }

    const handleCommentInput = (event) => {
        setCommentInput(event.target.value);
    }

    const handleDropdownToggle = (blogId) => {
        setActiveCommentId(blogId);
        setShowDropdown(!showDropdown); // Toggle dropdown visibility
    }

    const handleCommentSubmit = (blogId) => {
        handleComment(blogId, commentInput);
        setCommentInput("");
        setShowDropdown(false); // Close dropdown after submitting comment
    }

    return (
        <div className="container mx-auto mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {blogs.map((blog) => (
                    <div key={blog.id} className="bg-white p-4 shadow rounded">
                        <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                        <p className="mb-4">{blog.body}</p>
                        {blog.imageUrl && <img src={blog.imageUrl} alt="Blog" className="mb-4 rounded" />}
                        <div className="flex mb-0 items-center">
                            <FavoriteIcon onClick={() => handleLike(blog.id)} className="text-red-500 cursor-pointer mr-2 mb-0" />
                            <span>{blog.likes}</span>
                            <ChatIcon onClick={() => handleDropdownToggle(blog.id)} className="ml-auto cursor-pointer mb-0" />
                        </div>
                        {/* Dropdown menu for comments */}
                        {activeCommentId === blog.id && showDropdown && (
                            <div className="bg-white p-4 shadow rounded mt-2">
                                <input type="text" value={commentInput} onChange={handleCommentInput} placeholder="Add your comment here" />
                                <button onClick={() => handleCommentSubmit(blog.id)}>Submit</button>
                                <div className="mt-2">
                                   
                                    {blog.comments && blog.comments.map((comment, index) => (
                                        <div>
<span key={index}>{comment}</span>
                                        </div> 
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BlogList;
