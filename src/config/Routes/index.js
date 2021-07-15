import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../../pages/Home';
import Bookmarks from '../../pages/Bookmarks';

const Routes = ({data, setMenuSelected}) => {
  return (
    <Switch>
      <Route path="/bookmarks" component={(props) => (<Bookmarks data={data} setMenuSelected={setMenuSelected} {...props}/>)}/>
      <Route path="/home/:category?" component={(props) => (<Home data={data} setMenuSelected={setMenuSelected} {...props}/>)}/>
      <Route path="/">
        <Redirect to="/home" />
      </Route>
    </Switch>
  );
};

export default Routes