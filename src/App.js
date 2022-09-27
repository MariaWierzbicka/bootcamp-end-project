import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';

import Home from '../src/components/views/Home/Home';
import NotFound from '../src/components/views/NotFound/NotFound';
import MainLayout from '../src/components/layout/MainLayout/MainLayout';
import ProductPage from './components/views/ProductPage/ProductPage';
import Cart from './components/features/Cart/Cart';
import Checkout from './components/views/Checkout/Checkout';

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductPage/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
