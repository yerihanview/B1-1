# B1-1 Development Roadmap

## 1. 문서 목적

이 문서는 B1-1 프로젝트를 `v0.1`부터 `v1.3`까지 어떤 순서로 개발할 것인지 정의한다.

이 로드맵은 다음 문서를 기준으로 한다.

- `WORKFLOW.md`
  - 개발·학습 운영 원칙
- `final-design.md`
  - `v1.0` 완료 상태
- `extended-design.md`
  - `v1.1 ~ v1.3` 확장 상태

이 문서에서는 각 버전의 **목표와 범위**만 결정한다.

구체적인 요구사항, 목표 설계, 새롭게 배우는 개념, 완료/검증 기준, 제외 범위는 각 `vX.X.md`에서 정의한다.

---

# 2. 버전 설계 원칙

버전은 단순히 기능 개수에 따라 나누지 않는다.

다음 버전을 이해하고 구현하는 데 필요한 **선수지식 순서**를 기준으로 나눈다.

전체 흐름은 다음과 같다.

```text
HTML 구조
    ↓
CSS 기본 표현
    ↓
레이아웃 / 반응형
    ↓
DOM / 이벤트
    ↓
상태와 localStorage
    ↓
폼 상태와 검증
    ↓
비동기 API와 렌더링
    ↓
데이터 필터링
    ↓
Intersection Observer
    ↓
전체 통합 / 배포
    ↓
v1.0
    ↓
보너스 확장
```

현재 버전에서 다음 버전의 기능을 미리 구현하지 않는다.

---

# 3. 전체 버전 개요

```text
v0.1  HTML 구조
v0.2  CSS 기본 표현
v0.3  CSS 레이아웃과 반응형
v0.4  기본 DOM 인터랙션
v0.5  다크 모드와 상태 유지
v0.6  Contact Form 유효성 검사
v0.7  GitHub API와 Projects 동적 렌더링
v0.8  프로젝트 필터링
v0.9  Intersection Observer 및 최종 통합
v1.0  B1-1 기본 완료 / 배포

v1.1  Hero 타이핑 효과
v1.2  실제 Contact Form 전송
v1.3  시스템 다크 모드 감지 및 실시간 반영
```

---

# 4. v0.1 — HTML 구조

## 목표

CSS와 JavaScript 없이도 웹페이지의 의미와 전체 콘텐츠 구조를 이해할 수 있는 HTML 문서를 만든다.

## 주요 범위

최종 페이지의 기본 구조를 만든다.

```text
Header
└── Navigation

Main
├── Hero
├── About
├── Skills
├── Projects
└── Contact

Footer
```

포함할 주요 내용:

- Navigation 링크
- Hero 소개와 CTA
- About 콘텐츠
- 프로필 이미지
- Skills 목록
- Projects 영역
- Contact Form
- Footer 저작권
- 소셜 링크

## 이 단계의 핵심

- HTML 문서 구조
- 시맨틱 태그
- 부모 / 자식 관계
- 링크
- 이미지와 `alt`
- Form 구조
- `label`과 `for-id`

## 아직 하지 않는 것

- CSS 디자인
- Flexbox / Grid
- 반응형
- JavaScript
- API
- 다크 모드

## 완료 후 상태

웹페이지가 디자인 없이도 올바른 정보 구조를 가진다.

---

# 5. v0.2 — CSS 기본 표현

## 목표

v0.1의 HTML 구조에 기본적인 시각 표현을 적용한다.

아직 반응형 레이아웃이나 JavaScript 동작은 구현하지 않는다.

## 주요 범위

- CSS 파일 연결
- 기본 typography
- 색상
- 간격
- 배경
- 버튼 스타일
- 카드 기본 스타일
- `box-shadow`
- `hover`
- `transition`
- CSS 변수

다크 모드 자체는 구현하지 않지만 이후 테마 전환을 고려하여 색상 값을 CSS 변수로 관리한다.

## 이 단계의 핵심

- CSS selector
- cascade
- inheritance
- box model
- CSS 변수
- pseudo-class
- transition

## 아직 하지 않는 것

- JavaScript
- 다크 모드 전환
- 반응형 breakpoint
- 햄버거 메뉴
- API

## 완료 후 상태

정적인 기본 화면에서 웹사이트의 시각적 기본 형태가 갖추어진다.

---

# 6. v0.3 — CSS 레이아웃과 반응형

## 목표

CSS의 레이아웃 시스템과 Media Query를 사용하여 모바일부터 데스크톱까지 대응하는 페이지를 만든다.

## 주요 범위

### Flexbox

Navigation 등 한 방향 배치에 사용한다.

