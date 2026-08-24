// ============================================================================
// MEGA 4-CORNER RADICAL ANIMATIONS & FIREWORKS FX ENGINE
// ============================================================================

class RadicalFX {
    constructor() {
        this.streak = 0;
        this.initCanvas();
    }

    initCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'fx-canvas';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100vw';
        this.canvas.style.height = '100vh';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '9999';
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.floatingTexts = [];
        this.resize();

        window.addEventListener('resize', () => this.resize());
        this.loop = this.loop.bind(this);
        requestAnimationFrame(this.loop);
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // Triggered when answering correctly
    celebrateCorrect(buttonElement) {
        this.streak += 1;
        const rect = buttonElement.getBoundingClientRect();
        const originX = rect.left + rect.width / 2;
        const originY = rect.top + rect.height / 2;

        // 🚀 1. FLY ALL QUESTIONS UPWARD!
        const allOptionBtns = document.querySelectorAll('.compact-options-grid .option-btn');
        allOptionBtns.forEach((btn, idx) => {
            btn.classList.add(`fx-fly-up-${idx % 4}`);
        });

        const card = document.querySelector('.compact-question-box');
        if (card) {
            card.classList.add('fx-fly-up-card');
        }

        // Accuracy Pill glow
        const accPill = document.getElementById('accuracy-display');
        if (accPill) {
            accPill.classList.add('fx-glow-green');
            setTimeout(() => accPill.classList.remove('fx-glow-green'), 800);
        }

        // 🎆 2. FIRE MEGA SPARKS & CONFETTI FROM ALL FOUR CORNERS!
        this.launchFourCornerMegaSparks(true);

        // 🎆 3. Button Center Starburst
        this.spawnParticleBurst(originX, originY, 35, true);

        // Floating celebration banner
        if (this.streak >= 3) {
            let streakMsg = `🔥 ${this.streak} IN A ROW!`;
            if (this.streak === 5) streakMsg = `⚡ 5 STREAK! ON FIRE!`;
            if (this.streak === 10) streakMsg = `🏆 10 IN A ROW! DMV MASTER!`;
            if (this.streak > 10) streakMsg = `🚀 ${this.streak} STREAK! GODLIKE!`;
            this.spawnFloatingText(originX, originY - 50, streakMsg, '#FF8533');
        } else {
            const praises = ['✓ RADICAL!', '✓ SPOT ON!', '✓ BOOM!', '✓ PERFECT!', '✓ NICE ONE!'];
            const praise = praises[Math.floor(Math.random() * praises.length)];
            this.spawnFloatingText(originX, originY - 40, praise, '#10B981');
        }
    }

    // Triggered when answering incorrectly
    celebrateWrong(buttonElement) {
        this.streak = 0;
        const rect = buttonElement.getBoundingClientRect();
        const originX = rect.left + rect.width / 2;
        const originY = rect.top + rect.height / 2;

        // 💥 1. UNSYNCHRONIZED CHAOTIC SHAKE AND FALL DOWNWARD TO BOTTOM!
        const allOptionBtns = document.querySelectorAll('.compact-options-grid .option-btn');
        allOptionBtns.forEach((btn, idx) => {
            btn.classList.add(`fx-shake-fall-${idx % 4}`);
        });

        // 💥 2. FIRE MEGA RED SPARKS FROM ALL FOUR CORNERS!
        this.launchFourCornerMegaSparks(false);

        // Button spark burst
        this.spawnSparks(originX, originY, 30, ['#EF4444', '#DC2626', '#FF6B00']);

        // Floating alert
        this.spawnFloatingText(originX, originY - 40, '✗ REVIEW THIS!', '#EF4444');
    }

    /**
     * Launches large, high-velocity sparks inward from all 4 screen corners!
     */
    launchFourCornerMegaSparks(isCorrect = true) {
        const w = this.canvas.width;
        const h = this.canvas.height;
        const countPerCorner = 25; // total 100 mega particles!

        const correctColors = ['#FF6B00', '#FF8533', '#10B981', '#F59E0B', '#38BDF8', '#FFFFFF', '#EAB308'];
        const wrongColors = ['#EF4444', '#DC2626', '#FF6B00', '#B91C1C', '#FFA500'];
        const colors = isCorrect ? correctColors : wrongColors;

        const corners = [
            // Top-Left corner: fires inward down-right
            { x: 0, y: 0, minAngle: 0.15 * Math.PI, maxAngle: 0.45 * Math.PI },
            // Top-Right corner: fires inward down-left
            { x: w, y: 0, minAngle: 0.55 * Math.PI, maxAngle: 0.85 * Math.PI },
            // Bottom-Left corner: fires inward up-right
            { x: 0, y: h, minAngle: -0.45 * Math.PI, maxAngle: -0.15 * Math.PI },
            // Bottom-Right corner: fires inward up-left
            { x: w, y: h, minAngle: -0.85 * Math.PI, maxAngle: -0.55 * Math.PI }
        ];

        corners.forEach(c => {
            for (let i = 0; i < countPerCorner; i++) {
                const angle = c.minAngle + Math.random() * (c.maxAngle - c.minAngle);
                // Mega high velocity to shoot far into the screen!
                const speed = Math.random() * 18 + 12;
                // Much larger particle sizes (14px to 32px)!
                const size = Math.random() * 18 + 14;

                const shapes = isCorrect ? ['star', 'diamond', 'circle', 'ribbon'] : ['spark', 'diamond', 'circle'];
                const shape = shapes[Math.floor(Math.random() * shapes.length)];

                this.particles.push({
                    x: c.x,
                    y: c.y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    size: size,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    alpha: 1,
                    decay: Math.random() * 0.018 + 0.012, // stays visible longer
                    shape: shape,
                    rotation: Math.random() * Math.PI * 2,
                    vRot: (Math.random() - 0.5) * 0.25
                });
            }
        });
    }

