import React, { useState, useEffect } from 'react';
import { Card, Spin, message } from 'antd';
import SearchFilter from '../components/SearchFilter';
import CourseTable from '../components/CourseTable';
import FileUpload from '../components/FileUpload';
import { processUploadedCsv, getDayAbbreviation } from '../utils/csvProcessor';

const CourseReportPage = () => {
  const [processedData, setProcessedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [currentFileName, setCurrentFileName] = useState('');

  useEffect(() => {
    // 當 processedData 變更時，重新應用篩選條件
    if (processedData.length > 0) {
      applyFilters(searchText, selectedDays);
    }
  }, [processedData, searchText, selectedDays]);

  // 處理檔案上傳
  const handleFileUpload = async (csvContent, fileName) => {
    if (!csvContent) {
      // 檔案被移除
      setHasData(false);
      setProcessedData([]);
      setFilteredData([]);
      setHeaders([]);
      setCurrentFileName('');
      setSearchText('');
      setSelectedDays([]);
      return;
    }

    try {
      setLoading(true);
      
      // 處理上傳的 CSV 資料
      const { headers: processedHeaders, data: processedRows } = await processUploadedCsv(csvContent);
      
      setHeaders(processedHeaders);
      setProcessedData(processedRows);
      setFilteredData(processedRows);
      setHasData(true);
      setCurrentFileName(fileName);
      
      console.log('✅ 已完成報表重組');
      message.success(`檔案 "${fileName}" 載入成功！共處理 ${processedRows.length} 筆課程資料，可使用搜尋和篩選功能查看內容。`, 4);
      
    } catch (error) {
      console.error('處理檔案時發生錯誤:', error);
      message.error('處理檔案失敗: ' + error.message);
      setHasData(false);
    } finally {
      setLoading(false);
    }
  };

  // 統一篩選邏輯
  const applyFilters = (searchValue, dayFilters) => {
    let filtered = [...processedData];

    // 應用全域搜尋
    if (searchValue) {
      filtered = filtered.filter(record =>
        Object.values(record).some(val =>
          val && val.toString().toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }

    // 應用日期篩選
    if (dayFilters && dayFilters.length > 0) {
      filtered = filtered.filter(record => {
        const schedule = record.col_6 || ''; // 上課時間欄位
        return dayFilters.some(day => {
          const dayAbbr = getDayAbbreviation(day);
          return schedule.includes(dayAbbr);
        });
      });
    }

    setFilteredData(filtered);
  };

  // 全域搜尋功能
  const handleGlobalSearch = (value) => {
    setSearchText(value);
    applyFilters(value, selectedDays);
  };

  // 日期篩選功能
  const handleDayFilter = (checkedDays) => {
    setSelectedDays(checkedDays);
    applyFilters(searchText, checkedDays);
  };

  // 重新上傳檔案
  const handleReupload = () => {
    setHasData(false);
    setProcessedData([]);
    setFilteredData([]);
    setHeaders([]);
    setCurrentFileName('');
    setSearchText('');
    setSelectedDays([]);
  };

  return (
    <div className="course-report-container">
      <Card>
        {!hasData ? (
          // 檔案上傳階段
          <FileUpload 
            onFileUploaded={handleFileUpload}
            loading={loading}
          />
        ) : (
          // 報表顯示階段
          <>
            <SearchFilter
              searchText={searchText}
              onSearch={handleGlobalSearch}
              selectedDays={selectedDays}
              onDayFilter={handleDayFilter}
              dropdownVisible={dropdownVisible}
              setDropdownVisible={setDropdownVisible}
              onReupload={handleReupload}
            />
            
            {loading ? (
              <div className="loading-container">
                <Spin size="large" />
                <div>正在處理檔案...</div>
              </div>
            ) : (
              <CourseTable
                data={filteredData}
                headers={headers}
              />
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default CourseReportPage; 