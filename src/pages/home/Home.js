import Header from "../../layout/header/Header";
import Product from "../../components/home/Product";
import "./Home.css";
import BannerSlider from "../../components/home/BannerSlider.js";

import React, { useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const Home = () => {
  const [searchValue, setSearchValue] = useState(null);
  const [detailedProducts, setDetailedProducts] = useState([]);
  let navigate = useNavigate();

  const search = (e) => {
    if (e.key === "Enter") {
      navigate("/products");
    }
  };

  useEffect(async () => {
    if (searchValue !== "" || searchValue !== null) {
      let uri = `http://52.54.44.196:4000/api/v1/product/searchProduct/?value=${searchValue}`;
      try {
        const res = await axios.get(uri);
        setDetailedProducts(res.data.data.slice(0, 20));
        return res.data;
      } catch (e) {
        throw e;
      }
    } else {
      setDetailedProducts([]);
    }
  }, [searchValue]);

  return (
    <>
      <nav className="header">
        {/* add trox logo instead of amazon */}
        {/* importing local image from folder src={require('../assets/banner_image/banner_image_1.jpg')}*/}
        <Link to="/" className="header__link">
          <img
            src={require("../../assets/logo/trox.png")}
            alt="logo"
            className="header__logo"
          />
        </Link>
        <div className="header__search">
          <input
            type="text"
            defaultValue={searchValue}
            className="header__searchInput"
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            onKeyDown={search}
          />
          {/* <SearchIcon className="header__searchIcon" /> */}
        </div>
        <div className="header__nav">
          {/* Link 1 */}
          <Link to="/login" className="header__link">
            <div className="header__option">
              <span className="header__optionOne">Hello, User</span>
              <span className="header__optionTwo">Sign in</span>
            </div>
          </Link>
          {/* Link 2 */}
          <Link to="/" className="header__link">
            <div className="header__option">
              <span className="header__optionOne">Returns</span>
              <span className="header__optionTwo">& Orders</span>
            </div>
          </Link>
          <Link to="/support" className="header__link">
            <div className="header__option">
              <span className="header__optionOne">Help</span>
              <span className="header__optionTwo">& Support</span>
            </div>
          </Link>
        </div>
        {/* cart icon with number */}
        <Link to="/checkout" className="header__link">
          <div className="header__optionCart">
            <ShoppingCartIcon />
            {/* number of item in cart */}
            <span className="header__optionTwo header__cartCount">2</span>
          </div>
        </Link>
      </nav>
      {/* <Header/> */}
      <div className="home">
        <BannerSlider />
        {/* add categories here */}
        {/* <div className="home__row"> */}
        {detailedProducts.length
          ? detailedProducts.map((item) => (
              <Product
                id={item?.id}
                title={item?.title}
                price={item?.price}
                brand={item?.brand}
                desc={item?.description}
                rating={5}
                image="https://m.media-amazon.com/images/I/61O9tWR6WDS._SX522_.jpg"
              />
            ))
          : null}
        {/* </div> */}
      </div>
    </>
  );
};

export default Home;
