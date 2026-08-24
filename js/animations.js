// ============================================================================
// SUPER RADICAL INTERACTIVE ANIMATIONS & PARTICLE FX
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

        // Button spring expansion
        buttonElement.classList.add('fx-correct-pulse');
        setTimeout(() => buttonElement.classList.remove('fx-correct-pulse'), 600);

        // Accuracy Pill glow
        const accPill = document.getElementById('accuracy-display');
        if (accPill) {
            accPill.classList.add('fx-glow-green');
            setTimeout(() => accPill.classList.remove('fx-glow-green'), 800);
        }

        // Spawn Radical Particle Confetti Burst
        this.spawnParticleBurst(originX, originY, 45);

        // Streak floating popups
        if (this.streak >= 3) {
            let streakMsg = `🔥 ${this.streak} IN A ROW!`;
            if (this.streak === 5) streakMsg = `⚡ 5 STREAK! UNSTOPPABLE!`;
            if (this.streak === 10) streakMsg = `🏆 10 IN A ROW! DMV MASTER!`;
            if (this.streak > 10) streakMsg = `🚀 ${this.streak} STREAK! GODLIKE!`;
            this.spawnFloatingText(originX, originY - 40, streakMsg, '#FF8533');
        } else {
            const praises = ['✓ RADICAL!', '✓ SPOT ON!', '✓ BOOM!', '✓ PERFECT!', '✓ NICE ONE!'];
            const praise = praises[Math.floor(Math.random() * praises.length)];
            this.spawnFloatingText(originX, originY - 30, praise, '#10B981');
        }
    }

    // Triggered when answering incorrectly
    celebrateWrong(buttonElement) {
        this.streak = 0; // reset streak
        const rect = buttonElement.getBoundingClientRect();
        const originX = rect.left + rect.width / 2;
        const originY = rect.top + rect.height / 2;

        // Button aggressive shake
        buttonElement.classList.add('fx-wrong-shake');
        setTimeout(() => buttonElement.classList.remove('fx-wrong-shake'), 600);

        // Red spark burst
        this.spawnSparks(originX, originY, 20, ['#EF4444', '#DC2626', '#FF6B00']);

        // Floating feedback
        this.spawnFloatingText(originX, originY - 30, '✗ REVIEW THIS!', '#EF4444');
    }

    spawnParticleBurst(x, y, count = 40) {
        const colors = ['#FF6B00', '#FF8533', '#10B981', '#F59E0B', '#38BDF8', '#FFFFFF'];
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 9 + 4;
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2,
                size: Math.random() * 7 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: 1,
                decay: Math.random() * 0.02 + 0.015,
                shape: Math.random() > 0.4 ? 'circle' : 'rect',
                rotation: Math.random() * Math.PI,
                vRot: (Math.random() - 0.5) * 0.2
            });
        }
    }

    spawnSparks(x, y, count = 20, colors = ['#EF4444', '#FF6B00']) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 6 + 2;
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: Math.random() * 4 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: 1,
                decay: Math.random() * 0.03 + 0.025,
                shape: 'circle',
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
            targetScale: 1.2,
            vy: -2.2,
            life: 1.0
        });
    }

    loop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Render Particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.22; // gravity
            p.vx *= 0.98; // drag
            p.alpha -= p.decay;
            p.rotation += p.vRot;

            if (p.alpha <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            this.ctx.save();
            this.ctx.globalAlpha = Math.max(0, p.alpha);
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation);
            this.ctx.fillStyle = p.color;

            if (p.shape === 'circle') {
                this.ctx.beginPath();
                this.ctx.arc(0, 0, p.size, 0, Math.PI * 2);
                this.ctx.fill();
            } else {
                this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
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
            this.ctx.font = `900 ${Math.round(22 * ft.scale)}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
            this.ctx.fillStyle = ft.color;
            this.ctx.textAlign = 'center';
            this.ctx.shadowColor = 'rgba(0,0,0,0.8)';
            this.ctx.shadowBlur = 8;
            this.ctx.fillText(ft.text, ft.x, ft.y);
            this.ctx.restore();
        }

        requestAnimationFrame(this.loop);
    }
}

window.RadicalFX = new RadicalFX();
