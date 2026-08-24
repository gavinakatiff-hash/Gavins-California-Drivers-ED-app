// ============================================================================
// ADAPTIVE QUESTION RECOMMENDATION ENGINE (REDDIT HIGH-YIELD & WRONG-FIRST)
// ============================================================================

/**
 * 61 California DMV Questions identified on Reddit (r/DMV, r/California, r/driving)
 * as the most frequently failed, tricky, and heavily tested concepts.
 */
const REDDIT_HIGH_YIELD_IDS = new Set([
    1, 2, 3, 11, 12, 14, 18, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 33, 38,
    41, 42, 43, 44, 45, 47, 48, 49, 50, 51, 52, 56, 61, 62, 63, 64, 65, 66, 67, 68, 69,
    70, 71, 73, 81, 82, 83, 84, 85, 87, 88, 89, 90, 93, 101, 102, 103, 104, 105, 106, 107, 108
]);

const REDDIT_INSIGHTS = {
    1: "Reddit Trap: Rolling stops are automatic fails. An 8-sided octagon ALWAYS requires a full, complete stop.",
    2: "Reddit Trap: A downward triangle ALWAYS means Yield (be prepared to stop), not Merge or Caution.",
    3: "Reddit Trap: Yellow pennant sign on the LEFT side marks a No Passing Zone.",
    11: "Reddit Trap: You cannot drive in a center left-turn lane for more than 200 feet.",
    12: "Reddit Trap: A flashing red signal must be treated exactly like a STOP sign.",
    14: "Reddit Trap: Roads are most slick during the first few minutes of rainfall as oils rise to the surface.",
    18: "Reddit Trap: Two sets of solid double yellow lines 2+ feet apart are a solid barrier. Never drive or turn across them.",
    21: "Reddit Trap: California Basic Speed Law: Never drive faster than is safe for weather, visibility, and road conditions.",
    22: "Reddit Trap: Blind intersection speed limit is 15 mph if you cannot see 100 ft in all directions.",
    23: "Reddit Trap: School zone speed limit is 25 mph when children are present.",
    24: "Reddit Trap: Railroad crossing speed limit is 15 mph within 100 ft if view is obstructed.",
    25: "Reddit Trap: Speed limit in any alley is 15 mph.",
    26: "Reddit Trap: Passing a safety zone with a stopped trolley/streetcar is 10 mph.",
    27: "Reddit Trap: Continuous center turn lane limit is strictly 200 feet.",
    29: "Reddit Trap: Right turn on red is legal ONLY after making a FULL stop first.",
    30: "Reddit Trap: Left turn on red is ONLY legal from a one-way street onto another one-way street.",
    31: "Reddit Trap: U-turns across a single double yellow line are legal if safe; across two sets is illegal.",
    33: "Reddit Trap: Low-beam headlights are required whenever wipers are running continuously.",
    38: "Reddit Trap: Lane #1 (leftmost) is for passing/fast traffic; rightmost lane is for slower traffic/exiting.",
    41: "Reddit Trap: DMV expects scanning 10 to 15 seconds ahead (1 block in city, 1/4 mile on highway).",
    42: "Reddit Trap: 3-second rule is the California minimum safe following distance.",
    43: "Reddit Trap: When tailgated, NEVER brake check. Merge right or slow down to let them pass.",
    44: "Reddit Trap: Hydroplaning can happen at 50 mph or faster in heavy rain.",
    45: "Reddit Trap: Never use high-beam headlights in fog or heavy rain — they cause blinding glare.",
    47: "Reddit Trap: Legal BAC limit for drivers 21 and older is 0.08%.",
    48: "Reddit Trap: California Zero Tolerance for drivers under 21 is 0.01% BAC.",
    49: "Reddit Trap: Commercial driver legal BAC limit is 0.04%.",
    50: "Reddit Trap: Smoking inside a vehicle with any minor present is illegal with a $100 fine.",
    51: "Reddit Trap: Children under 2 years old must ride in a rear-facing seat.",
    52: "Reddit Trap: Children under 8 years old must ride in the back seat in a booster/car seat.",
    56: "Reddit Trap: Abandoning animals on a highway carries up to $1,000 fine and/or 6 months jail time.",
    61: "Reddit Trap: White curb = Passenger or mail loading/unloading only.",
    62: "Reddit Trap: Green curb = Park for a limited time (posted on sign/curb).",
    63: "Reddit Trap: Yellow curb = Loading/unloading freight or commercial goods.",
    64: "Reddit Trap: Red curb = NO stopping, standing, or parking under any circumstances.",
    65: "Reddit Trap: Blue curb = Disabled parking ONLY with valid placard or DP plate.",
    66: "Reddit Trap: Uphill with curb: Turn wheels AWAY from the curb (up, up, and away).",
    67: "Reddit Trap: Downhill with curb: Turn wheels TOWARD the curb.",
    68: "Reddit Trap: Uphill or downhill WITHOUT curb: Turn wheels TOWARD the road shoulder.",
    69: "Reddit Trap: Downhill WITHOUT curb: Turn wheels TOWARD the road shoulder.",
    70: "Reddit Trap: You must park at least 15 feet away from a fire hydrant.",
    71: "Reddit Trap: You must park at least 7.5 feet away from railroad tracks.",
    73: "Reddit Trap: When parking on any incline, always set the parking brake and place transmission in Park.",
    81: "Reddit Trap: Uncontrolled 4-way intersection: If arriving together, yield to the vehicle on your RIGHT.",
    82: "Reddit Trap: First vehicle arriving at a 4-way stop has the right of way.",
    83: "Reddit Trap: Turning left: You must yield the right of way to oncoming straight traffic.",
    84: "Reddit Trap: Uncontrolled T-intersection: Through traffic has full right of way; terminating road must yield.",
    85: "Reddit Trap: Roundabouts: Yield to vehicles already inside the circle approaching from your left.",
    87: "Reddit Trap: Narrow mountain road: The vehicle facing DOWNHILL must back up (uphill car has right of way).",
    88: "Reddit Trap: Emergency vehicles with sirens: Pull to the RIGHT edge of the road and STOP completely.",
    89: "Reddit Trap: Move Over Law: Move over one lane away from stopped emergency/tow vehicles or slow down.",
    90: "Reddit Trap: Pedestrians in marked or unmarked crosswalks ALWAYS have the right of way.",
    93: "Reddit Trap: Blind pedestrians with white canes or guide dogs have absolute right of way.",
    101: "Reddit Trap: Tire blowout: Grip steering wheel firmly, ease off gas, do NOT slam on brakes.",
    102: "Reddit Trap: Total brake failure: Pump brakes rapidly, downshift, use parking brake gently.",
    103: "Reddit Trap: Recovering from a skid: Ease off gas, steer in the direction you want the vehicle to go.",
    104: "Reddit Trap: Stuck accelerator: Shift to Neutral (N), apply brakes, steer safely off roadway.",
    105: "Reddit Trap: Form SR-1 accident report required within 10 days if damage > $1,000 or injury/death.",
    106: "Reddit Trap: Stalled on train tracks: Run toward the oncoming train at a 45-degree angle away from tracks.",
    107: "Reddit Trap: Overheating in traffic: Turn on heater and fan full blast to pull heat off engine.",
    108: "Reddit Trap: Headlights fail at night: Toggle dimmer switch, turn on hazard lights, pull off safely."
};

