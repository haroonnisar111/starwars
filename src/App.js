import React, { useState, useEffect } from 'react';
import CardList from './components/card-list/card-list.component';
import './App.css';
import { Pagination, Stack } from '@mui/material';

const App = () => {
  const [monsters, setMonsters] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    fetch(`https://swapi.dev/api/planets/?page=${pageNo}&format=json`)
      .then(response => response.json())
      .then(data => setMonsters(data.results));
  }, [pageNo]);
  function changePageNumber(e, value) {
    setPageNo(value);
  }

  return (
    <Stack
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        m: 3,
      }}
    >
      <h1 className='app-title'>Star Wars Planets Directory </h1>
      <CardList Cards={monsters} />
      <Stack
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          m: 2,
        }}
      >
        <Pagination
          count={7}
          onChange={changePageNumber}
          variant='outlined'
          color='primary'
        />
      </Stack>
    </Stack>
  );
};

export default App;
