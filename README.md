# B1-1 Portfolio (v1.0)

간단한 개인 포트폴리오 프로젝트입니다. v1.0 목표는 `final-design.md`의 완료 기준에 맞춰 로컬 작동을 검증하고 GitHub Pages로 배포해 외부에서 접근 가능한 상태를 만드는 것입니다.

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

배포 가이드 (요약)
1. 로컬에서 동작 확인
2. 변경사항 커밋 후 원격에 푸시
   ```bash
   git add .
   git commit -m "chore: prepare v1.0"
   git push origin main
   ```
3. GitHub repository에서 `Settings → Pages` 또는 repository의 Pages 섹션에서 배포 브랜치(`main` 또는 `gh-pages`)를 설정
4. 배포 후 배포 URL에서 최종 검증
5. 태그 생성
   ```bash
   git tag v1.0
   git push origin v1.0
   ```

검증 체크리스트는 `doc/v1.0-checklist.md`를 참고하세요.
