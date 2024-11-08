import React from 'react';
import Header from '../components/Header';
import Counter from '../redux/counter/Counter';

const WishList: React.FC = () => {
  return (
    <>
      <Header />
      <div>WishList</div>
      <Counter />
    </>
  )
}

export default WishList;