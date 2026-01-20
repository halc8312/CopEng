/**
 * 英単語帳アプリケーション
 * フラッシュカード形式の学習アプリ
 */

(function() {
  'use strict';

  // ============================================================================
  // Storage Keys
  // ============================================================================
  const STORAGE_KEY = 'vocabulary_progress';

  // ============================================================================
  // State
  // ============================================================================
  let words = [];
  let currentIndex = 0;
  let progress = {};
  let currentFilter = 'all';
  let searchQuery = '';

  // ============================================================================
  // DOM Elements
  // ============================================================================
  const elements = {
    // Menu
    menuBtn: document.getElementById('menu-btn'),
    menuPanel: document.getElementById('menu-panel'),
    menuOverlay: document.getElementById('menu-overlay'),
    menuClose: document.getElementById('menu-close'),
    menuItems: document.querySelectorAll('.menu-item'),
    resetProgress: document.getElementById('reset-progress'),

    // Views
    cardsView: document.getElementById('cards-view'),
    listView: document.getElementById('list-view'),
    progressView: document.getElementById('progress-view'),

    // Card View
    progressFill: document.getElementById('progress-fill'),
    currentIndexEl: document.getElementById('current-index'),
    totalCount: document.getElementById('total-count'),
    flashcard: document.getElementById('flashcard'),
    cardWord: document.getElementById('card-word'),
    cardMeaning: document.getElementById('card-meaning'),
    cardExample: document.getElementById('card-example'),
    btnPrev: document.getElementById('btn-prev'),
    btnNext: document.getElementById('btn-next'),
    btnForgot: document.getElementById('btn-forgot'),
    btnRemembered: document.getElementById('btn-remembered'),
    btnShuffle: document.getElementById('btn-shuffle'),

    // List View
    searchInput: document.getElementById('search-input'),
    filterBtns: document.querySelectorAll('.filter-btn'),
    wordList: document.getElementById('word-list'),

    // Progress View
    statTotal: document.getElementById('stat-total'),
    statRemembered: document.getElementById('stat-remembered'),
    statForgot: document.getElementById('stat-forgot'),
    statPercentage: document.getElementById('stat-percentage'),
    chartRemembered: document.getElementById('chart-remembered'),
    chartForgot: document.getElementById('chart-forgot')
  };

  // ============================================================================
  // Initialization
  // ============================================================================
  function init() {
    // Load words data
    if (typeof WORDS_DATA !== 'undefined' && Array.isArray(WORDS_DATA)) {
      words = [...WORDS_DATA];
    } else {
      console.error('Words data not found');
      return;
    }

    // Load saved progress
    loadProgress();

    // Initialize UI
    updateCardView();
    updateListView();
    updateProgressView();

    // Set up event listeners
    setupEventListeners();
  }

  // ============================================================================
  // Local Storage
  // ============================================================================
  function loadProgress() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        progress = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load progress:', e);
      progress = {};
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('Failed to save progress:', e);
    }
  }

  function resetAllProgress() {
    if (confirm('学習進捗をすべてリセットしますか？')) {
      progress = {};
      saveProgress();
      updateCardView();
      updateListView();
      updateProgressView();
      closeMenu();
    }
  }

  // ============================================================================
  // Menu
  // ============================================================================
  function openMenu() {
    elements.menuPanel.classList.add('active');
    elements.menuOverlay.classList.add('active');
    elements.menuPanel.setAttribute('aria-hidden', 'false');
    elements.menuBtn.setAttribute('aria-expanded', 'true');
    elements.menuClose.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    elements.menuPanel.classList.remove('active');
    elements.menuOverlay.classList.remove('active');
    elements.menuPanel.setAttribute('aria-hidden', 'true');
    elements.menuBtn.setAttribute('aria-expanded', 'false');
    elements.menuBtn.focus();
    document.body.style.overflow = '';
  }

  function switchView(viewName) {
    // Update menu items
    elements.menuItems.forEach(item => {
      item.classList.toggle('active', item.dataset.view === viewName);
    });

    // Update views
    elements.cardsView.classList.toggle('active', viewName === 'cards');
    elements.listView.classList.toggle('active', viewName === 'list');
    elements.progressView.classList.toggle('active', viewName === 'progress');

    // Update data for the view
    if (viewName === 'list') {
      updateListView();
    } else if (viewName === 'progress') {
      updateProgressView();
    }

    closeMenu();
  }

  // ============================================================================
  // Card View
  // ============================================================================
  function updateCardView() {
    if (words.length === 0) return;

    const word = words[currentIndex];
    
    // Update progress bar
    const progressPercent = ((currentIndex + 1) / words.length) * 100;
    elements.progressFill.style.width = `${progressPercent}%`;
    const progressBar = elements.progressFill.parentElement;
    progressBar.setAttribute('aria-valuenow', Math.round(progressPercent));

    // Update counter
    elements.currentIndexEl.textContent = currentIndex + 1;
    elements.totalCount.textContent = words.length;

    // Update card content
    elements.cardWord.textContent = word.word;
    elements.cardMeaning.textContent = word.meaning;
    elements.cardExample.textContent = word.example;

    // Reset card flip state
    elements.flashcard.classList.remove('flipped');

    // Update navigation buttons
    elements.btnPrev.disabled = currentIndex === 0;
    elements.btnNext.disabled = currentIndex === words.length - 1;
  }

  function flipCard() {
    elements.flashcard.classList.toggle('flipped');
  }

  function goToPrevCard() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCardView();
    }
  }

  function goToNextCard() {
    if (currentIndex < words.length - 1) {
      currentIndex++;
      updateCardView();
    }
  }

  function markAsRemembered() {
    const word = words[currentIndex];
    progress[word.id] = 'remembered';
    saveProgress();
    updateProgressView();
    goToNextCard();
  }

  function markAsForgot() {
    const word = words[currentIndex];
    progress[word.id] = 'forgot';
    saveProgress();
    updateProgressView();
    goToNextCard();
  }

  function shuffleCards() {
    // Fisher-Yates shuffle
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [words[i], words[j]] = [words[j], words[i]];
    }
    currentIndex = 0;
    updateCardView();
  }

  // ============================================================================
  // List View
  // ============================================================================
  function updateListView() {
    let filteredWords = words;

    // Apply filter
    if (currentFilter === 'remembered') {
      filteredWords = words.filter(w => progress[w.id] === 'remembered');
    } else if (currentFilter === 'forgot') {
      filteredWords = words.filter(w => progress[w.id] === 'forgot');
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredWords = filteredWords.filter(w => 
        w.word.toLowerCase().includes(query) ||
        w.meaning.toLowerCase().includes(query)
      );
    }

    // Render list
    if (filteredWords.length === 0) {
      elements.wordList.innerHTML = `
        <li class="empty-state">
          ${searchQuery ? '検索結果がありません' : '該当する単語がありません'}
        </li>
      `;
      return;
    }

    elements.wordList.innerHTML = filteredWords.map((word, index) => {
      const status = progress[word.id] || 'unlearned';
      return `
        <li class="word-item" style="animation-delay: ${index * 0.05}s">
          <span class="word-status ${status}" aria-label="${getStatusLabel(status)}"></span>
          <div class="word-content">
            <div class="word-text">${escapeHtml(word.word)}</div>
            <div class="word-translation">${escapeHtml(word.meaning)}</div>
          </div>
          <button 
            class="word-action" 
            data-word-id="${word.id}"
            aria-label="${word.word}をカードで表示"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </li>
      `;
    }).join('');

    // Add click handlers to word items
    elements.wordList.querySelectorAll('.word-action').forEach(btn => {
      btn.addEventListener('click', () => {
        const wordId = parseInt(btn.dataset.wordId, 10);
        goToWordById(wordId);
      });
    });
  }

  function getStatusLabel(status) {
    switch (status) {
      case 'remembered': return '覚えた';
      case 'forgot': return '未習得';
      default: return '未学習';
    }
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function goToWordById(wordId) {
    const index = words.findIndex(w => w.id === wordId);
    if (index !== -1) {
      currentIndex = index;
      switchView('cards');
      updateCardView();
    }
  }

  function setFilter(filter) {
    currentFilter = filter;
    elements.filterBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    updateListView();
  }

  function handleSearch(e) {
    searchQuery = e.target.value.trim();
    updateListView();
  }

  // ============================================================================
  // Progress View
  // ============================================================================
  function updateProgressView() {
    const total = words.length;
    const remembered = words.filter(w => progress[w.id] === 'remembered').length;
    const forgot = words.filter(w => progress[w.id] === 'forgot').length;
    const percentage = total > 0 ? Math.round((remembered / total) * 100) : 0;

    // Update stats
    elements.statTotal.textContent = total;
    elements.statRemembered.textContent = remembered;
    elements.statForgot.textContent = forgot;
    elements.statPercentage.textContent = `${percentage}%`;

    // Update chart
    const rememberedPercent = (remembered / total) * 100;
    const forgotPercent = (forgot / total) * 100;
    
    elements.chartRemembered.style.width = `${rememberedPercent}%`;
    elements.chartForgot.style.width = `${forgotPercent}%`;
  }

  // ============================================================================
  // Event Listeners
  // ============================================================================
  function setupEventListeners() {
    // Menu
    elements.menuBtn.addEventListener('click', openMenu);
    elements.menuClose.addEventListener('click', closeMenu);
    elements.menuOverlay.addEventListener('click', closeMenu);
    elements.resetProgress.addEventListener('click', resetAllProgress);

    // Menu navigation
    elements.menuItems.forEach(item => {
      item.addEventListener('click', () => switchView(item.dataset.view));
    });

    // Card interactions
    elements.flashcard.addEventListener('click', flipCard);
    elements.flashcard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        flipCard();
      }
    });

    elements.btnPrev.addEventListener('click', goToPrevCard);
    elements.btnNext.addEventListener('click', goToNextCard);
    elements.btnForgot.addEventListener('click', markAsForgot);
    elements.btnRemembered.addEventListener('click', markAsRemembered);
    elements.btnShuffle.addEventListener('click', shuffleCards);

    // List view
    elements.searchInput.addEventListener('input', handleSearch);
    elements.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => setFilter(btn.dataset.filter));
    });

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);

    // Close menu on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && elements.menuPanel.classList.contains('active')) {
        closeMenu();
      }
    });

    // Swipe gestures for mobile
    setupSwipeGestures();
  }

  function handleKeyboard(e) {
    // Only handle when cards view is active and menu is closed
    if (!elements.cardsView.classList.contains('active')) return;
    if (elements.menuPanel.classList.contains('active')) return;

    switch (e.key) {
      case 'ArrowLeft':
        goToPrevCard();
        break;
      case 'ArrowRight':
        goToNextCard();
        break;
      case ' ':
        if (document.activeElement === elements.flashcard || document.activeElement === document.body) {
          e.preventDefault();
          flipCard();
        }
        break;
    }
  }

  function setupSwipeGestures() {
    let touchStartX = 0;
    let touchStartY = 0;
    const minSwipeDistance = 50;

    elements.flashcard.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    elements.flashcard.addEventListener('touchend', (e) => {
      if (!e.changedTouches.length) return;
      
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      // Check if horizontal swipe is dominant
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
          goToPrevCard();
        } else {
          goToNextCard();
        }
      }
    }, { passive: true });
  }

  // ============================================================================
  // Start App
  // ============================================================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
