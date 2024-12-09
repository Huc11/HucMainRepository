import React, { useState } from 'react';
import './registerStyle.css'; // 你可以用之前的 CSS 样式文件
import 'remixicon/fonts/remixicon.css';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // 切换密码可见性
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    // 处理注册表单提交
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setErrorMessage('Please enter both email and password.');
        } else {
            setErrorMessage('');
            const data = { email, password };
            try {
                const response = await fetch('http://localhost:4000/user/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();

                if (response.ok) {
                    alert('注册成功');
                    // 注册成功后跳转到登录页面
                    window.location.href = '/';
                } else {
                    setErrorMessage(result.msg || 'Registration failed. Please try again.');
                }
            } catch (error) {
                console.error('Registration error:', error);
                setErrorMessage('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div id="page" className="site register-page">
            <div className="container">
                <div className="form register">
                    <div className="hero">
                        <h1>注册<br />页面</h1>
                        <p>
                            如果你已经有账户了可以在这里 <a href="/" id="loginLink">登录</a>.
                        </p>
                    </div>
                    <div className="main">
                        <form id="registerForm" onSubmit={handleRegisterSubmit}>
                            <p>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </p>
                            <p>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <i
                                    id="togglePassword"
                                    className={showPassword ? "ri-eye-line" : "ri-eye-off-line"}
                                    onClick={handleTogglePassword}
                                    style={{ cursor: 'pointer' }}
                                ></i>
                            </p>
                            {errorMessage && <div id="error-message" style={{ color: 'red' }}>{errorMessage}</div>}
                            <p>
                                <input type="submit" className="submit" value="Register" />
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
