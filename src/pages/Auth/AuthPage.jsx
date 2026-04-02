import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus, FaEye, FaEyeSlash, FaSun, FaMoon } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { useModal } from '../../context/ModalContext';
import { AuthService } from '../../services/api';
import './AuthPage.css';

export default function AuthPage() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const { showModal } = useModal();
    
    const [isRightPanelActive, setIsRightPanelActive] = useState(location.pathname === '/register');

    useEffect(() => {
        setIsRightPanelActive(location.pathname === '/register');
    }, [location.pathname]);

    const togglePanel = (path) => {
        navigate(path);
    };

    // --- LOGIN STATE ---
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [loginErrors, setLoginErrors] = useState({});

    // --- REGISTER STATE ---
    const [regData, setRegData] = useState({
        firstname: '', lastname: '', address: '', email: '', password: '', confirmPassword: ''
    });
    const [showRegPassword, setShowRegPassword] = useState(false);
    const [showRegConfirm, setShowRegConfirm] = useState(false);
    const [regErrors, setRegErrors] = useState({});
    const [focusedInput, setFocusedInput] = useState(null);
    const [acceptTerms, setAcceptTerms] = useState(false);

    // --- LOGIC ---
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(prev => !prev);

    const changeLang = (lang) => {
        i18n.changeLanguage(lang);
    };
    const currentLang = i18n.language || 'az';

    const validateLogin = () => {
        let isValid = true;
        const newErrors = {};
        if (!loginEmail) { newErrors.email = t('auth.err_email_req'); isValid = false; }
        else if (!/\S+@\S+\.\S+/.test(loginEmail)) { newErrors.email = t('auth.err_email_invalid'); isValid = false; }
        
        if (!loginPassword) { newErrors.password = t('auth.err_pass_req'); isValid = false; }
        setLoginErrors(newErrors);
        return isValid;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (!loginEmail || !loginPassword) {
            showModal(t('auth.login_empty_err'), 'error');
            return;
        }

        try {
            const response = await AuthService.login({
                email: loginEmail,
                password: loginPassword
            });
            const userData = response.data.user;
            
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }

            login({
                id: userData.id,
                name: userData.name,
                email: userData.email,
                firstname: userData.firstname,
                lastname: userData.lastname,
                address: userData.address || ''
            });
            navigate('/');
        } catch (error) {
            const msg = error.response?.data?.message || t('auth.login_invalid_err');
            showModal(msg, 'error');
        }
    };

    const checkPasswordStrength = (pass) => {
        let strength = 0;
        if (pass.length >= 8) strength += 25;
        if (pass.match(/[A-Z]/)) strength += 25;
        if (pass.match(/[0-9]/)) strength += 25;
        if (pass.match(/[^A-Za-z0-9]/)) strength += 25;
        return strength;
    };
    const strength = checkPasswordStrength(regData.password);

    const validateRegister = () => {
        let isValid = true;
        const newErrors = {};

        if (!regData.firstname || !regData.lastname || !regData.address || !regData.email || !regData.password || !regData.confirmPassword) {
            showModal(t('auth.empty_fields'), 'error');
            return false;
        }

        if (regData.firstname.length < 3) { newErrors.firstname = t('auth.fname_pop'); isValid = false; }
        if (regData.lastname.length < 5) { newErrors.lastname = t('auth.lname_pop'); isValid = false; }
        if (regData.address.length < 4) { newErrors.address = t('auth.address_pop'); isValid = false; }
        if (!/\S+@\S+\.\S+/.test(regData.email)) { newErrors.email = t('auth.err_email_format'); isValid = false; }
        if (strength < 75) { newErrors.password = t('auth.err_pass_weak'); isValid = false; }
        if (regData.password !== regData.confirmPassword) { newErrors.confirmPassword = t('auth.err_pass_match'); isValid = false; }
        
        if (!acceptTerms) {
            showModal(t('auth.terms_req'), 'error');
            isValid = false;
        }

        setRegErrors(newErrors);
        return isValid;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (validateRegister()) {
            try {
                await AuthService.register({
                    firstname: regData.firstname,
                    lastname: regData.lastname,
                    address: regData.address,
                    email: regData.email,
                    password: regData.password
                });
                showModal(t('auth.alert_success'), 'success');
                navigate('/login');
            } catch (error) {
                const msg = error.response?.data?.message;
                if (msg) {
                    showModal(msg, 'error');
                } else if (error.response?.data?.errors?.email) {
                    showModal(t('auth.email_used_err'), 'error');
                } else {
                    showModal(t('auth.register_err') || 'Qeydiyyat zamanı xəta baş verdi.', 'error');
                }
            }
        }
    };

    return (
        <main className="auth-wrapper">
            <div className={`auth-container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="auth-container">
                
                {/* SIGN UP FORM */}
                <div className="auth-form-container sign-up-container">
                    <button type="button" className="auth-theme-toggle register-theme" onClick={toggleTheme}>
                        {isDarkMode ? <FaSun /> : <FaMoon />}
                    </button>
                    <div className="auth-lang-switcher">
                            <button type="button" className={currentLang === 'az' ? 'active' : ''} onClick={() => changeLang('az')}>AZ</button>
                            <button type="button" className={currentLang === 'en' ? 'active' : ''} onClick={() => changeLang('en')}>EN</button>
                            <button type="button" className={currentLang === 'ru' ? 'active' : ''} onClick={() => changeLang('ru')}>RU</button>
                        </div>
                    <form className="auth-form" onSubmit={handleRegister}>
                        <h1>{t('auth.register_title')}</h1>
                        
                        <div className="register-grid">
                            <div className="input-group">
                                {focusedInput === 'firstname' && <div className="popover active">{t('auth.fname_pop')}</div>}
                                <input type="text" placeholder={t('auth.fname_label')} value={regData.firstname} onChange={(e) => setRegData({...regData, firstname: e.target.value})} onFocus={() => setFocusedInput('firstname')} onBlur={() => setFocusedInput(null)} style={{ borderColor: regErrors.firstname ? 'var(--danger)' : '' }} />
                                {regErrors.firstname && <div className="auth-error-msg">⚠ {regErrors.firstname}</div>}
                            </div>
                            <div className="input-group">
                                {focusedInput === 'lastname' && <div className="popover active">{t('auth.lname_pop')}</div>}
                                <input type="text" placeholder={t('auth.lname_label')} value={regData.lastname} onChange={(e) => setRegData({...regData, lastname: e.target.value})} onFocus={() => setFocusedInput('lastname')} onBlur={() => setFocusedInput(null)} style={{ borderColor: regErrors.lastname ? 'var(--danger)' : '' }} />
                                {regErrors.lastname && <div className="auth-error-msg">⚠ {regErrors.lastname}</div>}
                            </div>
                            <div className="input-group full-width">
                                {focusedInput === 'address' && <div className="popover active">{t('auth.address_pop')}</div>}
                                <input type="text" placeholder={t('auth.address_label')} value={regData.address} onChange={(e) => setRegData({...regData, address: e.target.value})} onFocus={() => setFocusedInput('address')} onBlur={() => setFocusedInput(null)} style={{ borderColor: regErrors.address ? 'var(--danger)' : '' }} />
                                {regErrors.address && <div className="auth-error-msg">⚠ {regErrors.address}</div>}
                            </div>
                            <div className="input-group full-width">
                                {focusedInput === 'email' && <div className="popover active">{t('auth.email_pop')}</div>}
                                <input type="email" placeholder={t('auth.email_label')} value={regData.email} onChange={(e) => setRegData({...regData, email: e.target.value})} onFocus={() => setFocusedInput('email')} onBlur={() => setFocusedInput(null)} style={{ borderColor: regErrors.email ? 'var(--danger)' : '' }} />
                                {regErrors.email && <div className="auth-error-msg">⚠ {regErrors.email}</div>}
                            </div>
                            <div className="input-group">
                                {focusedInput === 'password' && <div className="popover active">{t('auth.pass_pop')}</div>}
                                <input type={showRegPassword ? 'text' : 'password'} placeholder={t('auth.pass_label')} value={regData.password} onChange={(e) => setRegData({...regData, password: e.target.value})} onFocus={() => setFocusedInput('password')} onBlur={() => setFocusedInput(null)} style={{ borderColor: regErrors.password ? 'var(--danger)' : '' }} />
                                <span className="input-icon" onClick={() => setShowRegPassword(!showRegPassword)}>
                                    {showRegPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                                {regErrors.password && <div className="auth-error-msg">⚠ {regErrors.password}</div>}
                            </div>
                            <div className="input-group">
                                {focusedInput === 'confirmPassword' && (
                                    <div className={`popover active ${regData.password && regData.password === regData.confirmPassword ? 'success-popover' : ''}`}>
                                        {regData.password && regData.password === regData.confirmPassword ? t('auth.pass_match_success') : t('auth.pass_conf_pop')}
                                    </div>
                                )}
                                <input type={showRegConfirm ? 'text' : 'password'} placeholder={t('auth.pass_conf_label') || "Şifrə Təkrarı"} value={regData.confirmPassword} onChange={(e) => setRegData({...regData, confirmPassword: e.target.value})} onFocus={() => setFocusedInput('confirmPassword')} onBlur={() => setFocusedInput(null)} style={{ borderColor: regErrors.confirmPassword ? 'var(--danger)' : '' }} />
                                <span className="input-icon" onClick={() => setShowRegConfirm(!showRegConfirm)}>
                                    {showRegConfirm ? <FaEyeSlash /> : <FaEye />}
                                </span>
                                {regErrors.confirmPassword && <div className="auth-error-msg">⚠ {regErrors.confirmPassword}</div>}
                            </div>
                        </div>

                        {regData.password.length > 0 && (
                            <div className="password-strength" style={{ width: '100%' }}>
                                <div className="strength-bar">
                                    <div className={`strength-fill ${strength<=25?'weak':strength<=50?'fair':strength<=75?'good':'strong'}`} style={{ width: `${strength}%` }}></div>
                                </div>
                            </div>
                        )}

                        <div className="terms-group full-width">
                            <label className="terms-label">
                                <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />
                                <span>
                                    {t('auth.terms_accept')} 
                                    <Link to="/terms" state={{ fromAuth: true }}>{t('auth.terms_link')}</Link> 
                                    {t('auth.and')} 
                                    <Link to="/privacy" state={{ fromAuth: true }}>{t('auth.privacy_link')}</Link>
                                </span>
                            </label>
                        </div>

                        <button className="auth-submit-btn" type="submit">{t('auth.btn_register')}</button>
                        
                        {/* Mobile Fallback Matcher */}
                        <div className="mobile-toggle">
                            {t('auth.has_account')} <span onClick={() => togglePanel('/login')}>{t('auth.btn_login')}</span>
                        </div>
                    </form>
                </div>

                {/* SIGN IN FORM */}
                <div className="auth-form-container sign-in-container">
                    <button type="button" className="auth-theme-toggle login-theme" onClick={toggleTheme}>
                        {isDarkMode ? <FaSun /> : <FaMoon />}
                    </button>
                    <div className="auth-lang-switcher">
                        <button type="button" className={currentLang === 'az' ? 'active' : ''} onClick={() => changeLang('az')}>AZ</button>
                        <button type="button" className={currentLang === 'en' ? 'active' : ''} onClick={() => changeLang('en')}>EN</button>
                        <button type="button" className={currentLang === 'ru' ? 'active' : ''} onClick={() => changeLang('ru')}>RU</button>
                    </div>
                    <form className="auth-form" onSubmit={handleLogin}>
                        <h1>{t('auth.login_title')}</h1>
                        <div className="input-group">
                            <input type="email" placeholder={t('auth.email_label')} value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} style={{ borderColor: loginErrors.email ? 'var(--danger)' : '' }} />
                            {loginErrors.email && <div className="auth-error-msg">⚠ {loginErrors.email}</div>}
                        </div>
                        <div className="input-group">
                            <input type={showLoginPassword ? 'text' : 'password'} placeholder={t('auth.pass_label')} value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} style={{ borderColor: loginErrors.password ? 'var(--danger)' : '' }} />
                            <span className="input-icon" onClick={() => setShowLoginPassword(!showLoginPassword)}>
                                {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                            {loginErrors.password && <div className="auth-error-msg">⚠ {loginErrors.password}</div>}
                        </div>
                        <button className="auth-submit-btn" type="submit">{t('auth.btn_login')}</button>
                        
                        <div style={{ marginTop: '20px', textAlign: 'center', width: '100%' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t('auth.forgot_pass_q')}</span> 
                            <Link to="/forgot-password" style={{ color: 'var(--primary)', fontWeight: 'bold', marginLeft: '6px', textDecoration: 'none', fontSize: '0.95rem' }}>
                                {t('auth.forgot_pass_link')}
                            </Link>
                        </div>
                        
                        {/* Mobile Fallback Matcher */}
                        <div className="mobile-toggle">
                            {t('auth.no_account')} <span onClick={() => togglePanel('/register')}>{t('auth.register_link')}</span>
                        </div>
                    </form>
                </div>

                {/* OVERLAY PANEL */}
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>{t('auth.overlay_left_title')}</h1>
                            <p>{t('auth.overlay_left_text')}</p>
                            <button className="ghost-btn" onClick={() => togglePanel('/login')}>{t('auth.btn_login')}</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>{t('auth.overlay_right_title')}</h1>
                            <p>{t('auth.overlay_right_text')}</p>
                            <button className="ghost-btn" onClick={() => togglePanel('/register')}>{t('auth.register_title')}</button>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
