// ============================================
// Projects : GitHub에서 프로젝트 정보를 가져온다.
// ============================================

// DOM References
const projectsContainer = document.querySelector('#projects-list');   // Project 카드 표시 영역
const projectsStatus = document.querySelector('#projects-status');    // Project 로딩 상태 표시 영역
const filterContainer = document.querySelector('#project-filters');   // Filter 버튼 영역

// Configuration
const GITHUB_USERNAME = 'yerihanview';

// State
let projects = [];
let currentFilter = 'all';


// ============================================
// Data From Github
// ============================================

const fetchProjects = async () => {
  const apiUrl =
    `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(
      `GitHub API error: ${response.status}`
    );
  }

  // json형식의 응답 본문을 JavaScript 값으로 변환/저장한다.  
  const repos = await response.json();

  return repos;
};


// ============================================
// Filter UI 만들기
// ============================================

// github repo데이터에 따라 필요한 필터 버튼들을 생성한다.
const generateFiltersFromRepos = (repos) => {

  // repos로 받은 정보에서 language값들만을 중복없이 추출한 배열을 만든다.  
  const languages = [...                // 4. set안의 값들을 펼쳐서 다시 배열로 만든다.
    new Set(                            // 3. set 형식으로 변환하여 중복을 없앴다.
      repos
        .map((repo) => repo.language)   // 1. repo.language 값만 추출한 배열을 만든다.
        .filter(Boolean)                // 2. language값이 없는 항목을 제거한다.
    ),
  ];

  filterContainer.innerHTML = '';

  // 버튼 만들기 : ALL
  const allButton = document.createElement('button');
  allButton.type = 'button';
  allButton.className = 'filter-button active';
  allButton.dataset.filter = 'all';
  allButton.textContent = 'All';

  filterContainer.appendChild(allButton);


  // 버튼 만들기 : repos에서 읽어들인 language별 버튼을 만든다.
  languages.forEach((language) => {
    const button = document.createElement('button');

    button.type = 'button';
    button.className = 'filter-button';
    button.dataset.filter = language;
    button.textContent = language;

    filterContainer.appendChild(button);
  });
};

// 선택된 버튼을 Active 상태로 바꾼다.
const updateFilterUI = () => {

  const filterButtons = filterContainer.querySelectorAll('.filter-button');

  // 현재 선택된 버튼과 일치하는 버튼만 active 상태가 되도록 한다.
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === currentFilter;
    button.classList.toggle('active', isActive);
  });
};


// ============================================
// Filtering : 조건에 맞는 프로젝트 배열 반환
// ============================================

const filterProjects = (projectsToFilter, filter) => {
  if (filter === 'all') {
    return projectsToFilter;
  }

  return projectsToFilter.filter((project) => {
    return project.language === filter;
  });
};

// ============================================
// Rendering : 프로젝트 카드 만들기
// ============================================

// Repository 객체 하나마다 Project Card를 만든다.
const createProjectCard = (repo) => {

  // article 요소 만들기
  const article = document.createElement('article');
  article.className = 'project-card';

  // 프로젝트 이름
  const title = document.createElement('h3');
  title.textContent = repo.name;

  // 프로젝트 설명
  const description = document.createElement('p');
  description.textContent = repo.description || 'No description available.';

  // 프로젝트 개발언어
  const language = document.createElement('p');
  language.className = 'project-language';
  language.textContent = repo.language || 'Language not specified';

  // 프로젝트 Repository 링크
  const link = document.createElement('a');
  link.href = repo.html_url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = 'View on GitHub';

  // article 작성 완료
  article.append(
    title,
    description,
    language,
    link
  );

  return article;
};

// 정상적인 데이터 렌더링
const renderProjects = (projectsToRender) => {

  // 기존에 생성된 카드를 모두 지운다.
  projectsContainer.innerHTML = '';

  // 전달받은 프로젝트 정보로 카드를 만들어, 프로젝트 영역에 추가한다.
  projectsToRender.forEach((project) => {
    const card = createProjectCard(project);
    projectsContainer.appendChild(card);
  });

  // 상태 메시지를 지운다.
  projectsStatus.textContent = '';
};



// ============================================
// Rendering : 상태 메시지
// ============================================

// 로딩 상태 메시지
const renderLoading = () => {
  
  // 기존 HTML요소를 지우고 상태 메시지 출력 
  projectsContainer.innerHTML = '';
  projectsStatus.textContent = 'Loading projects...';
};

// 데이터가 없는 상태 표시
const renderEmpty = (message) => {
  
  // 기존 HTML요소를 지우고 상태 메시지 출력 
  projectsContainer.innerHTML = '';
  projectsStatus.textContent = message;
};

// 오류 상태
const renderError = (message) => {

  // 기존 HTML요소를 지우고 상태 메시지 출력 
  projectsContainer.innerHTML = '';
  projectsStatus.textContent = message;

  // Retry 버튼을 만든다
  const retryButton = document.createElement('button');

  retryButton.type = 'button';
  retryButton.className = 'retry-btn';
  retryButton.textContent = 'Retry';

  //loadProjects를 이벤트 핸들러로 연결한다.
  retryButton.addEventListener('click', loadProjects);

  // Retry 버튼을 추가한다. (#projects-status)
  projectsStatus.appendChild(retryButton);
};



// ============================================
// View
// ============================================

const updateProjectsView = () => {
  if (projects.length === 0) {
    renderEmpty('표시할 프로젝트가 없습니다.');
    return;
  }

  // 필터 조건에 맞는 프로젝트를 찾는다.
  const visibleProjects = filterProjects(projects, currentFilter);

  if (visibleProjects.length === 0) {
    renderEmpty('해당 필터의 프로젝트가 없습니다.');
    return;
  }

  // 필터 조건에 맞는 프로젝트 카드를 만든다.
  renderProjects(visibleProjects);
};


// ============================================
// Event Handler 연결 : 필터 버튼
// ============================================
const setupFilterUI = () => {

  // 필터 버튼 영역의 어떤 필터 버튼을 click해도 같은 이벤트 핸들러로 연결된다.
  filterContainer.addEventListener('click', (event) => {
    const button = event.target.closest('.filter-button');

    if (!button) {
      return;
    }

    // click한 버튼의 값을 currentFilter값으로 한다.
    currentFilter = button.dataset.filter || 'all'; 

    // currentFilter 값에 따라 UI를 갱신한다. (버튼의 모습, 프로젝트 리스트)
    updateFilterUI();
    updateProjectsView();
  });
};

// ============================================
// Orchestration
// ============================================

const loadProjects = async () => {

  // 로딩중 메시지를 먼저 출력한다.
  renderLoading();

  try {
    // 데이터 가져요기
    projects = await fetchProjects();

    // 필터 버튼 만들기
    generateFiltersFromRepos(projects);

    // 필터 버튼 All = Active
    currentFilter = 'all';
    updateFilterUI();

    // 선택된 핕터 기준으로 프로젝트 카드 만들기
    updateProjectsView();
 
  } catch (error) {
    renderError('프로젝트를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
    console.error(error);
  }
};

// ============================================
// Public Interface
// ============================================

const initProjects = () => {
  if (!projectsContainer || !projectsStatus || !filterContainer) return;
  
  setupFilterUI(); // 필터 버튼 영역에 이벤트 핸들러 연결한다.
  loadProjects();  // 프로젝트를 로딩한다.
};

export { initProjects };