// src/constants/images.js

const IMAGES = {
    // Logo and icons
    LOGO: process.env.PUBLIC_URL + '/img/logo192.png',
    FAVICON: process.env.PUBLIC_URL + '/img/favicon.ico',
  
    // Background images
    HOME_BG: process.env.PUBLIC_URL + '/img/home_bg.jpg',
    BOTTOM_WAVE: process.env.PUBLIC_URL + '/img/bottom_wave.png',
    TOP_WAVE: process.env.PUBLIC_URL + '/img/top_wave.png',
    FOOTER_BG: process.env.PUBLIC_URL + '/img/footer_background.jpg',
  
    // Section images
    ABOUT_IMG: process.env.PUBLIC_URL + '/img/about_img.png',
    CONTACT_IMG: process.env.PUBLIC_URL + '/img/contact_img.png',
  
    // Product images
    DOG_FOOD: process.env.PUBLIC_URL + '/img/dog_food.png',
    CAT_FOOD: process.env.PUBLIC_URL + '/img/cat_food.png',
    SHOP_NOW_DOG: process.env.PUBLIC_URL + '/img/shop_now_dog.png',
    SHOP_NOW_CAT: process.env.PUBLIC_URL + '/img/shop_now_cat.png',
  
    // Product catalog
    PRODUCTS: {
      PRODUCT_1: process.env.PUBLIC_URL + '/img/product_01.jpg',
      PRODUCT_2: process.env.PUBLIC_URL + '/img/product_02.jpg',
      PRODUCT_3: process.env.PUBLIC_URL + '/img/product_03.jpg',
      PRODUCT_4: process.env.PUBLIC_URL + '/img/product_04.jpg',
      PRODUCT_5: process.env.PUBLIC_URL + '/img/product_05.jpg',
      PRODUCT_6: process.env.PUBLIC_URL + '/img/product_06.jpg',
    },
  
    // Helper function to get product image by index
    getProductImage: (index) => {
      return process.env.PUBLIC_URL + `/img/product_${String(index).padStart(2, '0')}.jpg`;
    }
  };
  
  export default IMAGES;