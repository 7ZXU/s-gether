import React, { useState } from 'react';
import '../css/Modal.css';

function Modal(props) {
  const { open, close, setText, check } = props;

  const onClickClose = () => {
    close();
  };
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            <button className="close" onClick={onClickClose}>
              {' '}
              &times;{' '}
            </button>
          </header>
          <main>
            <p style={{ fontSize: 16 }}>{setText}</p>
          </main>
          <footer>
            <button className="close" onClick={onClickClose}>
              {' '}
              {check}{' '}
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
}

export default Modal;
