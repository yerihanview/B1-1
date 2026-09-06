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

// ============================================
// v0.6 — Contact Form 유효성 검사
// ============================================
const contactForm = document.querySelector('#contact-form');

if (contactForm) {
  const nameInput = document.querySelector('#name');
  const emailInput = document.querySelector('#email');
  const messageInput = document.querySelector('#message');
  const formStatus = document.querySelector('#form-status');

  /*
   setFieldState 함수는 입력 필드의 유효성 검사 결과(성공/실패)를 UI에 반영
   1. 입력창(input)과 가장 가까운 부모 폼 필드(.form-field) 및 에러 메시지 영역(.error-message)을 찾는다.
   2. 유효하지 않다면(!isValid) 부모 필드에 is-invalid 클래스를 붙이고, 유효하다면 is-valid 클래스를 붙인다.
   3. 스크린 리더 등 웹 접근성을 위해 aria-invalid 속성을 설정합니다.
   4.실패 시 전달받은 message를 에러 메시지 영역에 텍스트로 표시합니다.
  */
  const setFieldState = (input, isValid, message = '') => {
    const field = input.closest('.form-field');
    const errorMessage = field?.querySelector('.error-message');

    if (!field || !errorMessage) {
      return;
    }

    field.classList.toggle('is-invalid', !isValid);
    field.classList.toggle('is-valid', isValid && input.value.trim() !== '');
    input.setAttribute('aria-invalid', String(!isValid));
    errorMessage.textContent = message;
  };

  /*
   resetFieldState 함수는 입력 필드의 상태를 초기화
    1. 입력창(input)과 가장 가까운 부모 폼 필드(.form-field) 및 에러 메시지 영역(.error-message)을 찾는다.  
    2. 부모 필드에서 is-invalid, is-valid 클래스를 제거하고, aria-invalid 속성을 false로 설정한다.
    3. 에러 메시지 영역의 텍스트를 비운다.
  */
   const resetFieldState = (input) => {
    const field = input.closest('.form-field');
    const errorMessage = field?.querySelector('.error-message');

    if (!field || !errorMessage) {
      return;
    }

    field.classList.remove('is-invalid', 'is-valid');
    input.setAttribute('aria-invalid', 'false');
    errorMessage.textContent = '';
  };

  /*
    validateName, validateEmail, validateMessage 함수는 각각 이름, 이메일, 메시지 입력 필드의 유효성을 검사
    1. 입력값이 비어있으면 setFieldState를 호출하여 에러 메시지를 표시하고 false를 반환
    2. 이메일의 경우 정규식을 사용하여 형식이 올바른지 확인
    3. 유효하면 setFieldState를 호출하여 성공 상태를 표시하고 true를 반환
  */
  const validateName = (input) => {
    const value = input.value.trim();

    if (!value) {
      setFieldState(input, false, '이름을 입력하세요.');
      return false;
    }

    setFieldState(input, true);
    return true;
  };

  const validateEmail = (input) => {
    const value = input.value.trim();

    if (!value) {
      setFieldState(input, false, '이메일을 입력하세요.');
      return false;
    }

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    if (!isEmailValid) {
      setFieldState(input, false, '올바른 이메일 형식을 입력하세요.');
      return false;
    }

    setFieldState(input, true);
    return true;
  };

  const validateMessage = (input) => {
    const value = input.value.trim();

    if (!value) {
      setFieldState(input, false, '메시지를 입력하세요.');
      return false;
    }

    setFieldState(input, true);
    return true;
  };

  /*
    validateField 함수는 입력 필드에 따라 적절한 유효성 검사 함수를 호출
    1. nameInput이면 validateName 호출
    2. emailInput이면 validateEmail 호출
    3. 그 외에는 validateMessage 호출
  */
  const validateField = (input) => {
    if (input === nameInput) {
      return validateName(input);
    }

    if (input === emailInput) {
      return validateEmail(input);
    }

    return validateMessage(input);
  };

  /*
    입력 필드에 이벤트 리스너를 추가하여 실시간 유효성 검사 및 상태 초기화
    1. input 이벤트: 입력값이 변경될 때마다 validateField 호출
    2. blur 이벤트: 입력 필드에서 포커스가 벗어날 때 validateField 호출
    3. 입력값이 비어있고 is-invalid 클래스가 없는 경우 resetFieldState 호출
  */
  [nameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener('input', () => {
      const field = input.closest('.form-field');
      const hasValue = input.value.trim() !== '';

      if (hasValue || field?.classList.contains('is-invalid')) {
        validateField(input);
      } else {
        resetFieldState(input);
      }
    });

    input.addEventListener('blur', () => {
      validateField(input);
    });
  });

  // ============================================
  // 6. Contact Form 제출 이벤트 처리
  // - preventDefault()를 사용하여 실제 제출을 막고, 유효성 검사를 수행한 후 상태 메시지를 표시합니다.
  // ============================================
    contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const isNameValid = validateName(nameInput);
    const isEmailValid = validateEmail(emailInput);
    const isMessageValid = validateMessage(messageInput);
    const isFormValid = isNameValid && isEmailValid && isMessageValid;

    if (formStatus) {
      formStatus.textContent = '';
      formStatus.classList.remove('is-success');
    }

    if (!isFormValid) {
      const firstInvalidField = [nameInput, emailInput, messageInput].find(
        (input) => input.getAttribute('aria-invalid') === 'true'
      );

      firstInvalidField?.focus();
      return;
    }

    if (formStatus) {
      formStatus.textContent = '성공적으로 제출되었습니다.';
      formStatus.classList.add('is-success');
    }

    contactForm.reset();
    [nameInput, emailInput, messageInput].forEach(resetFieldState);
  });
}
