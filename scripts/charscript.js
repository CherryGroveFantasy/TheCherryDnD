(function() {
    const canvas = document.getElementById('stars-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    const PARTICLE_COUNT = 100;
    const SUNSET_COLORS = [
        '255, 140, 66',   // orange
        '255, 215, 0',    // gold
        '255, 105, 180',  // hot pink
        '255, 182, 193',  // light pink
        '221, 160, 221',  // plum
    ];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.radius = Math.random() * 1.8 + 0.5;
            this.speedY = Math.random() * 0.4 + 0.1;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.7 + 0.3;
            this.color = SUNSET_COLORS[Math.floor(Math.random() * SUNSET_COLORS.length)];
        }

        update() {
            this.y -= this.speedY;
            this.x += this.speedX;

            if (this.y < -10 || this.x < -10 || this.x > width + 10) {
                this.reset();
                this.y = height + 10;
            }
        }

        draw(ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
            ctx.fill();
            // glow
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 1.8, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color},${this.opacity * 0.2})`;
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let p of particles) {
            p.update();
            p.draw(ctx);
        }
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resize();
        initParticles();
    });

    resize();
    initParticles();
    animate();
})();