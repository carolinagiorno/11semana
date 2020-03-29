import React, { useState }  from 'react';
//fi -> feather icons
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import './styled.css';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
    const [id, setID] = useState('');
    const history = useHistory();

    async function handleLogon(e) {
        e.preventDefault();
        
        try{
            const response = await api.post('sessions', { id });
            
            //guardando o login no armazenamento local do navegador
            localStorage.setItem('ongID', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');

        } catch(err) {
            alert('Falha no login, tente novamente');
        };

    }
    return (
        <div className="logon-container">
            <section className="form">  
                <img src={logoImg} alt="Logo Be A Hero"/>
                <form onSubmit={handleLogon}>
                    <h1>Faça seu logon</h1>
                    <input
                        type="text"
                        placeholder="Digite seu email"
                        value={id}
                        onChange={e => setID(e.target.value)}
                    />
                    <button type="submit" className="button">Entrar</button>
                    <Link to="/register" className="back-link"><FiLogIn size={16} color="#E02041"/> Não tenho cadastro</Link>
                </form>
            </section>
            <img src={heroesImg} alt="Um grupo de pessoas de costas se abraçando e olhando para cima"/>
        </div>
    );
}