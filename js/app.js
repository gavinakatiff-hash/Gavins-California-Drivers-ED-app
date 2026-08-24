// Gavin's Applications Directory & California DMV Interactive Question System
document.addEventListener('DOMContentLoaded', () => {
    // --- State Initialization ---
    const allQuestions = typeof QUESTIONS !== 'undefined' ? QUESTIONS : [];
    const appsDirectory = typeof APPS_DIRECTORY !== 'undefined' ? APPS_DIRECTORY : [];
    
    let activeCategory = 'all';
    let currentFiltered = [...allQuestions];
    let currentIndex = 0;
    let viewMode = 'single'; // 'single' | 'list'
    let currentAppView = 'directory'; // 'directory' | 'dmv'

    // Load persisted state
    let answers = {};
    let bookmarks = new Set();
    let savedLastId = null;
    let savedCategory = 'all';

    try {
        const storedAnswers = localStorage.getItem('dmv-q-answers');
        if (storedAnswers) answers = JSON.parse(storedAnswers);
        const storedBookmarks = localStorage.getItem('dmv-q-bookmarks');
        if (storedBookmarks) bookmarks = new Set(JSON.parse(storedBookmarks));
        savedLastId = localStorage.getItem('dmv-q-last-id');
        const storedCat = localStorage.getItem('dmv-q-active-cat');
        if (storedCat) savedCategory = storedCat;
    } catch (e) {
        console.error('Error loading saved state', e);
    }

    // Register Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW failed:', err));
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

    // --- View Routing (Directory vs DMV) ---
    const switchAppView = (targetView) => {
        currentAppView = targetView;
        const dirView = document.getElementById('view-directory');
        const dmvView = document.getElementById('view-dmv');
        const navDirBtn = document.getElementById('nav-btn-directory');
        const navDmvBtn = document.getElementById('nav-btn-dmv');
        const scoreCounter = document.getElementById('score-counter');
        const mapBtn = document.getElementById('btn-toggle-grid');
        const viewToggleBtn = document.getElementById('btn-toggle-view');

        if (targetView === 'directory') {
            if (dirView) dirView.style.display = 'block';
            if (dmvView) dmvView.style.display = 'none';
            navDirBtn?.classList.add('active');
            navDmvBtn?.classList.remove('active');

            if (scoreCounter) scoreCounter.style.display = 'none';
            if (mapBtn) mapBtn.style.display = 'none';
            if (viewToggleBtn) viewToggleBtn.style.display = 'none';

            window.location.hash = 'directory';
            renderDirectory();
        } else {
            if (dirView) dirView.style.display = 'none';
            if (dmvView) dmvView.style.display = 'block';
            navDirBtn?.classList.remove('active');
            navDmvBtn?.classList.add('active');

            if (scoreCounter) scoreCounter.style.display = 'inline-flex';
            if (mapBtn) mapBtn.style.display = 'inline-block';
            if (viewToggleBtn) viewToggleBtn.style.display = 'inline-block';

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

        // Card Click Handlers
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

    // --- Helper Functions for DMV App ---
    const saveState = () => {
        try {
            localStorage.setItem('dmv-q-answers', JSON.stringify(answers));
            localStorage.setItem('dmv-q-bookmarks', JSON.stringify(Array.from(bookmarks)));
            localStorage.setItem('dmv-q-active-cat', activeCategory);
            const currentQ = getCurrentQuestion();
            if (currentQ) {
                localStorage.setItem('dmv-q-last-id', currentQ.id.toString());
            }
        } catch (e) {
            console.error('Error saving state', e);
        }
    };

    const filterQuestions = (cat, targetId = null) => {
        activeCategory = cat;
        if (cat === 'all') {
            currentFiltered = [...allQuestions];
        } else if (cat === 'bookmarked') {
            currentFiltered = allQuestions.filter(q => bookmarks.has(q.id));
        } else if (cat === 'missed') {
            currentFiltered = allQuestions.filter(q => answers[q.id] && !answers[q.id].isCorrect);
        } else {
            currentFiltered = allQuestions.filter(q => q.category === cat);
        }

        if (targetId) {
            const foundIdx = currentFiltered.findIndex(q => q.id === targetId);
            currentIndex = foundIdx !== -1 ? foundIdx : 0;
        } else {
            currentIndex = 0;
        }

        updateCategoryPillsUI();
        updateScoreStats();
        renderCurrentQuestion();
        if (viewMode === 'list') {
            renderFullList();
        }
        saveState();
    };

    const getCurrentQuestion = () => {
        if (currentFiltered.length === 0) return null;
        return currentFiltered[currentIndex] || currentFiltered[0];
    };

    const updateScoreStats = () => {
        const totalAnswered = Object.keys(answers).length;
        const totalCorrect = Object.values(answers).filter(a => a.isCorrect).length;
        const pct = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
        
        const scoreEl = document.getElementById('score-text');
        if (scoreEl) {
            scoreEl.textContent = `${totalCorrect} / ${totalAnswered} (${pct}%)`;
        }

        const bCountEl = document.getElementById('bookmark-count');
        if (bCountEl) bCountEl.textContent = bookmarks.size.toString();

        const missedCount = allQuestions.filter(q => answers[q.id] && !answers[q.id].isCorrect).length;
        const mCountEl = document.getElementById('missed-count');
        if (mCountEl) mCountEl.textContent = missedCount.toString();
    };

    const updateCategoryPillsUI = () => {
        document.querySelectorAll('#category-pills .cat-pill').forEach(pill => {
            if (pill.dataset.cat === activeCategory) {
                pill.classList.add('active');
                pill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                pill.classList.remove('active');
            }
        });
    };

    // --- Render Single Question ---
    const renderCurrentQuestion = () => {
        const question = getCurrentQuestion();
        const numBadge = document.getElementById('q-number-badge');
        const catBadge = document.getElementById('q-category-badge');
        const illuBox = document.getElementById('q-illustration');
        const titleEl = document.getElementById('q-text');
        const optionsEl = document.getElementById('q-options');
        const feedbackEl = document.getElementById('q-feedback');
        const bookmarkBtn = document.getElementById('btn-bookmark');
        const bookmarkIcon = document.getElementById('bookmark-icon');
        const bookmarkLabel = document.getElementById('bookmark-label');

        if (!question) {
            if (numBadge) numBadge.textContent = '0 Questions';
            if (catBadge) catBadge.textContent = activeCategory;
            if (illuBox) illuBox.innerHTML = '';
            if (titleEl) titleEl.textContent = activeCategory === 'bookmarked' 
                ? 'No flagged questions yet. Click the ⭐ Bookmark button on any question to add it here.'
                : (activeCategory === 'missed' 
                    ? 'No missed questions yet! Great job!' 
                    : 'No questions found.');
            if (optionsEl) optionsEl.innerHTML = '';
            if (feedbackEl) feedbackEl.style.display = 'none';
            return;
        }

        // Header Meta
        if (numBadge) {
            numBadge.textContent = `Question ${currentIndex + 1} of ${currentFiltered.length} (ID #${question.id})`;
        }
        if (catBadge) {
            catBadge.textContent = question.category;
        }

        // Bookmark state
        const isBookmarked = bookmarks.has(question.id);
        if (bookmarkBtn) {
            if (isBookmarked) {
                bookmarkBtn.classList.add('bookmarked');
                if (bookmarkIcon) bookmarkIcon.textContent = '★';
                if (bookmarkLabel) bookmarkLabel.textContent = 'Flagged';
            } else {
                bookmarkBtn.classList.remove('bookmarked');
                if (bookmarkIcon) bookmarkIcon.textContent = '☆';
                if (bookmarkLabel) bookmarkLabel.textContent = 'Bookmark';
            }
        }

        // Visual Illustration
        if (illuBox && window.Illustrations) {
            illuBox.innerHTML = window.Illustrations.get(question);
        }

        // Question Title
        if (titleEl) {
            titleEl.textContent = question.text;
        }

        // Options
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

        // Feedback Explanation
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
            } else {
                feedbackEl.style.display = 'none';
            }
        }

        // Update Prev / Next button state
        const prevBtn = document.getElementById('btn-prev-q');
        const nextBtn = document.getElementById('btn-next-q');
        if (prevBtn) prevBtn.disabled = currentIndex <= 0;
        if (nextBtn) {
            if (currentIndex >= currentFiltered.length - 1) {
                nextBtn.textContent = 'First Question ↺';
            } else {
                nextBtn.textContent = 'Next Question →';
            }
        }

        saveState();
    };

    // --- Handle Option Selection ---
    const handleSelectOption = (optIdx) => {
        const question = getCurrentQuestion();
        if (!question) return;

        if (answers[question.id]) return;

        const isCorrect = optIdx === question.correctIndex;
        answers[question.id] = {
            selectedIndex: optIdx,
            isCorrect: isCorrect,
            date: Date.now()
        };

        saveState();
        updateScoreStats();
        renderCurrentQuestion();
    };

    // --- Navigation Handlers ---
    const nextQuestion = () => {
        if (currentFiltered.length === 0) return;
        if (currentIndex < currentFiltered.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        renderCurrentQuestion();
    };

    const prevQuestion = () => {
        if (currentFiltered.length === 0) return;
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = currentFiltered.length - 1;
        }
        renderCurrentQuestion();
    };

    const randomQuestion = () => {
        if (currentFiltered.length <= 1) return;
        let newIdx;
        do {
            newIdx = Math.floor(Math.random() * currentFiltered.length);
        } while (newIdx === currentIndex);
        currentIndex = newIdx;
        renderCurrentQuestion();
    };

    const jumpToQuestionById = (id) => {
        let idx = currentFiltered.findIndex(q => q.id === id);
        if (idx === -1) {
            filterQuestions('all');
            idx = currentFiltered.findIndex(q => q.id === id);
        }
        if (idx !== -1) {
            currentIndex = idx;
            renderCurrentQuestion();
        }
        closeQuestionMap();
    };

    const toggleBookmarkCurrent = () => {
        const q = getCurrentQuestion();
        if (!q) return;
        if (bookmarks.has(q.id)) {
            bookmarks.delete(q.id);
        } else {
            bookmarks.add(q.id);
        }
        saveState();
        updateScoreStats();
        renderCurrentQuestion();
    };

    const resetCurrentAnswer = () => {
        const q = getCurrentQuestion();
        if (!q) return;
        delete answers[q.id];
        saveState();
        updateScoreStats();
        renderCurrentQuestion();
    };

    const clearAllProgress = () => {
        if (confirm('Are you sure you want to reset all answers and progress?')) {
            answers = {};
            bookmarks.clear();
            localStorage.removeItem('dmv-q-answers');
            localStorage.removeItem('dmv-q-bookmarks');
            updateScoreStats();
            renderCurrentQuestion();
        }
    };

    // --- Question Map Modal (1-120) ---
    const openQuestionMap = () => {
        const modal = document.getElementById('question-map-modal');
        const grid = document.getElementById('question-map-grid');
        if (!modal || !grid) return;

        grid.innerHTML = '';
        const currentQ = getCurrentQuestion();

        allQuestions.forEach((q) => {
            const bubble = document.createElement('button');
            bubble.className = 'q-bubble';
            bubble.textContent = q.id.toString();

            const ans = answers[q.id];
            if (ans) {
                bubble.classList.add(ans.isCorrect ? 'correct' : 'incorrect');
            }
            if (bookmarks.has(q.id)) {
                bubble.classList.add('flagged');
            }
            if (currentQ && currentQ.id === q.id) {
                bubble.classList.add('current');
            }

            bubble.addEventListener('click', () => {
                jumpToQuestionById(q.id);
            });

            grid.appendChild(bubble);
        });

        modal.style.display = 'flex';
    };

    const closeQuestionMap = () => {
        const modal = document.getElementById('question-map-modal');
        if (modal) modal.style.display = 'none';
    };

    // --- Full List View ---
    const renderFullList = (query = '') => {
        const container = document.getElementById('full-questions-container');
        const countEl = document.getElementById('list-count-display');
        if (!container) return;

        let filtered = currentFiltered;
        if (query && query.trim() !== '') {
            const qLower = query.toLowerCase().trim();
            filtered = filtered.filter(item => 
                item.text.toLowerCase().includes(qLower) ||
                item.explanation.toLowerCase().includes(qLower) ||
                item.options.some(opt => opt.toLowerCase().includes(qLower))
            );
        }

        if (countEl) {
            countEl.textContent = `Showing ${filtered.length} of ${allQuestions.length} questions`;
        }

        if (filtered.length === 0) {
            container.innerHTML = `<div class="card" style="text-align:center;"><p>No questions matched your search criteria.</p></div>`;
            return;
        }

        let html = '';
        filtered.forEach(q => {
            const illuHtml = window.Illustrations ? window.Illustrations.get(q) : '';
            html += `
                <div class="list-q-card">
                    <div class="list-q-header">
                        <span class="badge badge-category">${q.category}</span>
                        <span style="font-size:0.85rem; font-weight:800; color:var(--text-muted);">Question #${q.id}</span>
                    </div>
                    ${illuHtml}
                    <h3 style="font-size:1.15rem; margin-bottom:12px; font-weight:700;">${q.text}</h3>
                    <div class="options-grid">
            `;

            q.options.forEach((opt, optIdx) => {
                const isCorrect = optIdx === q.correctIndex;
                html += `
                    <div class="option-btn ${isCorrect ? 'correct' : ''}" style="cursor:default;">
                        <span class="opt-key">${optIdx + 1}</span>
                        <span class="opt-text">${opt} ${isCorrect ? '✓ (Correct)' : ''}</span>
                    </div>
                `;
            });

            html += `
                    </div>
                    <div class="feedback-panel" style="display:block; margin-top:12px;">
                        <p class="feedback-body"><strong>💡 Handbook Explanation:</strong> ${q.explanation}</p>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    };

    const toggleViewMode = () => {
        const singleView = document.getElementById('single-question-view');
        const listView = document.getElementById('full-list-view');
        const toggleBtnText = document.getElementById('view-toggle-text');

        if (viewMode === 'single') {
            viewMode = 'list';
            if (singleView) singleView.style.display = 'none';
            if (listView) listView.style.display = 'block';
            if (toggleBtnText) toggleBtnText.textContent = '🎯 Single View';
            renderFullList();
        } else {
            viewMode = 'single';
            if (singleView) singleView.style.display = 'block';
            if (listView) listView.style.display = 'none';
            if (toggleBtnText) toggleBtnText.textContent = '📖 List View';
            renderCurrentQuestion();
        }
    };

    // --- Global Navigation & Event Listeners ---
    document.getElementById('brand-home')?.addEventListener('click', () => switchAppView('directory'));
    document.getElementById('nav-btn-directory')?.addEventListener('click', () => switchAppView('directory'));
    document.getElementById('nav-btn-dmv')?.addEventListener('click', () => switchAppView('dmv'));
    document.getElementById('btn-back-to-directory')?.addEventListener('click', () => switchAppView('directory'));
    document.getElementById('footer-dmv-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        switchAppView('dmv');
    });

    document.getElementById('featured-dmv-card')?.addEventListener('click', () => switchAppView('dmv'));

    document.getElementById('dir-search-input')?.addEventListener('input', (e) => {
        renderDirectory(e.target.value);
    });

    document.getElementById('category-pills')?.addEventListener('click', (e) => {
        const pill = e.target.closest('.cat-pill');
        if (pill) filterQuestions(pill.dataset.cat);
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
    document.getElementById('btn-random-q')?.addEventListener('click', randomQuestion);
    document.getElementById('btn-bookmark')?.addEventListener('click', toggleBookmarkCurrent);
    document.getElementById('btn-reset-current')?.addEventListener('click', resetCurrentAnswer);
    document.getElementById('btn-clear-progress')?.addEventListener('click', clearAllProgress);

    document.getElementById('btn-toggle-grid')?.addEventListener('click', openQuestionMap);
    document.getElementById('btn-close-map')?.addEventListener('click', closeQuestionMap);
    document.getElementById('question-map-modal')?.addEventListener('click', (e) => {
        if (e.target.id === 'question-map-modal') closeQuestionMap();
    });

    document.getElementById('btn-toggle-view')?.addEventListener('click', toggleViewMode);
    document.getElementById('list-search-input')?.addEventListener('input', (e) => {
        renderFullList(e.target.value);
    });
    document.getElementById('btn-print-list')?.addEventListener('click', () => {
        window.print();
    });

    // --- Keyboard Navigation ---
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        const modal = document.getElementById('question-map-modal');
        if (modal && modal.style.display === 'flex') {
            if (e.key === 'Escape') closeQuestionMap();
            return;
        }

        if (currentAppView === 'dmv' && viewMode === 'single') {
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
            else if (e.key === 'f' || e.key === 'F' || e.key === 'b' || e.key === 'B') {
                toggleBookmarkCurrent();
                e.preventDefault();
            }
            else if (e.key === 'r' || e.key === 'R') {
                randomQuestion();
                e.preventDefault();
            }
            else if (e.key === 'm' || e.key === 'M') {
                openQuestionMap();
                e.preventDefault();
            }
        }
    });

    // --- Handle Initial Hash Routing & Render ---
    const initialHash = window.location.hash;
    if (initialHash === '#dmv' || window.location.pathname.includes('/dmv')) {
        switchAppView('dmv');
    } else {
        switchAppView('directory');
    }

    // Initialize DMV state
    if (savedCategory && savedCategory !== 'all') {
        filterQuestions(savedCategory, savedLastId ? parseInt(savedLastId, 10) : null);
    } else {
        if (savedLastId) {
            const foundIdx = currentFiltered.findIndex(q => q.id === parseInt(savedLastId, 10));
            if (foundIdx !== -1) currentIndex = foundIdx;
        }
        updateScoreStats();
        updateCategoryPillsUI();
    }
});