### Grid

Projects 카드 배치에 사용한다.

다음을 활용한다.

- `auto-fit`
- `minmax`

### 반응형

모바일 퍼스트 방식으로 작성한다.

기본 기준:

```text
모바일
    기본 스타일

태블릿
    768px 이상

데스크톱
    1024px 이상
```

## 이 단계의 핵심

- normal flow
- Flexbox
- Grid
- Media Query
- 모바일 퍼스트
- responsive layout

## 아직 하지 않는 것

- JavaScript 인터랙션
- 모바일 메뉴 동작
- API
- 다크 모드

## 완료 후 상태

JavaScript가 없어도 모바일 / 태블릿 / 데스크톱에서 기본 레이아웃이 정상적으로 표시된다.

---

# 7. v0.4 — 기본 DOM 인터랙션

## 목표

JavaScript를 처음 연결하고 사용자 이벤트가 DOM 변화를 만드는 기본 흐름을 구현한다.

## 주요 범위

- JavaScript 파일과 `defer`
- DOM 요소 선택
- `addEventListener`
- 모바일 햄버거 메뉴
- 부드러운 내부 스크롤
- Scroll-to-Top 버튼
- 스크롤에 따른 Navigation 스타일 변경

## 기본 흐름

```text
사용자 이벤트
    ↓
JavaScript 이벤트 핸들러
    ↓
DOM 변경
    ↓
화면 변화
```

## 이 단계의 핵심

- `const`
- `let`
- `querySelector`
- `querySelectorAll`
- `addEventListener`
- `click`
- `scroll`
- `classList`

## 아직 하지 않는 것

- localStorage
- API
- 폼 검증
- Intersection Observer
- 프로젝트 필터

## 완료 후 상태

웹페이지가 사용자 입력에 반응하기 시작하며, 기본적인 이벤트 → DOM 변화 흐름을 설명할 수 있다.

---

# 8. v0.5 — 다크 모드와 상태 유지

## 목표

단순한 이벤트 처리에서 한 단계 발전하여 **상태가 화면을 결정하는 구조**를 구현한다.

## 주요 범위

- Light / Dark theme
- Theme Toggle
- CSS 변수 활용
- `[data-theme="dark"]`
- 현재 theme 상태
- `localStorage` 저장
- 페이지 재접속 시 상태 복원

## 핵심 흐름

```text
사용자 click
    ↓
theme 상태 변경
    ↓
DOM theme 변경
    ↓
화면 변경
    ↓
localStorage 저장
```

## 이 단계의 핵심

- 상태의 의미
- DOM 속성
- CSS와 JavaScript 상태 연결
- `localStorage`
- 초기 상태 복원

## 아직 하지 않는 것

- 시스템 테마 감지
- API
- 폼 검증

## 완료 후 상태

사용자 상태가 화면을 결정하고 새로고침 후에도 유지되는 첫 번째 상태→렌더링 기능이 완성된다.

---

# 9. v0.6 — Contact Form 유효성 검사

## 목표

사용자 입력값을 상태로 판단하고 결과에 따라 UI가 달라지는 두 번째 상태→렌더링 흐름을 구현한다.

## 주요 범위

- `input`
- `submit`
- `event.preventDefault()`
- 필수값 검사
- 이메일 형식 검사
- 필드별 오류 메시지
- 성공 메시지

## 핵심 흐름

```text
사용자 입력 / submit
    ↓
입력값 검사
    ↓
validation 상태 결정
    ↓
오류 또는 성공 UI 렌더링
```

## 이 단계의 핵심

- Form 이벤트
- 입력값 읽기
- 조건문
- 유효성 검사
- 오류 상태
- DOM 메시지 변경

## 아직 하지 않는 것

- 실제 이메일 전송
- 외부 Form 서비스
- API 데이터

## 완료 후 상태

폼 데이터는 실제 전송되지 않지만 사용자 입력에 따른 검증과 상태 UI가 정상 동작한다.

---

# 10. v0.7 — GitHub API와 Projects 동적 렌더링

## 목표

외부 데이터를 비동기로 가져오고 상태에 따라 화면을 다시 렌더링한다.

B1-1에서 가장 중요한 JavaScript 학습 단계 중 하나다.

## 주요 범위

GitHub API:

```text
https://api.github.com/users/{username}/repos
```

사용:

- `fetch`
- `async/await`
- `try/catch`

Projects의 상태:

```text
loading
success
error
empty
```

추가 요구사항:

- GitHub repository 데이터를 카드로 표시
- API 오류 표시
- 재시도 기능
- 403 rate limit 오류 처리

## 핵심 흐름

