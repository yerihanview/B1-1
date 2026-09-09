# Mission B1-1 나를 소개하는 웹페이지 처음부터 만들기

간단한 개인 반응형 포트폴리오 웹사이트입니다.
이 프로젝트는 결과물을 한 번에 만드는 방식이 아니라, 문서를 먼저 설계하고 버전별로 기능을 단계적으로 쌓아 올리는 방식으로 개발했습니다.


## 주요 기능

- 반응형 레이아웃 지원
- 다크 모드 전환 및 상태 유지
- 스크롤 기반 UI 인터랙션
- Contact Form 입력 검증
- GitHub API 기반 프로젝트 동적 렌더링
- 프로젝트 필터링 기능
- Intersection Observer 기반 섹션 활성화
- Hero 타이핑 효과
- 시스템 다크 모드 실시간 반영


## 개발 기준 문서

아래 문서들을 기준으로 요구사항과 개발 순서를 설계했습니다.

- [WORKFLOW.md](doc/WORKFLOW.md) : 전체 개발 원칙과 학습 방식
- [final-design.md](doc/final-design.md) : `v1.0` 최종 완료 상태
- [extended-design.md](doc/extended-design.md) : `v1.1 ~ v1.3` 확장 기능
- [roadmap.md](doc/roadmap.md) : 버전별 개발 순서
- [vX.X.md](doc/) : 각 버전의 세부 요구사항과 검증 기준

즉, 이 프로젝트는 최종 목표를 먼저 설계한 뒤, 버전별로 작은 단위로 나누어 브라우저에서 확인하며 구현한 구조입니다.


## 개발 방식

이 프로젝트는 다음과 같은 방식으로 진행했습니다.

1. 최종 산출물의 구조와 기능을 먼저 설계했습니다.
2. `v1.0`을 기본 완료 목표로 두고, 이후 확장 기능을 `v1.1 ~ v1.3`으로 나눴습니다.
3. 각 버전은 다시 작은 Task 단위로 분리해 구현했습니다.
4. 구현 후에는 항상 브라우저에서 직접 동작을 확인했습니다.
5. 단순히 코드를 완성하는 것이 아니라, 사용자 이벤트 → 상태 변경 → DOM 업데이트 → 화면 변화의 흐름을 이해하는 것을 목표로 했습니다.


## 버전 진행 요약

- `v0.1`: HTML 구조 완성
- `v0.2`: CSS 기본 표현 추가
- `v0.3`: 레이아웃과 반응형 구성
- `v0.4`: 기본 DOM 인터랙션 추가
- `v0.5`: 다크 모드와 상태 유지 추가
- `v0.6`: Contact Form 유효성 검사 추가
- `v0.7`: GitHub API와 Projects 동적 렌더링 추가
- `v0.8`: 프로젝트 필터링 추가
- `v0.9`: Intersection Observer 및 최종 통합
- `v1.0`: B1-1 기본 완료 및 배포
- `v1.1`: Hero 타이핑 효과 추가
- `v1.2`: 실제 Contact Form 전송 추가
- `v1.3`: 시스템 다크 모드 감지 및 실시간 반영 추가


## 실행 방법

로컬에서 실행하려면 다음 명령을 사용합니다.

```bash
python3 -m http.server 8000
```

이후 브라우저에서 다음 주소를 엽니다.

```text
http://localhost:8000
```


## 주요 설정값

- Header 스크롤 기준값: `50px`
- Scroll-to-Top 표시 기준값: `300px`
- IntersectionObserver threshold: `0.2`
- GitHub API 사용자: `yerihanview`
- Contact Form 전송 엔드포인트: `https://formspree.io/f/maeyladk`


## 배포 URL

- https://yerihanview.github.io/B1-1/


## 스크린샷

- [데스크톱](images/스크린샷-PC%20라이트.png)
- [모바일](images/스크린샷-모바일.png)
- [다크 모드](images/스크린샷-PC%20다크.png)



