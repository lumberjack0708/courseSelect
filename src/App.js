import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhTW from 'antd/locale/zh_TW';
import AppLayout from './components/Layout';
import './App.css';

function App() {
  return (
    <ConfigProvider locale={zhTW}>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
