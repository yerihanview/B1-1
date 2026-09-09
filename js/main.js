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
  if (!mainNav || !navToggle) {
    console.warn('toggleMenu: mainNav or navToggle not found', { mainNav, navToggle });
    return;
  }

  mainNav.classList.toggle('active');
  const newState = navToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true';
  navToggle.setAttribute('aria-expanded', newState);
  console.log('toggleMenu:', { active: mainNav.classList.contains('active'), ariaExpanded: newState });
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
// v0.7 — GitHub API를 이용한 Projects 동적 렌더링
// ============================================

const projectsContainer = document.querySelector('#project-list');
const projectsStatus = document.querySelector('#projects-status');

// v0.8 — Filter 상태 및 원본 저장
let originalRepos = [];
let currentFilter = 'All';

// Generate filter buttons from fetched repos (unique languages)
const generateFiltersFromRepos = (repos) => {
  const container = document.querySelector('#project-filters');
  if (!container) return;

  // Count languages (treat falsy language as 'Unknown') and sort by frequency
  const counts = repos.reduce((acc, r) => {
    const key = r.language || 'Unknown';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const languages = Object.keys(counts).sort((a, b) => {
    // primary: frequency desc, secondary: name asc
    if (counts[b] !== counts[a]) return counts[b] - counts[a];
    return a.localeCompare(b);
  });

  const createButton = (filterName, isActive = false) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'filter-button';
    if (isActive) btn.classList.add('active');
    btn.setAttribute('data-filter', filterName);
    btn.setAttribute('aria-pressed', String(isActive));
    btn.textContent = filterName;
    return btn;
  };

  // Clear existing
  container.innerHTML = '';

  // All button first
  container.appendChild(createButton('All', currentFilter === 'All'));

  // Add language buttons in sorted order
  languages.forEach((lang) => {
    container.appendChild(createButton(lang, currentFilter === lang));
  });
};

const setupFilterUI = () => {
  const filters = document.querySelector('#project-filters');
  if (!filters) return;

  filters.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-filter]');
    if (!btn) return;
    const selected = btn.getAttribute('data-filter');
    if (!selected) return;
    if (currentFilter === selected) return; // no-op

    currentFilter = selected;
    // update active class
    filters.querySelectorAll('button[data-filter]').forEach((b) => {
      b.classList.toggle('active', b.getAttribute('data-filter') === currentFilter);
    });

    applyCurrentFilter();
  });
};

const updateFilterUI = () => {
  const filters = document.querySelector('#project-filters');
  if (!filters) return;
  filters.querySelectorAll('button[data-filter]').forEach((b) => {
    const isActive = b.getAttribute('data-filter') === currentFilter;
    b.classList.toggle('active', isActive);
    b.setAttribute('aria-pressed', String(isActive));
  });
};

const applyCurrentFilter = () => {
  if (!Array.isArray(originalRepos) || originalRepos.length === 0) {
    renderEmpty();
    return;
  }

  if (currentFilter === 'All') {
    renderProjects(originalRepos);
    return;
  }

  const filtered = originalRepos.filter((repo) => repo.language === currentFilter);

  if (filtered.length === 0) {
    setProjectsStatus('No projects match this filter.');
    if (projectsContainer) projectsContainer.innerHTML = '';
    return;
  }

  renderProjects(filtered);
};

// GitHub 사용자 이름을 설정하세요.
// (예: const GITHUB_USERNAME = 'your-username')
const GITHUB_USERNAME = 'yerihanview';

const setProjectsStatus = (message, isError = false) => {
  if (!projectsStatus) return;
  projectsStatus.textContent = message;
  projectsStatus.classList.toggle('is-error', Boolean(isError));
};

const renderLoading = () => {
  setProjectsStatus('Loading projects...');
  if (projectsContainer) projectsContainer.innerHTML = '';
};

const renderError = (message) => {
  setProjectsStatus(message || 'Failed to load projects.', true);
  if (!projectsContainer) return;
  projectsContainer.innerHTML = '';

  const retryBtn = document.createElement('button');
  retryBtn.type = 'button';
  retryBtn.textContent = 'Retry';
  retryBtn.addEventListener('click', () => {
    fetchAndRenderProjects();
  });

  projectsContainer.appendChild(retryBtn);
};

const renderEmpty = () => {
  setProjectsStatus('No projects to display.');
  if (projectsContainer) projectsContainer.innerHTML = '';
};

const createProjectCard = (repo) => {
  const article = document.createElement('article');
  article.className = 'project-card';

  const title = document.createElement('h3');
  title.textContent = repo.name || 'Untitled';

  const desc = document.createElement('p');
  desc.textContent = repo.description || '';

  const lang = document.createElement('p');
  // Show 'Unknown' when language is missing
  lang.textContent = `사용 언어: ${repo.language || 'Unknown'}`;

  const link = document.createElement('a');
  link.href = repo.html_url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = '저장소 링크';

  article.appendChild(title);
  if (desc.textContent) article.appendChild(desc);
  if (lang.textContent) article.appendChild(lang);
  article.appendChild(link);

  return article;
};

const renderProjects = (repos) => {
  setProjectsStatus('');
  if (!projectsContainer) return;

  if (!Array.isArray(repos) || repos.length === 0) {
    renderEmpty();
    return;
  }

  projectsContainer.innerHTML = '';
  repos.forEach((repo) => {
    const card = createProjectCard(repo);
    projectsContainer.appendChild(card);
  });
};

