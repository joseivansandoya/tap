import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SelectLayout = styled.div`
  margin: 10px 0;

  label {
    display: inline-block;
    width: 70px;
  }

  select {
    border: solid black 1px;
    padding: 10px;
    width: 250px;
    height: 35px;
    font-size: 15px;
  }
`;

function Select (props) {
  const {id, label, selectedValue, onChange, options} = props;
  return (
    <SelectLayout>
      <label htmlFor={id}>{label}</label>
      <select id={id} onChange={e => onChange(id, e)} value={selectedValue}>
        <option key={-1} value=''>- Choose one -</option>
        {
          options.map((item, index) => {
            const {value, content} = item;
            return (
              <option 
                key={index}
                value={value}
              >{content}</option>
            )
          })
        }
      </select>
    </SelectLayout>
  )
}

Select.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  selectedValue: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array
}

export default Select;
