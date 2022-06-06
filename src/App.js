import './App.css';
import './components/css/buttons.style.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header.jsx'
import Menu from './components/Menu.jsx'
import Main from './components/Main/Main.jsx'
import BeamPage from './components/BeamPage.jsx'
import BeamProvider from './Provider/BeamProvider';

function App() {
  return (
    <BeamProvider>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Menu />
          <Route path="/" exact component={Main} />
          <Route path="/:id" component={BeamPage} />
        </div>
      </BrowserRouter>
    </BeamProvider>
  );
}

export default App;
