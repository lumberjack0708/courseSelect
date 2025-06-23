import React, { useState, useEffect } from 'react';
import { Card, Spin, message } from 'antd';
import SearchFilter from '../components/SearchFilter';
import CourseTable from '../components/CourseTable';
import { loadCsvData, processCsvData, getDayAbbreviation } from '../utils/csvProcessor';

const CourseReportPage = () => {
  const [processedData, setProcessedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        
        // 載入 CSV 資料
        const rawData = await loadCsvData();
        
        // 處理 CSV 資料
        const { headers: processedHeaders, data: processedRows } = processCsvData(rawData);
        
        setHeaders(processedHeaders);
        setProcessedData(processedRows);
        setFilteredData(processedRows);
        
        console.log('✅ 已完成報表重組');
        message.success(`課程資料載入成功，共 ${processedRows.length} 筆資料`);
        
      } catch (error) {
        console.error('載入課程資料時發生錯誤:', error);
        message.error('載入課程資料失敗: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  useEffect(() => {
    // 當 processedData 變更時，重新應用篩選條件
    if (processedData.length > 0) {
      applyFilters(searchText, selectedDays);
    }
  }, [processedData]);

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

  return (
    <div className="course-report-container">
      <Card>
        <SearchFilter
          searchText={searchText}
          onSearch={handleGlobalSearch}
          selectedDays={selectedDays}
          onDayFilter={handleDayFilter}
          dropdownVisible={dropdownVisible}
          setDropdownVisible={setDropdownVisible}
        />
        
        {loading ? (
          <div className="loading-container">
            <Spin size="large" />
            <div>正在載入課程資料...</div>
          </div>
        ) : (
          <CourseTable
            data={filteredData}
            headers={headers}
          />
        )}
      </Card>
    </div>
  );
};

export default CourseReportPage; 