import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Items from './Items';

interface Category {
  id: number;
  title: string;
}

function App() {
  const [categories, setCategories] = useState<Array<Category>>([]);

  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/category/all',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios
      .request(config)
      .then(response => {
        setCategories(response.data as Category[]);
      })
      .catch(error => {
        console.error('Error: ', error);
      });
  }, []);

  return (
    <div>
      {categories ? (
        <div>
          <h1>Response:</h1>
          <ul>
            {categories.map(item => (
              <li key={item.id}>
                <p>{item.title}</p>
                <Items categoryId={item.id}/>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading categories...</p>
      )}
    </div>
  );
}

export default App;
