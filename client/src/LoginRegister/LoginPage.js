import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginstyle.css';
import 'remixicon/fonts/remixicon.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // 使用 useNavigate 钩子
    const baseURL = process.env.NODE_ENV === 'production' 
  ? 'http://www.jianghai3637.online'
  : 'http://localhost:4000'; // 根据环境变量设置不同的baseURL

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setErrorMessage('邮箱或密码不能为空');
        } else {
            setErrorMessage(''); // 清空错误信息
            try {
                const response = await fetch(`${baseURL}/user/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                let data;
                try {
                    // 尝试解析服务器响应
                    data = await response.json();
                } catch (jsonError) {
                    console.error('Failed to parse JSON:', jsonError);
                    throw new Error('服务器返回了无效的数据');
                }

                if (response.ok) {
                    console.log('Login successful:', data);
                      // 假设后端返回的 Token 字段名为 `token`
                const token = data.token;
                // 存储 Token 到 localStorage 中
                localStorage.setItem('authToken', token);
                    navigate('/nav'); // 登录成功后跳转到 NavPage
                } else {
                    setErrorMessage(data.msg || 'Login failed. Please try again.');
                }
            } catch (error) {
                console.error('Login error:', error);
                setErrorMessage(error.message || 'An error occurred. Please try again.');
            }
        }
    };

    // 处理点击注册链接
    const handleRegisterClick = (e) => {
        e.preventDefault();
        navigate('/register'); // 使用 navigate 函数跳转到注册页面
    };

    return (
        <div id="page" className="site login-page">
            <div className="container">
                <div className="form login">
                    <div className="hero">
                        <h1>Sign In to<br />Open the World</h1>
                        <p>
                           如果你没有账号,<br />
                            你能在这 <a href="/register" id="registerLink" onClick={handleRegisterClick}>注册</a>.
                        </p>
                    </div>
                    <div className="main">
                        <form id="loginForm" onSubmit={handleLoginSubmit}>
                            <p>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </p>
                            <p>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <i
                                    className={showPassword ? "ri-eye-line" : "ri-eye-off-line"}
                                    id="togglePassword"
                                    onClick={handleTogglePassword}
                                    style={{ cursor: 'pointer' }}
                                ></i>
                                <a href="#">Recovery password</a>
                            </p>
                            {errorMessage && <div id="error-message" style={{ color: 'red' }}>{errorMessage}</div>}
                            <p>
                                <input type="submit" className="submit" value="Sign In" />
                            </p>
                        </form>
                        <div className="options">
                            <div className="separator">
                                <p>or continue with</p>
                            </div>
                            <ul>
                                <li><a href="#"><i className="ri-google-fill ri-2x"></i></a></li>
                                <li><a href="#"><i className="ri-apple-fill ri-2x"></i></a></li>
                                <li><a href="#"><i className="ri-facebook-fill ri-2x"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
