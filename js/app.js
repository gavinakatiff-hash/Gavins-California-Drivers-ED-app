document.addEventListener('DOMContentLoaded', () => {
    let currentMode = 'adult';
    let quizSession = null;
    let timerInterval = null;
    let studyCategory = 'all';
    let studySearch = '';

    // Register service worker if available
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW registration failed:', err));
    }

    // Theme Management
    const initTheme = () => {
        const savedTheme = localStorage.getItem('dmv-theme');
        const themeBtn = document.getElementById('theme-toggle');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            if (themeBtn) themeBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
        } else {
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (themeBtn) themeBtn.textContent = prefersDark ? '☀️' : '🌙';
        }
    };

    const toggleTheme = () => {
        const current = document.documentElement.getAttribute('data-theme');
        const isDark = current === 'dark' || (!current && window.matchMedia('(prefers-color-scheme: dark)').matches);
        const newTheme = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('dmv-theme', newTheme);
        const themeBtn = document.getElementById('theme-toggle');
        if (themeBtn) themeBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    };

    document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
    initTheme();

    const updateHomeStats = () => {
        const best = window.ScoreManager.getBestScore(currentMode);
        window.UI.renderHome(best);
    };

    const updateModeButtons = () => {
        const btnAdult = document.getElementById('btn-adult');
        const btnMinor = document.getElementById('btn-minor');
        if (btnAdult && btnMinor) {
            if (currentMode === 'adult') {
                btnAdult.classList.add('selected');
                btnMinor.classList.remove('selected');
            } else {
                btnMinor.classList.add('selected');
                btnAdult.classList.remove('selected');
            }
        }
    };

    const startTimer = () => {
        stopTimer();
        timerInterval = setInterval(() => {
            if (quizSession) {
                window.UI.updateTimer(quizSession.getTimeElapsed());
            }
        }, 1000);
    };

    const stopTimer = () => {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    };

    const endQuiz = () => {
        stopTimer();
        const results = quizSession.getResults();
        window.ScoreManager.saveScore(currentMode, results.score, results.total);
        window.UI.renderResults(results);
        window.UI.showScreen('screen-results');
    };

    const getCategoriesData = () => {
        const map = new Map();
        if (typeof QUESTIONS !== 'undefined') {
            QUESTIONS.forEach(q => {
                if (!map.has(q.category)) {
                    map.set(q.category, 0);
                }
                map.set(q.category, map.get(q.category) + 1);
            });
        }
        return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
    };

    const startExamMode = () => {
        if (typeof QUESTIONS === 'undefined') return;
        quizSession = new window.QuizSession(QUESTIONS, currentMode);
        quizSession.start(null, true);
        window.UI.renderQuiz(quizSession.getCurrentQuestion(), quizSession.getProgress(), quizSession.getTimeElapsed(), true);
        window.UI.showScreen('screen-quiz');
        startTimer();
    };

    const startPracticeMode = () => {
        const cats = getCategoriesData();
        window.UI.renderCategories(cats);
        window.UI.showScreen('screen-categories');
    };

    const showStudyBank = () => {
        if (typeof QUESTIONS === 'undefined') return;
        window.UI.renderStudyBank(QUESTIONS, studyCategory, studySearch);
        window.UI.showScreen('screen-study');
    };

    const showHistory = () => {
        const scores = window.ScoreManager.getRecentScores(100);
        window.UI.renderHistory(scores);
        window.UI.showScreen('screen-history');
    };

    // Navigation bar routing
    document.getElementById('nav-brand')?.addEventListener('click', () => {
        stopTimer();
        updateHomeStats();
        window.UI.showScreen('screen-home');
    });

    document.getElementById('nav-home')?.addEventListener('click', () => {
        stopTimer();
        updateHomeStats();
        window.UI.showScreen('screen-home');
    });

    document.getElementById('nav-practice')?.addEventListener('click', () => {
        stopTimer();
        startPracticeMode();
    });

    document.getElementById('nav-exam')?.addEventListener('click', () => {
        startExamMode();
    });

    document.getElementById('nav-study')?.addEventListener('click', () => {
        stopTimer();
        showStudyBank();
    });

    document.getElementById('nav-history')?.addEventListener('click', () => {
        stopTimer();
        showHistory();
    });

    // Dashboard Cards & Mode buttons
    document.getElementById('btn-adult')?.addEventListener('click', () => {
        currentMode = 'adult';
        updateModeButtons();
        updateHomeStats();
    });

    document.getElementById('btn-minor')?.addEventListener('click', () => {
        currentMode = 'minor';
        updateModeButtons();
        updateHomeStats();
    });

    document.getElementById('btn-exam-card')?.addEventListener('click', startExamMode);
    document.getElementById('btn-practice-card')?.addEventListener('click', startPracticeMode);
    document.getElementById('btn-study-card')?.addEventListener('click', showStudyBank);

    // Categories Screen
    document.getElementById('btn-categories-back')?.addEventListener('click', () => {
        window.UI.showScreen('screen-home');
    });

    document.getElementById('btn-start-practice')?.addEventListener('click', () => {
        if (typeof QUESTIONS === 'undefined') return;
        const cbs = document.querySelectorAll('.cb-category:checked');
        const selectedCategories = Array.from(cbs).map(cb => cb.value);
        
        if (selectedCategories.length === 0) {
            alert('Please select at least one category to practice!');
            return;
        }

        quizSession = new window.QuizSession(QUESTIONS, currentMode);
        quizSession.start(selectedCategories, false);
        window.UI.renderQuiz(quizSession.getCurrentQuestion(), quizSession.getProgress(), quizSession.getTimeElapsed(), false);
        window.UI.showScreen('screen-quiz');
    });

    // Quiz Options & Question flow
    const selectOptionByIndex = (index) => {
        if (!quizSession) return;
        const options = document.querySelectorAll('#quiz-options .option');
        if (options && options[index] && !options[index].disabled) {
            const result = quizSession.selectAnswer(index);
            if (result) {
                window.UI.showAnswer(index, result.correctIndex, result.explanation);
                if (quizSession.isExamMode) {
                    window.UI.updateTimer(quizSession.getTimeElapsed());
                }
            }
        }
    };

    const advanceNextQuestion = () => {
        if (!quizSession) return;
        const feedbackEl = document.getElementById('quiz-feedback');
        // Only advance if answer was submitted (feedback is visible)
        if (feedbackEl && feedbackEl.style.display !== 'none') {
            if (quizSession.next()) {
                window.UI.renderQuiz(
                    quizSession.getCurrentQuestion(),
                    quizSession.getProgress(),
                    quizSession.getTimeElapsed(),
                    quizSession.isExamMode
                );
            } else {
                endQuiz();
            }
        }
    };

    document.getElementById('quiz-options')?.addEventListener('click', (e) => {
        const optionBtn = e.target.closest('.option');
        if (optionBtn && !optionBtn.disabled && quizSession) {
            const index = parseInt(optionBtn.dataset.index, 10);
            selectOptionByIndex(index);
        }
    });

    document.getElementById('btn-next')?.addEventListener('click', advanceNextQuestion);

    document.getElementById('btn-quit-quiz')?.addEventListener('click', () => {
        if (confirm('Are you sure you want to exit your current test session?')) {
            stopTimer();
            quizSession = null;
            updateHomeStats();
            window.UI.showScreen('screen-home');
        }
    });

    // Results Actions
    document.getElementById('btn-review')?.addEventListener('click', () => {
        if (quizSession) {
            const results = quizSession.getResults();
            window.UI.renderReview(results.missedQuestions);
            window.UI.showScreen('screen-review');
        }
    });

    document.getElementById('btn-retry')?.addEventListener('click', () => {
        if (!quizSession) return;
        const wasExam = quizSession.isExamMode;
        const cats = quizSession.selectedCategories;
        
        quizSession = new window.QuizSession(typeof QUESTIONS !== 'undefined' ? QUESTIONS : [], currentMode);
        quizSession.start(cats, wasExam);
        window.UI.renderQuiz(quizSession.getCurrentQuestion(), quizSession.getProgress(), quizSession.getTimeElapsed(), wasExam);
        window.UI.showScreen('screen-quiz');
        if (wasExam) {
            startTimer();
        } else {
            stopTimer();
        }
    });

    document.getElementById('btn-home')?.addEventListener('click', () => {
        updateHomeStats();
        window.UI.showScreen('screen-home');
    });

    document.getElementById('btn-review-back')?.addEventListener('click', () => {
        window.UI.showScreen('screen-results');
    });

    // Study Bank Filters & Search
    document.getElementById('study-search')?.addEventListener('input', (e) => {
        studySearch = e.target.value;
        if (typeof QUESTIONS !== 'undefined') {
            window.UI.renderStudyBank(QUESTIONS, studyCategory, studySearch);
        }
    });

    document.getElementById('study-category-filters')?.addEventListener('click', (e) => {
        const pill = e.target.closest('.filter-pill');
        if (pill) {
            document.querySelectorAll('#study-category-filters .filter-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            studyCategory = pill.dataset.cat;
            if (typeof QUESTIONS !== 'undefined') {
                window.UI.renderStudyBank(QUESTIONS, studyCategory, studySearch);
            }
        }
    });

    document.getElementById('btn-print-study')?.addEventListener('click', () => {
        window.print();
    });

    // History Actions
    document.getElementById('btn-clear-history')?.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your test history?')) {
            localStorage.removeItem('dmv-scores');
            showHistory();
            updateHomeStats();
        }
    });

    // Desktop Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        // If user is typing in a search input, don't trigger quiz hotkeys
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }

        const quizScreen = document.getElementById('screen-quiz');
        const isQuizActive = quizScreen && quizScreen.classList.contains('active');

        if (isQuizActive) {
            // Keys 1, 2, 3, 4
            if (['1', '2', '3', '4'].includes(e.key)) {
                const idx = parseInt(e.key, 10) - 1;
                selectOptionByIndex(idx);
                e.preventDefault();
            }
            // Keys A, B, C, D (or a, b, c, d)
            else if (['a', 'b', 'c', 'd', 'A', 'B', 'C', 'D'].includes(e.key)) {
                const keyMap = { 'a': 0, 'b': 1, 'c': 2, 'd': 3, 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
                const idx = keyMap[e.key];
                if (typeof idx === 'number') {
                    selectOptionByIndex(idx);
                    e.preventDefault();
                }
            }
            // Enter or Spacebar advances to next question when answered
            else if (e.key === 'Enter' || e.key === ' ') {
                const feedbackEl = document.getElementById('quiz-feedback');
                if (feedbackEl && feedbackEl.style.display !== 'none') {
                    advanceNextQuestion();
                    e.preventDefault();
                }
            }
        }

        // Global Escape to return Home
        if (e.key === 'Escape') {
            const homeScreen = document.getElementById('screen-home');
            if (homeScreen && !homeScreen.classList.contains('active')) {
                if (isQuizActive) {
                    if (confirm('Return to dashboard? Current quiz session will be closed.')) {
                        stopTimer();
                        updateHomeStats();
                        window.UI.showScreen('screen-home');
                    }
                } else {
                    updateHomeStats();
                    window.UI.showScreen('screen-home');
                }
            }
        }
    });

    // Initial Load
    updateModeButtons();
    updateHomeStats();
    window.UI.showScreen('screen-home');
});
