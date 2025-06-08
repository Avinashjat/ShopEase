import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import AdminLogin from './pages/adminLogin';
import AddProduct from './pages/AddProduct';

function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className='pt-16'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add-product' element={<AddProduct />} />
          <Route path='/admin/login' element={<AdminLogin />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
