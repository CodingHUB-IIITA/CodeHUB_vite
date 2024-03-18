
import React from 'react';
import "../styles/blogs.css"
import BlogUpload from '../Components/BlogUpload';
import BlogList from '../Components/BlogLists';
function BlogsList() {
  return (
    <div >
   <BlogUpload/> 
  <BlogList/> 
    </div>
  );
}

export default BlogsList;
