import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ComicsPage from './ComicsPage.jsx';
import './index.css';

const Root = () => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (nextPath) => {
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath);
      setPath(nextPath);
    }
  };

  if (path === '/comics') {
    return <ComicsPage onNavigateHome={() => navigate('/')} />;
  }

  return <App onNavigateToComics={() => navigate('/comics')} />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
