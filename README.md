# xy.js 
## 특정 좌표를 위도 경도로 변환
https://www.npmjs.com/package/proj4 참고  
  
``` npm i proj4 ```  

---
## 파라미터값

*WGS84 경위도

- EPSG:4326

- +proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs 



*Bessel 1841 경위도

- EPSG:4004

- +proj=longlat +ellps=bessel +no_defs 



*GRS80 경위도

- EPSG:4019

- +proj=longlat +ellps=GRS80 +no_defs



*Google Mercator

- EPSG:900913(통칭), EPSG:3857(공식)

- +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs



*UTM52N (WGS84)

- EPSG:32652

- +proj=utm +zone=52 +ellps=WGS84 +datum=WGS84 +units=m +no_defs 



*UTM51N (WGS84)

- EPSG:32651

- +proj=utm +zone=51 +ellps=WGS84 +datum=WGS84 +units=m +no_defs 


*동부원점(Bessel)

- EPSG:2096

- +proj=tmerc +lat_0=38 +lon_0=129 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs 



*중부원점(Bessel)

- EPSG:2097

- +proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs 



*서부원점(Bessel)

- EPSG:2098

- +proj=tmerc +lat_0=38 +lon_0=125 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs 



*보정된 서부원점(Bessel)

- EPSG:5173

- +proj=tmerc +lat_0=38 +lon_0=125.00289 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs 



*보정된 중부원점(Bessel)

- EPSG:5174

- +proj=tmerc +lat_0=38 +lon_0=127.00289 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs 



*보정된 제주원점(Bessel)

- EPSG:5175

- +proj=tmerc +lat_0=38 +lon_0=127.00289 +k=1 +x_0=200000 +y_0=550000 +ellps=bessel +units=m +no_defs 




*보정된 동부원점(Bessel)

- EPSG:5176

- +proj=tmerc +lat_0=38 +lon_0=129.00289 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs 



*보정된 동해(울릉)원점(Bessel)

- EPSG:5177

- +proj=tmerc +lat_0=38 +lon_0=131.00289 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs 


*UTM-K (Bessel)

- EPSG:5178

- +proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=bessel +units=m +no_defs 


*UTM-K (GRS80)

- EPSG:5179

- +proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs 



*서부원점(GRS80)

- EPSG:5185

- +proj=tmerc +lat_0=38 +lon_0=125 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs



*중부원점(GRS80)

- EPSG:5186

- +proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs




*동부원점(GRS80)

- EPSG:5187

- +proj=tmerc +lat_0=38 +lon_0=129 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs



*동해(울릉)원점(GRS80)

- EPSG:5188

- +proj=tmerc +lat_0=38 +lon_0=131 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs

---

# excel.js
## 특정 주소로 위도 경도 검색
### naver cloud api Geocoding 사용
https://api.ncloud-docs.com/docs/ai-naver-mapsgeocoding
```js
 const options = {
        headers: {
          "X-NCP-APIGW-API-KEY-ID": "",
          "X-NCP-APIGW-API-KEY": ""
        },
        params: {
          query: "조회하려는 주소(도로명 or 지번)"
        },
      }
```
* 앱 등록시 발급 받은 ClientId와 ClientSecret정보가 필요함  
![image](https://user-images.githubusercontent.com/41901043/181433726-2dfd5ce6-6a31-493c-a983-45bab62bf052.png)




