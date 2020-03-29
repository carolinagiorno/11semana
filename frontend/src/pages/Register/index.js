import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import './styled.css';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

export default function Register() {
    //criando um estado para cada um dos inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUF] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        // e -> evento (no caso, submit)
        //previne recarregamento automatico da pagina depois de enviar o formulario
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };
        //console.log(data);

        try {
            await api.post('ongs', data);
            //alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/');
        } catch(err) {
            alert('Erro no cadastro. Tente novamente mais tarde!')
        }
    }


    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logo Be A Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem casos da sua ONG.</p>
                    <Link to='/' className="back-link">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Já tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}> 
                    <input 
                        placeholder="Nome da ONG"
                        value={name}
                        //quando há um evento, trocar valor pelo valor do alvo do evento
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />
                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input 
                            placeholder="UF" 
                            style={{ width: 80 }} 
                            value={uf}
                            onChange={e => setUF(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}