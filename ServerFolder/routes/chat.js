const express = require('express');
const OpenAI = require('openai');
const router = express.Router();
const Chat = require('../models/Code');

const openai = new OpenAI({
 apiKey: process.env.OPENAI_API_KEY
});

router.get('/chat-history', async (req, res) => {
 try {
   const token = req.headers.authorization?.split(' ')[1];
   if (!token) return res.status(401).json({ error: 'No token provided' });
   
   const chats = await Chat.find().sort({ createdAt: -1 });
   res.json({ chats });
 } catch (error) {
   console.error('Error getting chat history:', error);
   res.status(500).json({ error: 'Failed to get chat history' });
 }
});

router.post('/chat', async (req, res) => {
 const userMessage = req.body.message;
 if (!userMessage) return res.status(400).json({ response: "Message is required" });

 try {
   let chatResponse;
   if (userMessage.includes("你是谁")) {
     chatResponse = "我是胡江海的助手";
   } else if (userMessage.includes("胡江海爱谁")) {
     chatResponse = "唐晨晨";
   } else {
     const response = await openai.chat.completions.create({
       model: 'gpt-4o-2024-08-06',
       messages: [{ role: 'user', content: userMessage }],
       temperature: 0.7,
       max_tokens: 8192,
       top_p: 0.9,
       frequency_penalty: 0.2,
       presence_penalty: 2.0
     });
     chatResponse = response.choices[0].message.content;
   }

   const newChat = new Chat({
     question: userMessage,
     answer: chatResponse,
     theme: 'chat',
     user: req.user._id
   });

   await newChat.save();
   res.json({ response: chatResponse });
 } catch (error) {
   console.error("Error:", error.message);
   res.status(500).json({ response: 'Error processing request' });
 }
});

router.get('/models', async (req, res) => {
 try {
   const response = await openai.models.list();
   res.json(response.data);
 } catch (error) {
   res.status(500).json({ response: 'Error fetching models' });
 }
});

module.exports = router;
