import React from 'react';
import styled from 'styled-components';
import Context from '../Context';
import Title from './ui/Title';

const MetricsLayout = styled.div`
  padding: 40px;

  table {
    width: 100%;
    text-align: center;
  }

  table thead {
    background: #9c6efd;
    color: #ffffff;
  }

  table thead th,
  table tbody td {
    padding: 10px;
  }

  table tbody tr td {
    border-bottom: dashed #6b6b6b 1px;
  }
`;

function percentage (context, section) {
  const headerInteractions = parseInt(context.headerInteractions) || 0;
  const bodyInteractions = parseInt(context.bodyInteractions) || 0;
  const footerInteractions = parseInt(context.footerInteractions) || 0;
  const interactionsTotal = headerInteractions + bodyInteractions + footerInteractions;

  const result = {
    'header': interactionsTotal !== 0 ? (headerInteractions / interactionsTotal) * 100 : 0,
    'body': interactionsTotal !== 0 ? (bodyInteractions / interactionsTotal) * 100 : 0,
    'footer': interactionsTotal !== 0 ? (footerInteractions / interactionsTotal) * 100 : 0,
  }

  return (result[section]).toFixed(2);
}

function Metrics () {
  return (
    <Context.Consumer>
      {contexValue => {
        return (
          <MetricsLayout>
            <Title content='Metrics (last configuration)'/>
      
            <table>
              <thead>
                <tr>
                  <th>Section</th>
                  <th>Interactions</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Header</td>
                  <td>{contexValue.headerInteractions}</td>
                  <td>{percentage(contexValue, 'header')}%</td>
                </tr>
                <tr>
                  <td>Body</td>
                  <td>{contexValue.bodyInteractions}</td>
                  <td>{percentage(contexValue, 'body')}%</td>
                </tr>
                <tr>
                  <td>Footer</td>
                  <td>{contexValue.footerInteractions}</td>
                  <td>{percentage(contexValue, 'footer')}%</td>
                </tr>
              </tbody>
            </table>
          </MetricsLayout>
        )
      }}
    </Context.Consumer>
  )
}

export default Metrics;
