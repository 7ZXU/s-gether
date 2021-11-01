import React from 'react';
import './Header.css';

function Header() {
  return (
    <div className="header-container">
      <header>
        <div className="header-items">
          <nav>
            <a href="/feed">Feed</a>
            <a href=".">My Challenge</a>
            <a href=".">Search Challenge</a>
            <a href="/mypage">My page</a>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;