    spawnParticleBurst(x, y, count = 35, isCorrect = true) {
        const colors = ['#FF6B00', '#FF8533', '#10B981', '#F59E0B', '#38BDF8', '#FFFFFF'];
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 12 + 6;
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 3,
                size: Math.random() * 16 + 12, // Larger particles!
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: 1,
                decay: Math.random() * 0.02 + 0.014,
                shape: Math.random() > 0.4 ? 'star' : 'circle',
                rotation: Math.random() * Math.PI * 2,
                vRot: (Math.random() - 0.5) * 0.25
            });
        }
    }

    spawnSparks(x, y, count = 25, colors = ['#EF4444', '#FF6B00']) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 10 + 4;
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: Math.random() * 12 + 8, // Larger sparks!
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: 1,
                decay: Math.random() * 0.03 + 0.02,
                shape: 'spark',
                rotation: 0,
                vRot: 0
            });
        }
    }

    spawnFloatingText(x, y, text, color) {
        this.floatingTexts.push({
            x: x,
            y: y,
            text: text,
            color: color,
            alpha: 1,
            scale: 0.5,
            targetScale: 1.4, // Bigger floating text!
            vy: -2.8,
            life: 1.2
        });
    }

    // Helper: Draw 5-Point Star
    drawStar(ctx, r) {
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * r, -Math.sin((18 + i * 72) * Math.PI / 180) * r);
            ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * (r / 2), -Math.sin((54 + i * 72) * Math.PI / 180) * (r / 2));
        }
        ctx.closePath();
        ctx.fill();
    }

    // Helper: Draw Diamond
    drawDiamond(ctx, size) {
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(size * 0.7, 0);
        ctx.lineTo(0, size);
        ctx.lineTo(-size * 0.7, 0);
        ctx.closePath();
        ctx.fill();
    }

    loop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Render Particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.28; // natural gravity
            p.vx *= 0.985; // air drag
            p.alpha -= p.decay;
            p.rotation += p.vRot;

            if (p.alpha <= 0 || p.x < -50 || p.x > this.canvas.width + 50 || p.y > this.canvas.height + 50) {
                this.particles.splice(i, 1);
                continue;
            }

            this.ctx.save();
            this.ctx.globalAlpha = Math.max(0, p.alpha);
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation);
            this.ctx.fillStyle = p.color;
            this.ctx.shadowColor = p.color;
            this.ctx.shadowBlur = 10; // Glowing neon aura!

            if (p.shape === 'star') {
                this.drawStar(this.ctx, p.size);
            } else if (p.shape === 'diamond') {
                this.drawDiamond(this.ctx, p.size);
            } else if (p.shape === 'ribbon') {
                this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size * 1.8);
            } else if (p.shape === 'spark') {
                this.ctx.beginPath();
                this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                this.ctx.fill();
            } else {
                this.ctx.beginPath();
                this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                this.ctx.fill();
            }

            this.ctx.restore();
        }

        // Render Floating Texts
        for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
            const ft = this.floatingTexts[i];
            ft.y += ft.vy;
            ft.life -= 0.02;
            ft.alpha = Math.max(0, ft.life);
            ft.scale += (ft.targetScale - ft.scale) * 0.15;

            if (ft.life <= 0) {
                this.floatingTexts.splice(i, 1);
                continue;
            }

            this.ctx.save();
            this.ctx.globalAlpha = ft.alpha;
            this.ctx.font = `900 ${Math.round(26 * ft.scale)}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
            this.ctx.fillStyle = ft.color;
            this.ctx.textAlign = 'center';
            this.ctx.shadowColor = 'rgba(0,0,0,0.9)';
            this.ctx.shadowBlur = 12;
            this.ctx.fillText(ft.text, ft.x, ft.y);
            this.ctx.restore();
        }

        requestAnimationFrame(this.loop);
    }
}

window.RadicalFX = new RadicalFX();
