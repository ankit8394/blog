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
    const samplePosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } if (samplePosts){
      // Add some sample posts if none exist
      const samplePosts = [
        {
          id: 1,
          title: 'Getting Started with React',
          content: 'React is a popular JavaScript library for building user interfaces. Created by Facebook, React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.\n\nReact uses a component-based architecture that encapsulates behaviors and rendering logic together. This makes it easier to develop, maintain, and reuse code. Components are the building blocks of React applications.\n\nOne of the key features of React is the Virtual DOM. Instead of updating the browser\'s DOM directly, React creates a virtual representation of it in memory and compares it with the previous version to compute the most efficient DOM updates.\n\nTo get started with React, you\'ll need to have Node.js installed on your machine. You can create a new React application using tools like Create React App or Vite. Here\'s how you can create a new React app using Vite:\n\n```\nnpm create vite@latest my-react-app -- --template react\ncd my-react-app\nnpm install\nnpm run dev\n```\n\nThis will set up a new React project with a development server that you can use to start building your application.',
          author: 'John Doe',
          date: '2025-04-20',
          comments: [
            { id: 1, author: 'Jane Smith', content: 'Great introduction! I especially like the explanation of the Virtual DOM.', date: '2025-04-21' },
            { id: 2, author: 'Mike Johnson', content: 'This helped me a lot, thanks! Looking forward to more React tutorials.', date: '2025-04-22' }
          ]
        },
        {
          id: 2,
          title: 'CSS Grid vs Flexbox',
          content: 'When it comes to layout in CSS, two powerful systems stand out: CSS Grid and Flexbox. Both are designed to create responsive layouts, but they have different strengths and use cases.\n\nFlexbox (Flexible Box Module) is designed for one-dimensional layouts - either in a row or a column. It\'s perfect for components like navigation menus, form elements, or any layout where you\'re working with items in a single direction. The main idea behind Flexbox is to give the container the ability to alter its items\' width, height, and order to best fill the available space.\n\n```css\n.flex-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n```\n\nCSS Grid, on the other hand, is a two-dimensional layout system designed for laying out items in rows and columns simultaneously. This makes it perfect for more complex layouts like entire web pages.\n\n```css\n.grid-container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-gap: 20px;\n}\n```\n\nIn practice, both systems often work best when used together. You might use Grid for the overall page layout, and then Flexbox for specific components within that layout.\n\nWhen deciding which to use, consider your layout needs: If you\'re working with content in one direction (row or column), Flexbox is likely the better choice. If you need to control layout in both dimensions, Grid will probably serve you better.',
          author: 'Sarah Williams',
          date: '2025-04-18',
          comments: [
            { id: 1, author: 'Alex Brown', content: 'I prefer Grid for complex layouts, but Flexbox is definitely easier for simple alignment tasks.', date: '2025-04-19' }
          ]
        },
        {
          id: 3,
          title: 'JavaScript Promises Explained',
          content: 'JavaScript Promises are objects representing the eventual completion or failure of an asynchronous operation. They\'re a cleaner alternative to callbacks for handling asynchronous code.\n\nA Promise exists in one of three states: pending, fulfilled, or rejected. When you create a Promise, it\'s initially in the pending state. It transitions to either fulfilled (with a result value) or rejected (with an error reason).\n\n```javascript\nconst myPromise = new Promise((resolve, reject) => {\n  // Asynchronous operation here\n  const success = true;\n  \n  if (success) {\n    resolve(\'Operation completed successfully!\');\n  } else {\n    reject(\'Operation failed!\');\n  }\n});\n\nmyPromise\n  .then(result => console.log(result))\n  .catch(error => console.error(error));\n```\n\nPromises can be chained together using `.then()`, allowing you to sequence asynchronous operations. Each `.then()` returns a new Promise, which enables this chaining behavior.\n\n```javascript\nfetch(\'https://api.example.com/data\')\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(error => console.error(\'Error:\', error));\n```\n\nFor handling multiple Promises, JavaScript provides useful methods like:\n- `Promise.all()` - Waits for all Promises to resolve\n- `Promise.race()` - Resolves or rejects as soon as one Promise resolves or rejects\n- `Promise.allSettled()` - Waits for all Promises to settle (either resolve or reject)\n\nPromises form the foundation for newer JavaScript features like async/await, which provides an even cleaner syntax for working with asynchronous code.',
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