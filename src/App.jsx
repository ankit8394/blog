import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import BlogPost from './components/BlogPost';
import CreatePost from './components/CreatePost';
import Navbar from './components/Navbar';
import './App.css';
import Footer from "./components/Footer";

function App() {
  const [posts, setPosts] = useState([]);

  // Load posts from localStorage on component mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('blogPosts');
  
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      const samplePosts = [
        {
          id: 1,
          title: 'Getting Started with React',
          content: 'React is a popular JavaScript library for building user interfaces...',
          author: 'John Doe',
          date: '2025-04-20',
          comments: []
        },
        {
          id: 2,
          title: 'CSS Grid vs Flexbox',
          content: 'When it comes to layout in CSS, two powerful systems stand out...',
          author: 'Sarah Williams',
          date: '2025-04-18',
          comments: []
        },
        {
          id: 3,
          title: 'JavaScript Promises Explained',
          content: 'JavaScript Promises are objects representing the eventual completion...',
          author: 'David Chen',
          date: '2025-04-16',
          comments: []
        }
      ];
      setPosts(samplePosts);
      localStorage.setItem('blogPosts', JSON.stringify(samplePosts));
    }
  }, []);
  

  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('blogPosts', JSON.stringify(posts));
  }, [posts]);

  const addPost = (newPost) => {
    setPosts([...posts, { ...newPost, id: Date.now(), comments: [] }]);
  };

  const addComment = (postId, comment) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, { ...comment, id: Date.now() }]
        };
      }
      return post;
    }));
  };

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home posts={posts} />} />
            <Route path="/post/:id" element={<BlogPost posts={posts} addComment={addComment} />} />
            <Route path="/create" element={<CreatePost addPost={addPost} />} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;