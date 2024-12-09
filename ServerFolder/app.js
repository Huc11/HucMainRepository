require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const connectToDatabase = require('./services/mongoose');
const userRoutes = require('./routes/user');
const chatRoutes = require('./routes/chat');
const codeRoutes = require('./routes/code'); // 引入 code 路由
const nbaRoutes = require('./routes/nba');

const app = express();

// 数据库连接
connectToDatabase();

// 中间件
app.use(cors());
app.use(bodyParser.json());

// 路由
app.get('/', (req, res) => {
  res.send("Server is up and running!");
});

app.use('/user', userRoutes); // 用户注册和登录路由
app.use('/api', chatRoutes); // 聊天路由和获取模型列表
app.use('/api/code', codeRoutes);//代码仓库


app.use('/api/nba', nbaRoutes);//nba Routes
// 启动服务器
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});