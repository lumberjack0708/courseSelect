import React from 'react';
import { Card, Typography, Row, Col, Button, Space, Divider, Alert } from 'antd';
import { FileTextOutlined, UploadOutlined, TableOutlined, SearchOutlined, SafetyOutlined } from '@ant-design/icons';
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
            上傳您的課程 CSV 檔案，立即生成專業的課程報表與分析
          </Paragraph>
          
          <Alert
            message="開始使用"
            description="請點擊下方「上傳課程檔案」按鈕，上傳包含課程資料的 CSV 檔案來生成報表。"
            type="info"
            showIcon
            style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}
          />
        </div>

        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} md={12} lg={8}>
            <Card 
              hoverable 
              style={{ 
                textAlign: 'center',
                height: '310px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: '2px solid #1890ff'
              }}
            >
              <div style={{ padding: '20px 0' }}>
                <UploadOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
                <Title level={3} style={{ marginBottom: '12px', color: '#1890ff' }}>上傳課程檔案</Title>
                <Paragraph style={{ marginBottom: '20px', minHeight: '60px' }}>
                  上傳您的 CSV 格式課程資料檔案，系統會自動解析並生成完整的課程報表
                </Paragraph>
                <Link to="/course-report">
                  <Button type="primary" size="large" style={{ borderRadius: '6px' }}>
                    立即上傳檔案
                  </Button>
                </Link>
              </div>
            </Card>
          </Col>
        </Row>

        <Divider style={{ margin: '40px 0' }} />

        <Row justify="center" style={{ marginBottom: '40px' }}>
          <Col xs={24} lg={20}>
            <Card style={{ backgroundColor: '#f6f8fa', border: '1px solid #e1e4e8' }}>
              <Title level={4} style={{ textAlign: 'center', marginBottom: '24px' }}>
                📋 檔案格式要求
              </Title>
              <Row gutter={[24, 16]}>
                <Col xs={24} md={12}>
                  <Space direction="vertical" size="small">
                    <Text strong>✅ 檔案格式</Text>
                    <Text type="secondary">CSV 格式 (.csv)</Text>
                  </Space>
                </Col>
                <Col xs={24} md={12}>
                  <Space direction="vertical" size="small">
                    <Text strong>🔤 編碼格式</Text>
                    <Text type="secondary">UTF-8 編碼</Text>
                  </Space>
                </Col>
                <Col xs={24} md={12}>
                  <Space direction="vertical" size="small">
                    <Text strong>📊 表頭結構</Text>
                    <Text type="secondary">第一列主表頭，第二列子表頭</Text>
                  </Space>
                </Col>
                <Col xs={24} md={12}>
                  <Space direction="vertical" size="small">
                    <Text strong>📈 檔案大小</Text>
                    <Text type="secondary">不超過 10MB</Text>
                  </Space>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <Row justify="center">
          <Col xs={24} lg={16}>
            <Card style={{ backgroundColor: '#fff7e6', border: '1px solid #ffd591' }}>
              <Title level={4} style={{ textAlign: 'center', marginBottom: '16px' }}>
                🚀 系統功能特色
              </Title>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Space direction="vertical" size="small">
                    <Text strong>📤 拖拽上傳</Text>
                    <Text type="secondary">支援拖拽檔案上傳，操作簡單</Text>
                  </Space>
                </Col>
                <Col xs={24} md={12}>
                  <Space direction="vertical" size="small">
                    <Text strong>⚡ 即時處理</Text>
                    <Text type="secondary">上傳後立即處理並顯示結果</Text>
                  </Space>
                </Col>
                <Col xs={24} md={12}>
                  <Space direction="vertical" size="small">
                    <Text strong>🔍 智慧搜尋</Text>
                    <Text type="secondary">全域搜尋與日期篩選功能</Text>
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