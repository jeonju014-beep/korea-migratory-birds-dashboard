# 우리 동네 철새 분포 대시보드

대한민국 겨울철새 분포와 **댕기머리물떼새(Northern Lapwing)** 정보를 **공공데이터 API**로 실시간에 가깝게 보여주는 웹 대시보드입니다.

## 연동 API

| 출처 | API | 용도 |
|------|-----|------|
| 울산광역시 | `UlsanMigrantAPI` | 철새 마스터, 관측 위치, 월별 출현 |
| 부산광역시 | `NkBirdSurveyService` | 낙동강하구 조류 조사 |
| KISTI | `3033734` odcloud | 국내 조류분포 (Vanellus vanellus) |
| 제주특별자치도 | `15097059` odcloud | 철새도래지 |
| 전북특별자치도 | `3081530` odcloud | 습지보호지역 |

## 설정

1. [공공데이터포털](https://www.data.go.kr)에서 API 키 발급
2. `.env.example`을 `.env`로 복사 후 키 입력:

```env
DATA_GO_KR_SERVICE_KEY=your_api_key_here
```

## 실행

```bash
npm install
npm run dev
```

브라우저: **http://localhost:5173**

프로덕션 빌드 후 실행:

```bash
npm run build
npm start
```

## 기술 스택

- React + TypeScript + Vite
- Leaflet / react-leaflet
- Tailwind CSS
- Express-style API proxy (Vite dev middleware + Node server)

## 참고

- API 키는 `.env`에만 저장하며 Git에 올리지 마세요.
- 일부 지역 좌표는 행정구역명 기반 추정치입니다.
- 이동 경로 지도는 종합 생태학 자료 기반 참고용입니다.
