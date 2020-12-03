import React, { useState, useEffect } from 'react';

import './styles.css';

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  async function updateRepositories() {
    const response = await api.get('/repositories');
    setRepositories(response.data);
  }

  useEffect(() => {
    updateRepositories();
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: 'Teste',
      url: 'teste.com',
      techs: ['NodeJS', 'ReactJS'],
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}

            <button
              type="button"
              onClick={() => handleRemoveRepository(repository.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button type="button" onClick={handleAddRepository}>
        Adicionar
      </button>
    </div>
  );
}

export default App;
