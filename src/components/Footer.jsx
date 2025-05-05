import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="container">
            <p>© 2025 Blog Platform | Built with React & Vite | Developed by Ankit</p>
            <p>
                <a target='_blank' href="https://www.linkedin.com/in/ankit-5ab596292/"><LinkedInIcon /></a>
                <a target='_blank' href="https://github.com/ankit8394"><GitHubIcon/></a>
            </p>
        </div>
      </footer>
    </div>
  )
}

export default Footer;
