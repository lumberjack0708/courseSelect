import React, { useState, useEffect } from 'react';
import { Table, Card, Typography, Spin, message, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Papa from 'papaparse';

const { Title } = Typography;
const { Search } = Input;

const CourseReport = () => {
  const [rawData, setRawData] = useState([]);
  const [processedData, setProcessedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // 讀取並處理 CSV 資料
    const loadCsvData = async () => {
      try {
        setLoading(true);
        
        // 讀取 CSV 檔案
        const response = await fetch('/f1df1266.csv');
        if (!response.ok) {
          throw new Error('無法讀取 CSV 檔案');
        }
        const csvText = await response.text();
        
        // 使用 Papa Parse 解析 CSV
        Papa.parse(csvText, {
          complete: (result) => {
            if (result.errors.length > 0) {
              console.error('CSV 解析錯誤:', result.errors);
            }
            setRawData(result.data);
            processCsvData(result.data);
          },
          header: false,
          skipEmptyLines: false, // 保留空行以確保資料對應正確
          encoding: 'UTF-8'
        });
      } catch (error) {
        console.error('讀取 CSV 檔案時發生錯誤:', error);
        message.error('讀取課程資料失敗: ' + error.message);
        setLoading(false);
      }
    };

    loadCsvData();
  }, []);

  const processCsvData = (rawData) => {
    try {
      if (!rawData || rawData.length < 3) {
        throw new Error('CSV 資料格式不正確');
      }

      console.log('原始資料列數:', rawData.length);
      console.log('第一列主表頭:', rawData[0]);
      console.log('第二列子表頭:', rawData[1]);

      // 步驟1: 賦值 df_raw
      const dfRaw = rawData;

      // 步驟2: 重新命名欄位 - 正確處理表頭結構
      // 主表頭（第一列）
      const mainHeaders = dfRaw[0];
      // 子表頭（第二列）- 星期名稱
      const subHeaders = dfRaw[1];
      
      console.log('主表頭:', mainHeaders);
      console.log('子表頭:', subHeaders);

      // 建立正確的欄位名稱
      const renamedHeaders = mainHeaders.map((header, index) => {
        // 處理星期欄位（第7-13欄，索引6-12）
        if (index >= 6 && index <= 12) {
          // 使用子表頭的星期名稱
          const dayName = subHeaders[index];
          return dayName || `星期${index - 5}`;
        } else {
          // 其他欄位保持原有名稱
          return header || `欄位${index + 1}`;
        }
      });

      console.log('重新命名後的表頭:', renamedHeaders);

      // 步驟3: 刪除表頭列並重設索引
      // 移除前兩列 (主表頭和子表頭)
      const dataRows = dfRaw.slice(2);
      console.log('資料列數 (移除表頭後):', dataRows.length);

      // 步驟4: 資料型別調整與處理
      const processedRows = dataRows.map((row, rowIndex) => {
        const rowData = { key: rowIndex };
        
        row.forEach((cell, cellIndex) => {
          const colKey = `col_${cellIndex}`;
          let cellValue = cell || '';
          
          // 步驟4: 流水號欄位型別調整
          if (cellIndex === 0 && cellValue && !isNaN(cellValue)) {
            cellValue = parseInt(cellValue);
          }
          
          rowData[colKey] = cellValue;
        });
        
        return rowData;
      });

      // 建立表格欄位定義
      const tableColumns = renamedHeaders.map((header, index) => ({
        title: header,
        dataIndex: `col_${index}`,
        key: `col_${index}`,
        width: getColumnWidth(index, header),
        ellipsis: true,
        render: (text) => text || '-',
        // 為主要欄位添加搜尋功能
        ...(index <= 2 || index === 13 || index === 14 || index === 15 ? {
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

      setColumns(tableColumns);
      setProcessedData(processedRows);
      setFilteredData(processedRows);
      setLoading(false);
      
      // 步驟6: 驗證特定儲存格
      if (processedRows.length > 30) {
        const validationRow = processedRows[30];
        const col7Value = validationRow.col_6;  // 第7欄（一）
        const col8Value = validationRow.col_7;  // 第8欄（二）
        console.log('驗證第31列第7-8欄:', { col7: col7Value, col8: col8Value });
      }
      
      console.log('✅ 已完成報表重組');
      message.success(`課程資料載入成功，共 ${processedRows.length} 筆資料`);
      
    } catch (error) {
      console.error('處理 CSV 資料時發生錯誤:', error);
      message.error('處理課程資料失敗: ' + error.message);
      setLoading(false);
    }
  };

  // 根據欄位索引和內容決定欄寬
  const getColumnWidth = (index, header) => {
    if (index === 0) return 80;   // 流水號
    if (index === 1) return 250;  // 課程名稱
    if (index === 2) return 80;   // 必選修別
    if (index === 3) return 80;   // 全/半學年
    if (index === 4 || index === 5) return 80; // 學分數、上課時數
    if (index >= 6 && index <= 12) return 60;  // 星期時間（一～日）
    if (index === 13) return 100; // 使用教室
    if (index === 14) return 120; // 授課教師
    if (index === 15) return 400; // 備註
    return 100;
  };

  // 全域搜尋功能
  const handleGlobalSearch = (value) => {
    setSearchText(value);
    if (!value) {
      setFilteredData(processedData);
      return;
    }

    const filtered = processedData.filter(record =>
      Object.values(record).some(val =>
        val && val.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  return (
    <div className="course-report-container">
      <Card>
        <div className="search-container">
          <Search
            placeholder="全域搜尋課程資料..."
            allowClear
            enterButton="搜尋"
            size="large"
            value={searchText}
            onChange={e => handleGlobalSearch(e.target.value)}
            onSearch={handleGlobalSearch}
            style={{ maxWidth: '400px' }}
          />
        </div>
        
        {loading ? (
          <div className="loading-container">
            <Spin size="large" />
            <div>正在載入課程資料...</div>
          </div>
        ) : (
          <div className="table-wrapper">
            <Table
              columns={columns}           // 表格欄位定義
              dataSource={filteredData}   // 過濾後的資料
              scroll={{ x: 1800, y: 'calc(100vh - 280px)' }}  // 水平和垂直滾動
              pagination={{       // 分頁器
                pageSize: 50,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => 
                  `第 ${range[0]}-${range[1]} 筆，共 ${total} 筆課程資料`,
                pageSizeOptions: ['20', '50', '100', '200']
              }}
              size="small"
              bordered
              rowClassName={(record, index) => index % 2 === 0 ? 'even-row' : 'odd-row'}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default CourseReport; 