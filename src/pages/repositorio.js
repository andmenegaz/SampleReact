import React, { useState, useEffect } from 'react';
import api from '../services/api'
import { FaArrowLeft } from 'react-icons/fa'
import styled, { keyframes, css } from 'styled-components'
import { Link } from 'react-router-dom';

export default function Repositorio({ match }) {

    const [repositorio, setRepositorio] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState('open');
    const filters = [
        {state:"all", label:"All"},
        {state:"open", label:"Open"},
        {state:"closed", label:"Closed"}
    ]


    useEffect(() => {
        async function load() {
            setLoading(true);

            const nomeRepo = decodeURIComponent(match.params.repositorio);
            const [repoData, issuesData] = await Promise.all([
                api.get(`/repos/${nomeRepo}`),
                api.get(`/repos/${nomeRepo}/issues`, {
                    params: {
                        state: status,
                        per_page: 5
                    }
                })
            ]);

            setRepositorio(repoData.data);
            setIssues(issuesData.data);
            setLoading(false);
        }

        load();

    }, [match.params.repositorio]);


    useEffect(() => {

        async function loadIssue() {
            const nomeRepo = decodeURIComponent(match.params.repositorio);
            const issuesData = await api.get(`/repos/${nomeRepo}/issues`, {
                params: {
                    state: status,
                    page,
                    per_page: 5
                }
            });

            setIssues(issuesData.data);
        };

        loadIssue();

    }, [page, status, match.params.repositorio]);

    function handlePage(action) {
        setPage(action === 'prev' ? page - 1 : page + 1);
    }

    function handleStatus(status){
        setStatus(status);
        setPage(1);
    }


    if (loading) {
        return (
            <Loading>
                <h1>Carregando...</h1>
            </Loading>
        );
    }
    else {
        return (
            <Container>
                <BackButton to="/">
                    <FaArrowLeft color='#000' size={30} />
                </BackButton>
                <Owner>
                    <img src={repositorio.owner.avatar_url} alt={repositorio.owner.login} />
                    <h1>{repositorio.name}</h1>
                    <p>{repositorio.description}</p>
                </Owner>
                <StatusControl>
                    {filters.map(f => (
                        <button 
                            type="button" 
                            key={f.state}
                            onClick={() => { handleStatus(f.state) }} 
                            disabled={status === f.state}>{f.label}
                        </button>
                    ))}
                </StatusControl>
                <IssuesList>
                    {issues.map(issue => (
                        <li key={String(issue.id)}>
                            <img src={issue.user.avatar_url} alt={issue.user.login} />
                            <div>
                                <strong>
                                    <a href={issue.html_url}>{issue.title}</a>
                                    {issue.labels.map(label => (
                                        <span key={String(label.id)}>{label.name}</span>
                                    ))}
                                </strong>
                                <p>{issue.user.login}</p>
                            </div>
                        </li>
                    ))}
                </IssuesList>

                <PageActions>
                    <button
                        type="button"
                        onClick={() => { handlePage('prev') }}
                        disabled={page < 2}>Voltar
                    </button>
                    <strong>{page}</strong>
                    <button type="button" onClick={() => { handlePage('next') }}>Próxima</button>
                </PageActions>
            </Container>
        )
    }
}

const Container = styled.div`
    max-width: 700px;
    background: #FFF;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    padding: 30px;
    margin: 80px auto;
`;

const Owner = styled.header`
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

const Loading = styled.div`
    color: #FFF;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

const BackButton = styled(Link)`
    border: 0;
    outline: 0;
    background: transparent;
`;

const IssuesList = styled.ul`
    margin-top: 15px;
    padding-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;

    li{
        display: flex;
        padding: 15px 10px;
    }

    img{
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 2px solid #0d2636;
    }

    div{
       flex: 1;
       margin-left: 12px;

       p{
           margin-top: 10px;
           font-size: 12px;
           color: #000;
       }
    }

    strong{
        font-size: 15px;

        a{
            text-decoration: none;
            color: #222;
            transform: 0.3s;

            &:hover{
                color: #0071DB;
            }
        }

        span{
            background: #222;
            color: #FFF;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
            padding: 5px 7px;
            margin-left: 5px;
        }
    }
`;

const PageActions = styled.div`
    display: flex;
    align-items:center;
    justify-content: space-between;

    button{
        outline:0;
        border:0;
        background: #222;
        color: #FFF;
        padding: 5px 10px;
        border-radius: 4px;

        &:disabled{
            cursor: not-allowed;
            opacity: 0.5;
        }
    }
`;

const StatusControl = styled.div`
    display: flex;
    align-items:center;
    justify-content: left;
    margin-top: 15px;

    button{
        outline:0;
        border:0;
        background: #222;
        color: #FFF;
        padding: 5px 10px;
        margin: 5px;
        border-radius: 4px;

        &:disabled{
            cursor: not-allowed;
            opacity: 0.5;
        }
    }
`;
