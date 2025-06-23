import React from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, FileTextOutlined } from '@ant-design/icons';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CourseReportPage from '../pages/CourseReportPage';

const { Header, Content } = Layout;

const AppLayout = () => {
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">首頁</Link>,
    },
    {
      key: '/course-report',
      icon: <FileTextOutlined />,
      label: <Link to="/course-report">課程報表</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        display: 'flex', 
        alignItems: 'center',
        padding: '0 50px',
        background: '#001529'
      }}>
        <div style={{ 
          color: 'white', 
          fontSize: '18px', 
          fontWeight: 'bold', 
          marginRight: '50px' 
        }}>
          課程報表系統
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/course-report" element={<CourseReportPage />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default AppLayout; 