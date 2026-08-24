// Gavin's Applications Directory & Mobile-Oriented Adaptive DMV Engine
document.addEventListener('DOMContentLoaded', () => {
    // --- State Initialization ---
    const allQuestions = typeof QUESTIONS !== 'undefined' ? QUESTIONS : [];
    const appsDirectory = typeof APPS_DIRECTORY !== 'undefined' ? APPS_DIRECTORY : [];
    
    // Initialize Adaptive Recommendation Engine
    const adaptiveEngine = typeof AdaptiveRecommendationEngine !== 'undefined'
        ? new AdaptiveRecommendationEngine(allQuestions)
        : null;

    let currentIndex = 0;
    let currentAppView = 'directory'; // 'directory' | 'dmv'
    let currentDmvSubView = 'question'; // 'question' | 'feedback'

    // Load persisted state
    let answers = {};

    try {
        const storedAnswers = localStorage.getItem('dmv-q-answers');
        if (storedAnswers) answers = JSON.parse(storedAnswers);
        const savedLastId = localStorage.getItem('dmv-q-last-id');
        if (savedLastId) {
            const foundIdx = allQuestions.findIndex(q => q.id === parseInt(savedLastId, 10));
            if (foundIdx !== -1) currentIndex = foundIdx;
        }
    } catch (e) {
        console.error('Error loading saved state', e);
    }

    // Register and Force-Update Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            for (let reg of registrations) {
                reg.update();
            }
        });
        navigator.serviceWorker.register('./sw.js?v=20260824_v2').then(reg => {
            reg.update();
        }).catch(err => console.log('SW failed:', err));
    }

    // --- Theme Management ---
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

    // --- Top-Level View Routing (Directory vs DMV) ---
    const switchAppView = (targetView) => {
        currentAppView = targetView;
        const dirView = document.getElementById('view-directory');
        const dmvView = document.getElementById('view-dmv');
        const globalNavbar = document.getElementById('global-navbar');

        if (targetView === 'directory') {
            if (dirView) dirView.style.display = 'block';
            if (dmvView) dmvView.style.display = 'none';
            if (globalNavbar) globalNavbar.style.display = 'block';

            window.location.hash = 'directory';
            renderDirectory();
        } else {
            if (dirView) dirView.style.display = 'none';
            if (dmvView) dmvView.style.display = 'block';
            // Hide the global header completely for distraction-free mobile screen
            if (globalNavbar) globalNavbar.style.display = 'none';

            window.location.hash = 'dmv';
            
            // Check if current question was already answered -> show feedback screen, else question screen
            const currentQ = allQuestions[currentIndex];
            if (currentQ && answers[currentQ.id]) {
                const ans = answers[currentQ.id];
                showFeedbackScreen(currentQ, ans.selectedIndex, ans.isCorrect);
            } else {
                switchDmvSubView('question');
                renderCurrentQuestion();
            }
        }

        window.scrollTo({ top: 0, behavior: 'instant' });
    };

    // --- DMV Subview Routing (Question Screen vs Feedback Screen) ---
    const switchDmvSubView = (subView) => {
        currentDmvSubView = subView;
        const qScreen = document.getElementById('dmv-screen-question');
        const fbScreen = document.getElementById('dmv-screen-feedback');

        if (subView === 'question') {
            if (qScreen) qScreen.style.display = 'block';
            if (fbScreen) fbScreen.style.display = 'none';
        } else {
            if (qScreen) qScreen.style.display = 'none';
            if (fbScreen) fbScreen.style.display = 'block';
        }

        window.scrollTo({ top: 0, behavior: 'instant' });
    };

    // --- Render Directory Page ---
    const renderDirectory = (searchQuery = '') => {
        const container = document.getElementById('apps-grid-container');
        const countBadge = document.getElementById('apps-count-badge');
        if (!container) return;

        let list = appsDirectory;
        if (searchQuery && searchQuery.trim() !== '') {
            const q = searchQuery.toLowerCase().trim();
            list = list.filter(app => 
                app.title.toLowerCase().includes(q) ||
                app.description.toLowerCase().includes(q) ||
                app.tagline.toLowerCase().includes(q) ||
                app.tags.some(t => t.toLowerCase().includes(q))
            );
        }

        if (countBadge) countBadge.textContent = `${list.length} Apps Available`;

        if (list.length === 0) {
            container.innerHTML = `<div class="card" style="text-align:center; grid-column:1/-1;"><p>No applications matched your search.</p></div>`;
            return;
        }

        let html = '';
        list.forEach(app => {
            let statusClass = 'app-status-live';
            if (app.statusType === 'active') statusClass = 'app-status-active';
            else if (app.statusType === 'soon') statusClass = 'app-status-soon';

            const tagsHtml = app.tags.map(t => `<span class="tag">${t}</span>`).join(' ');

            html += `
                <div class="app-card" data-id="${app.id}" data-action="${app.actionType}" data-url="${app.actionUrl}">
                    <div class="app-card-header">
                        <span class="app-card-icon">${app.icon}</span>
                        <span class="app-status-badge ${statusClass}">${app.status}</span>
                    </div>
                    <h3 class="app-card-title">${app.title}</h3>
                    <div class="app-card-tagline">${app.tagline}</div>
                    <p class="app-card-desc">${app.description}</p>
                    <div class="app-tags" style="margin-bottom:14px;">${tagsHtml}</div>
                    <div class="app-card-footer">
                        <span class="app-card-category">${app.category}</span>
                        <span class="app-card-cta">
                            ${app.actionType === 'internal' ? 'Open App →' : (app.actionType === 'external' ? 'Visit ↗' : 'Coming Soon')}
                        </span>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;

        container.querySelectorAll('.app-card').forEach(card => {
            card.addEventListener('click', () => {
                const action = card.dataset.action;
                const url = card.dataset.url;
                if (action === 'internal') {
                    switchAppView('dmv');
                } else if (action === 'external' && url && url !== '#') {
                    window.open(url, '_blank', 'noopener');
                }
            });
        });
    };

    // --- State Persistence ---
    const saveState = () => {
        try {
            localStorage.setItem('dmv-q-answers', JSON.stringify(answers));
            const currentQ = allQuestions[currentIndex];
            if (currentQ) {
                localStorage.setItem('dmv-q-last-id', currentQ.id.toString());
            }
        } catch (e) {
            console.error('Error saving state', e);
        }
    };

    // --- Live Accuracy Calculation ---
    const updateAccuracyDisplay = () => {
        let pct = 100;
        let correctCount = 0;
        let totalCount = 0;

        if (adaptiveEngine) {
            const stats = adaptiveEngine.getAccuracyStats();
            pct = stats.percentage;
            correctCount = stats.correct;
            totalCount = stats.total;
        } else {
            totalCount = Object.keys(answers).length;
            correctCount = Object.values(answers).filter(a => a.isCorrect).length;
            pct = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 100;
        }
        
        const pctEl = document.getElementById('accuracy-percentage');
        const fracEl = document.getElementById('accuracy-fraction');
        const fbPctEl = document.getElementById('fb-accuracy-pct');

        if (pctEl) {
            pctEl.textContent = `${pct}%`;
            pctEl.style.color = pct >= 80 ? 'var(--orange)' : 'var(--red)';
        }
        if (fracEl) fracEl.textContent = `(${correctCount}/${totalCount})`;
        if (fbPctEl) fbPctEl.textContent = `${pct}%`;
    };

    // --- Render Compact Question View (Screen 1) ---
    const renderCurrentQuestion = () => {
        const question = allQuestions[currentIndex];
        const numBadge = document.getElementById('q-number-badge');
        const illuBox = document.getElementById('q-illustration');
        const titleEl = document.getElementById('q-text');
        const optionsEl = document.getElementById('q-options');
        const adaptiveTag = document.getElementById('q-adaptive-tag');
        const card = document.querySelector('.compact-question-box');

        if (!question) return;

        // Reset any fly up or crumble animations from previous question
        if (card) {
            card.classList.remove('fx-fly-up-card');
        }

        // Progress counter
        if (numBadge) numBadge.textContent = `#${question.id} / 120`;

        // Live Accuracy
        updateAccuracyDisplay();

        // Adaptive Badge (Focus Question / Reddit Top Missed)
        if (adaptiveTag && adaptiveEngine) {
            const info = adaptiveEngine.getQuestionBadgeInfo(question.id);
            if (info.label) {
                adaptiveTag.textContent = info.label;
                adaptiveTag.className = `adaptive-badge ${info.type}`;
                adaptiveTag.style.display = 'inline-flex';
            } else {
                adaptiveTag.style.display = 'none';
            }
        }

        // Vector Visual Illustration (No Giveaway Text)
        if (illuBox && window.Illustrations) {
            illuBox.innerHTML = window.Illustrations.get(question);
        }

        // Question Title
        if (titleEl) titleEl.textContent = question.text;

        // 4 Options
        if (optionsEl) {
            optionsEl.innerHTML = '';
            question.options.forEach((opt, optIdx) => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.dataset.index = optIdx;

                btn.innerHTML = `
                    <span class="opt-key">${optIdx + 1}</span>
                    <span class="opt-text">${opt}</span>
                `;
                optionsEl.appendChild(btn);
            });
        }

        // Update Prev button disabled
        const prevBtn = document.getElementById('btn-prev-q');
        if (prevBtn) prevBtn.disabled = currentIndex <= 0;

        saveState();
    };

    // --- Show Dedicated Feedback Screen (Screen 2) ---
    const showFeedbackScreen = (question, userSelectedIdx, isCorrect) => {
        const fbScreen = document.getElementById('dmv-screen-feedback');
        const fbProgress = document.getElementById('fb-q-progress');
        const fbBanner = document.getElementById('fb-status-banner');
        const fbIcon = document.getElementById('fb-hero-icon');
        const fbTitle = document.getElementById('fb-hero-title');
        const fbSubtitle = document.getElementById('fb-hero-subtitle');
        const fbQText = document.getElementById('fb-question-text');
        const fbUserRow = document.getElementById('fb-user-choice-row');
        const fbUserText = document.getElementById('fb-user-choice-text');
        const fbCorrectRow = document.getElementById('fb-correct-choice-row');
        const fbCorrectText = document.getElementById('fb-correct-choice-text');
        const fbExpText = document.getElementById('fb-explanation-text');
        const fbRedditTip = document.getElementById('fb-reddit-tip');

        if (!question) return;

        // Header Progress
        if (fbProgress) fbProgress.textContent = `Question #${question.id} (of 120)`;
        updateAccuracyDisplay();

        // Banner Status
        if (fbBanner) {
            if (isCorrect) {
                fbBanner.className = 'compact-status-banner fb-hero-correct';
                if (fbIcon) fbIcon.textContent = '🎉';
                if (fbTitle) fbTitle.textContent = 'Correct!';
                if (fbSubtitle) fbSubtitle.textContent = 'California DMV Rule Mastered';
            } else {
                fbBanner.className = 'compact-status-banner fb-hero-wrong';
                if (fbIcon) fbIcon.textContent = '❌';
                if (fbTitle) fbTitle.textContent = 'Incorrect';
                if (fbSubtitle) fbSubtitle.textContent = 'Review the handbook rule below:';
            }
        }

        // Question text
        if (fbQText) fbQText.textContent = question.text;

        // User Selected Answer
        if (fbUserRow && fbUserText) {
            const userChoiceText = question.options[userSelectedIdx] || 'None';
            fbUserText.textContent = `${userSelectedIdx + 1}. ${userChoiceText}`;
            fbUserRow.className = `compact-choice-row ${isCorrect ? 'user-correct' : 'user-wrong'}`;
        }

        // Correct Answer (shown if wrong)
        if (fbCorrectRow && fbCorrectText) {
            if (!isCorrect) {
                const correctChoiceText = question.options[question.correctIndex];
                fbCorrectText.textContent = `${question.correctIndex + 1}. ${correctChoiceText}`;
                fbCorrectRow.style.display = 'flex';
            } else {
                fbCorrectRow.style.display = 'none';
            }
        }

        // Explanation
        if (fbExpText) fbExpText.textContent = question.explanation;

        // Reddit Community Insight
        if (fbRedditTip && adaptiveEngine) {
            const badgeInfo = adaptiveEngine.getQuestionBadgeInfo(question.id);
            if (badgeInfo.tip) {
                fbRedditTip.innerHTML = `<strong>⚠️ Community Insight:</strong> ${badgeInfo.tip}`;
                fbRedditTip.style.display = 'block';
            } else {
                fbRedditTip.style.display = 'none';
            }
        }

        // Switch to the dedicated Feedback View
        switchDmvSubView('feedback');
    };

    // --- Option Selection Handler (Triggers 4-Corner Sparks & Auto-Switches Screen) ---
    const handleSelectOption = (optIdx, targetButton = null) => {
        const question = allQuestions[currentIndex];
        if (!question) return;

        const isCorrect = optIdx === question.correctIndex;
        answers[question.id] = {
            selectedIndex: optIdx,
            isCorrect: isCorrect,
            date: Date.now()
        };

        // Record into Adaptive Engine
        if (adaptiveEngine) {
            adaptiveEngine.recordAttempt(question.id, isCorrect);
        }

        saveState();

        // 🎆 1. Launch 4-Corner Mega Spark Fireworks & Sound Animations
        const btn = targetButton || document.querySelector(`.compact-options-grid .option-btn[data-index="${optIdx}"]`);
        if (btn && window.RadicalFX) {
            if (isCorrect) {
                btn.classList.add('correct');
                window.RadicalFX.celebrateCorrect(btn);
            } else {
                btn.classList.add('incorrect');
                window.RadicalFX.celebrateWrong(btn);
            }
        }

        // 🚀 2. Automatically navigate to the Feedback Screen after animation burst
        setTimeout(() => {
            showFeedbackScreen(question, optIdx, isCorrect);
        }, isCorrect ? 480 : 550);
    };

    // --- Next Question Handler ---
    const nextQuestion = () => {
        if (allQuestions.length === 0) return;
        const currentQ = allQuestions[currentIndex];
        
        if (adaptiveEngine) {
            // Adaptive algorithm surfaces questions you got wrong most + Reddit high-yield questions
            const nextQ = adaptiveEngine.getNextRecommendedQuestion(currentQ ? currentQ.id : null);
            if (nextQ) {
                const foundIdx = allQuestions.findIndex(q => q.id === nextQ.id);
                if (foundIdx !== -1) {
                    currentIndex = foundIdx;
                    switchDmvSubView('question');
                    renderCurrentQuestion();
                    return;
                }
            }
        }

        if (currentIndex < allQuestions.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }

        switchDmvSubView('question');
        renderCurrentQuestion();
    };

    const prevQuestion = () => {
        if (allQuestions.length === 0) return;
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = allQuestions.length - 1;
        }
        switchDmvSubView('question');
        renderCurrentQuestion();
    };

    const resetCurrentAnswer = () => {
        const q = allQuestions[currentIndex];
        if (!q) return;
        delete answers[q.id];
        saveState();
        switchDmvSubView('question');
        renderCurrentQuestion();
    };

    // --- Global Event Listeners ---
    document.getElementById('brand-home')?.addEventListener('click', () => switchAppView('directory'));
    document.getElementById('btn-back-to-directory')?.addEventListener('click', () => switchAppView('directory'));
    document.getElementById('footer-dmv-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        switchAppView('dmv');
    });

    document.getElementById('featured-dmv-card')?.addEventListener('click', () => switchAppView('dmv'));

    document.getElementById('dir-search-input')?.addEventListener('input', (e) => {
        renderDirectory(e.target.value);
    });

    // Question options click (Instant Answer)
    document.getElementById('q-options')?.addEventListener('click', (e) => {
        const btn = e.target.closest('.option-btn');
        if (btn) {
            const optIdx = parseInt(btn.dataset.index, 10);
            handleSelectOption(optIdx, btn);
        }
    });

    document.getElementById('btn-prev-q')?.addEventListener('click', prevQuestion);
    document.getElementById('btn-skip-q')?.addEventListener('click', nextQuestion);

    // Feedback Screen Buttons
    document.getElementById('btn-next-from-feedback')?.addEventListener('click', nextQuestion);
    document.getElementById('btn-retry-from-feedback')?.addEventListener('click', resetCurrentAnswer);
    document.getElementById('btn-feedback-back-to-q')?.addEventListener('click', () => {
        switchDmvSubView('question');
    });

    // --- Keyboard Navigation ---
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (currentAppView === 'dmv') {
            if (currentDmvSubView === 'question') {
                if (['1', '2', '3', '4'].includes(e.key)) {
                    const optIdx = parseInt(e.key, 10) - 1;
                    handleSelectOption(optIdx);
                    e.preventDefault();
                }
                else if (['a', 'b', 'c', 'd', 'A', 'B', 'C', 'D'].includes(e.key)) {
                    const keyMap = { 'a': 0, 'b': 1, 'c': 2, 'd': 3, 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
                    const optIdx = keyMap[e.key];
                    if (typeof optIdx === 'number') {
                        handleSelectOption(optIdx);
                        e.preventDefault();
                    }
                }
                else if (e.key === 'ArrowLeft' || e.key === 'p' || e.key === 'P') {
                    prevQuestion();
                    e.preventDefault();
                }
                else if (e.key === 'Escape') {
                    switchAppView('directory');
                    e.preventDefault();
                }
            } else if (currentDmvSubView === 'feedback') {
                // On feedback screen, Enter / Space / ArrowRight instantly advances to next question!
                if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
                    nextQuestion();
                    e.preventDefault();
                } else if (e.key === 'r' || e.key === 'R') {
                    resetCurrentAnswer();
                    e.preventDefault();
                } else if (e.key === 'ArrowLeft' || e.key === 'Escape') {
                    switchDmvSubView('question');
                    e.preventDefault();
                }
            }
        }
    });

    // --- Initial Route ---
    const initialHash = window.location.hash;
    if (initialHash === '#dmv' || window.location.pathname.includes('/dmv')) {
        switchAppView('dmv');
    } else {
        switchAppView('directory');
    }
});