const fetchAndRenderProjects = async () => {
  if (!GITHUB_USERNAME) {
    renderError('GitHub username not configured.');
    return;
  }

  const apiUrl = `https://api.github.com/users/${encodeURIComponent(GITHUB_USERNAME)}/repos`;

  try {
    renderLoading();

    const response = await fetch(apiUrl);

    if (!response.ok) {
      // rate limit(403) 등 HTTP 오류 처리
      const statusText = `Error ${response.status}: ${response.statusText}`;
      renderError(statusText);
      return;
    }

    const data = await response.json();

    // 필요한 최소 필드만 골라서 렌더링
    const repos = data.map(({ name, description, language, html_url }) => ({
      name,
      description,
      language,
      html_url,
    }));

    // 원본 데이터 저장하고 필터 UI를 동적으로 생성 후 기본 상태로 렌더
    originalRepos = repos;
    currentFilter = 'All';
    generateFiltersFromRepos(originalRepos);
    updateFilterUI();
    renderProjects(originalRepos);
  } catch (err) {
    renderError(err.message || 'Network error');
  }
};

// v0.9 — IntersectionObserver 기반 스크롤 진입 애니메이션 초기화
const initIntersectionObserver = () => {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements || revealElements.length === 0) return;

  // Feature detect
  if (!('IntersectionObserver' in window)) {
    console.warn('IntersectionObserver not supported — revealing all elements');
    revealElements.forEach((el) => el.classList.add('visible'));
    return;
  }

  const options = { threshold: 0.2 };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      console.log('observer entry', entry.target.id || entry.target.className, entry.isIntersecting, entry.intersectionRatio);
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, options);

  revealElements.forEach((el) => {
    observer.observe(el);
    console.log('observing', el.id || el.className);
  });
};

// 페이지 로드 후 자동 호출
document.addEventListener('DOMContentLoaded', () => {
  // Setup filter UI handlers regardless; they will no-op if element missing
  setupFilterUI();

  // Initialize IntersectionObserver for reveal animations
  initIntersectionObserver();

  if (document.querySelector('#projects')) {
    fetchAndRenderProjects();
  }

  // Initialize Hero typing effect
  initHeroTyping();
});

// ============================================
// v0.6 — Contact Form 유효성 검사
// ============================================
const contactForm = document.querySelector('#contact-form');

if (contactForm) {
  const nameInput = document.querySelector('#name');
  const emailInput = document.querySelector('#email');
  const messageInput = document.querySelector('#message');
  const formStatus = document.querySelector('#form-status');
  const submitButton = contactForm.querySelector('button[type="submit"]');

  const setSubmitState = (isSubmitting) => {
    if (submitButton) {
      submitButton.disabled = isSubmitting;
      submitButton.textContent = isSubmitting ? '전송 중...' : 'Submit';
    }
  };

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
  // - preventDefault()를 사용하여 실제 제출을 막고, 유효성 검사를 수행한 후
  //   실제 외부 서비스로 전송하는 흐름을 구현합니다.
  // ============================================
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const isNameValid = validateName(nameInput);
    const isEmailValid = validateEmail(emailInput);
    const isMessageValid = validateMessage(messageInput);
    const isFormValid = isNameValid && isEmailValid && isMessageValid;

    if (formStatus) {
      formStatus.textContent = '';
      formStatus.classList.remove('is-success', 'is-error');
    }

    if (!isFormValid) {
      const firstInvalidField = [nameInput, emailInput, messageInput].find(
        (input) => input.getAttribute('aria-invalid') === 'true'
      );

      firstInvalidField?.focus();
      return;
    }

    const formData = new FormData(contactForm);
    const endpoint = 'https://formspree.io/f/maeyladk';

    try {
      setSubmitState(true);

      if (formStatus) {
        formStatus.textContent = '전송 중...';
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Form submission failed: ${response.status}`);
      }

      if (formStatus) {
        formStatus.textContent = '메시지가 성공적으로 전송되었습니다.';
        formStatus.classList.add('is-success');
      }

      contactForm.reset();
      [nameInput, emailInput, messageInput].forEach(resetFieldState);
    } catch (error) {
      if (formStatus) {
        formStatus.textContent = '메시지 전송에 실패했습니다. 다시 시도해주세요.';
        formStatus.classList.add('is-error');
      }
      console.error(error);
    } finally {
      setSubmitState(false);
    }
  });
}

// ============================================
// v1.1 — Hero 타이핑 효과
// ============================================
const initHeroTyping = () => {
  // 타이핑 대상 요소 선택
  const heroTitle = document.querySelector('#hero-title');
  
  // 타이핑 대상이 없으면 함수 종료 (기존 기능 보호)
  if (!heroTitle) {
    console.warn('Hero typing target not found');
    return;
  }
  
  // 전체 타이핑할 문자열 (현재 Hero title의 최종 텍스트)
  const fullText = heroTitle.textContent;
  
  // 현재 글자 위치 (시작값: 0)
  let currentIndex = 0;
  
  // 각 글자 사이의 시간 간격 (ms)
  const typingDelay = 100;
  
  // 타이핑 함수
  const typeText = () => {
    // 아직 표시할 글자가 남아있는지 확인
    if (currentIndex < fullText.length) {
      // 현재까지의 문자열 (시작부터 현재 위치까지)
      const currentText = fullText.slice(0, currentIndex + 1);
      
      // 타이핑 대상 요소의 textContent 업데이트
      heroTitle.textContent = currentText;
      
      // 현재 글자 위치 증가
      currentIndex++;
      
      // setTimeout으로 다음 타이핑 실행 예약
      setTimeout(typeText, typingDelay);
    }
    // 모든 글자를 표시하면 추가 setTimeout 없음 (자동 종료)
  };
  
  // 초기 상태: 타이핑이 빈 문자열에서 시작하도록 설정
  heroTitle.textContent = '';
  
  // 타이핑 시작
  typeText();
};
