import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreatePost({ addPost }) {
  const navigate = useNavigate();
  const [postForm, setPostForm] = useState({
    title: '',
    content: '',
    author: ''
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (postForm.title.trim() && postForm.content.trim() && postForm.author.trim()) {
      const newPost = {
        ...postForm,
        date: new Date().toISOString().split('T')[0]
      };
      addPost(newPost);
      navigate('/');
    }
  };
  
  return (
    <div className="create-post">
      <h1>Create New Blog Post</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={postForm.title}
            onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={postForm.author}
            onChange={(e) => setPostForm({ ...postForm, author: e.target.value })}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            rows="10"
            value={postForm.content}
            onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
            required
          ></textarea>
        </div>
        
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Cancel</button>
          <button type="submit" className="btn btn-primary">Publish Post</button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;