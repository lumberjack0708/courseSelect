import Papa from 'papaparse';

// CSV 檔案讀取和解析
export const loadCsvData = async () => {
  return new Promise((resolve, reject) => {
    const loadData = async () => {
      try {
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
            resolve(result.data);
          },
          error: (error) => {
            reject(error);
          },
          header: false,
          skipEmptyLines: false,
          encoding: 'UTF-8'
        });
      } catch (error) {
        reject(error);
      }
    };

    loadData();
  });
};

// CSV 資料處理和轉換
export const processCsvData = (rawData) => {
  if (!rawData || rawData.length < 3) {
    throw new Error('CSV 資料格式不正確');
  }

  console.log('原始資料列數:', rawData.length);
  
  // 步驟1: 賦值 df_raw
  const dfRaw = rawData;
  
  // 步驟2: 重新命名欄位 - 移除星期欄位，新增上課時間欄位
  const mainHeaders = dfRaw[0];
  const subHeaders = dfRaw[1];
  
  // 建立星期縮寫對應表
  const dayAbbreviations = {
    '一': 'Mon.',
    '二': 'Tue.',
    '三': 'Wed.',
    '四': 'Thu.',
    '五': 'Fri.',
    '六': 'Sat.',
    '日': 'Sun.'
  };

  // 建立新的欄位名稱
  const renamedHeaders = [];
  for (let index = 0; index < mainHeaders.length; index++) {
    if (index < 6) {
      renamedHeaders.push(mainHeaders[index] || `欄位${index + 1}`);
    } else if (index === 6) {
      renamedHeaders.push('上課時間');
    } else if (index >= 7 && index <= 12) {
      continue;
    } else {
      renamedHeaders.push(mainHeaders[index] || `欄位${renamedHeaders.length + 1}`);
    }
  }

  // 步驟3: 刪除表頭列並重設索引
  const dataRows = dfRaw.slice(2);
  
  // 步驟4: 資料處理 - 合併星期資料
  const processedRows = dataRows.map((row, rowIndex) => {
    const rowData = { key: rowIndex };
    
    // 處理前6欄
    for (let cellIndex = 0; cellIndex < 6; cellIndex++) {
      const colKey = `col_${cellIndex}`;
      let cellValue = row[cellIndex] || '';
      
      // 流水號欄位型別調整
      if (cellIndex === 0 && cellValue && !isNaN(cellValue)) {
        cellValue = parseInt(cellValue);
      }
      
      rowData[colKey] = cellValue;
    }

    // 處理上課時間（合併第7-13欄的星期資料）
    const scheduleArray = [];
    for (let dayIndex = 6; dayIndex <= 12; dayIndex++) {
      const dayName = subHeaders[dayIndex];
      const timeSlots = row[dayIndex];
      
      if (timeSlots && timeSlots.trim()) {
        const dayAbbr = dayAbbreviations[dayName] || dayName;
        const formattedSlots = timeSlots.trim()
          .replace(/\s+/g, ' ')
          .replace(/\s+/g, '~');
        
        scheduleArray.push(`${dayAbbr} ${formattedSlots}`);
      }
    }
    rowData.col_6 = scheduleArray.join(', ');

    // 處理剩餘欄位
    let newColIndex = 7;
    for (let originalIndex = 13; originalIndex < row.length; originalIndex++) {
      const colKey = `col_${newColIndex}`;
      rowData[colKey] = row[originalIndex] || '';
      newColIndex++;
    }
    
    return rowData;
  });

  return {
    headers: renamedHeaders,
    data: processedRows
  };
};

// 根據欄位索引決定欄寬
export const getColumnWidth = (index) => {
  if (index === 0) return 80;   // 流水號
  if (index === 1) return 250;  // 課程名稱
  if (index === 2) return 80;   // 必選修別
  if (index === 3) return 80;   // 全/半學年
  if (index === 4 || index === 5) return 80; // 學分數、上課時數
  if (index === 6) return 200;  // 上課時間
  if (index === 7) return 100;  // 使用教室
  if (index === 8) return 120;  // 授課教師
  if (index === 9) return 300;  // 備註
  return 100;
};

// 取得星期縮寫
export const getDayAbbreviation = (day) => {
  const dayMap = {
    '星期一': 'Mon.',
    '星期二': 'Tue.',
    '星期三': 'Wed.',
    '星期四': 'Thu.',
    '星期五': 'Fri.',
    '星期六': 'Sat.',
    '星期日': 'Sun.'
  };
  return dayMap[day] || day;
}; 