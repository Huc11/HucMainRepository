import React, { useEffect } from 'react';
import './style.css';
import IMAGES from './images';

function MainPage() {
  useEffect(() => {
    // Navbar toggle functionality
    const navbar = document.querySelector('.header .navbar');
    const menuBtn = document.getElementById('menu-btn');
    const loginBtn = document.getElementById('login-btn');

    if (menuBtn) {
      menuBtn.addEventListener('click', () => {
        navbar.classList.toggle('active');
      });
    }

    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        window.location.href = '/index.html';
      });
    }

    // Scroll functionality for header
    const handleScroll = () => {
      const header = document.querySelector('.header');
      if (window.scrollY > 0) {
        header.classList.add('active');
      } else {
        header.classList.remove('active');
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', handleScroll);
    };
  }, []);

  return (
    <div className='main-page'>
      {/* Header */}
      <header className="header">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
        />
        <a href="#" className="logo">
          <i className="fas fa-paw">shop</i>
        </a>
        <nav className="navbar">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#shop">Shop</a>
          <a href="#plan">Plan</a>
          <a href="#contact">Contact us</a>
        </nav>
        <div className="icons">
          <div className="fas fa-bars" id="menu-btn"></div>
          <a href="#" className="fas fa-shopping-cart"></a>
          <div className="fas fa-user" id="login-btn"></div>
        </div>
      </header>

      {/* Home Section */}
      <section className="home" id="home">
        <div className="content">
          <h3>
            <span>hi </span>welcome to 11 pet shop
          </h3>
          <a href="#" className="btn">
            shop now
          </a>
        </div>
        <img src={IMAGES.BOTTOM_WAVE} className="wave" alt="Bottom Wave" />
      </section>



      {/* About Section */}
      <section className="about" id="about">
        <div className="image">
          <img src={IMAGES.ABOUT_IMG} alt="About Us" />
        </div>
        <div className="content">
          <h3>premium <span>pet food</span> manufacturer</h3>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum sint, dolore perspiciatis iure.</p>
          <a href="#" className="btn">read more</a>
        </div>
      </section>

      {/* Dog and Cat Food Section */}
      <div className="dog-food">
        <div className="image">
          <img src={IMAGES.DOG_FOOD} alt="Dog Food" />
        </div>
        <div className="content">
          <h3> <span>air dried</span> dog food </h3>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          <div className="amount">$15.00 - $30.00</div>
          <a href="#"> <img src={IMAGES.SHOP_NOW_DOG} alt="Shop Now Dog" /> </a>
        </div>
      </div>

      <div className="cat-food">
        <div className="content">
          <h3> <span>air dried</span> cat food </h3>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          <div className="amount">$15.00 - $30.00</div>
          <a href="#"> <img src={IMAGES.SHOP_NOW_CAT} alt="Shop Now Cat" /> </a>
        </div>
        <div className="image">
          <img src={IMAGES.CAT_FOOD} alt="Cat Food" />
        </div>
      </div>

      {/* Shop Section */}
      <section className="shop" id="shop">
        <h1 className="heading"> our <span>products</span> </h1>
        
        <div className="box-container">
          <div className="box">
            <div className="icons">
              <a href="#" className="fas fa-shopping-cart"></a>
              <a href="#" className="fas fa-heart"></a>
              <a href="#" className="fas fa-eye"></a>
            </div>
            <div className="image">
              <img src={IMAGES.PRODUCTS.PRODUCT_1} alt="Product 1" />
            </div>
            <div className="content">
              <h3>air-dried food</h3>
              <div className="amount"> $15.00 - $30.00 </div>
            </div>
          </div>

          <div className="box">
            <div className="icons">
              <a href="#" className="fas fa-shopping-cart"></a>
              <a href="#" className="fas fa-heart"></a>
              <a href="#" className="fas fa-eye"></a>
            </div>
            <div className="image">
              <img src={IMAGES.PRODUCTS.PRODUCT_2} alt="Product 2" />
            </div>
            <div className="content">
              <h3>air-dried food</h3>
              <div className="amount"> $15.00 - $30.00 </div>
            </div>
          </div>

          <div className="box">
            <div className="icons">
              <a href="#" className="fas fa-shopping-cart"></a>
              <a href="#" className="fas fa-heart"></a>
              <a href="#" className="fas fa-eye"></a>
            </div>
            <div className="image">
              <img src={IMAGES.PRODUCTS.PRODUCT_3} alt="Product 3" />
            </div>
            <div className="content">
              <h3>air-dried food</h3>
              <div className="amount"> $15.00 - $30.00 </div>
            </div>
          </div>

          <div className="box">
            <div className="icons">
              <a href="#" className="fas fa-shopping-cart"></a>
              <a href="#" className="fas fa-heart"></a>
              <a href="#" className="fas fa-eye"></a>
            </div>
            <div className="image">
              <img src={IMAGES.PRODUCTS.PRODUCT_4} alt="Product 4" />
            </div>
            <div className="content">
              <h3>air-dried food</h3>
              <div className="amount"> $15.00 - $30.00 </div>
            </div>
          </div>

          <div className="box">
            <div className="icons">
              <a href="#" className="fas fa-shopping-cart"></a>
              <a href="#" className="fas fa-heart"></a>
              <a href="#" className="fas fa-eye"></a>
            </div>
            <div className="image">
              <img src={IMAGES.PRODUCTS.PRODUCT_5} alt="Product 5" />
            </div>
            <div className="content">
              <h3>air-dried food</h3>
              <div className="amount"> $15.00 - $30.00 </div>
            </div>
          </div>

          <div className="box">
            <div className="icons">
              <a href="#" className="fas fa-shopping-cart"></a>
              <a href="#" className="fas fa-heart"></a>
              <a href="#" className="fas fa-eye"></a>
            </div>
            <div className="image">
              <img src={IMAGES.PRODUCTS.PRODUCT_6} alt="Product 6" />
            </div>
            <div className="content">
              <h3>air-dried food</h3>
              <div className="amount"> $15.00 - $30.00 </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plan Section */}
      <section className="plan" id="plan">
        <h1 className="heading"> choose a <span>plan</span> </h1>
        
        <div className="box-container">
          <div className="box">
            <h3 className="title">pet care</h3>
            <h3 className="day"> 1 day </h3>
            <i className="fas fa-bicycle icon"></i>
            <div className="list">
              <p> pet room <span className="fas fa-check"></span> </p>
              <p> pet grooming <span className="fas fa-check"></span> </p>
              <p> pet exercise <span className="fas fa-check"></span> </p>
              <p> pet meals <span className="fas fa-check"></span> </p>
            </div>
            <div className="amount"><span>$</span>50</div>
            <a href="#" className="btn"> choose plan </a>
          </div>

          <div className="box">
            <h3 className="title">pet care</h3>
            <h3 className="day"> 10 days </h3>
            <i className="fas fa-motorcycle icon"></i>
            <div className="list">
              <p> pet room <span className="fas fa-check"></span> </p>
              <p> pet grooming <span className="fas fa-check"></span> </p>
              <p> pet exercise <span className="fas fa-check"></span> </p>
              <p> pet meals <span className="fas fa-check"></span> </p>
            </div>
            <div className="amount"><span>$</span>350</div>
            <a href="#" className="btn"> choose plan </a>
          </div>

          <div className="box">
            <h3 className="title">pet care</h3>
            <h3 className="day"> 30 days </h3>
            <i className="fas fa-car-side icon"></i>
            <div className="list">
              <p> pet room <span className="fas fa-check"></span> </p>
              <p> pet grooming <span className="fas fa-check"></span> </p>
              <p> pet exercise <span className="fas fa-check"></span> </p>
              <p> pet meals <span className="fas fa-check"></span> </p>
            </div>
            <div className="amount"><span>$</span>650</div>
            <a href="#" className="btn"> choose plan </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MainPage;