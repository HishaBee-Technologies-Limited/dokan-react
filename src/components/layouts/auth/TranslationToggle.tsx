'use client';
import { useState } from 'react';

const TranslateToggle = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  const translateChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setToggle(event.target.checked);
  };

  return (
    <div className="switch">
      <input
        checked={toggle}
        onChange={translateChangeHandler}
        type="checkbox"
        id="language-toggle"
        className="check-toggle check-toggle-round-flat"
      />
      <label htmlFor="language-toggle"></label>
      <span className="on">বাং</span>
      <span className="off">EN</span>
    </div>
  );
};

export default TranslateToggle;
