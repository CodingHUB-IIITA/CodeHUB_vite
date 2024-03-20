import React, { useState, useEffect } from 'react';
import { TextField, Button, IconButton, Typography } from '@mui/material';
import { AddPhotoAlternateOutlined as AddPhotoAlternateIcon, SendOutlined as SendIcon } from '@mui/icons-material';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firestore, storage } from '../firebase'; // Assuming you have Firebase initialized as 'db' and 'storage'

const BlogUploader = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const blogsCollectionRef = collection(firestore, 'blogs');
const storageRef = ref(storage, 'images');
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    // Upload image to Firebase Storage
    try{

        if (image) {
        let imageUrl = '';
        if (image) {
            const imageRef = ref(storageRef, image.name);
            await uploadBytes(imageRef, image);
            imageUrl = await getDownloadURL(imageRef);
        }
        }
    
        // Add blog post to Firestore
        const blogData = {
          title:title,
          content:content,
          tags: tags.split(','), // Assuming tags are comma-separated
          author: currentUser.displayName,
          createdAt: new Date(),
          imageUrl:imageUrl,
          likes: 0,
          comments: [],
        };
    
        await addDoc(blogsCollectionRef, blogData);
    
        // Clear form fields
        setTitle('');
        setContent('');
        setTags('');
        setImage(null);
        setImageUrl('');
      }
      catch(err){
       console.log("error in uploading Blog, Try Again...");
      }
    }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Upload a New Blog
      </Typography>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />
      <TextField
        label="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
        margin="normal"
      />
      <input
        type="file"
        accept="image/*"
        id="image-upload"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
      <label htmlFor="image-upload">
        <IconButton component="span">
          <AddPhotoAlternateIcon />
        </IconButton>
        Upload Image
      </label>
      <Button
        variant="contained"
        color="primary"
        startIcon={<SendIcon />}
        onClick={handleUpload}
      >
        Upload Blog
      </Button>
    </div>
  );
};

export default BlogUploader;
