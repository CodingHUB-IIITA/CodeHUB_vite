
import React from 'react';
import "../styles/blogs.css"
// import BlogsUploadPage from '../Components/BlogUpload';
import BlogUploader from '../Components/BlogUpload';
import BlogList from '../Components/BlogLists';
import AllBlogs from './AllBlogs';
const Blogs=()=> {
  return (
    <div>

      <div><BlogUploader/></div>
      <div><AllBlogs/></div>
    </div>
  );
}

export default Blogs;
