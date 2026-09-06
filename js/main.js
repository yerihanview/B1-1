// ============================================
// v0.4 — 기본 DOM 인터랙션
// ============================================

// DOM 선택
// ============================================
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const siteHeader = document.querySelector('.site-header');
const themeToggle = document.querySelector('.theme-toggle');
const scrollToTopButton = document.createElement('button');

// ============================================
// v0.5 — Theme 상태 관리
// ============================================
// 페이지 시작 시 localStorage에서 저장된 theme 복원
const initTheme = () => {
  // localStorage에서 저장된 theme 읽음
  const savedTheme = localStorage.getItem('theme');
  
  // 저장값이 있으면 사용, 없으면 'light'를 기본값으로 사용
  const themeToApply = savedTheme || 'light';
  
  // 현재 theme 상태에 적용
  currentTheme = themeToApply;
  
  // DOM의 data-theme 속성에 적용
  document.documentElement.setAttribute('data-theme', currentTheme);
};

// 현재 theme를 HTML의 data-theme 속성에서 읽음
// 초기값: 'light' (HTML에서 설정됨)
let currentTheme = document.documentElement.getAttribute('data-theme') || 'light';

// Theme 전환 함수
const toggleTheme = () => {
  // 현재 theme 확인 후 다음 theme 결정
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  // DOM의 data-theme 속성 변경
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  // localStorage에 theme 저장
  localStorage.setItem('theme', currentTheme);
};

// Theme Toggle button에 event listener 추가
themeToggle.addEventListener('click', toggleTheme);

// ============================================
// Scroll-to-Top 버튼 생성
// ============================================
scrollToTopButton.id = 'scroll-to-top-btn';
scrollToTopButton.type = 'button';
scrollToTopButton.textContent = '↑';
scrollToTopButton.setAttribute('aria-label', '페이지 상단으로 이동');
document.body.appendChild(scrollToTopButton);

// ============================================
// 1. 모바일 햄버거 메뉴 토글
// ============================================
const toggleMenu = () => {
  mainNav.classList.toggle('active');
  navToggle.setAttribute(
    'aria-expanded',
    navToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
  );
};

navToggle.addEventListener('click', toggleMenu);

// ============================================
// 2. Navigation 링크 클릭 시 메뉴 닫기
// ============================================
const closeMenu = () => {
  mainNav.classList.remove('active');
  navToggle.setAttribute('aria-expanded', 'false');
};

navLinks.forEach((link) => {
  link.addEventListener('click', closeMenu);
});

// ============================================
// 3. 부드러운 내부 스크롤
// ============================================
// HTML의 <html> 요소에 이미 smooth scroll-behavior이 적용되어 있으므로
// 기본 앵커 링크 동작을 방해하지 않음.

// ============================================
// 4. 스크롤에 따른 Header 스타일 변경
// ============================================
const scrollThreshold = 50;

const handleScroll = () => {
  if (window.scrollY > scrollThreshold) {
    siteHeader.classList.add('scrolled');
  } else {
    siteHeader.classList.remove('scrolled');
  }

  // Scroll-to-Top 버튼 표시/숨김
  if (window.scrollY > 300) {
    scrollToTopButton.classList.add('visible');
  } else {
    scrollToTopButton.classList.remove('visible');
  }
};

window.addEventListener('scroll', handleScroll);

// ============================================
// 5. Scroll-to-Top 버튼 기능
// ============================================
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

scrollToTopButton.addEventListener('click', scrollToTop);

// ============================================
// 페이지 시작 시 theme 초기화
// ============================================
initTheme();
