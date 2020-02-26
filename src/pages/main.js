import React, { useState, useCallback, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components'
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Main() {

    const [newRepo, setNewRepo] = useState();
    const [repositorios, setRepositorios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    // Buscar
    useEffect(() =>{
        const repoStorage = localStorage.getItem('repos');

        if(repoStorage){
            setRepositorios(JSON.parse(repoStorage));
        }
    }, []);
    // Salvar Alterações
    useEffect(() =>{
        localStorage.setItem('repos', JSON.stringify(repositorios));
    }, [repositorios]);

    function handleInputChange(e) { 
        setNewRepo(e.target.value); 
        setAlert(null);
    }

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        async function submit() {
            setLoading(true);
            try {
                if (newRepo === '')
                {
                    throw new Error('Você precisa indicar um repositório');
                }
                const response = await api.get(`repos/${newRepo}`);

                const hasRepo = repositorios.find(repo => repo.name === newRepo);

                if (hasRepo)
                {
                    throw new Error('Repositorio Duplicado');
                }

                const data = {
                    name: response.data.full_name,
                }

                setRepositorios([...repositorios, data]);
                setNewRepo('');
            }
            catch (error) {
                setAlert(true);
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        submit();
    }, [newRepo, repositorios]);

    const handledelete = useCallback((repo) => {
        const find = repositorios.filter(r => r.name !== repo);
        setRepositorios(find);
    }, [repositorios]);


    return (
        <Container>
            <h1>
                <FaGithub size={25} />
                Meus repositorios
            </h1>

            <Form onSubmit={handleSubmit} error={alert}>
                <input type="text" placeholder="Adicionar Repositorios"
                    value={newRepo}
                    onChange={handleInputChange} />

                <SubmitButton loading={loading ? 1 : 0}>
                    {loading ?
                        <FaSpinner color="#FFF" size={14} />
                        :
                        <FaPlus color="#FFF" size={14} />
                    }

                </SubmitButton>
            </Form>
            <List>
                {repositorios.map(repo =>(
                  <li key={repo.id}>
                      <span>
                          <DeleteButton onClick={() => handledelete(repo.name)}><FaTrash size={14}/></DeleteButton>
                          {repo.name}
                          </span>
                      <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}><FaBars size={20} /></Link>
                  </li>
                ))}
            </List>
        </Container>
    )
}

const Container = styled.div`
    max-width: 700px;
    background: #FFF;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0,0,0, 0.2);
    padding: 30px;
    margin: 80px auto;

    h1{
        font-size: 20px;
        display: flex;
        align-items: center;
        flex-direction: row;

        svg{
            margin-right: 10px;

        }
    }
`;

const Form = styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: row;

    input{
        flex: 1;
        border: 1px solid ${props => (props.error ? '#FF0000' : '#DDD')};
        border-radius: 4px;
        padding: 10px 15px;
        font-size: 17px;
    }
`;

const animate = keyframes`
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
`
const SubmitButton = styled.button.attrs(props => (
    {
        type: 'submit',
        disabled: props.loading,
    }))`
    background: #0d2636;
    border:0;
    border-radius: 4px;
    margin-left: 10px;
    padding: 0 15px;
    display: flex;
    justify-content: center;

    &[disabled]{
        cursor: not-allowed;
        opacity: 0.5
    }
    ${props => props.loading &&
        css`
           svg{
               animation: ${animate} 2s linear infinite;
           }
        `
    }
`;

const List = styled.ul`
    list-style: nome;
    margin-top: 20px;

    li{
        padding: 15px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        & + li{
            border-top: 1px solid #eee;
        }
    }

    a{
        color:#0D2636;
        text-decoration: none;
    }
`;

const DeleteButton = styled.button.attrs({type:'button'})`
    margin-left: 6px;
    background: transparent;
    color:#0d2636;
    border:0;
    padding: 8px 7px;
    outline: 0;
    border-radius: 4px;
`;
