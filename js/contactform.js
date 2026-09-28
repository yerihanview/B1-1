
// ============================================
// UI 상태 변경 
// ============================================

// 입력값 검증 결과를 해당 입력 필드의 UI에 반영 
const setFieldState = (input, isValid, message = '') => {
  // 입력 필드에 가장 가까운 상위 요소(form-field)내에 포함된 error-message요소를 찾는다.
  const field = input.closest('.form-field');
  const errorMessage = field.querySelector('.error-message');
  
  // 검사 결과에 따라 class를 반전한다.
  field.classList.toggle('is-invalid', !isValid);
  field.classList.toggle(
    'is-valid',
    isValid && input.value.trim() !== ''
  );

  // 접근성 상태 + 검사 결과를 DOM에 기록해 둔다.
  input.setAttribute('aria-invalid', String(!isValid));

  // 사용자에게 보여줄 오류 메시지
  errorMessage.textContent = message;
};

// 입력값 검증 흔적을 초기 상태로 되돌린다.
const resetFieldState = (input) => {
  // 입력 필드에 가장 가까운 상위 요소(form-field)내에 포함된 error-message요소를 찾는다.
  const field = input.closest('.form-field');
  const errorMessage = field.querySelector('.error-message');
  
  field.classList.remove('is-invalid', 'is-valid');
  input.setAttribute('aria-invalid', 'false');
  errorMessage.textContent = '';
};

// 전송 상태에 따라 submit 버튼의 UI를 변경 : 활성화/비활성화, 문구
const setSubmitState = (submitButton, isSubmitting) => {
    submitButton.disabled = isSubmitting;
    submitButton.textContent = isSubmitting ? '전송 중...' : 'Submit';
};


// ============================================
// Validation
// ============================================

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
    setFieldState(
      input,
      false,
      '올바른 이메일 형식을 입력하세요.'
    );
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

const validateField = (input) => {
  if (input.id === 'name') {
    return validateName(input);
  }

  if (input.id === 'email') {
    return validateEmail(input);
  }

  return validateMessage(input);
};


// ============================================
// Submission : 준비된 Form Data를 외부 서버에 전송한다.
// ============================================
const submitForm = async (formData) => {
  const endpoint = 'https://formspree.io/f/maeyladk';

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: formData,
  });

  // HTTP 오류 확인
  if (!response.ok) {
    throw new Error(`Form submission failed: ${response.status}`);
  }
};

// ============================================
// Contact Form 초기화 
// ============================================
const initContactForm = () => {

  //--------------------------------
  // ContactForm 요소 준비
  //--------------------------------
  const contactForm = document.querySelector('#contact-form');
  if (!contactForm) return;

  // 입력 요소를 준비 (탐색 범위를 contactForm으로 한정한다.)
  const nameInput = contactForm.querySelector('#name');
  const emailInput = contactForm.querySelector('#email');
  const messageInput = contactForm.querySelector('#message');
  const formStatus = contactForm.querySelector('#form-status');
  const submitButton = contactForm.querySelector('button[type="submit"]');

  //--------------------------------
  // Event Handlers : 입력 폼 제출시
  //--------------------------------
  const handleSubmit = async (event) => {
    // form 요소의 기본 동작을 막는다. (브라우저가 직접 서버로 이동하면서 제출)
    event.preventDefault();

    // 모든 입력값이 정상인지 확인
    const isNameValid = validateName(nameInput);
    const isEmailValid = validateEmail(emailInput);
    const isMessageValid = validateMessage(messageInput);

    const isFormValid = isNameValid && isEmailValid && isMessageValid;

    // 이전 제출 결과 UI를 초기화
    formStatus.textContent = '';
    formStatus.classList.remove('is-success','is-error');
    

    // 하나라도 입력값에 오류가 있다면, 오류가 있는 첫번째 입력 필드로 찾아 이동한다.
    if (!isFormValid) {
      const firstInvalidField = [nameInput, emailInput, messageInput,
      ].find(
        (input) => input.getAttribute('aria-invalid') === 'true'
      );

      firstInvalidField?.focus();
      return;
    }

    // 검증 통과 상태 > 입력값을 전송 가능한 상태로 만든다
    const formData = new FormData(contactForm);

    try {
      // submit버튼에 전송중인 상태 표시
      setSubmitState(submitButton, true); 

      // form 전체의 상태 표시 : 전송중
      formStatus.textContent = '전송 중...';

      // form 데이터 전송
      await submitForm(formData);

      // form 전체의 상태 표시 : 전송 성공
      formStatus.textContent = '메시지가 성공적으로 전송되었습니다.';
      formStatus.classList.add('is-success');
      

      // form 입력값 초기화
      contactForm.reset();

      // 각 입력 필드의 validation UI 초기화 
      [nameInput, emailInput, messageInput].forEach( resetFieldState );

    } catch (error) {
      formStatus.textContent = '메시지 전송에 실패했습니다. 다시 시도해주세요.';
      formStatus.classList.add('is-error');

      // form 입력값을 초기화 하지 않는다. 새로 작성하지 않도록
      console.error(error);
    } finally {
      setSubmitState(submitButton, false); // submit버튼을 기본 상태로 복원
    }
  };

  //--------------------------------
  // Event Registration
  //--------------------------------
  [nameInput, emailInput, messageInput].forEach((input) => {
    // 각 입력 필드의 값이 변경될 때 : 입력이 있을 때마다 실시간 검증
    // 값이 있거나 이미 오류가 표시된 필드 : 수정하는 동안 실시간 검증

    input.addEventListener('input', () => {
      const field = input.closest('.form-field');
      const hasValue = input.value.trim() !== ''; // 입력 필드에 입력값이 있는가?

      if ( hasValue || field.classList.contains('is-invalid') ) {
        validateField(input);
      } else {
        resetFieldState(input); // 무입력인 경우
      }
    });

    // 각 입력 필드에서 포커스가 빠져나갈 때 (입력을 마쳤다고 보고) : 해당 필드 무조건 검증
    input.addEventListener('blur', () => {
      validateField(input);
    });
  });

  // 폼 제출을 시도할 때 : 모든 필드 검증
  contactForm.addEventListener('submit', handleSubmit);
};

export { initContactForm };