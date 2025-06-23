import React from 'react';
import { Card, Typography, Row, Col, Button, Space, Divider } from 'antd';
import { FileTextOutlined, BarChartOutlined, TableOutlined, SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

const HomePage = () => {
  return (
    <div className="home-container">
      <Card>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Title level={1} style={{ marginBottom: '16px', color: '#1890ff' }}>
            <FileTextOutlined style={{ marginRight: '12px' }} />
            課程報表系統
          </Title>
          <Paragraph style={{ fontSize: '18px', color: '#666', marginBottom: '24px' }}>
            歡迎使用課程報表系統，這裡您可以查看和管理所有課程資訊
          </Paragraph>
        </div>

        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} md={12} lg={8}>
            <Card 
              hoverable 
              style={{ 
                textAlign: 'center',
                height: '280px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ padding: '20px 0' }}>
                <TableOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
                <Title level={3} style={{ marginBottom: '12px' }}>課程資料表</Title>
                <Paragraph style={{ marginBottom: '20px', minHeight: '48px' }}>
                  查看完整的課程清單，包含課程名稱、時間、教師等詳細資訊
                </Paragraph>
                <Link to="/course-report">
                  <Button type="primary" size="large" style={{ borderRadius: '6px' }}>
                    檢視課程報表
                  </Button>
                </Link>
              </div>
            </Card>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Card 
              hoverable 
              style={{ 
                textAlign: 'center',
                height: '280px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ padding: '20px 0' }}>
                <SearchOutlined style={{ fontSize: '48px', color: '#52c41a', marginBottom: '16px' }} />
                <Title level={3} style={{ marginBottom: '12px' }}>進階搜尋</Title>
                <Paragraph style={{ marginBottom: '20px', minHeight: '48px' }}>
                  使用全域搜尋和日期篩選功能，快速找到您需要的課程資訊
                </Paragraph>
                <Link to="/course-report">
                  <Button type="primary" style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }} size="large">
                    開始搜尋
                  </Button>
                </Link>
              </div>
            </Card>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Card 
              hoverable 
              style={{ 
                textAlign: 'center',
                height: '280px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ padding: '20px 0' }}>
                <BarChartOutlined style={{ fontSize: '48px', color: '#fa8c16', marginBottom: '16px' }} />
                <Title level={3} style={{ marginBottom: '12px' }}>資料統計</Title>
                <Paragraph style={{ marginBottom: '20px', minHeight: '48px' }}>
                  查看課程資料的統計資訊和分析報告
                </Paragraph>
                <Button disabled size="large" style={{ borderRadius: '6px' }}>
                  即將推出
                </Button>
              </div>
            </Card>
          </Col>
        </Row>

        <Divider style={{ margin: '40px 0' }} />

        <Row justify="center">
          <Col xs={24} lg={16}>
            <Card style={{ backgroundColor: '#f6f8fa', border: 'none' }}>
              <Title level={4} style={{ textAlign: 'center', marginBottom: '16px' }}>
                系統功能特色
              </Title>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Space direction="vertical" size="small">
                    <Text strong>✅ 即時資料載入</Text>
                    <Text type="secondary">自動載入最新的課程資料</Text>
                  </Space>
                </Col>
                <Col xs={24} md={12}>
                  <Space direction="vertical" size="small">
                    <Text strong>🔍 智慧搜尋</Text>
                    <Text type="secondary">支援全域搜尋和欄位篩選</Text>
                  </Space>
                </Col>
                <Col xs={24} md={12}>
                  <Space direction="vertical" size="small">
                    <Text strong>📅 日期篩選</Text>
                    <Text type="secondary">依上課時間快速篩選課程</Text>
                  </Space>
                </Col>
                <Col xs={24} md={12}>
                  <Space direction="vertical" size="small">
                    <Text strong>📱 響應式設計</Text>
                    <Text type="secondary">適配各種裝置螢幕尺寸</Text>
                  </Space>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default HomePage; 