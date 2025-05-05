import { Link } from 'react-router-dom';
//there are two types of link is you can used 
// 1st way using a tag
// 2nd way suing Link

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">Blog Hub</Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/create">Create Post</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;