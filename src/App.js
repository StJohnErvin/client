import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { fetchResponses } from './services/api';
import DataTable from './components/DataTable';
import Header from './components/Header';
import './App.css';

const socket = io(process.env.REACT_APP_SOCKET_URL);

function App() {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const initialData = await fetchResponses();
      setResponses(initialData || []); 
    };

    loadData();

    socket.on('new_data', (newData) => {
      if (newData) {
        setResponses((prevData) => [newData, ...prevData]);
      }
    });

    return () => {
      socket.off('new_data');
    };
  }, []);

  return (
    <div className="app">
      <Header title="Real-Time Response Dashboard" />
      <DataTable data={responses} />
    </div>
  );
}

export default App;
