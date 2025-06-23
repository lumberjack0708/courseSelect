import React from 'react';
import { Card, Typography, Button, Row, Col } from 'antd';
import { BookOutlined, TableOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <div style={{ 
      padding: '16px', 
      maxWidth: '1200px', 
      margin: '0 auto'
    }}>
      <Card style={{ 
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
        borderRadius: '8px' 
      }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <Title level={1} style={{ marginBottom: '16px' }}>
            <BookOutlined style={{ marginRight: '16px', color: '#1890ff' }} />
            課程選擇系統
          </Title>
          <Paragraph style={{ fontSize: '18px', color: '#666', marginBottom: '0' }}>
            精準健康產業跨領域人才培育課程管理平台
          </Paragraph>
        </div>

        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} md={12} lg={8}>
            <Card 
              hoverable
              style={{ textAlign: 'center', height: '260px' }}
              bodyStyle={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center',
                height: '100%',
                padding: '20px'
              }}
            >
              <TableOutlined style={{ fontSize: '56px', color: '#52c41a', marginBottom: '20px' }} />
              <Title level={3} style={{ marginBottom: '12px' }}>課程報表</Title>
              <Paragraph style={{ marginBottom: '20px' }}>
                查看完整的課程資料表格，包含課程名稱、授課教師、
                上課時間等詳細資訊
              </Paragraph>
              <Link to="/course-report">
                <Button type="primary" size="large">
                  查看報表
                </Button>
              </Link>
            </Card>
          </Col>
        </Row>

        <div style={{ marginTop: '36px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <Title level={4} style={{ marginBottom: '16px' }}>系統功能</Title>
          <Row gutter={[16, 16]}>
            <Col span={24} md={12}>
              <div>
                <strong>📊 資料視覺化：</strong>
                <br />
                將 CSV 格式的課程資料轉換為易於閱讀的表格格式
              </div>
            </Col>
            <Col span={24} md={12}>
              <div>
                <strong>🔍 智慧搜尋：</strong>
                <br />
                支援快速搜尋和篩選功能，快速找到所需課程
              </div>
            </Col>
            <Col span={24} md={12}>
              <div>
                <strong>📱 響應式設計：</strong>
                <br />
                適配各種螢幕尺寸，提供最佳的使用體驗
              </div>
            </Col>
            <Col span={24} md={12}>
              <div>
                <strong>🎯 資料準確：</strong>
                <br />
                確保課程資訊的完整性和準確性
              </div>
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
};

export default Home; 