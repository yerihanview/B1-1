// ============================================
// v0.4 — 기본 DOM 인터랙션
// ============================================

// DOM 선택
// ============================================
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const siteHeader = document.querySelector('.site-header');
const scrollToTopButton = document.createElement('button');

// Scroll-to-Top 버튼 생성
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
