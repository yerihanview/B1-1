// ============================================
// Scroll : 스크롤 위치에 따른 UI 제어
// ============================================

const initScroll = () => {
  const siteHeader = document.querySelector('.site-header');

  // scroll-to-top 버튼 생성/추가
  const scrollToTopButton = document.createElement('button');
  scrollToTopButton.id = 'scroll-to-top-btn';
  scrollToTopButton.type = 'button';
  scrollToTopButton.textContent = '↑';
  scrollToTopButton.setAttribute('aria-label', '페이지 상단으로 이동');
  document.body.appendChild(scrollToTopButton);


  // 스크롤 위치 감지 기준값
  const headerScrollThreshold = 50;
  const scrollToTopThreshold = 300;

  // 스크롤 위치 감지하여 UI 변경 
  const handleScroll = () => {
    // Header 영역 UI 변경 : 불투명/반투명
    if (window.scrollY > headerScrollThreshold) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }

    // scroll-to-top 버튼 표시/숨김
    if (window.scrollY > scrollToTopThreshold) {
      scrollToTopButton.classList.add('visible');
    } else {
      scrollToTopButton.classList.remove('visible');
    }
  };

  // scroll-to-top 버튼을 click할 때, 화면 상단으로 부드럽게 이동
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // 이벤트 핸들러 연결
  window.addEventListener('scroll', handleScroll);
  scrollToTopButton.addEventListener('click', scrollToTop);

  // 현재 scrollY값 기준으로 최초 UI 상태 설정 : 브라우저에서 알아서 해줌
  // handleScroll();
};

export { initScroll };