import Nav from './nav';
import Hero from './hero';
import Secon from './secon'
import Third from './third'
import Footer from './footer'
import Detailes from './detailes'
import Detailess from './detailess';
import TVDetails from './tvDetails';
import OMDBDetails from './omdbDetails';
import 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css';
import 'react-icons/fa';
import 'vanta';
import { BrowserRouter , Routes , Route}from 'react-router-dom';
import Movies from './movies';
import Series from './series';
import Cartoon from './cartoon';
import Booking from './booking';
import Booking2 from './booking2';
import Booking3 from './booking3';
import Booking4 from './booking4';
import Trailer1 from './trailer1';
import Trailer4 from './trailer4';

function App() {
  return (
    <BrowserRouter>
      <Nav />

      <Routes>
        <Route path="/"
          element={
            <>
              <Secon />
              <Hero />
              <Third />
              <Footer />
            </>
          }
        />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/cartoon" element={<Cartoon/>} />
        <Route path="/detailes/:id" element={<Detailes/>} />
        <Route path="/tvDetails/:id" element={<TVDetails/>} />
        <Route path="/omdbDetails/:id" element={<OMDBDetails/>} />
        <Route path="/booking/:id" element={<Booking/>} />
        <Route path="/booking2/:id" element={<Booking2/>} />
        <Route path="/booking3/:id" element={<Booking3/>} />
        <Route path="/booking4/:id" element={<Booking4/>} />
        <Route path="/detailess/:id" element={<Detailess />}/>
        <Route path="/trailer1/:id" element={<Trailer1 />}/>
        <Route path="/trailer4/:id" element={<Trailer4 />}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;