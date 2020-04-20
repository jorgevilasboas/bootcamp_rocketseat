import React, { useState, useEffect } from 'react';

import api from './services/api'
import './App.css'
import backgroundImage from './assets/background.jpg'

import Header from './components/Header'

export default function App() {
    const [projects, setProjects] = useState([])


    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data)
        });
    }, [])



    async function handleAddProject() {
        const response = await api.post('projects', {
            title: `Novo Projeto ${Date.now()}`,
            owner: "Jorge"
        })

        const project = response.data;
        setProjects([...projects, project])
        console.log('LISTA: ', [...projects, project])
        console.log('Data:', project)
    }
    return (
        <>
            <Header title="Projects">

                <img src={backgroundImage} alt="BackGround Image" />
                <ul>
                    {projects.map(p => <li key={p.id} >{p.title}</li>)}
                </ul>
                <button type="button" onClick={handleAddProject}> Adicionar Projeto</button>
            </Header>
        </>
    );
}
