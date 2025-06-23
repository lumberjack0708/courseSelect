import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhTW from 'antd/locale/zh_TW';
import AppLayout from './components/Layout';
import Home from './components/Home';
import CourseReport from './components/CourseReport';
import 'antd/dist/reset.css';
import './App.css';

function App() {
  return (
    <ConfigProvider locale={zhTW}>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/course-report" element={<CourseReport />} />
          </Routes>
        </AppLayout>
      </Router>
    </ConfigProvider>
  );
}

export default App;
