import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonInstance = styled.button`
  padding: 10px 30px;
  margin-right: 10px;
  margin-top: 40px;
  border: solid black 1px;
  background: #9c6efd;
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;

  :hover {
    background: #7551c1;
  }
`;

function Button (props) {
  return (
    <ButtonInstance onClick={props.onClick}>{props.value}</ButtonInstance>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
}

export default Button;
