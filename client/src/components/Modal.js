import React, { useState } from 'react';
import '../css/Modal.css';
import InputText from './InputText';

function Modal(props) {
  const {
    open,
    close,
    header,
    username,
    setValue,
    saveValue,
    check,
    placeholder,
  } = props;

  const [input, setInput] = useState('');

  const onChangeNickname = (e) => {
    setInput(e.target.value);
    // setName(e.target.value);
    console.log(e.target.value);
  };

  const onClickSave = () => {
    console.log(input);

    if (setValue) {
      setValue(input);
    }

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
              placeholder={placeholder}
              onChange={onChangeNickname}
            ></InputText>
          </main>
          <footer>
            <button className="close" onClick={onClickSave}>
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
