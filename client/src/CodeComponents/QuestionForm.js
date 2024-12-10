import React, { useState } from 'react';
import './QuestionForm.css';
import { useNavigate } from 'react-router-dom';
import AceEditor from 'react-ace';

// Import Ace Editor modes and themes
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-solarized_light';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/theme-cobalt';
import 'ace-builds/src-noconflict/theme-ambiance';

const THEMES = [
  { value: 'monokai', label: 'Monokai' },
  { value: 'dracula', label: 'Dracula' },
  { value: 'solarized_dark', label: 'Solarized Dark' },
  { value: 'solarized_light', label: 'Solarized Light' },
  { value: 'github', label: 'GitHub' },
  { value: 'twilight', label: 'Twilight' },
  { value: 'cobalt', label: 'Cobalt' },
  { value: 'ambiance', label: 'Ambiance' },
];

const baseURL = process.env.NODE_ENV === 'production' 
  ? 'http://www.jianghai3637.online'
  : 'http://localhost:4000';

function QuestionForm() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [theme, setTheme] = useState('github'); // Default theme
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(`${baseURL}/api/code/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
         },
        body: JSON.stringify({ question, answer,theme }),
      });

      if (response.ok) {
        setMessage('问题添加成功!');
        setQuestion('');
        setAnswer('');
      } else {
        setMessage('添加问题失败，请重试。');
      }
    } catch (error) {
      console.error('提交错误:', error);
      setMessage('服务器错误，请稍后重试。');
    }
  };

  const handleQuery = () => {
    navigate('/query');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          className="input-question"
          type="text"
          placeholder="题目"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <div className="theme-selector">
          <label htmlFor="theme">选择主题: </label>
          <select
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            {THEMES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div className="editor-container">
          <AceEditor
            mode="java"
            theme={theme}
            width="100%"
            height="400px"
            value={answer}
            onChange={setAnswer}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 4,
            }}
          />
        </div>

        <div className="button-container">
          <button type="submit">添加</button>
          <button type="button" onClick={handleQuery}>查询</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default QuestionForm;
