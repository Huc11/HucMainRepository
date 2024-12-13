// routes/code.js

const express = require('express');
const Code = require('../models/Code');
const { verifyToken } = require('../middleware/auth'); // 引入身份验证中间件
const router = express.Router();

// 添加代码路由
router.post('/add', verifyToken, async (req, res) => {
  const { question, answer, theme } = req.body;

  if (!question || !answer || !theme) {
    return res.status(400).json({ msg: '请输入所有字段' });
  }

  try {
    const newCode = new Code({
      question,
      answer,
      theme,
      user: req.user.id, // 使用解码后的用户 ID
    });

    await newCode.save();
    res.status(200).json({ msg: '问题和代码添加成功!' });
  } catch (err) {
    console.error('添加代码错误:', err);
    res.status(500).json({ msg: '服务器错误' });
  }
});

// 添加删除代码路由
router.delete('/delete/:id', verifyToken, async (req, res) => {
 try {
   const code = await Code.findById(req.params.id);
   if (!code) return res.status(404).json({ msg: '代码不存在' });
   
   // 验证用户
   if (code.user.toString() !== req.user.id) {
     return res.status(401).json({ msg: '用户无权限' });
   }

   await Code.findByIdAndDelete(req.params.id);
   res.json({ msg: '代码已删除' });
 } catch (err) {
   console.error('删除代码错误:', err);
   res.status(500).json({ msg: '服务器错误' });
 }
});


// 获取用户代码列表
router.get('/list', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // 从认证中间件中获取用户 ID
    const codes = await Code.find({ user: userId }); // 查找属于该用户的所有代码

    res.status(200).json({ codes });
  } catch (err) {
    console.error('获取代码错误:', err);
    res.status(500).json({ msg: '服务器错误' });
  }
});

module.exports = router;
