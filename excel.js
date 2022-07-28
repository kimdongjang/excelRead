// @breif xlsx 모듈추출
const xlsx = require("xlsx");



// @files 엑셀 파일을 가져온다.
const excelFile = xlsx.readFile("C://elk//LOCALDATA_ALL_12_03_01_E.xlsx");



// @breif 엑셀 파일의 첫번째 시트의 정보를 추출
const sheetName = excelFile.SheetNames[0];          // @details 첫번째 시트 정보 추출
const firstSheet = excelFile.Sheets[sheetName];       // @details 시트의 제목 추출

const mysql = require('mysql2/promise');
const { default: axios } = require("axios");

let connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'maindatabase'
});
let insertId;
let getGeoData;

// @details 엑셀 파일의 첫번째 시트를 읽어온다.
const jsonData = xlsx.utils.sheet_to_json(firstSheet, { defval: "" });
async function test(){
  for(const value of jsonData){  
    if (value.영업상태명 === "영업") {
      const options = {
        headers: {
          "X-NCP-APIGW-API-KEY-ID": "",
          "X-NCP-APIGW-API-KEY": ""
        },
        params: {
          query: value.소재지주소
        },
      }
  
      /**
       * category 초기화
       */
      try {
        getGeoData = await axios.get('https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode', options);        
      }
      catch (e) {
        console.log(e);
      }
  
  
      try {
        getGeoData.data.addresses.map(async (adr) => {  
          try {
            const insertCategorySql = "INSERT IGNORE INTO category (categoryType, categoryFood) VALUES (?, ?)";
            const [results] = await connection.execute(insertCategorySql, [value.음식의유형, value.주된음식종류]);
          }
          catch (e) {
            console.log(e);
          }
  
          try {
            const selectCategorySql = "SELECT categoryCode FROM category WHERE categoryType = ? AND categoryFood = ?";
            const [rows, fields] = await connection.query(selectCategorySql, [value.음식의유형, value.주된음식종류]);
            insertId = rows.map(data => data.categoryCode);
          }
          catch (e) {
            console.log(e);
          }
  
          try {
            const insertShopSql = "INSERT INTO shop (name, addressName, loadAddressName, homepageLink, callNumber, categoryGroupCode, categoryGroupName, categoryName, updateAt, lng, lat) "
              + " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const [results2] = await connection.execute(insertShopSql, [value.업소명, value.소재지주소, value.도로명주소, "", value.전화번호, insertId, "", "", new Date(), adr.x, adr.y]);
          }
          catch (e) {
            console.log(e);
          }
        })
  
      }
      catch (e) {
        console.log(e);
      }
  
    }
  };
}
test();