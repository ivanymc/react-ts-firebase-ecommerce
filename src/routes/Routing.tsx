import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Basket from '../pages/Basket';
import WishList from '../pages/WishList';
import Shop from '../pages/Shop';
import NonFound from '../pages/NonFound';
import ProductPage from '../pages/ProductPage';
import ShopMan from '../pages/ShopMan';
import ShopWoman from '../pages/ShopWoman';

const Routing: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/man" element={<ShopMan />} />
            <Route path="/shop/woman" element={<ShopWoman />} />
            <Route path="/shop/:itemID" element={<ProductPage />}/>
            <Route path="/wish-list" element={<WishList />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NonFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default Routing