import './App.css';
import Main from './components/Main.jsx'
import BeamProvider from './Provider/BeamProvider';

function App() {
  return (
    <BeamProvider>
      <div className="App">
        <Main />
      </div>
    </BeamProvider>
  );
}

export default App;
