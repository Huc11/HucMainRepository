import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AceEditor from 'react-ace';
import './QueryCodes.css';

const baseURL = process.env.NODE_ENV === 'production' 
  ? 'http://www.jianghai3637.online'
  : 'http://localhost:4000';

function QueryCodes() {
    const [codes, setCodes] = useState([]);
    const [selectedCode, setSelectedCode] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCodes = async () => {
            const token = localStorage.getItem('authToken'); // 确保与登录保存的键名一致
            if (!token) {
                setMessage('用户未登录，请先登录');
                return;
            }

            try {
                const response = await fetch(`${baseURL}/api/code/list`, { 
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setCodes(data.codes); // 使用 data.codes 获取代码列表
                } else {
                    setMessage('查询代码失败，请重试。');
                }
            } catch (error) {
                console.error('查询错误:', error);
                setMessage('服务器错误，请稍后重试。');
            }
        };

        fetchCodes();
    }, []);

    const handleSelectCode = (code) => {
        setSelectedCode(code);
    };

    return (
        <div className="query-container">
            <h2>用户代码列表</h2>
            {message && <p>{message}</p>}
              
            <ul className="code-list">
    {codes.map((code, index) => (
        <li key={index} className="code-item" style={{ cursor: 'pointer' }}>
            <span className="code-text" onClick={() => handleSelectCode(code)}>
                题目 {index + 1}: {code.question}
            </span>
            <button 
                className="delete-btn"
                onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(code._id);
                }}
            >
                删除
            </button>
        </li>
    ))}
</ul>
      
            
            {selectedCode && (
                <div className="code-details">
                    <h3>题目: {selectedCode.question}</h3>
                    <p>主题: {selectedCode.theme}</p>
                    <AceEditor
                        mode="java"
                        theme={selectedCode.theme}
                        width="100%"
                        height="400px"
                        value={selectedCode.answer}
                        readOnly
                        name="UNIQUE_ID_OF_DIV"
                        editorProps={{ $blockScrolling: true }}
                    />
                    <button onClick={() => setSelectedCode(null)}>返回列表</button>
                </div>
            )}
        </div>
    );
}

export default QueryCodes;
