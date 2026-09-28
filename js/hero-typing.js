
// ============================================
//  Hero 타이핑 효과
// ============================================
const initHeroTyping = () => {
  
  // 타이핑 대상 요소 선택, 타이핑 대상이 없으면 함수 종료 (기존 기능 보호)
  const heroTitle = document.querySelector('#hero-title');
  if (!heroTitle) return;

  
  // 변수 
  const fullText = heroTitle.textContent; // 전체 타이핑할 문자열 저장 (현재 Hero title의 최종 텍스트)
  let currentIndex = 0;     // State: 현재 글자 위치 (시작값: 0)
  const typingDelay = 100;  // 각 글자 사이의 시간 간격 (ms)

  
  // 타이핑 함수
  const typeText = () => {
    if (currentIndex < fullText.length) { 
      // 이번에 출력할 문자열 (전체 문자열 중에서 0부터 현재 위치까지)
      const currentText = fullText.slice(0, currentIndex + 1);
      
      // 타이핑 대상 요소의 textContent 업데이트
      heroTitle.textContent = currentText;
      
      // 현재 글자 위치 증가
      currentIndex++;
      
      // setTimeout으로 다음 타이핑 실행 예약
      setTimeout(typeText, typingDelay);
    }
  };
  
  // 초기 상태: 타이핑이 빈 문자열에서 시작하도록 설정
  heroTitle.textContent = '';
  
  // 타이핑 시작
  typeText();
};



export { initHeroTyping };