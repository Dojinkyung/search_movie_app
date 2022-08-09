# ✨영화 검색기✨

# 🚀 배포

[![Netlify Status](https://api.netlify.com/api/v1/badges/8c963488-351b-41d4-9152-60535ac564b2/deploy-status)](https://main--radiant-nougat-ae3f93.netlify.app/)

# 🔧 기술 스택

- Typescript
- React
- Recoil
- axios->Axios+ReactQuery
- SCSS
- infinite scroll: Intersection Observer API
- localstorage 저장: store.js 사용
- drag&drop: beautiful dnd 사용

## 📦 폴더 구조

```sh
📦src
 ┣ 📂assets
 ┃ ┗ 📂svgs #svg
 ┣ 📂components #컴포넌트
 ┃ ┣ 📂dragdrop
 ┃ ┣ 📂item
 ┃ ┣ 📂modal
 ┃ ┗ 📂tabbar
 ┣ 📂hooks #recoil
 ┣ 📂routes #출력 화면
 ┃ ┣ 📂Favorites 
 ┃ ┣ 📂Movies
 ┃ ┣ 📜index.jsx
 ┣ 📂service #api 데이터 불러오기
 ┣ 📂styles # CSS 스타일을 위한 폴더
 ┣ 📂types # Typescript 정의 파일
 ┣ 📂utils # data format 해주는 유틸 파일이 있는 폴더
 ┣ 📜index.tsx
📦src
 ┣ 📂assets
 ┃ ┗ 📂svgs #svg
 ┣ 📂components
 ┃ ┣ 📜Highlighted # 검색 단어 볼드처리
 ┃ ┣ 📜index # 검색과 결과
 ┃ ┗ 📜LoadingOrNoSearch # 로딩과 검색결과 없을 때
 ┣ 📂hooks # redux dispatch, selector와 axios를 위한 hook
 ┣ 📂page # 출력 화면
 ┣ 📂redux # redux slice와 store
 ┣ 📂services # 데이터 불러오는 컴포넌트
 ┣ 📂styles # CSS 스타일을 위한 폴더
 ┣ 📂types # Typescript 정의 파일
 ┗ 📂utils # axois

```

# 📌 실행 방법

## 1. 설치

```
git clone https://github.com/Dojinkyung/search_movie_app.git
```

```
yarn install && yarn start
```

## 2. 📸 화면
![movie_app](https://user-images.githubusercontent.com/63532503/168261687-162d7428-3a02-420a-9608-803dcd0a96f7.gif)


# 💡 구현 내용
영화를 검색하고 즐겨찾기로 등록할 수 있는 react 앱을 구현했습니다.

## 1. 데이터 활용
영화 API:www.omdbapi.com

## 2. 즐겨찾기

## 3. 무한 스크롤

## 4. drag & drop
- 즐겨찾기에서 체크표시를 drag하여 사용

# ✏️ 어려웠던 점 + 추가할 기능 + 리팩토링

## 어려웠던 점
- 무한 스크롤을 받아오는 부분
- api 데이터 처리

## 추가할 기능
- modal 화면 클릭 닫기

## 리팩토링
- 기존 axios 에서 react Query를 이용하여 api를 받아왔습니다.
