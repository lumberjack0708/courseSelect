import React, { useState } from 'react';
import { Upload, message, Button, Card, Typography, Space } from 'antd';
import { InboxOutlined, UploadOutlined, FileTextOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
const { Title, Paragraph, Text } = Typography;

const FileUpload = ({ onFileUploaded, loading }) => {
  const [fileList, setFileList] = useState([]);

  const uploadProps = {
    name: 'file',
    multiple: false,
    accept: '.csv',
    fileList,
    beforeUpload: (file) => {
      const isCSV = file.type === 'text/csv' || file.name.toLowerCase().endsWith('.csv');
      if (!isCSV) {
        message.error('請上傳 CSV 格式的檔案！');
        return false;
      }

      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error('檔案大小不能超過 10MB！');
        return false;
      }

      // 讀取檔案內容
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvContent = e.target.result;
        onFileUploaded(csvContent, file.name);
      };
      reader.onerror = () => {
        message.error('檔案讀取失敗，請重試！');
      };
      reader.readAsText(file, 'UTF-8');

      setFileList([file]);
      return false; // 阻止自動上傳
    },
    onRemove: () => {
      setFileList([]);
      onFileUploaded(null, null);
    },
    onChange: ({ fileList }) => {
      setFileList(fileList);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Card style={{ textAlign: 'center', marginBottom: '24px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <FileTextOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
            <Title level={3} style={{ marginTop: '16px', marginBottom: '8px' }}>
              上傳課程資料檔案
            </Title>
            <Paragraph type="secondary">
              請上傳包含課程資料的 CSV 檔案以查看課程報表
            </Paragraph>
          </div>

          <Dragger {...uploadProps} style={{ padding: '40px 20px' }} disabled={loading}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined style={{ fontSize: '64px', color: loading ? '#d9d9d9' : '#1890ff' }} />
            </p>
            <p className="ant-upload-text">
              {loading ? '正在處理檔案...' : '點擊或拖拽檔案到此區域上傳'}
            </p>
            <p className="ant-upload-hint">
              支援 CSV 格式檔案，檔案大小不超過 10MB
            </p>
          </Dragger>
        </Space>
      </Card>
    </div>
  );
};

export default FileUpload; 