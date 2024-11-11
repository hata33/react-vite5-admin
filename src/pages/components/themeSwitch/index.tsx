import { useEffect, useState } from 'react';
import './index.css';

type themeModal = 'light' | 'night-mode' | 'night-time-mode';
export default function ThemeSwitch() {
  const [currentMode, setCurrentMode] = useState<themeModal>('light');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // 从 localStorage 中读取当前模式
    const savedMode = localStorage.getItem('mode') as themeModal;
    if (savedMode) {
      setCurrentMode(savedMode);
      document.documentElement.className = savedMode;
    }
  }, []);
  useEffect(() => {
    const root = document.querySelector('.css-var-container2') as HTMLElement;
    if (isDarkMode) {
      root.style.setProperty('--primary-color', '#1890ff');
      root.style.setProperty('--border-color', '#ccc');
      root.style.setProperty('--text-color', '#333');
      root.style.setProperty('--background-color', '#fff');
    } else {
      root.style.setProperty('--primary-color', ' #ff6b6b');
      root.style.setProperty('--border-color', ' #444');
      root.style.setProperty('--text-color', '#fff');
      root.style.setProperty('--background-color', '#121212');
    }
  }, [isDarkMode]);

  const toggleMode = (mode: themeModal) => {
    setCurrentMode(mode);
    const container = document.querySelector('.css-var-container') as Element;
    container.classList.remove('light', 'night-mode', 'night-time-mode');
    container.classList.add(mode);
    localStorage.setItem('mode', mode);
  };
  return (
    <div>
      <div className="css-var-container">
        <header className="header">
          <h1>欢迎来到我的网站</h1>
          <div>
            <button onClick={() => toggleMode('light')} className="button">
              日间模式
            </button>
            <button onClick={() => toggleMode('night-mode')} className="button">
              黑夜模式
            </button>
            <button onClick={() => toggleMode('night-time-mode')} className="button">
              夜间模式
            </button>
          </div>
        </header>
        <main className="content">
          <section>
            <h2>这是一个标题</h2>
            <p> 定义多种主题的 css 变量，例如 .night-mode .night-time-mode</p>
            <p> 通过切换 css 选择器来修改对应主题 css 变量</p>
          </section>
        </main>
      </div>
      <div className="css-var-container2">
        <header className="header">
          <h1>欢迎来到我的网站2</h1>
          <div>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="button">
              日间/夜间模式切换
            </button>
          </div>
        </header>
        <main className="content">
          <section>
            <h2>这是一个标题</h2>
            <p>这是一个段落。 直接修改 css 变量</p>
          </section>
        </main>
      </div>
    </div>
  );
}
