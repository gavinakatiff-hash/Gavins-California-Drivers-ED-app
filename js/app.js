// Gavin's Applications Directory & Adaptive California DMV Question Engine
document.addEventListener('DOMContentLoaded', () => {
    // --- State Initialization ---
    const allQuestions = typeof QUESTIONS !== 'undefined' ? QUESTIONS : [];
    const appsDirectory = typeof APPS_DIRECTORY !== 'undefined' ? APPS_DIRECTORY : [];
    
    // Initialize Adaptive Spaced-Repetition Recommendation Engine
    const adaptiveEngine = typeof AdaptiveRecommendationEngine !== 'undefined'
        ? new AdaptiveRecommendationEngine(allQuestions)
        : null;

    let currentIndex = 0;
    let currentAppView = 'directory'; // 'directory' | 'dmv'

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
        navigator.serviceWorker.register('./sw.js?v=20260824').then(reg => {
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

    // --- View Routing ---
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
            // Hide the global header completely for a distraction-free question interface
            if (globalNavbar) globalNavbar.style.display = 'none';

            window.location.hash = 'dmv';
            renderCurrentQuestion();
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
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

        if (countBadge) {
            countBadge.textContent = `${list.length} Apps Available`;
        }

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

    // --- Live Accuracy Calculation (Adaptive Stats + Session) ---
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

        if (pctEl) {
            pctEl.textContent = `${pct}%`;
            pctEl.style.color = pct >= 80 ? 'var(--orange)' : 'var(--red)';
        }
        if (fracEl) {
            fracEl.textContent = `(${correctCount}/${totalCount})`;
        }
    };

    // --- Render Simplified Question with Adaptive Tagging ---
    const renderCurrentQuestion = () => {
        const question = allQuestions[currentIndex];
        const numBadge = document.getElementById('q-number-badge');
        const illuBox = document.getElementById('q-illustration');
        const titleEl = document.getElementById('q-text');
        const optionsEl = document.getElementById('q-options');
        const feedbackEl = document.getElementById('q-feedback');
        const adaptiveTag = document.getElementById('q-adaptive-tag');
        const redditTipBox = document.getElementById('reddit-tip-box');

        if (!question) return;

        // Progress counter (Question ID)
        if (numBadge) {
            numBadge.textContent = `Question #${question.id} (of 120)`;
        }

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

        // Vector Visual Illustration
        if (illuBox && window.Illustrations) {
            illuBox.innerHTML = window.Illustrations.get(question);
        }

        // Question Title
        if (titleEl) {
            titleEl.textContent = question.text;
        }

        // 4 Options
        if (optionsEl) {
            optionsEl.innerHTML = '';
            const existingAnswer = answers[question.id];

            question.options.forEach((opt, optIdx) => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.dataset.index = optIdx;

                if (existingAnswer) {
                    btn.disabled = true;
                    if (optIdx === question.correctIndex) {
                        btn.classList.add('correct');
                    }
                    if (optIdx === existingAnswer.selectedIndex && !existingAnswer.isCorrect) {
                        btn.classList.add('incorrect');
                    }
                }

                btn.innerHTML = `
                    <span class="opt-key">${optIdx + 1}</span>
                    <span class="opt-text">${opt}</span>
                `;
                optionsEl.appendChild(btn);
            });
        }

        // Feedback Explanation & Reddit Callout
        const existingAnswer = answers[question.id];
        if (feedbackEl) {
            if (existingAnswer) {
                feedbackEl.style.display = 'block';
                const fBadge = document.getElementById('feedback-badge');
                const fExp = document.getElementById('feedback-explanation');
                if (fBadge) {
                    fBadge.textContent = existingAnswer.isCorrect ? '✓ Correct Answer!' : '✗ Incorrect';
                    fBadge.style.background = existingAnswer.isCorrect ? 'var(--green-bg)' : 'var(--red-bg)';
                    fBadge.style.color = existingAnswer.isCorrect ? 'var(--green)' : 'var(--red)';
                }
                if (fExp) {
                    fExp.innerHTML = `<strong>💡 California Driver Handbook:</strong> ${question.explanation}`;
                }

                // Reddit Trap Advice Callout
                if (redditTipBox && adaptiveEngine) {
                    const badgeInfo = adaptiveEngine.getQuestionBadgeInfo(question.id);
                    if (badgeInfo.tip) {
                        redditTipBox.innerHTML = `<strong>⚠️ Community Insight:</strong> ${badgeInfo.tip}`;
                        redditTipBox.style.display = 'block';
                    } else {
                        redditTipBox.style.display = 'none';
                    }
                }
            } else {
                feedbackEl.style.display = 'none';
                if (redditTipBox) redditTipBox.style.display = 'none';
            }
        }

        // Update Prev / Next buttons
        const prevBtn = document.getElementById('btn-prev-q');
        const nextBtn = document.getElementById('btn-next-q');
        if (prevBtn) prevBtn.disabled = currentIndex <= 0;
        if (nextBtn) nextBtn.textContent = 'Next Question →';

        saveState();
    };

    // --- Option Selection Handler (Records into Adaptive Engine) ---
    const handleSelectOption = (optIdx) => {
        const question = allQuestions[currentIndex];
        if (!question) return;

        if (answers[question.id]) return;

        const isCorrect = optIdx === question.correctIndex;
        answers[question.id] = {
            selectedIndex: optIdx,
            isCorrect: isCorrect,
            date: Date.now()
        };

        // Record into Adaptive Spaced Repetition Engine
        if (adaptiveEngine) {
            adaptiveEngine.recordAttempt(question.id, isCorrect);
        }

        saveState();
        renderCurrentQuestion();
    };

    // --- Adaptive Next Question Handler (Weighted Selection) ---
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
                    renderCurrentQuestion();
                    return;
                }
            }
        }

        // Fallback sequential increment
        if (currentIndex < allQuestions.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        renderCurrentQuestion();
    };

    const prevQuestion = () => {
        if (allQuestions.length === 0) return;
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = allQuestions.length - 1;
        }
        renderCurrentQuestion();
    };

    const resetCurrentAnswer = () => {
        const q = allQuestions[currentIndex];
        if (!q) return;
        delete answers[q.id];
        saveState();
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

    document.getElementById('q-options')?.addEventListener('click', (e) => {
        const btn = e.target.closest('.option-btn');
        if (btn && !btn.disabled) {
            const optIdx = parseInt(btn.dataset.index, 10);
            handleSelectOption(optIdx);
        }
    });

    document.getElementById('btn-next-q')?.addEventListener('click', nextQuestion);
    document.getElementById('btn-prev-q')?.addEventListener('click', prevQuestion);
    document.getElementById('btn-reset-current')?.addEventListener('click', resetCurrentAnswer);

    // --- Keyboard Navigation ---
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (currentAppView === 'dmv') {
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
            else if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') {
                nextQuestion();
                e.preventDefault();
            }
            else if (e.key === 'ArrowLeft' || e.key === 'p' || e.key === 'P') {
                prevQuestion();
                e.preventDefault();
            }
            else if (e.key === 'Escape') {
                switchAppView('directory');
                e.preventDefault();
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
