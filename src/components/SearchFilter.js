import React from 'react';
import { Input, Space, Dropdown, Button, Checkbox } from 'antd';
import { SearchOutlined, CalendarOutlined } from '@ant-design/icons';

const { Search } = Input;

const SearchFilter = ({
  searchText,
  onSearch,
  selectedDays,
  onDayFilter,
  dropdownVisible,
  setDropdownVisible
}) => {
  // 日期篩選器的選項
  const dayOptions = [
    { label: '星期一', value: '星期一' },
    { label: '星期二', value: '星期二' },
    { label: '星期三', value: '星期三' },
    { label: '星期四', value: '星期四' },
    { label: '星期五', value: '星期五' },
    { label: '星期六', value: '星期六' },
    { label: '星期日', value: '星期日' }
  ];

  // 處理日期勾選變更
  const onDayChange = (checkedValues) => {
    onDayFilter(checkedValues);
  };

  // 清除日期篩選
  const clearDayFilter = () => {
    onDayFilter([]);
    setDropdownVisible(false);
  };

  // 日期篩選器下拉選單內容
  const dayFilterDropdown = (
    <div className="day-filter-dropdown">
      <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>選擇上課日期：</div>
      <Checkbox.Group
        options={dayOptions}
        value={selectedDays}
        onChange={onDayChange}
        style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
      />
      <div style={{ marginTop: '12px', textAlign: 'right' }}>
        <Button 
          size="small" 
          onClick={clearDayFilter}
          style={{ marginRight: '8px' }}
        >
          清除
        </Button>
        <Button 
          size="small" 
          type="primary" 
          onClick={() => setDropdownVisible(false)}
        >
          確定
        </Button>
      </div>
    </div>
  );

  return (
    <div className="search-container">
      <Space size="middle">
        <Search
          placeholder="全域搜尋課程資料..."
          allowClear
          enterButton="搜尋"
          size="large"
          value={searchText}
          onChange={e => onSearch(e.target.value)}
          onSearch={onSearch}
          style={{ maxWidth: '400px' }}
        />
        <Dropdown
          overlay={dayFilterDropdown}
          trigger={['click']}
          visible={dropdownVisible}
          onVisibleChange={setDropdownVisible}
          placement="bottomLeft"
        >
          <Button 
            size="large" 
            icon={<CalendarOutlined />}
            style={{ 
              color: selectedDays.length > 0 ? '#1890ff' : undefined,
              borderColor: selectedDays.length > 0 ? '#1890ff' : undefined
            }}
          >
            {selectedDays.length > 0 && `(${selectedDays.length})`}
          </Button>
        </Dropdown>
      </Space>
    </div>
  );
};

export default SearchFilter; 