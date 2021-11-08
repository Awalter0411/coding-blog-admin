import {BrowserRouter as Router,Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login'
const App = () => {
  return ( 
    <Router>
      <Route path='/login' exact component={Login} />
      <Route path='/index' exact component={Home} />
    </Router>
   );
}
 
export default App;