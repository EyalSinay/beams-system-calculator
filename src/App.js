import "./App.css";
import "./components/css/buttons.style.css";
import { Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
// import Menu from './components/Menu.jsx';
import Main from "./components/Main/Main.jsx";
import BeamPage from "./components/BeamPage/BeamPage";
import BeamProvider from "./Provider/BeamProvider";
// import Footer from './components/Footer';

function App() {
    return (
        <div className="App">
            <BeamProvider>
                <NavBar />
                <div className="main-container-and-menu">
                    {/* <Menu /> */}
                    <Route path="/" exact component={Main} />
                    <Route path="/:name" component={BeamPage} />
                </div>
                {/* <Footer /> */}
            </BeamProvider>
        </div>
    );
}

export default App;
