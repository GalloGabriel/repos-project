import React, { useState, useCallback, useEffect } from "react";
import { Container, Form, SubmitButton, List, DeleteButton } from './styles';
import { Link } from 'react-router-dom';
import { FaGithub, FaPlus, FaSpinner, FaExternalLinkAlt, FaTrash } from 'react-icons/fa';

import api from '../../services/api';

export default function Main(){

  const [newRepo, setNewRepo] = useState('');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);


  //Buscar
  useEffect(() => {

    const repoStorage = localStorage.getItem('repos');

    if(repoStorage){
      setRepos(JSON.parse(repoStorage));
    }

  }, []);

  //Salvar alterações
  useEffect(() => {

    localStorage.setItem('repos', JSON.stringify(repos));

  }, [repos]);


  const handleSubmit = useCallback((e)=>{
    e.preventDefault();

    async function submit(){
      setLoading(true);
      setAlert(null);

      try{

        //input de busca está vazio
        if(newRepo === ""){
          throw new Error('Você precisa digitar um repositório.');
        }

        const response = await api.get(`repos/${newRepo}`);

        //verificando se já existe repositório na lista
        const hasRepo = repos.find(repo => repo.name === newRepo);
        if(hasRepo){
          throw new Error('Repositório duplicado');
        }

        const data = {
          name: response.data.full_name,
          id: response.data.id,
        }

        setRepos([...repos, data]);

        setNewRepo('');
      }catch(error){
        setAlert(true);
        console.log(error);
      }finally{
        setLoading(false)
      }
      
    }

    submit();

  }, [newRepo, repos]);

  function handleInputChange(e){
    setNewRepo(e.target.value);
    setAlert(null);
  }


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

      <Form onSubmit={handleSubmit} error={alert}>
        <input 
        type="text" 
        placeholder="Adicionar Repositórios" 
        value={newRepo}
        onChange={handleInputChange}
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
            <Link to={`/repos/${encodeURIComponent(repo.name)}`}>
              <FaExternalLinkAlt size={16} />
            </Link>
          </li>
        ))}
      </List>

    </Container>
  );
}
