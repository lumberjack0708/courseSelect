import React from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, TableOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const { Header, Content } = Layout;

const AppLayout = ({ children }) => {
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">首頁</Link>,
    },
    {
      key: '/course-report',
      icon: <TableOutlined />,
      label: <Link to="/course-report">課程報表</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div 
          style={{ 
            color: 'white', 
            fontSize: '20px', 
            fontWeight: 'bold',
            marginRight: '24px'
          }}
        >
          課程選擇系統
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ backgroundColor: '#f0f2f5' }}>
        {children}
      </Content>
    </Layout>
  );
};

export default AppLayout; 