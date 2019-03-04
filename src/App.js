import React, { Component } from 'react';
import { debounce } from 'lodash';
import styled from 'styled-components';
import Context from './Context';
import Mantainance from './components/Mantainance';
import Preview from './components/Preview';
import Metrics from './components/Metrics';

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  font-family: Arial;

  @media screen and (max-width: 800px) {
    display: block;
  }
`;

const Column = styled.div`
  flex: ${props => props.w || 1};
`;

const Border = styled.div`
  flex: 100%;
  height: 50px;
  background-image: linear-gradient(to right, #9c6efd , #80c6fb);
  box-sizing: border-box;
  padding: 10px 40px;
  color: #efefef;
  font-size: 14px;

  h1 {
    position: relative;
    top: 3px;
  }

  span {
    color: #ffffff;
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
  }
`;

class App extends Component {
  constructor (props) {
    super (props);
    this.state = {
      header: '',
      headerInteractions: 0,
      body: '',
      bodyInteractions: 0,
      footer: '',
      footerInteractions: 0,
      notPersisted: false,
      error: false
    }

    this.serverURL = 'http://localhost:6006/';
    this.handleChange = this.handleChange.bind(this);
    this.resetAll = this.resetAll.bind(this);
    this.storeMantainance = this.storeMantainance.bind(this);
    this.updateInteraction = debounce(this.updateInteraction.bind(this), 500, { leading: true, trailing: false });
    this.updateInteractionsState = this.updateInteractionsState.bind(this);
  }

  handleChange (section, event) {
    const newState = `{"${section}": "${event.target.value}", "notPersisted": true}`
    const parsedState = JSON.parse(newState);
    this.setState(parsedState);
  }

  resetAll () {
    this.setState({
      header: '',
      headerInteractions: 0,
      body: '',
      bodyInteractions: 0,
      footer: '',
      footerInteractions: 0,
      notPersisted: false,
      error: false
    });
  }

  storeMantainance () {
    this.setState({
      error: false
    });

    if (this.state.header !== '' && this.state.body !== '' && this.state.footer !== '') {
      const body = {
        header: this.state.header,
        body: this.state.body,
        footer: this.state.footer
      }
      const payload = {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json"
        }
      }

      fetch(this.serverURL, payload)
        .then(response => {
          if (response.status === 200) {
            console.log('Mantainance stored successfully');
            this.setState({
              notPersisted: false
            });
          }
          else
          console.log('Error at storing mantainance');
        })
        .catch (err => console.log('Error at storing mantainance: ', err))
    }
    else {
      this.setState({
        error: true
      });
    }
  }

  updateInteraction (section) {
    const payload = {
      method: 'put',
      body: JSON.stringify({section}),
      headers: {
        "Content-Type": "application/json"
      }
    }

    fetch(this.serverURL, payload)
      .then(response => {
        if (response.status === 200) {
          console.log('Interaction updated successfully');
          return response.json();
        }
      }).then(data => {
        this.updateInteractionsState(data);
      })
      .catch (err => console.log('Error at updating interaction: ', err))
  }

  updateInteractionsState (data) {
    this.setState({
      headerInteractions: data.header[data.header.length - 1].interactions,
      bodyInteractions: data.body[data.body.length - 1].interactions,
      footerInteractions: data.footer[data.footer.length - 1].interactions
    });
  }

  render() {
    // prepare context value
    const contextValue = {
      header: this.state.header,
      headerInteractions: this.state.headerInteractions,
      body: this.state.body,
      bodyInteractions: this.state.bodyInteractions,
      footer: this.state.footer,
      footerInteractions: this.state.footerInteractions,
      notPersisted: this.state.notPersisted,
      error: this.state.error
    }
    return (
      <Context.Provider value={contextValue}>
        <Wrapper>
          <Border>
            <h1>TAP</h1>
          </Border>
          <Column w="60%">
            <Mantainance
              handleChange={this.handleChange}
              storeMantainance={this.storeMantainance}
              resetAll={this.resetAll}
            />
            <Metrics />
          </Column>
          <Column w="40%">
            <Preview
              updateInteraction={this.updateInteraction}
            />
          </Column>
          <Border>
            <p>💡You can see all metrics in the CLI <span>[npm run metrics]</span></p>
          </Border>
        </Wrapper>
      </Context.Provider>
    );
  }
}

export default App;
