import { useState, useEffect } from "react";
import { Container, Owner, Loading, BackButton, RepoInteractions, IssuesList } from './styles';
import { FaArrowLeft, FaGithub } from 'react-icons/fa';
import api from '../../services/api';

export default function Repository({match}){

  const [repositorio, setRepositorio] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{

    async function load(){
      const nomeRepo = decodeURIComponent(match.params.repos);

      //Carregando informações do repositório + issues
      const [repoData, issuesData] = await Promise.all([
        api.get(`/repos/${nomeRepo}`),
        api.get(`/repos/${nomeRepo}/issues`, {
          //limitando numero de issues e trazendo só issues abertas
          params:{
            state: 'open',
            per_page: 5
          }
        })
      ])

      setRepositorio(repoData.data);
      setIssues(issuesData.data);
      setLoading(false);
    }

    load();

  }, [match.params.repos])


  if(loading){
    return(
      <Loading>
        <h1>Carregando...</h1>
      </Loading>
    )
  }
  
  return(
    <div>
      <Container>

        <BackButton to="/">
          <FaArrowLeft color="#0D2636" size={30} />
        </BackButton>

        <Owner>
          <img 
          src={repositorio.owner.avatar_url} 
          alt={repositorio.owner.login} 
          />

          <h1>{repositorio.name}</h1>

          <p>{repositorio.description}</p>
        </Owner> 

        <RepoInteractions>
          <span> 
            <a 
            target="_blank" 
            rel="noreferrer" 
            href={repositorio.homepage}>
              Saiba mais
            </a> 
          </span>

          <a 
            target="_blank"
            rel="noreferrer"
            title="Ver no Github"
            href={repositorio.html_url}>
              <FaGithub size={25}/>
          </a>
        </RepoInteractions>

        <IssuesList>
          <h2>Recent Issues:</h2>

          {issues.map(issue => (
            <li key={String(issue.id)}>

              <img src={issue.user.avatar_url} alt={issue.user.login} />

              <div>
                <strong>
                  <a target="_blank" rel="noreferrer" href={issue.html_url}>{issue.title}</a>

                  <div>
                    {issue.labels.map(label => (
                      <span key={String(label.id)}>
                        {label.name}
                      </span>
                    ))}
                  </div>
                </strong>

                <p>{issue.user.login}</p>
              </div>

            </li>
          ))}
          
        </IssuesList>

      </Container>
    </div>
  );
}
