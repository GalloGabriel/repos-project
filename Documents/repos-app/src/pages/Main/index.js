import React, { useState, useCallback } from "react";
import { Container, Form, SubmitButton, List, DeleteButton } from './styles';
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa';

import api from '../../services/api';

export default function Main(){

  const [newRepo, setNewRepo] = useState('');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);


  const handleSubmit = useCallback((e)=>{
    e.preventDefault();

    async function submit(){
      setLoading(true);

      try{
        const response = await api.get(`repos/${newRepo}`);

        const data = {
          name: response.data.full_name,
          id: response.data.id,
        }

        setRepos([...repos, data]);

        setNewRepo('');
      }catch(error){
        console.log(error);
      }finally{
        setLoading(false)
      }
      
    }

    submit();

  }, [newRepo, repos]);


  const handleDelete = useCallback((repo) => {

    const find = repos.filter(r => r.name !== repo);

    setRepos(find);

  }, [repos])


  return(
    <Container>
      
      <h1>
        <FaGithub size={25} />
        Meus Repositórios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input 
        type="text" 
        placeholder="Adicionar Repositórios" 
        value={newRepo}
        onChange={(e)=>{setNewRepo(e.target.value)}}
        />

        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#fff" size={14} />
          ) : (
            <FaPlus color="#fff" size={14} />
          )}
        </SubmitButton>
      </Form>

      <List>
        {repos.map(repo => (
          <li key={repo.id}>
            <span>
              <DeleteButton onClick={() => handleDelete(repo.name)}>
                <FaTrash size={14} />
              </DeleteButton>
              {repo.name}
            </span>
            <a href="">
              <FaBars size={20} />
            </a>
          </li>
        ))}
      </List>

    </Container>
  );
}
