import styled from 'styled-components';
import { Link } from 'react-router-dom';


export const Loading = styled.div`
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Container = styled.div`
  max-width: 700px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0,0,0,0.2);
  padding: 30px;
  margin: 80px auto;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;


  img{
    width: 150px;
    border-radius: 20%;
    margin: 20px 0;
  }

  h1{
    font-size: 30px;
    color: #0D2636;
  }

  p{
    margin-top: 5px;
    font-size: 14px;
    color: #000;
    text-align: center;
    line-height: 1.4;
    max-width: 400px;
  }
`;

export const BackButton = styled(Link)`
  border: 0;
  outline: 0;
  background: transparent;
`;

export const RepoInteractions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;

  a{
    text-decoration: none;
    color: #0D2636;
    font-weight: bold;
    padding: 0 10px;
  }
  a:hover{
    text-decoration: underline;
    
  }
`;

export const IssuesList = styled.ul`
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;


  h2{
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 26px;
    color: #0D2636;
  }

  li{
    display: flex;
    padding: 15px 10px;

    & + li{
      margin-top: 12px;
    }

  }

  img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid #0D2636;
  }

  div{
    flex: 1;
    margin-left: 12px;


    p{
      font-size: 13px;
      color: #000;
      font-weight: bold;
    }
  }

  strong{
    font-size: 15px;

    a{
      text-decoration: none;
      color: rgba(0, 113, 219, .9);
      transition: 0.3s;

      &:hover{
        color: rgba(0, 113, 219, 1.5);
        font-weight: bold;
        text-decoration: underline;
      }
    }

    div{
      margin: 10px -10px;
    }

    span{
      background: #0D2636;
      color: #fff;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      padding: 4px 7px;
      margin-left: 10px;
    }
  }
`;

export const PageActions = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
  margin-top: 20px;

  button{
    outline: 0;
    border: 0;
    background-color: #0D2636;
    color: #fff;
    padding: 5px 10px;
    border-radius: 4px;

    &:disabled{
      background-color: #fff;
      color: #fff;
      cursor: auto;
    }
  }
`;