import React from 'react';
import '../css/Header.css';

function Header() {
  return (
    <div className="header-container">
      <header>
        <div className="header-items">
          <nav>
            <a href="/feed">Feed</a>
            <a href="/myChallenge">My Challenge</a>
            <a href="/challenges">Search Challenge</a>
            <a href="/mypage">My page</a>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;
