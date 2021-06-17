import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 1000px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  input {
    margin: 6px 0;
    padding: 8px;
  }

  button {
    padding: 8px;
    background: #E2FCEF;
    border: 0;
    border-radius: 2px;
    font-weight: bold;
  }
`;


export const Clientes = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;

  h1 {
    margin: 16px 0;
  }

  table {
    th, td {
      text-align: center;
      padding: 4px;
    }

    button {
      background: none;
      border: 0;
    }
  }

`;
