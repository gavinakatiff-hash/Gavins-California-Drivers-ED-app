const UI = {
    formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    },

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            if (screen.id === screenId) {
                screen.classList.add('active');
            } else {
                screen.classList.remove('active');
            }
        });

        // Update nav bar active state
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        if (screenId === 'screen-home') {
            document.getElementById('nav-home')?.classList.add('active');
        } else if (screenId === 'screen-categories') {
            document.getElementById('nav-practice')?.classList.add('active');
        } else if (screenId === 'screen-study') {
            document.getElementById('nav-study')?.classList.add('active');
        } else if (screenId === 'screen-history') {
            document.getElementById('nav-history')?.classList.add('active');
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    renderHome(bestScore) {
        const statsEl = document.getElementById('best-score-display');
        if (!statsEl) return;
        
        if (bestScore) {
            const dateStr = new Date(bestScore.date).toLocaleDateString();
            const pct = Math.round((bestScore.score / bestScore.total) * 100);
            statsEl.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                    <div>
                        <div style="font-size:1.8rem; font-weight:900; color:var(--blue);">${bestScore.score} / ${bestScore.total} (${pct}%)</div>
                        <div style="color:var(--text-muted); font-size:0.85rem;">Mode: ${bestScore.mode === 'minor' ? 'Minor (46 Qs)' : 'Adult (36 Qs)'} • Date: ${dateStr}</div>
                    </div>
                    <div>
                        <span class="badge" style="background:${bestScore.passed ? 'var(--green-bg)' : 'var(--red-bg)'}; color:${bestScore.passed ? 'var(--green)' : 'var(--red)'}; font-size:0.95rem; padding:6px 14px;">
                            ${bestScore.passed ? '✅ Passed DMV Standard' : '❌ Needs Practice'}
                        </span>
                    </div>
                </div>
            `;
        } else {
            statsEl.innerHTML = `
                <p style="color:var(--text-muted);">No completed tests recorded yet. Start with a Practice test or timed Exam simulation above!</p>
            `;
        }
    },

    renderCategories(categories) {
        const listEl = document.getElementById('category-list');
        if (!listEl) return;

        let html = `
            <label class="category-item select-all">
                <input type="checkbox" id="cb-select-all" checked>
                <span>Select All Categories (All 120 Questions)</span>
            </label>
        `;

        categories.forEach(cat => {
            html += `
                <label class="category-item">
                    <input type="checkbox" class="cb-category" value="${cat.name}" checked>
                    <span>${cat.name}</span>
                    <span class="category-count">(${cat.count} questions)</span>
                </label>
            `;
        });

        listEl.innerHTML = html;

        const selectAllCb = document.getElementById('cb-select-all');
        const categoryCbs = document.querySelectorAll('.cb-category');

        if (selectAllCb) {
            selectAllCb.addEventListener('change', (e) => {
                const isChecked = e.target.checked;
                categoryCbs.forEach(cb => cb.checked = isChecked);
            });
        }

        categoryCbs.forEach(cb => {
            cb.addEventListener('change', () => {
                const allChecked = Array.from(categoryCbs).every(c => c.checked);
                if (selectAllCb) selectAllCb.checked = allChecked;
            });
        });
    },

    renderQuiz(question, progress, timeElapsed, isExam) {
        const progressText = document.getElementById('quiz-progress');
        const timerEl = document.getElementById('quiz-timer');
        const categoryEl = document.getElementById('quiz-category');
        const progressFill = document.getElementById('progress-bar-fill');
        const illuEl = document.getElementById('quiz-illustration');
        const questionText = document.getElementById('quiz-question');
        const optionsEl = document.getElementById('quiz-options');
        const feedbackEl = document.getElementById('quiz-feedback');
        const btnNext = document.getElementById('btn-next');

        if (progressText) progressText.textContent = `Question ${progress.current} of ${progress.total}`;
        if (progressFill) progressFill.style.width = `${progress.percentage}%`;
        
        if (timerEl) {
            if (isExam) {
                timerEl.style.display = 'inline-block';
                timerEl.textContent = `⏱️ ${this.formatTime(timeElapsed)}`;
            } else {
                timerEl.style.display = 'none';
            }
        }

        if (categoryEl) categoryEl.textContent = question.category || '';
        if (illuEl && window.Illustrations) {
            illuEl.innerHTML = window.Illustrations.get(question);
        }
        if (questionText) questionText.textContent = question.text;
        
        if (optionsEl) {
            optionsEl.innerHTML = '';
            question.options.forEach((opt, index) => {
                const btn = document.createElement('button');
                btn.className = 'option';
                btn.dataset.index = index;
                btn.innerHTML = `
                    <span class="option-key">${index + 1}</span>
                    <span class="option-text">${opt}</span>
                `;
                optionsEl.appendChild(btn);
            });
        }

        if (feedbackEl) {
            feedbackEl.style.display = 'none';
        }
        if (btnNext) {
            btnNext.style.display = 'none';
        }
    },

    showAnswer(selectedIndex, correctIndex, explanation) {
        const optionsEl = document.getElementById('quiz-options');
        const feedbackEl = document.getElementById('quiz-feedback');
        const feedbackBadge = document.getElementById('feedback-badge');
        const feedbackText = document.getElementById('feedback-text');
        const btnNext = document.getElementById('btn-next');

        const isCorrect = selectedIndex === correctIndex;

        if (optionsEl) {
            const buttons = optionsEl.querySelectorAll('.option');
            buttons.forEach((btn, index) => {
                btn.disabled = true;
                if (index === correctIndex) {
                    btn.classList.add('correct');
                }
                if (index === selectedIndex && index !== correctIndex) {
                    btn.classList.add('incorrect');
                }
            });
        }

        if (feedbackEl && feedbackText) {
            feedbackEl.style.display = 'block';
            feedbackText.textContent = explanation || '';

            if (feedbackBadge) {
                feedbackBadge.textContent = isCorrect ? '✓ Correct Answer' : '✗ Incorrect Answer';
                feedbackBadge.style.background = isCorrect ? 'var(--green-bg)' : 'var(--red-bg)';
                feedbackBadge.style.color = isCorrect ? 'var(--green)' : 'var(--red)';
            }
        }

        if (btnNext) {
            btnNext.style.display = 'inline-flex';
            btnNext.focus();
        }
    },

    renderResults(results) {
        const titleEl = document.getElementById('results-title');
        const scoreEl = document.getElementById('results-score');
        const iconEl = document.getElementById('results-badge-icon');
        const thresholdEl = document.getElementById('results-threshold');
        const breakdownEl = document.getElementById('results-breakdown');
        const btnReview = document.getElementById('btn-review');

        if (iconEl) {
            iconEl.textContent = results.passed ? '🎉' : '📚';
        }

        if (titleEl) {
            titleEl.textContent = results.passed ? 'Congratulations! You Passed!' : 'Keep Studying! You Did Not Pass Yet.';
            titleEl.style.color = results.passed ? 'var(--green)' : 'var(--red)';
        }

        if (scoreEl) {
            scoreEl.textContent = `${results.score} / ${results.total}`;
        }

        if (thresholdEl) {
            thresholdEl.innerHTML = `
                Score: <strong>${results.percentage}%</strong> • Passing requirement is <strong>${results.passingScore}</strong> correct (approx. 83%).
                ${results.timeTaken ? `<br>Time taken: <strong>${this.formatTime(results.timeTaken)}</strong>` : ''}
            `;
        }

        if (breakdownEl) {
            let html = '<h3>Performance by Category</h3><div class="breakdown-grid">';
            results.categoryBreakdown.forEach(cat => {
                const pct = cat.total > 0 ? Math.round((cat.correct / cat.total) * 100) : 0;
                const isGood = pct >= 80;
                html += `
                    <div class="breakdown-item">
                        <div>
                            <strong>${cat.category}</strong>
                            <div style="font-size:0.85rem; color:var(--text-muted);">${cat.correct} of ${cat.total} correct</div>
                        </div>
                        <span class="badge" style="background:${isGood ? 'var(--green-bg)' : 'var(--red-bg)'}; color:${isGood ? 'var(--green)' : 'var(--red)'};">
                            ${pct}%
                        </span>
                    </div>
                `;
            });
            html += '</div>';
            breakdownEl.innerHTML = html;
        }

        if (btnReview) {
            btnReview.style.display = results.missedQuestions.length > 0 ? 'inline-flex' : 'none';
        }
    },

    renderReview(missedQuestions) {
        const reviewListEl = document.getElementById('review-list');
        if (!reviewListEl) return;

        if (missedQuestions.length === 0) {
            reviewListEl.innerHTML = `<div class="card" style="text-align:center;"><p>🌟 Incredible! You got 100% correct — no missed questions to review.</p></div>`;
            return;
        }

        let html = '';
        missedQuestions.forEach((item, qIdx) => {
            const { question, selectedIndex, correctIndex } = item;
            const illuHtml = window.Illustrations ? window.Illustrations.get(question) : '';
            html += `
                <div class="review-card">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                        <span class="badge badge-category">${question.category}</span>
                        <span style="font-size:0.85rem; font-weight:700; color:var(--text-muted);">Question #${question.id}</span>
                    </div>
                    ${illuHtml}
                    <h4>${qIdx + 1}. ${question.text}</h4>
                    <div class="review-options">
            `;
            
            question.options.forEach((opt, index) => {
                let cls = 'review-option';
                let tag = '';
                if (index === correctIndex) {
                    cls += ' correct';
                    tag = ' ✓ (Correct Answer)';
                } else if (index === selectedIndex) {
                    cls += ' incorrect';
                    tag = ' ✗ (Your Answer)';
                }
                
                html += `<div class="${cls}"><strong>${index + 1}.</strong> ${opt} <span style="font-size:0.85rem; font-weight:700;">${tag}</span></div>`;
            });

            html += `
                    </div>
                    <div class="review-explanation">
                        <strong>💡 Handbook Explanation:</strong> ${question.explanation}
                    </div>
                </div>
            `;
        });

        reviewListEl.innerHTML = html;
    },

    renderStudyBank(questions, activeCategory = 'all', searchQuery = '') {
        const listEl = document.getElementById('study-list');
        const countEl = document.getElementById('study-question-count');
        if (!listEl) return;

        let filtered = questions;
        if (activeCategory && activeCategory !== 'all') {
            filtered = filtered.filter(q => q.category === activeCategory);
        }

        if (searchQuery && searchQuery.trim() !== '') {
            const q = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(item => 
                item.text.toLowerCase().includes(q) ||
                item.explanation.toLowerCase().includes(q) ||
                item.options.some(opt => opt.toLowerCase().includes(q))
            );
        }

        if (countEl) {
            countEl.textContent = `Showing ${filtered.length} of ${questions.length} questions`;
        }

        if (filtered.length === 0) {
            listEl.innerHTML = `<div class="card" style="text-align:center;"><p>No questions matched your search criteria.</p></div>`;
            return;
        }

        let html = '';
        filtered.forEach((q) => {
            const illuHtml = window.Illustrations ? window.Illustrations.get(q) : '';
            html += `
                <div class="study-card">
                    <div class="study-card-header">
                        <span class="study-q-num">Question #${q.id}</span>
                        <span class="badge badge-category">${q.category}</span>
                    </div>
                    ${illuHtml}
                    <h4 style="font-size:1.15rem; margin-bottom:14px;">${q.text}</h4>
                    <div class="review-options">
            `;

            q.options.forEach((opt, optIdx) => {
                const isCorrect = optIdx === q.correctIndex;
                html += `
                    <div class="review-option ${isCorrect ? 'correct' : ''}">
                        <strong>${optIdx + 1}.</strong> ${opt} ${isCorrect ? '✓ (Correct)' : ''}
                    </div>
                `;
            });

            html += `
                    </div>
                    <div class="review-explanation">
                        <strong>💡 Handbook Rule:</strong> ${q.explanation}
                    </div>
                </div>
            `;
        });

        listEl.innerHTML = html;
    },

    renderHistory(scores) {
        const container = document.getElementById('history-content');
        if (!container) return;

        if (!scores || scores.length === 0) {
            container.innerHTML = `<p style="color:var(--text-muted); text-align:center;">No past test history found. Complete a practice or simulation test to start recording your history!</p>`;
            return;
        }

        let html = '<div class="history-list">';
        // reverse to show latest first
        const rev = [...scores].reverse();
        rev.forEach((s, idx) => {
            const dateStr = new Date(s.date).toLocaleString();
            const pct = s.total > 0 ? Math.round((s.score / s.total) * 100) : 0;
            html += `
                <div class="history-item">
                    <div>
                        <div style="font-weight:700; font-size:1.05rem;">
                            Score: ${s.score} / ${s.total} (${pct}%)
                        </div>
                        <div style="font-size:0.85rem; color:var(--text-muted);">
                            ${s.mode === 'minor' ? 'Minor (46 Qs)' : 'Adult (36 Qs)'} • ${dateStr}
                        </div>
                    </div>
                    <span class="badge" style="background:${s.passed ? 'var(--green-bg)' : 'var(--red-bg)'}; color:${s.passed ? 'var(--green)' : 'var(--red)'};">
                        ${s.passed ? 'Passed' : 'Failed'}
                    </span>
                </div>
            `;
        });
        html += '</div>';

        container.innerHTML = html;
    },

    updateTimer(seconds) {
        const timerEl = document.getElementById('quiz-timer');
        if (timerEl) {
            timerEl.textContent = `⏱️ ${this.formatTime(seconds)}`;
        }
    }
};

window.UI = UI;
