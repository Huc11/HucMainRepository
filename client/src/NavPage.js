import React from 'react';
import './navpage.css'; // 引入新的样式文件
import '@fortawesome/fontawesome-free/css/all.min.css'; // 引入 Font Awesome 图标库
function NavPage() {
  return (
    <div className= 'nav-page' >
    <section className="services" id="services">
      <h1 className="heading">
        我的 <span>项目</span>
      </h1>
      <div className="box-container">
        <div className="box">
          <i className="fas fa-dog"></i>
          <h3>人工智能聊天</h3>
          <a href="/chat" className="btn">进入</a>
        </div>
        <div className="box">
          <i className="fas fa-cat"></i>
          <h3>宠物商店</h3>
          <a href="/pet" className="btn">进入</a>
        </div>
        <div className="box">
          <i className="fas fa-bath"></i>
          <h3>代码仓库</h3>
          <a href="/code" className="btn">进入</a>
        </div>
      </div>
    </section>
    </div>
  );
}

export default NavPage;
