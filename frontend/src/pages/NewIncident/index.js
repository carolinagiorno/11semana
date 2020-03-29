import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import './styled.css';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
    const history = useHistory();

    //criando um estado para cada um dos inputs
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongID = localStorage.getItem('ongID'); 

    async function handleNewIncident(e){ 
        e.preventDefault();

        const data = { 
            title,
            description,
            value,
        };
        
        try {
            await api.post('incidents', data, {
                headers: { 
                    Authorization: ongID,
                }
            });
            history.push('/profile');
        } catch(err) {
            alert('Erro ao cadastrar caso. Tente novamente mais tarde!')
        }
    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logo Be A Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar heróis para ajudar!</p>
                    <Link to='/profile' className="back-link">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para seu perfil
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}    
                    />
                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <div className="button-group">
                        <button className="button" type="submit">Cadastrar</button>
                        <button className="button" type="submit">Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}