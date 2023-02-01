import logo from './logo.svg';
import './App.css';
import {Route, Routes,BrowserRouter as Router} from 'react-router-dom';
import Home from './Components/Home';
import EditPost from './Components/EditPost';
import AddPost from './AddPost';

function App() {
  return (
    <div className="App">
      <Router>
         <Routes>
             <Route excat path='/' element={ <Home />}></Route>
             <Route excat path='/post/:id' element={ <EditPost />}></Route>
             <Route excat path='/add-post' element={ <AddPost />}></Route>
         </Routes>
      </Router>
    </div>
  );
}

export default App;
