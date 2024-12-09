const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

// 用户注册路由
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: '请输入所有字段' });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: '用户已存在' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(200).json({ msg: '用户注册成功' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: '服务器错误' });
  }
});

// 用户登录路由
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: '请输入所有字段' });
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: '邮箱或密码错误' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: '邮箱或密码错误' });
    }

     // 生成 JWT Token
     const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }, // Token 有效期为 1 小时
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ msg: '登录成功', token }); // 返回登录成功消息和Token
      }
    );
  } catch (err) {
    console.error('登录错误:', err);
    res.status(500).json({ msg: '服务器错误' });
  }
});

module.exports = router;
