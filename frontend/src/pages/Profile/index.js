import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styled.css';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [indicents, setIncidents] = useState([]);
    const history = useHistory();

    //pegando o nome da ONG do armazenamento local
    const ongID = localStorage.getItem('ongID'); 
    const ongName = localStorage.getItem('ongName');    

    //mostrando algo quando o componente é mostrado
    // useEffect => {qual função deve ser executada}, [quais variáveis devem ser observadas]
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongID,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongID]);

    async function handleDeleteIncident(id) {
        try { 
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongID,
                }
            });
        //mantém apenas os incidentes que não tem o mesmo id do que está sendo deletado     
        setIncidents(indicents.filter(incident => incident.id !== id));
        } catch(err) {
            alert('Erro ao deletar o caso, tente novamente');
        }
    }

    function handleLogout() {
        //limpando o armazenamento local (ongID, ongName)
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Logo Be A Hero"/>
                <span>Bem-vinda, {ongName} </span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                {indicents.map(caso => (
                    //identificando cada li
                    <li key={caso.id}> 
                        <strong className="uppercase">caso: </strong>
                        <p>{caso.title}</p>
                        <strong className="uppercase">descrição: </strong>
                        <p>{caso.description}</p>
                        <strong className="uppercase">valor</strong>
                        <p>{Intl.NumberFormat('pt-br',{ style: 'currency', currency: 'BRL' }).format(caso.value)}</p>
                        {/* onClick={handleDeleteIncident(caso.id)} apagaria todos os casos assim que a página abrisse */}
                        <button type="button" onClick={() => handleDeleteIncident(caso.id)}>
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}