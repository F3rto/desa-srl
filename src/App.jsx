import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './assets/component/Home.jsx';
import Negozio from './assets/component/Negozio.jsx';
import Private from './assets/component/Private.jsx';
import Contatti from './assets/component/Contatti.jsx';
import Navbar2 from './assets/component/Navbar2.jsx';
import AreaRiservata from './assets/component/AreaRiservata';
import DettaglioArticolo from './assets/component/DettaglioArticolo';
import { ArticoloProvider } from './ArticoloContext';

// Componente per la logica dei contatti
function ContattiWrapper() {
  const location = useLocation();

  // Condizione: nascondi "Contatti" solo su `/articolo/:nome/:codice`
  const shouldShowContatti = !location.pathname.startsWith('/articolo/');

  return shouldShowContatti ? <Contatti /> : null;
}

function App() {
  return (
    <Router>
      <div className='contenitore'>
        <Navbar2 />
        <ArticoloProvider>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/negozio/*' element={<Negozio />} />
            <Route exact path='/private' element={<Private />} />
            <Route exact path='/area_riservata' element={<AreaRiservata />} />
            <Route path='/articolo/:nome/:codice' element={<DettaglioArticolo />} />
          </Routes>
        </ArticoloProvider>
      </div>
      <div>
        <ContattiWrapper />
      </div>
    </Router>
  )
}

export default App