// ============================================
// Theme
// ============================================

// State
let currentTheme = 'light';
let themeSource = 'system';

// 현재의 OS 테마를 알아낸다.
const getSystemTheme = () => {
  // Feature Detection : 지원하면 시스템 테마 확인, 지원하지 않으면 기본값 Light
  if (!window.matchMedia) return 'light';

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

// 현재의 테마를 변경하고 DOM에 반영한다.
const applyTheme = (theme, source) => {

  // State  변경
  currentTheme = theme;
  themeSource = source;

  // Attribute (data-theme) 변경
  document.documentElement.setAttribute('data-theme', currentTheme );
};

// 사용자의 테마 전환 처리, localStorage에 저장한다.
const toggleTheme = () => {
  // 새로 설정될 Theme = 현재의 Theme의 토글값
  const nextTheme = currentTheme === 'light' ? 'dark' : 'light';

  // 테마 반영 + 저장
  applyTheme(nextTheme, 'user');
  localStorage.setItem('theme', nextTheme);
};

// OS 테마가 변경되는 것을 감시하도록 설정한다. (이벤트 핸들러)
const initSystemThemeSync = () => {

  // Feature Detection
  if (!window.matchMedia) return;

  const systemThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const handleSystemThemeChange = (event) => {
    if (themeSource === 'user') return;

    applyTheme(event.matches ? 'dark' : 'light', 'system');
  };

  // 이벤트 핸들러 연결
  systemThemeMediaQuery.addEventListener('change', handleSystemThemeChange);

};

// 초기 테마를 결정하고, 이벤트와 시스템 테마 감시를 초기화한다.
const initTheme = () => {
  const themeToggle = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem('theme');

  // 초기 테마 결정
  if (savedTheme) {
    applyTheme(savedTheme, 'user');
  } else {
    applyTheme(getSystemTheme(), 'system');
  }

  // 테마 버튼 이벤트 핸들러 등록
  themeToggle?.addEventListener('click', toggleTheme);

  // 시스템 테마 변경 감시 시작
  initSystemThemeSync();
};

export { initTheme };