```text
API 요청 시작
    ↓
loading

요청 성공
    ↓
success 또는 empty

요청 실패
    ↓
error

각 상태
    ↓
Projects DOM 렌더링
```

## 이 단계의 핵심

- Promise의 기본 의미
- 비동기 처리
- `fetch`
- `async/await`
- `try/catch`
- HTTP 응답
- 동적 DOM 생성
- 템플릿 리터럴
- 구조분해 할당
- `map`
- `forEach`

## 아직 하지 않는 것

- 프로젝트 필터링
- 실제 폼 전송

## 완료 후 상태

외부 데이터와 비동기 상태가 화면을 결정하는 세 번째 핵심 상태→렌더링 기능이 완성된다.

---

# 11. v0.8 — 프로젝트 필터링

## 목표

v0.7에서 받은 전체 GitHub 프로젝트 데이터를 사용자가 선택한 조건에 따라 가공하고 다시 렌더링한다.

B1-1 원문에서는 선택 기능이지만 이 프로젝트에서는 `v1.0` 필수 범위로 취급한다.

## 주요 범위

- 필터 UI
- 현재 filter 상태
- 저장소 언어 기준 필터링
- `filter`
- 필터된 결과 재렌더링
- 조건에 맞는 프로젝트가 없을 때의 빈 상태

API를 필터 선택 때마다 다시 호출하지 않는다.

이미 가져온 데이터를 사용한다.

## 핵심 흐름

```text
사용자 filter 선택
    ↓
filter 상태 변경
    ↓
원본 projects 데이터에 filter 적용
    ↓
filtered projects
    ↓
Projects DOM 재렌더링
```

## 이 단계의 핵심

- 원본 데이터와 화면 데이터의 구분
- `filter`
- 상태에 따른 데이터 가공
- 동일한 데이터를 다른 방식으로 렌더링

## 완료 후 상태

Projects 영역에서 API 데이터 수집과 UI 상태, 사용자 필터링이 하나의 흐름으로 연결된다.

---

# 12. v0.9 — Intersection Observer 및 최종 통합

## 목표

남은 필수 인터랙션을 추가하고 지금까지 구현한 기능을 하나의 완성된 사이트로 통합한다.

## 주요 범위

### Intersection Observer

스크롤에 따라 콘텐츠가 나타나는 효과를 구현한다.

- Observer 생성
- 관찰 대상 등록
- threshold
- 화면 진입 상태
- class 변경

### 전체 통합 점검

다음 기능 간 충돌을 확인한다.

- 반응형 레이아웃
- 햄버거 메뉴
- Navigation
- Scroll-to-Top
- 다크 모드
- Contact Form
- GitHub Projects
- 프로젝트 필터
- 스크롤 애니메이션

### 기본 품질 점검

- 시맨틱 구조
- `alt`
- Form label
- 인라인 style 없음
- 불필요한 외부 라이브러리 없음

## 이 단계의 핵심

- Intersection Observer
- viewport
- observer callback
- 여러 독립 기능의 통합
- 회귀 확인

## 완료 후 상태

v1.0에서 요구하는 기능 구현은 모두 존재하며, 최종 배포와 검증만 남은 상태가 된다.

---

# 13. v1.0 — B1-1 기본 완료

## 목표

`final-design.md`의 모든 요구사항을 검증하고 외부에 제출 가능한 상태로 만든다.

## 주요 범위

### 최종 기능 검증

- Header / Navigation
- Hero
- About
- Skills
- Projects
- Contact
- Footer
- 반응형
- 햄버거 메뉴
- 부드러운 스크롤
- Scroll-to-Top
- Navigation 스크롤 스타일
- 다크 모드
- localStorage
- 폼 검증
- GitHub API
- loading / success / error / empty
- 프로젝트 필터링
- Intersection Observer

### 브라우저 검증

최소 다음 환경을 확인한다.

- 모바일
- 태블릿
- 데스크톱
- Light mode
- Dark mode

### GitHub Pages 배포

배포된 사이트에서도 모든 필수 기능을 다시 확인한다.

### README

최소한 다음 내용을 정리한다.

- 프로젝트 설명
- 사용 기술
- 배포 URL
- 스크린샷
- 변경한 기준값이 있다면 해당 값

## 완료 조건

`final-design.md`의 완료 조건을 모두 만족한다.

이 시점에:

```text
git tag v1.0
```

을 생성할 수 있다.

---

# 14. v1.1 — Hero 타이핑 효과

## 목표

`extended-design.md`의 첫 번째 확장 기능을 추가한다.

## 주요 범위