class AdaptiveRecommendationEngine {
    constructor(allQuestions) {
        this.allQuestions = allQuestions || [];
        this.stats = this.loadStats();
    }

    loadStats() {
        try {
            const raw = localStorage.getItem('dmv-adaptive-stats');
            if (raw) return JSON.parse(raw);
        } catch (e) {
            console.error('Error reading adaptive stats', e);
        }
        return {};
    }

    saveStats() {
        try {
            localStorage.setItem('dmv-adaptive-stats', JSON.stringify(this.stats));
        } catch (e) {
            console.error('Error saving adaptive stats', e);
        }
    }

    recordAttempt(questionId, isCorrect) {
        if (!this.stats[questionId]) {
            this.stats[questionId] = {
                timesSeen: 0,
                timesCorrect: 0,
                timesWrong: 0,
                lastResult: null,
                consecutiveWrong: 0,
                consecutiveCorrect: 0,
                lastSeen: 0
            };
        }

        const qStat = this.stats[questionId];
        qStat.timesSeen += 1;
        qStat.lastSeen = Date.now();

        if (isCorrect) {
            qStat.timesCorrect += 1;
            qStat.consecutiveCorrect += 1;
            qStat.consecutiveWrong = 0;
            qStat.lastResult = 'correct';
        } else {
            qStat.timesWrong += 1;
            qStat.consecutiveWrong += 1;
            qStat.consecutiveCorrect = 0;
            qStat.lastResult = 'wrong';
        }

        this.saveStats();
    }

