import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Item {
  id: number;
  createdAt: string;
  task: string;
}

function Items(props: { categoryId: number }) {
  const [items, setItems] = useState<Array<Item>>([]);

  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:8080/item/byCategoryId?categoryId=${props.categoryId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios
      .request(config)
      .then(response => {
        setItems(response.data as Item[]);
      })
      .catch(error => {
        console.error('Error: ', error);
      });
  }, [props.categoryId]);

  return (
    <div>
      {items ? (
        <>
          <ul>
            {items.map(item => (
              <li key={item.id}>
                {item.task} - {item.createdAt}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading items...</p>
      )}
    </div>
  );
}

export default Items;
