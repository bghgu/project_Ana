# project_Skhu_Alumni_Association

![logo.png](https://github.com/bghgu/project_alumni_association/blob/master/image/logo.png)

성공회대학교 총 동문회 시스템 개발 프로젝트

 IONIC framework1와 Angular.js1을 사용한 하이브리드 앱 개발

프로젝트 기간 : 2017년 1월 ~ 2017년 3월

맡은 역할 : PM, 메인 프론트 엔드 (앱) 개발, 문서 작성, 발표

[성공회대학교 동문관리 시스템 작품제안서](https://github.com/bghgu/project_alumni_association/blob/master/%EC%84%B1%EA%B3%B5%ED%9A%8C%EB%8C%80%ED%95%99%EA%B5%90%20%EB%8F%99%EB%AC%B8%EA%B4%80%EB%A6%AC%EC%8B%9C%EC%8A%A4%ED%85%9C_%EC%9E%91%ED%92%88%EC%A0%9C%EC%95%88%EC%84%9C.pdf) - 작품 제안서

사용 기술 : IONIC framework1, Angular.js1

## 구성

![1.jpg](https://github.com/bghgu/project_alumni_association/blob/master/image/1.jpg)

전체 시스템 구성도

앱 서버와, 웹 서버로 구분된다.

![2.jpg](https://github.com/bghgu/project_alumni_association/blob/master/image/2.jpg)

앱 서비스 구성도

* 로그인  성공시, jwt 서비스로 부터 JWT 토큰값을 받아온다.
* 나머지 api 통신시 jwt 값을 헤더의 authorization에 넣어서 보낸다.

## 실행 방법

### 직접 실행

- `nodejs` 와 `npm` 을 설치합니다. 설치 방법은 [nodejs.org](https://nodejs.org) 를 참고하세요.
- 실행에 필요한 의존성을 설치합니다.

```bash
  npm install
```

- 아이오닉 코드 실행를 실행합니다.

```bash
  ionic serve
```

- `localhost:8100`으로 실행이 가능합니다
- 중지하려면, 키보드에서 `Crtl + C`를 누릅니다.

### android build

- `SDK`가 설치되어 있어야 합니다
- ionic platform에 안드로이드를 추가합니다

```bash
  ionic cordova platform add android
```

- release용 android apk 빌드

```bash
  ionic cordova build android --release
```

- 키스토어 생성 keytool

```bash
  keytool -genkey -v -keystore key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
```

- apk 사인 jarsigner

```bash
  jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore key.keystore android-release-unsigned.apk alias_name
```

- 확인 jarsigner jar verified

```bash
  jarsigner -verify -verbose -certs android-release-unsigned.apk
```

- optimize zipalign

```bash
  zipalign -v 4 android-release-unsigned.apk skhuAlumni.apk
```

### ios build

- `XCODE`가 설치된 맥 에서만 가능합니다.
- ionic platform에 ios를 추가합니다

```bash
  ionic platform add ios
```

- ios build

```bash
  ionic build iOS —release
```



## 사용된 도구

- [Angular.JS](https://angularjs.org/) - 자바스크립트 기반 오픈소스 프론트엔드 웹 애플리케이션 프레임 워크
- [IONIC1](https://ionicframework.com/docs/v1/) - Angular.js기반 하이브리드 앱 프레임 워크
- [NPM](https://www.npmjs.com/) - java script 패키지 관리자
- [Atom](https://atom.io/) - 편집기
- [Xcode](https://developer.apple.com/kr/xcode/) - IDE

## 저자

- **배다슬** - [bghgu](https://github.com/bghgu)
- **신성철**

[기여자 목록](https://github.com/bghgu/project_alumni_association/contributors)을 확인하여 이 프로젝트에 참가하신 분들을 보실 수 있습니다.

## 감사 인사

- 아이오닉 인 액션 - 제래미 윌켄 지음 - 에이콘 출판사

## 수상

- 2017년 제 9회 소프트웨어공학과 지정 주제 부분 2위

---


