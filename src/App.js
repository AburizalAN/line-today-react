import { useEffect, useState } from 'react';
import resource from './resources/portaljson.json';
import "bootstrap/dist/css/bootstrap.css";

import Navbar from './components/Navbar';
import './styles/main.scss';
import Routes from './config/Routes';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {

  const [ categoryLists, setCategoryLists ] = useState();
  const [ menuData, setMenuData ] = useState({});
  const [ menuSelected, setMenuSelected ] = useState('TOP');
  const dataJson = resource;

  const getCategoryLists = (dataJson) => {
    setCategoryLists(dataJson.result.categories);
  }

  const getMenuData = (dataJson, menuSelected) => {
    const findData = dataJson?.result?.categories?.find((data) => data?.name === menuSelected);
    setMenuData(findData);
  }

  useEffect(() => {
    getCategoryLists(dataJson);
    console.log(dataJson);
  }, [dataJson]);

  useEffect(() => {
    getMenuData(dataJson, menuSelected);
  }, [dataJson, menuSelected]);

  return (
    <div className="App">
      <Router>
        <Navbar 
          categoryLists={categoryLists} 
          setMenuSelected={setMenuSelected} 
          menuSelected={menuSelected}
        />
        <Routes data={menuData} setMenuSelected={setMenuSelected} />
      </Router>
    </div>
  );
}

export default App;
