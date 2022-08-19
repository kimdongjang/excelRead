// @breif xlsx 모듈추출
const xlsx = require("xlsx");
// 1. node.js의 fs모듈 추출
const fs = require('fs');
const fileName = 'C://elk//07_24_04_P_CSV//fulldata_07_24_04_P_일반음식점-000.csv'



// // @files 엑셀 파일을 가져온다.
// const excelFile = xlsx.readFile("C://elk//07_24_04_P_CSV//fulldata_07_24_04_P_일반음식점.csv");
// // @breif 엑셀 파일의 첫번째 시트의 정보를 추출
// const sheetName = excelFile.SheetNames[0];          // @details 첫번째 시트 정보 추출
// const firstSheet = excelFile.Sheets[sheetName];       // @details 시트의 제목 추출

// // @details 엑셀 파일의 첫번째 시트를 읽어온다.
// const jsonData = xlsx.utils.sheet_to_json(firstSheet, { defval: "" });





function csvToJSON(csv_string){
  // 1. 문자열을 줄바꿈으로 구분 => 배열에 저장
  const rows = csv_string.split("\r\n");  
  // 줄바꿈을 \n으로만 구분해야하는 경우, 아래 코드 사용
  // const rows = csv_string.split("\n");

  // 2. 빈 배열 생성: CSV의 각 행을 담을 JSON 객체임
  const jsonArray = [];

  // 3. 제목 행 추출 후, 콤마로 구분 => 배열에 저장
  const header = rows[0].split(",");

  // 4. 내용 행 전체를 객체로 만들어, jsonArray에 담기
  for(let i = 1; i < rows.length; i++){

      // 빈 객체 생성: 각 내용 행을 객체로 만들어 담아둘 객체임
      let obj = {};

      // 각 내용 행을 콤마로 구분
      let row = rows[i].split(",");

      // 각 내용행을 {제목1:내용1, 제목2:내용2, ...} 형태의 객체로 생성
      for(let j=0; j < header.length; j++){
          obj[header[j]] = row[j];
      }

      // 각 내용 행의 객체를 jsonArray배열에 담기
      jsonArray.push(obj);

  }
  
  // 5. 완성된 JSON 객체 배열 반환
  return jsonArray;

  // 문자열 형태의 JSON으로 반환할 경우, 아래 코드 사용
  // return JSON.stringify(jsonArray);
}


// 2. csv파일 읽기
const file_csv = fs.readFileSync(fileName, "utf-8");


// 3. string으로 변환: fs로 읽은 Buffer를 문자열로 변환합니다.
const string_csv = file_csv.toString();


// 4. csvToJSON(CSV문자열) 함수 호출
const jsonData = csvToJSON(string_csv);






const mysql = require('mysql2/promise');
const { default: axios } = require("axios");

let connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'maindatabase'
});
let insertId;
let addressesName;
let getGeoData;

let isSame = false;

let cnt = 20;

async function test(){
  for(const value of jsonData){
    // console.log(value)
    // cnt--;
    // if(cnt < 0) return;
    try {
      const getAddressName = "SELECT addressName FROM shop";
      const [rows, fields] = await connection.query(getAddressName, [value.음식의유형, value.주된음식종류]);
      for(const address of rows){
        if(value.도로명전체주소 === address.addressName){
          isSame=true;
        }
      }
    }
    catch (e) {
      console.log(e);
    }
    if(!isSame){      
      const options = {
        headers: {
          "X-NCP-APIGW-API-KEY-ID": "oojbrtznz5",
          "X-NCP-APIGW-API-KEY": "7bqm7g4eLovRMbI0Sp7BiLwpH14BqjmqOiByF7Bs"
        },
        params: {
          query: value.소재지전체주소
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
  
      // console.log(getGeoData.data)
      try {
        getGeoData.data.addresses.map(async (adr) => {  
          try {
            const insertCategorySql = "INSERT IGNORE INTO category (categoryType, categoryFood) VALUES (?, ?)";
            const [results] = await connection.execute(insertCategorySql, ["", value.업태구분명]);
          }
          catch (e) {
            console.log(e);
          }
  
          try {
            const selectCategorySql = "SELECT categoryCode FROM category WHERE categoryFood = ?";
            const [rows, fields] = await connection.query(selectCategorySql, [value.업태구분명]);
            insertId = rows.map(data => data.categoryCode);
          }
          catch (e) {
            console.log(e);
          }
  
          // try {
          //   const insertShopSql = "INSERT INTO shop (name, addressName, loadAddressName, homepageLink, callNumber, categoryGroupCode, categoryGroupName, categoryName, updateAt, lng, lat) "
          //     + " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
          //   const [results2] = await connection.execute(insertShopSql, [value.업소명, value.소재지주소, value.도로명주소, "", value.전화번호, insertId, "", "", new Date(), adr.x, adr.y]);
          // }
          // catch (e) {
          //   console.log(e);
          // }
           try {
            const insertShopSql = "INSERT INTO shop (name, addressName, loadAddressName, homepageLink, callNumber, categoryGroupCode, categoryGroupName, categoryName, updateAt, lng, lat) "
              + " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const [results2] = await connection.execute(insertShopSql, [value.사업장명, value.소재지전체주소, value.도로명전체주소, "", value.전화번호, insertId, "", "", new Date(), adr.x, adr.y]);
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
    isSame=false;

    if (value.영업상태명 === "영업") {
      
  
    }
  };
}
test();