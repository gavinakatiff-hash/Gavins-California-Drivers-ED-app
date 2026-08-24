function shuffleArray(arr) {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

class QuizSession {
    constructor(questions, mode) {
        this.allQuestions = questions;
        this.mode = mode; // 'adult' or 'minor'
        this.totalQuestions = mode === 'minor' ? 46 : 36;
        this.passingScore = mode === 'minor' ? 38 : 30;
        this.questions = [];
        this.currentIndex = 0;
        this.answers = [];
        this.startTime = null;
        this.endTime = null;
        this.isExamMode = false;
        this.selectedCategories = [];
    }

    start(categories = null, isExam = false) {
        this.selectedCategories = categories;
        this.isExamMode = isExam;
        this.currentIndex = 0;
        this.answers = [];
        this.startTime = Date.now();
        this.endTime = null;

        let filteredQuestions = this.allQuestions;
        if (categories && categories.length > 0) {
            filteredQuestions = this.allQuestions.filter(q => categories.includes(q.category));
        }

        let shuffled = shuffleArray(filteredQuestions);
        this.questions = shuffled.slice(0, Math.min(this.totalQuestions, shuffled.length));
    }

    getCurrentQuestion() {
        if (this.currentIndex >= this.questions.length) return null;
        return this.questions[this.currentIndex];
    }

    selectAnswer(optionIndex) {
        const question = this.getCurrentQuestion();
        if (!question) return null;
        
        // Check if already answered
        if (this.answers.some(a => a.questionId === question.id)) {
            return null; // Already answered
        }

        const isCorrect = optionIndex === question.correctIndex;
        
        this.answers.push({
            questionId: question.id,
            selectedIndex: optionIndex,
            correct: isCorrect
        });

        return {
            correct: isCorrect,
            correctIndex: question.correctIndex,
            explanation: question.explanation
        };
    }

    next() {
        this.currentIndex++;
        return this.currentIndex < this.questions.length;
    }

    getResults() {
        if (!this.endTime) {
            this.endTime = Date.now();
        }

        const score = this.answers.filter(a => a.correct).length;
        const total = this.questions.length;
        const passed = score >= this.passingScore;
        const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
        const timeTaken = Math.floor((this.endTime - this.startTime) / 1000);

        const categoryStats = {};
        const missedQuestions = [];

        this.answers.forEach(a => {
            const question = this.questions.find(q => q.id === a.questionId);
            if (!question) return;

            if (!categoryStats[question.category]) {
                categoryStats[question.category] = { correct: 0, total: 0 };
            }
            categoryStats[question.category].total++;
            if (a.correct) {
                categoryStats[question.category].correct++;
            } else {
                missedQuestions.push({
                    question: question,
                    selectedIndex: a.selectedIndex,
                    correctIndex: question.correctIndex
                });
            }
        });

        const categoryBreakdown = Object.keys(categoryStats).map(cat => ({
            category: cat,
            correct: categoryStats[cat].correct,
            total: categoryStats[cat].total
        }));

        return {
            score,
            total,
            passed,
            passingScore: this.passingScore,
            percentage,
            timeTaken,
            categoryBreakdown,
            missedQuestions
        };
    }

    getProgress() {
        const total = this.questions.length;
        const current = Math.min(this.currentIndex + 1, total);
        const percentage = total > 0 ? (this.currentIndex / total) * 100 : 0;
        return { current, total, percentage };
    }

    getTimeElapsed() {
        if (!this.startTime) return 0;
        const end = this.endTime || Date.now();
        return Math.floor((end - this.startTime) / 1000);
    }
}

const ScoreManager = {
    saveScore(mode, score, total) {
        const scores = this.getRecentScores(100);
        const passed = score >= (mode === 'minor' ? 38 : 30);
        scores.push({
            mode,
            score,
            total,
            date: Date.now(),
            passed
        });
        localStorage.setItem('dmv-scores', JSON.stringify(scores));
    },

    getBestScore(mode) {
        const scores = this.getRecentScores(1000).filter(s => s.mode === mode);
        if (scores.length === 0) return null;
        return scores.reduce((best, current) => {
            return (current.score > best.score) ? current : best;
        }, scores[0]);
    },

    getRecentScores(limit = 10) {
        try {
            const stored = localStorage.getItem('dmv-scores');
            if (stored) {
                const scores = JSON.parse(stored);
                return scores.slice(-limit);
            }
        } catch (e) {
            console.error('Failed to parse scores', e);
        }
        return [];
    }
};

window.QuizSession = QuizSession;
window.ScoreManager = ScoreManager;
