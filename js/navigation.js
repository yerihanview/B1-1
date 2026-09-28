// ============================================
// Navigation 
// ============================================

const initNavigation = () => {
  const navToggle = document.querySelector('.nav-toggle');   // 햄버거 버튼
  const mainNav = document.querySelector('.main-nav');       // 주요 메뉴 표시 영역
  const navLinks = document.querySelectorAll('.main-nav a'); // main-nav 내부의 모든 하위 a 요소 

  if (!navToggle || !mainNav) return;

  // 햄버거 버튼 클릭시, 주요 메뉴 표시 상태 변경
  const toggleMenu = () => {
    // 주요 메뉴 표시 영역의 active 상태 반전 : 펼치거나 닫거나
    mainNav.classList.toggle('active');

    // 주요 메뉴의 실제 표시 상태를 aria-expanded에 반영
    // 주요 메뉴 표시가 되는 지 여부를 버튼에서 알려준다.
    const isOpen = mainNav.classList.contains('active');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    
  };

  // 펼쳐진 주요 메뉴를 닫는다. (메뉴 링크를 클릭했을 때)
  const closeMenu = () => {
    mainNav.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  };


  // 네비게이션(햄버거)버튼에 이벤트핸들러(toggleMenu) 연결
  navToggle.addEventListener('click', toggleMenu);

  // main-nav 하위의 모든 메뉴 링크마다 이벤트핸들러(closeMenu) 연결
  navLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
};

export { initNavigation };