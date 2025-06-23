import React from 'react';
import { Table, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getColumnWidth } from '../utils/csvProcessor';

const CourseTable = ({ data, headers }) => {
  // 建立表格欄位定義
  const tableColumns = headers.map((header, index) => ({
    title: header,
    dataIndex: `col_${index}`,
    key: `col_${index}`,
    width: getColumnWidth(index),
    ellipsis: index !== 9, // 備註欄位（索引9）不使用 ellipsis
    render: (text) => {
      if (index === 9) {
        // 備註欄位特殊處理：支援換行顯示
        return (
          <div style={{ 
            whiteSpace: 'pre-wrap', 
            wordBreak: 'break-word',
            lineHeight: '1.4',
            maxWidth: '300px'
          }}>
            {text || '-'}
          </div>
        );
      }
      return text || '-';
    },
    // 為主要欄位添加搜尋功能
    ...(index <= 2 || index === 6 || index === 7 || index === 8 ? {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={`搜尋 ${header}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <button 
              type="button" 
              onClick={() => confirm()}
              style={{ fontSize: '12px' }}
            >
              搜尋
            </button>
            <button 
              type="button" 
              onClick={() => clearFilters && clearFilters()}
              style={{ fontSize: '12px' }}
            >
              重設
            </button>
          </Space>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) => 
        record[`col_${index}`]
          ? record[`col_${index}`].toString().toLowerCase().includes(value.toLowerCase())
          : false,
    } : {})
  }));

  return (
    <div className="table-wrapper">
      <Table
        columns={tableColumns}
        dataSource={data}
        scroll={{ x: 1300, y: 'calc(100vh - 220px)' }}
        pagination={false}
        size="small"
        bordered
        rowClassName={(record, index) => index % 2 === 0 ? 'even-row' : 'odd-row'}
      />
    </div>
  );
};

export default CourseTable; 