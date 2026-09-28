
// =======================================================
// Reveal — IntersectionObserver 기반 스크롤 진입 애니메이션
// =======================================================

const initReveal = () => {
  // 관찰 대상 요소가 있는 지 확인
  const revealElements = document.querySelectorAll('.reveal'); // 없으면, 비어있는 NodeList반환
  if (revealElements.length === 0) return;

  // Feature detection : 브라우저가 이 기능을 지원하는가?
  // 지원하지 않으면, 처음부터 관찰 대상 요소를 모두 보여준다.
  if (!('IntersectionObserver' in window)) {
    console.warn('IntersectionObserver not supported — revealing all elements');
    revealElements.forEach((el) => el.classList.add('visible')); // 처음부터 다 보여준다.
    return;
  }

  // 기준 설정값 : 대상 요소의 20%
  const options = { threshold: 0.2 };

  // Observer 만들기 - 입력: 관찰결과를 처리할 callback + 옵션(options)
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible'); // 관찰 대상 요소(entry.target)을 화면에 보여준다.
        obs.unobserve(entry.target);           // 관찰대상에서 제거 > 애니메이션 효과는 한번만 
      }
    });
  }, options);

  // Observer의 관찰 대상 등록하기
  revealElements.forEach((el) => {
    observer.observe(el);    
  });
};


export { initReveal };