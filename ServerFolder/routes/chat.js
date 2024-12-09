const express = require('express');
const OpenAI = require('openai');

const router = express.Router();

// 检查是否正确加载了 API 密钥
if (!process.env.OPENAI_API_KEY) {
  console.error("Error: OPENAI_API_KEY is not defined in .env file.");
  process.exit(1); // 终止服务器，提示错误
} else {
  console.log("OPENAI_API_KEY successfully loaded.");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 处理 /api/chat 请求
router.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    console.error("Error: 'message' field is missing in the request body.");
    return res.status(400).json({ response: "Error: 'message' field is missing." });
  } else {
    console.log("Received message from client:", userMessage);
  }

  try {
    if (userMessage.includes("你是谁")) {
      return res.json({ response: "我是胡江海的助手" });
    } else if (userMessage.includes("胡江海爱谁")) {
      return res.json({ response: "唐晨晨" });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-2024-08-06',
      messages: [{ role: 'user', content: userMessage }],
      temperature: 0.7,
      max_tokens: 8192,
      top_p: 0.9,
      frequency_penalty: 0.2,
      presence_penalty: 2.0
    });

    const chatResponse = response.choices[0].message.content;
    console.log("Response from OpenAI:", chatResponse);
    res.json({ response: chatResponse });
  } catch (error) {
    console.error("Error communicating with OpenAI:", error.message);
    res.status(500).json({ response: 'Error communicating with AI' });
  }
});

// 获取模型列表
router.get('/models', async (req, res) => {
  try {
    const response = await openai.models.list();
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching models:", error.message);
    res.status(500).json({ response: 'Error fetching models' });
  }
});

module.exports = router;
