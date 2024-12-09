// middleware/auth.js

const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // 从请求头中获取 Token

  if (!token) {
    return res.status(401).json({ msg: '没有权限，访问被拒绝' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // 将用户信息存入 req 对象
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token 无效' });
  }
};
