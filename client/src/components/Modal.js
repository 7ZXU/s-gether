import React, { useState } from 'react';
import '../css/Modal.css';
import InputText from './InputText';

function Modal(props) {
  const { open, close, header, username, setValue, saveValue } = props;

  const [input, setInput] = useState('');

  const onChangeNickname = (e) => {
    setInput(e.target.value);
    // setName(e.target.value);
    console.log(e.target.value);
  };

  const onClickSave = () => {
    console.log(input);
    setValue(input);
    saveValue(input);
    close();
  };
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              {' '}
              &times;{' '}
            </button>
          </header>
          <main>
            <InputText
              defaultValue={username}
              placeholder="닉네임을 입력하세요"
              onChange={onChangeNickname}
            ></InputText>
          </main>
          <footer>
            <button className="close" onClick={onClickSave}>
              {' '}
              저장{' '}
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
}

export default Modal;
