import './App.css';
import './components/css/buttons.style.css';
import { Route } from 'react-router-dom';
import Header from './components/Header.jsx'
import Menu from './components/Menu.jsx'
import Main from './components/Main/Main.jsx'
import BeamPage from './components/BeamPage.jsx'
import BeamProvider from './Provider/BeamProvider';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <BeamProvider>
        <Header />
        <Menu />
        <Route path="/" exact component={Main} />
        <Route path="/:name" component={BeamPage} />
        <Footer />
      </BeamProvider>
    </div>

  );
}

export default App;
