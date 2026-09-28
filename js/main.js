
// ============================================
// main.js = Entry Point (or Composition Layer)
// ============================================

// 기능 모듈
import { initHeroTyping } from './hero-typing.js';
import { initReveal } from './reveal.js';
import { initNavigation } from './navigation.js';
import { initScroll } from './scroll.js';
import { initTheme } from './theme.js';
import { initContactForm } from './contactform.js';
import { initProjects } from './projects.js';


// 기능 모듈 초기화
initTheme();
initNavigation();
initScroll();
initContactForm();
initReveal();
initProjects(); 
initHeroTyping();