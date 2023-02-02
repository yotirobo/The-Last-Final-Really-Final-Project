import React, { useState, useEffect } from 'react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [myDataBase, setMyDataBase] = useState([]);
  const [mediaName , setMediaName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/admin/allMedia`);
      const data = await response.json();
      setMyDataBase(data);
    };
    fetchData();
  }, []);
  async function deleteMovieFromDataBase() {
    const response = await fetch(`http://localhost:5000/admin/media/deleteMovie?movieName=${mediaName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        deleted : 1 
      })  
    })
    const data = await response.json();
    if (data) {
        alert('movie deleted successfully');
    }else{
        alert('movie not deleted please try again');
    }
};
  const [filteredResults, setFilteredResults] = useState(myDataBase);

  const handleChange = event => {
    setMediaName(event.target.value);
    setSearchTerm(event.target.value);
    const newResults = myDataBase.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredResults(newResults);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleChange} />
      <ul>
        {filteredResults.map(result => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
      <button onClick={deleteMovieFromDataBase}>Delete!</button>
    </div>
  );
};

export default SearchBar;