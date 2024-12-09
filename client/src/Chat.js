import React, { useState, useRef, useEffect } from 'react';
import styles from './App.module.css';
import { v4 as uuidv4 } from 'uuid'; // 建议安装uuid库用于生成唯一ID

function Chat() {
    const [input, setInput] = useState("");
    const [chatLog, setChatLog] = useState([]);
    const [chats, setChats] = useState([]); // 新增聊天列表状态
    const [currentChatId, setCurrentChatId] = useState(null); // 当前活跃的聊天ID
    const messagesEndRef = useRef(null);

    // 加载历史聊天记录
    useEffect(() => {
        async function fetchChatHistory() {
            const token = localStorage.getItem('authToken');
            if (!token) {
                console.error("用户未登录");
                return;
            }

            try {
                const response = await fetch('/api/chat-history', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    // 设置聊天列表和最近的聊天
                    setChats(data.chats || []);
                    if (data.chats && data.chats.length > 0) {
                        setCurrentChatId(data.chats[0].id);
                        setChatLog(data.chats[0].messages || []);
                    }
                } else {
                    console.error("获取聊天记录失败");
                }
            } catch (error) {
                console.error("获取聊天记录出错:", error);
            }
        }

        fetchChatHistory();
    }, []);

    // 创建新聊天
    async function handleNewChat() {
        const token = localStorage.getItem('authToken');
        const newChatId = uuidv4(); // 生成唯一ID

        const newChat = {
            id: newChatId,
            title: `新聊天 ${new Date().toLocaleString()}`,
            messages: [],
            createdAt: new Date().toISOString()
        };

        try {
            const response = await fetch('/api/create-chat', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newChat)
            });

            if (response.ok) {
                // 更新本地聊天列表
                setChats(prevChats => [newChat, ...prevChats]);
                setCurrentChatId(newChatId);
                setChatLog([]); // 清空当前聊天记录
            } else {
                console.error("创建新聊天失败");
            }
        } catch (error) {
            console.error("创建新聊天出错:", error);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem('authToken');
        if (!token || !currentChatId) {
            console.error("用户未登录或未选择聊天");
            return;
        }

        // 更新前端聊天记录
        const userMessage = { 
            user: "me", 
            message: input, 
            chatId: currentChatId 
        };
        setChatLog([...chatLog, userMessage]);
        setInput("");

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    message: userMessage.message,
                    chatId: currentChatId 
                }),
            });
            const data = await response.json();
            if (response.ok) {
                const aiMessage = { 
                    user: "AI", 
                    message: data.response, 
                    chatId: currentChatId 
                };
                setChatLog((prevChatLog) => [...prevChatLog, aiMessage]);

                // 更新服务器端的聊天记录
                await fetch('/api/update-chat', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chatId: currentChatId,
                        messages: [...chatLog, userMessage, aiMessage]
                    })
                });
            } else {
                console.error("获取聊天回复失败:", data);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    // 切换聊天
    function handleSwitchChat(chatId) {
        const selectedChat = chats.find(chat => chat.id === chatId);
        if (selectedChat) {
            setCurrentChatId(chatId);
            setChatLog(selectedChat.messages || []);
        }
    }

    // 滚动到最新的消息
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [chatLog]);

    return (
        <div className={styles['chat-App']}>
            <aside className={styles['chat-sidemenu']}>
                <div 
                    className={styles['chat-side-menu-button']} 
                    onClick={handleNewChat}
                >
                    <span>+</span>
                    New Chat
                </div>
                {/* 聊天历史列表 */}
                {chats.map(chat => (
                    <div 
                        key={chat.id}
                        className={`${styles['chat-history-item']} ${chat.id === currentChatId ? styles['active'] : ''}`}
                        onClick={() => handleSwitchChat(chat.id)}
                    >
                        {chat.title}
                    </div>
                ))}
            </aside>
            <section className={styles['chat-chatbox']}>
                <div className={styles['chat-chat-log']}>
                    {chatLog.map((message, index) => (
                        <div
                            key={index}
                            className={`${styles['chat-chat-message']} ${message.user === "AI" ? styles['chat-chatgpt'] : ""}`}
                        >
                            <div className={styles['chat-chat-message-center']}>
                                <div className={`${styles['chat-avatar']} ${message.user === "AI" ? styles['chat-chatgpt'] : ""}`}>
                                    {message.user === "AI" ? "AI" : "我"}
                                </div>
                                <div className={styles['chat-message']}>{message.message}</div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className={styles['chat-chat-input-holder']}>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className={styles['chat-chat-input-textarea']}
                            placeholder="请输入消息..."
                            disabled={!currentChatId}
                        />
                    </form>
                </div>
            </section>
        </div>
    );
}

export default Chat;