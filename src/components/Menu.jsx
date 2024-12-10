import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Menu({ onClick }) {
  return (
    <button
    style={buttonStyle}
    onClick={onClick}
    >
      <FontAwesomeIcon icon={faBars} size='2x'/>
    </button>
  );
}

const buttonStyle = {
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  outline: 'none',
};

export default Menu;