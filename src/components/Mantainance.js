import React from 'react';
import styled from 'styled-components';
import Context from '../Context';
import Title from './ui/Title';
import Select from './ui/Select';
import Button from './ui/Button';

const MantainanceLayout = styled.div`
  padding: 40px;

  .error {
    color: red;
    margin-top: 20px;
  }

  .notPersistedNote {
    color: #ff6e00;
    margin-top: 20px;
  }
`;

const options = {
  headerOptions: [
    {
      value: 1,
      content: 'Title H1'
    },
    {
      value: 2,
      content: 'Title H2'
    },
    {
      value: 3,
      content: 'Tithe H2 + Link'
    }
  ],
  bodyOptions: [
    {
      value: 1,
      content: 'Image'
    },
    {
      value: 2,
      content: 'Image + CTA'
    },
    {
      value: 3,
      content: 'Paragraph + CTA'
    }
  ],
  footerOptions: [
    {
      value: 1,
      content: 'Link'
    },
    {
      value: 2,
      content: 'Paragraph'
    },
    {
      value: 3,
      content: 'Paragraph + Link'
    }
  ]
}

function Mantainance (props) {
  return (
    <Context.Consumer>
      {contextValue => (
        <MantainanceLayout>
          <Title content='Mantainance'/>
          <Select
            id='header'
            label='Header'
            selectedValue={contextValue.header}
            onChange={props.handleChange}
            options={options.headerOptions}
          />
    
          <Select
            id='body'
            label='Body'
            selectedValue={contextValue.body}
            onChange={props.handleChange}
            options={options.bodyOptions}
          />
    
          <Select
            id='footer'
            label='Footer'
            selectedValue={contextValue.footer}
            onChange={props.handleChange}
            options={options.footerOptions}
          />

          {contextValue.error &&
            <p className='error'>Please make sure you selected all fields before saving</p>
          }

          {contextValue.notPersisted &&
            <p className='notPersistedNote'>Mantainance not saved</p>
          }
    
          <Button
            onClick={props.storeMantainance}
            value='Save'
          />
          <Button
            onClick={props.resetAll}
            value='Reset'
          />
        </MantainanceLayout>
      )}
    </Context.Consumer>
  )
}

export default Mantainance;
