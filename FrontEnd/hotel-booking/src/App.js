// Desc: Main App component
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Bookings from './Pages/Bookings/Bookings';
import BookingsConfirmation from './Pages/BookingsConfirmation/BookingsConfirmation';
import NavBar from './Utils/NavBar';
import E404Page from './Pages/404Page/E404Page';

function App() {
  return (
    <>
      <NavBar />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/bookings-confirmation" element={<BookingsConfirmation />} />
            <Route path="*" element={<E404Page />} />
         </Routes>
      </>

  );
}

export default App;
