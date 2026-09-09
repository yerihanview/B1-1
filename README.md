# B1-1 Portfolio (v1.2)

간단한 개인 포트폴리오 프로젝트입니다. v1.2 목표는 `extended-design.md`와 `v1.2.md`의 완료 기준에 맞춰 실제 Contact Form 전송을 포함한 확장 기능을 검증하고 GitHub Pages에서 정상 동작하는 상태를 만드는 것입니다.

로컬 실행

```bash
python3 -m http.server 8000
# 브라우저에서 http://localhost:8000 열기
```

주요 구현 값 (검증 기준 — README에 기록)
- Header 스크롤 기준값: 50px (`js/main.js`: `scrollThreshold = 50`)
- Scroll-to-Top 표시 기준값: 300px
- IntersectionObserver threshold: 0.2
- GitHub API 사용자: `yerihanview` (`js/main.js`) — 필요시 수정하세요
- Contact Form 전송 엔드포인트: https://formspree.io/f/maeyladk (`js/main.js`)

배포 가이드 (요약)
1. 로컬에서 동작 확인
2. 변경사항 커밋 후 원격에 푸시
   ```bash
   git add .
   git commit -m "chore: prepare v1.2"
   git push origin main
   ```
3. GitHub repository에서 `Settings → Pages` 또는 repository의 Pages 섹션에서 배포 브랜치(`main` 또는 `gh-pages`)를 설정
4. 배포 후 배포 URL에서 최종 검증
5. 태그 생성
   ```bash
   git tag v1.2
   git push origin v1.2
   ```

검증 체크리스트는 `doc/v1.0-checklist.md`와 `doc/v1.2.md`를 참고하세요.

