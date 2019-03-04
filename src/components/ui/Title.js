import React from 'react';
import styled from 'styled-components';

const H2Instance = styled.h2`
  margin-bottom: 40px;
  border-bottom: solid black 1px;
  padding-bottom: 10px;
`;

function Title (props) {
  return (
    <H2Instance className="title">{props.content}</H2Instance>
  )
}

export default Title;
