import { useState, useEffect } from "react";
import { Container, Owner, Loading, BackButton, RepoInteractions, IssuesList, PageActions, FilterList } from './styles';
import { FaArrowLeft, FaGithub } from 'react-icons/fa';
import api from '../../services/api';

export default function Repository({match}){

  const [repositorio, setRepositorio] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState([
    {state: 'all', label: 'Todas', active: true},
    {state: 'open', label: 'Abertas', active: false},
    {state: 'closed', label: 'Fechadas', active: false},
  ]);
  const [filterIndex, setFilterIndex] = useState(0);

  useEffect(()=>{

    async function load(){
      const nomeRepo = decodeURIComponent(match.params.repos);

      //Carregando informações do repositório + issues
      const [repoData, issuesData] = await Promise.all([
        api.get(`/repos/${nomeRepo}`),
        api.get(`/repos/${nomeRepo}/issues`, {
          //limitando numero de issues e trazendo todas as issues do filter
          params:{
            state: filters.find(f => f.active).state,
            per_page: 5
          }
        })
      ])

      setRepositorio(repoData.data);
      setIssues(issuesData.data);
      setLoading(false);
    }

    load();

  }, [filters, match.params.repos]);


  useEffect(()=>{

    async function loadIssue(){
      const nomeRepo = decodeURIComponent(match.params.repos);

      const response = await api.get(`/repos/${nomeRepo}/issues`,{
        params:{
          state: filters[filterIndex].state,
          page,
          per_page: 5,
        },
      });

      setIssues(response.data);
    }

    loadIssue();

  },[filterIndex, filters, match.params.repos, page])

  function handlePage(action){
    setPage(action === 'back' ? page - 1 : page + 1)
  }

  function handleFilter(index){
    setFilterIndex(index);
  }


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
          <h2>Issues:</h2>

          <FilterList active={filterIndex}>
            {filters.map((filter, index) => (
              <button 
              type="button" 
              key={filter.label}
              onClick={()=>handleFilter(index)} 
              >
                {filter.label}
              </button>
            ))}
          </FilterList>

          {issues.map(issue => (
            <li key={String(issue.id)}>

              <img src={issue.user.avatar_url} alt={issue.user.login} />

              <div>
                <strong>
                  <a target="_blank" rel="noreferrer" href={issue.html_url}>{issue.title}</a>

                  <span style={{ backgroundColor: "#09ab93" }}>{issue.state}</span>

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

        <PageActions>
          <button 
          type="button" 
          onClick={()=> handlePage('back')}
          disabled={page < 2}
          >
            Voltar
          </button> 

          <button type="button" onClick={()=> handlePage('next')}>
            Próxima
          </button>           
        </PageActions>

      </Container>
    </div>
  );
}