    getQuestionWeight(question, currentQuestionId = null) {
        // Prevent picking exact current question again immediately if other options exist
        if (currentQuestionId && question.id === currentQuestionId && this.allQuestions.length > 1) {
            return 0;
        }

        const stat = this.stats[question.id] || {
            timesSeen: 0,
            timesCorrect: 0,
            timesWrong: 0,
            lastResult: null,
            consecutiveWrong: 0,
            consecutiveCorrect: 0
        };

        const isRedditHighYield = REDDIT_HIGH_YIELD_IDS.has(question.id);

        // =========================================================================
        // TIER 1 (HIGHEST PRIORITY): QUESTIONS YOU HAVE GOTTEN WRONG
        // Heavily boosted based on total mistakes + consecutive mistakes
        // =========================================================================
        if (stat.timesWrong > 0) {
            let weight = 200 + (stat.timesWrong * 150) + (stat.consecutiveWrong * 100);
            if (stat.lastResult === 'wrong') weight += 150;
            if (isRedditHighYield) weight += 40;
            return weight;
        }

        // =========================================================================
        // TIER 2 (HIGH PRIORITY): REDDIT MOST POPULAR & TRICKY UNSEEN QUESTIONS
        // =========================================================================
        if (stat.timesSeen === 0 && isRedditHighYield) {
            return 95;
        }

        // =========================================================================
        // TIER 3 (MEDIUM PRIORITY): OTHER UNANSWERED QUESTIONS
        // =========================================================================
        if (stat.timesSeen === 0) {
            return 50;
        }

        // =========================================================================
        // TIER 4 (LOWEST PRIORITY): QUESTIONS ANSWERED CORRECTLY
        // Mastered questions appear exponentially less often
        // =========================================================================
        const mastery = Math.max(1, stat.consecutiveCorrect);
        return Math.max(1, Math.round(15 / (mastery * 2)));
    }

    /**
     * Returns the next recommended question using weighted probability,
     * ensuring questions gotten wrong are the most likely to appear.
     */
    getNextRecommendedQuestion(currentQuestionId = null) {
        if (this.allQuestions.length === 0) return null;

        // Check if there are active mistakes that need immediate repetition
        const wrongList = this.allQuestions.filter(q => {
            const s = this.stats[q.id];
            return s && s.timesWrong > 0 && q.id !== currentQuestionId;
        });

        // Sort wrong list so the ones failed the MOST are at the absolute top
        wrongList.sort((a, b) => {
            const sA = this.stats[a.id];
            const sB = this.stats[b.id];
            return (sB.timesWrong + sB.consecutiveWrong) - (sA.timesWrong + sA.consecutiveWrong);
        });

        // 70% of the time when wrong questions exist, pick strictly from top mistakes
        if (wrongList.length > 0 && Math.random() < 0.70) {
            // Pick from top 3 most missed questions
            const topSlice = wrongList.slice(0, Math.min(3, wrongList.length));
            return topSlice[Math.floor(Math.random() * topSlice.length)];
        }

        // Otherwise use full weighted pool
        let totalWeight = 0;
        const weights = this.allQuestions.map(q => {
            const w = this.getQuestionWeight(q, currentQuestionId);
            totalWeight += w;
            return w;
        });

        if (totalWeight <= 0) {
            // Fallback to random if all weights 0
            const available = this.allQuestions.filter(q => q.id !== currentQuestionId);
            return available[Math.floor(Math.random() * available.length)] || this.allQuestions[0];
        }

        let randomVal = Math.random() * totalWeight;
        for (let i = 0; i < this.allQuestions.length; i++) {
            randomVal -= weights[i];
            if (randomVal <= 0) {
                return this.allQuestions[i];
            }
        }

        return this.allQuestions[0];
    }

    getAccuracyStats() {
        let totalCorrectAttempts = 0;
        let totalAttempts = 0;
        let uniqueQuestionsAnswered = 0;
        let totalWrongQuestions = 0;

        for (const [id, s] of Object.entries(this.stats)) {
            if (s.timesSeen > 0) {
                uniqueQuestionsAnswered += 1;
                totalAttempts += s.timesSeen;
                totalCorrectAttempts += s.timesCorrect;
                if (s.timesWrong > 0) {
                    totalWrongQuestions += 1;
                }
            }
        }

        const percentage = totalAttempts > 0 
            ? Math.round((totalCorrectAttempts / totalAttempts) * 100) 
            : 100;

        return {
            percentage,
            correct: totalCorrectAttempts,
            total: totalAttempts,
            uniqueAnswered: uniqueQuestionsAnswered,
            totalWrongQuestions
        };
    }

    getQuestionBadgeInfo(questionId) {
        const stat = this.stats[questionId];
        const isReddit = REDDIT_HIGH_YIELD_IDS.has(questionId);
        const redditTip = REDDIT_INSIGHTS[questionId] || null;

        if (stat && stat.timesWrong > 0) {
            return {
                type: 'mistake',
                label: `🔥 Focus Question (Missed ${stat.timesWrong}x)`,
                tip: redditTip
            };
        }

        if (isReddit) {
            return {
                type: 'reddit',
                label: '🎯 Reddit Top Missed Question',
                tip: redditTip
            };
        }

        return {
            type: 'standard',
            label: null,
            tip: null
        };
    }

    resetAllStats() {
        this.stats = {};
        localStorage.removeItem('dmv-adaptive-stats');
    }
}

window.AdaptiveRecommendationEngine = AdaptiveRecommendationEngine;
window.REDDIT_HIGH_YIELD_IDS = REDDIT_HIGH_YIELD_IDS;
window.REDDIT_INSIGHTS = REDDIT_INSIGHTS;
