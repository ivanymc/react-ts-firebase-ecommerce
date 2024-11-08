import React from "react";
import { AiOutlineHeart, AiOutlineShoppingCart, AiOutlineUser, AiOutlineShopping, AiOutlineMan, AiOutlineWoman } from "../assets/Icon";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <>
      <div className="navbar bg-base-100 mb-1 px-3 sm:px-10 xl:px-20">
        <div className="navbar-start">
        <div className="dropdown">
            {/* small icon and mean */}
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle sm:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content z-50 shadow bg-base-100 rounded-box w-40">
              {/* <li className="mb-2">
                <Link to="/shop" className="">
                  <AiOutlineShopping className="w-6 h-6"/> 
                  <span className="text-sm"> Shop </span>
                </Link>
              </li> */}
              <li className="mb-2">
                <Link to="/shop/man" className="">
                  <AiOutlineMan className="w-6 h-6" /> 
                  <span className="text-sm"> MAN </span>
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/shop/woman" className="">
                  <AiOutlineWoman className="w-6 h-6" /> 
                  <span className="text-sm"> WOMAN </span>
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/wish-list" className="">
                  <AiOutlineHeart className="w-6 h-6" /> 
                  <span className="text-sm"> WISH LIST </span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="btn btn-ghost text-xl">
            <Link to="/">
              <span className="invisible font-titleFont uppercase tracking-wider font-bold text-xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-400"> IVANSHOP </span>
            </Link>
          </div>

          <button className="btn btn-ghost btn-sm hidden sm:flex z-50"> 
            <Link to="/shop/man">
              <span className="text-sm"> MAN </span>
            </Link>
          </button>

          <button className="btn btn-ghost btn-sm hidden sm:flex z-50"> 
            <Link to="/shop/woman">
              <span className="text-sm"> WOMAN </span>
            </Link>
          </button>
        </div>

        {/* <div className="navbar-center">
        </div> */}

        <div className="navbar-end">
            <Link to="/shop" className="mx-1 " title="Shop">
              <button className="btn btn-ghost btn-circle hidden sm:flex">
                <AiOutlineShopping className="w-6 h-6" title="Shop"/> 
                {/* <span className="text-sm">Shop</span> */}
              </button>
            </Link>
            <Link to="/wish-list" className="mx-1 " title="Wish List">
              <button className="btn btn-ghost btn-circle hidden sm:flex">
                <AiOutlineHeart className="w-6 h-6 " /> 
                {/* <span className="text-sm">Wish List</span> */}
              </button>
            </Link>
            <Link to="/basket" className="mx-1 indicator" title="Basket">
              <button className="btn btn-ghost btn-circle">
                <span className="indicator-item badge badge-xs badge-warning mt-2 mr-1 p-2"> 1 </span>
                <AiOutlineShoppingCart className="w-6 h-6" /> 
                {/* <span className="text-sm mt-1">Basket</span> */}
              </button>
            </Link>
            <Link to="/login" className="mx-1 " title="Login">
              <button className="btn btn-ghost btn-circle">
                <AiOutlineUser className="w-6 h-6" />
                {/* <span className="text-sm mt-1">Account</span> */}
              </button>
            </Link>       
        </div>
      </div>
    </>
  );
};

export default Header;