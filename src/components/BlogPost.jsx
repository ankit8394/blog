import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function BlogPost({ posts, addComment }) {
  const { id } = useParams();
  const [commentForm, setCommentForm] = useState({ author: '', content: '' });
  
  const post = posts.find(post => post.id === parseInt(id));
  
  if (!post) {
    return <div className="not-found">Post not found</div>;
  }
  
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentForm.author.trim() && commentForm.content.trim()) {
      addComment(post.id, {
        ...commentForm,
        date: new Date().toISOString().split('T')[0]
      });
      setCommentForm({ author: '', content: '' });
    }
  };
  
  return (
    <div className="blog-post">
      <Link to="/" className="back-link">← Back to Posts</Link>
      
      <article className="post-content">
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span className="author">By {post.author}</span>
          <span className="date">{new Date(post.date).toLocaleDateString()}</span>
        </div>
        
        <div className="post-body">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
      
      <section className="comments-section">
        <h2>Comments ({post.comments.length})</h2>
        
        <div className="comments-list">
          {post.comments.length === 0 ? (
            <p className="no-comments">No comments yet. Be the first to comment!</p>
          ) : (
            post.comments.map(comment => (
              <div className="comment" key={comment.id}>
                <div className="comment-header">
                  <span className="comment-author">{comment.author}</span>
                  <span className="comment-date">{new Date(comment.date).toLocaleDateString()}</span>
                </div>
                <p className="comment-content">{comment.content}</p>
              </div>
            ))
          )}
        </div>
        
        <form className="comment-form" onSubmit={handleCommentSubmit}>
          <h3>Leave a Comment</h3>
          <div className="form-group">
            <label htmlFor="author">Name</label>
            <input
              type="text"
              id="author"
              value={commentForm.author}
              onChange={(e) => setCommentForm({ ...commentForm, author: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Comment</label>
            <textarea
              id="content"
              rows="4"
              value={commentForm.content}
              onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Post Comment</button>
        </form>
      </section>
    </div>
  );
}

export default BlogPost;