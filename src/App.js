import { useState, useEffect } from 'react';

import CardList from './components/card-list/cardList';
import SearchBox from './components/search-box/searchBox';

import './App.css';

const App = () => {
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });
    setFilteredMonsters(filteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const queryString = event.target.value.toLowerCase();
    setSearchField(queryString);
  };

  return (
    <div className='App'>
      <h1 className='app-title'>Monsters Rolodex</h1>{' '}
      <SearchBox
        className={'monsters-search-box'}
        name={'search-monsters'}
        placeholder={'search monsters'}
        onChangeHandler={onSearchChange}
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;
