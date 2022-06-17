// This i my attempt at the task, I did not quite figure out how to change and save
// a new title, but you can check out how I solved the rest of the task.

import { useState, useEffect } from 'react';
import axios from 'axios';
import FeatherIcon from 'feather-icons-react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [changeText, setChangeText] = useState(false);

  useEffect(() => {
    const getArticles = async () => {
      const result = await axios.get(
        'https://storage.googleapis.com/aller-structure-task/test_data.json'
      );
      const articlesData = result.data;
      console.log(articlesData[0]);
      setData(articlesData[0]);
    };
    getArticles();
  }, []);

  return (
    <div className='App'>
      <header>
        <div>
          <h1>Aller Media Interview Task</h1>
        </div>
      </header>
      <div>
        {data.map((articles, index) => {
          return (
            <>
              <div className='articleWrapper' key={index}>
                {articles.columns.map((article, index) => {
                  return (
                    <article
                      key={index}
                      className='articleItem'
                      style={{
                        gridColumn: `span ${article.width}`,
                      }}
                    >
                      <img src={article.imageUrl} alt={article.title}></img>
                      {!changeText ? (
                        <>
                          <a href={article.url}>
                            <h2>{article.title}</h2>
                          </a>
                          <FeatherIcon
                            icon='edit'
                            className='editIcon'
                            onClick={() => setChangeText(true)}
                          ></FeatherIcon>
                        </>
                      ) : (
                        <>
                          <input type='text'></input>
                          <FeatherIcon
                            icon='check'
                            className='editIcon'
                            onClick={() => setChangeText(false)}
                          ></FeatherIcon>
                        </>
                      )}
                    </article>
                  );
                })}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default App;
