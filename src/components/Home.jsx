import { Link } from 'react-router-dom';

function Home({ posts }) {
  return (
    <div className="home">
      <h1>Recent Blog Posts</h1>
      {posts.length === 0 ? (
        <div className="no-posts">
          <p>No blog posts found. Create your first post!</p>
          <Link to="/create" className="btn btn-primary">Create Post</Link>
        </div>
      ) : (
        <div className="posts-grid">
          {posts.map(post => (
            <div className="post-card" key={post.id}>
              <h2>{post.title}</h2>
              <div className="post-meta">
                <span className="author">By {post.author}</span>
                <span className="date">{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <p className="post-excerpt">
                {post.content.substring(0, 150)}...
              </p>
              <div className="post-footer">
                <Link to={`/post/${post.id}`} className="read-more">Read More</Link>
                <span className="comments-count">{post.comments.length} comments</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;