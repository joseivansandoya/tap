import React from 'react';
import styled from 'styled-components';
import Context from '../Context';
import Title from './ui/Title';
import Button from './ui/Button';

const PreviewLayout = styled.div`
  position: relative;
  padding: 40px;

  .viewport {
    border: solid black 20px;
    border-radius: 20px;
    padding: 10px;
    width: 220px;
    height: 400px;
    background: #f2f2f2;
    text-align: center;
    margin: 0 auto;
  }

  .viewport img {
    max-width: 100%;
  }

  .viewport .header,
  .viewport .body,
  .viewport .footer {
    margin-bottom: 20px;
  }

  .viewport p {
    color: #6b6b6b;
    font-size: 14px;
  }

  .viewport a {
    cursor: pointer;
    color: #9c6efd;
    font-weight: bold;
    margin-top: 10px;
  }

  .viewport div {
    opacity: 0.7;
    cursor: default;
  }

  .viewport div:hover {
    opacity: 1;
  }

  .notPersisted {
    background: rgba(255, 255, 255, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
`;

function Preview (props) {
  return (
    <Context.Consumer>
      {contextValue => (
        <PreviewLayout>
          {
            contextValue.notPersisted &&
            <div className='notPersisted'></div>
          }
          <Title content='Preview'/>
          
          <div className='viewport'>
            <div className='header' onClick={e => props.updateInteraction('header', e)}>
              {
                contextValue.header === '1' &&
                <h1>I am an H1 title</h1>
              }
              {
                (contextValue.header === '2' || contextValue.header === '3') &&
                <h2>I am an H2 title</h2>
              }
              {
                contextValue.header === '3' &&
                <a>And I am a link</a>
              }
            </div>

            <div className='body' onClick={e => props.updateInteraction('body', e)}>
              {
                (contextValue.body === '1' || contextValue.body === '2') &&
                <img src="https://pbs.twimg.com/profile_banners/185953628/1534517599/1500x500" />
              }
              {
                contextValue.body === '3' &&
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus ut ante a auctor. Vestibulum congue est et risus egestas accumsan. Vestibulum lacinia nisl lectus, id convallis ex suscipit ut.</p>
              }
              {
                (contextValue.body === '2' || contextValue.body === '3') &&
                <Button
                  onClick={()=>{}}
                  value='I am a CTA'
                />
              }
            </div>

            <div className='footer' onClick={e => props.updateInteraction('footer', e)}>
              {
                (contextValue.footer === '2' || contextValue.footer === '3') &&
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus ut ante a auctor. Vestibulum congue est et risus egestas accumsan. Vestibulum lacinia nisl lectus, id convallis ex suscipit ut.</p>
              }
              {
                (contextValue.footer === '1' || contextValue.footer === '3') &&
                <a>I am a link</a>
              }
            </div>
          </div>
        </PreviewLayout>
      )}
    </Context.Consumer>
  )
}

export default Preview;