- Hero 타이핑 효과
- 문자열 인덱스
- 시간 기반 반복 실행
- `setTimeout`
- `textContent`
- 종료 조건

## 학습 중심

```text
시간 경과
    ↓
상태 변경
    ↓
DOM 변경
```

기존 v1.0 기능은 모두 유지한다.

---

# 15. v1.2 — 실제 Contact Form 전송

## 목표

v1.0의 클라이언트 유효성 검사 기능을 실제 외부 전송까지 확장한다.

## 주요 범위

- Formspree 또는 EmailJS 등 서비스 선택
- 실제 폼 전송
- submitting 상태
- success 상태
- error 상태
- 중복 제출 방지
- 배포 환경에서 실제 동작 검증

## 학습 중심

```text
validation
    ↓
비동기 전송
    ↓
submitting / success / error
    ↓
UI 렌더링
```

기존 v1.0 폼 검증은 유지한다.

---

# 16. v1.3 — 시스템 다크 모드 감지 및 실시간 반영

## 목표

다크 모드의 초기 상태와 실행 중 상태를 시스템 환경과 연결한다.

## 주요 범위

- `prefers-color-scheme`
- `matchMedia`
- 시스템 light / dark 감지
- 저장된 사용자 선택 우선
- 사용자 선택이 없을 경우 시스템 테마 적용
- 페이지 실행 중 OS 테마 변경 감지
- 시스템 변경에 따른 실시간 화면 갱신

## 우선순위

```text
사용자 선택 있음
    ↓
localStorage 값 우선

사용자 선택 없음
    ↓
시스템 설정 사용
```

실행 중 OS 테마가 바뀌었을 때도 동일한 우선순위를 적용한다.

## 학습 중심

```text
외부 환경 변화
    ↓
JavaScript 이벤트
    ↓
상태 결정
    ↓
DOM 변경
```

## 완료 후 상태

현재 계획된 모든 B1-1 확장 기능이 완료된다.

이 시점에:

```text
git tag v1.3
```

을 생성할 수 있다.

---

# 17. 버전별 핵심 학습 흐름

전체 학습 과정은 다음과 같이 연결된다.

```text
v0.1
HTML 구조
    ↓
v0.2
CSS 기본 표현
    ↓
v0.3
CSS 레이아웃 / 반응형
    ↓
v0.4
DOM / Event
    ↓
v0.5
State / localStorage
    ↓
v0.6
Input / Validation State
    ↓
v0.7
Async / API State / Rendering
    ↓
v0.8
Data Transform / filter / Rendering
    ↓
v0.9
Observer / Integration
    ↓
v1.0
B1-1 기본 완료
    ↓
v1.1
시간 기반 상태 변화
    ↓
v1.2
비동기 외부 전송 상태
    ↓
v1.3
외부 환경 변화에 따른 상태 변화
```

---

# 18. 로드맵 진행 원칙

각 버전은 독립적으로 완료하고 검증한다.

다음 버전으로 이동하기 전에 해당 버전의 `vX.X.md`에 정의된 완료 기준을 충족해야 한다.

구현 중 다음과 같은 상황이 발생해도 로드맵을 임의로 건너뛰지 않는다.

- AI가 다음 단계 기능을 제안한 경우
- 현재 기능을 더 고급 방식으로 구현할 수 있는 경우
- 새로운 라이브러리를 사용하면 더 쉽게 구현할 수 있는 경우
- 디자인 개선 아이디어가 생긴 경우

변경이 필요하다면 먼저 이 `roadmap.md` 또는 관련 설계 문서를 수정한 후 개발한다.

---

# 19. v1.0과 v1.3의 의미

## v1.0

```text
B1-1 필수 요구사항
+
프로젝트 필터링
+
배포 및 제출 상태
```

B1-1의 기본 미션 완료 기준이다.

## v1.3

```text
v1.0
+
Hero 타이핑 효과
+
실제 Contact Form 전송
+
시스템 다크 모드 감지 및 실시간 반영
```

현재 프로젝트에서 계획한 확장 기능까지 모두 완료한 기준이다.

---

# 20. 문서 관계

```text
WORKFLOW.md
    └─ 어떻게 개발하고 학습할 것인가

final-design.md
    └─ v1.0에서 무엇을 완성할 것인가

extended-design.md
    └─ v1.0 이후 v1.3까지 무엇을 추가할 것인가

roadmap.md
    └─ 어떤 순서로 그 상태에 도달할 것인가

vX.X.md
    └─ 해당 버전에서 정확히 무엇을 만들고 배울 것인가
```

로드맵이 확정된 이후 실제 개발에서는 항상 현재 버전의 `vX.X.md`를 직접 실행 기준으로 사용한다.