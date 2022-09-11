import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';

import Home from '../src/components/views/Home/Home';
import NotFound from '../src/components/views/NotFound/NotFound';
import MainLayout from '../src/components/layout/MainLayout/MainLayout';
import ProductPage from './components/features/ProductPage/ProductPage';
import Cart from './components/features/Cart/Cart';

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductPage/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
