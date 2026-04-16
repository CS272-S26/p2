const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const text = document.getElementById('text1');
const text2 = document.getElementById('text2');

let cycle = 0;
let particles = [];
let lastX = -100;
let lastY = -100;
let dots = [];
let bombs = [];
let lastTime = null;
let heartTracer = 0;

// ── Utilities ──────────────────────────────────────────────────────────────────

function randomHex() {
    return (Math.floor(Math.random() * 155) + 100).toString(16).padStart(2, "0");
}

function randomColor() {
    return "#" + randomHex() + randomHex() + randomHex();
}

function getMousePos(event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
    };
}

// ── Heart geometry ─────────────────────────────────────────────────────────────

function sampleBezier(t, p0, p1, p2, p3) {
    const x = (1-t)**3*p0[0] + 3*(1-t)**2*t*p1[0] + 3*(1-t)*t**2*p2[0] + t**3*p3[0];
    const y = (1-t)**3*p0[1] + 3*(1-t)**2*t*p1[1] + 3*(1-t)*t**2*p2[1] + t**3*p3[1];
    return [x, y];
}

function heartPointAt(segment, t) {
    if (segment === 0) {
        // left arc
        const angle = -Math.PI + t * Math.PI;
        return [-50 + Math.cos(angle) * 50, -20 + Math.sin(angle) * 50];
    } else if (segment === 1) {
        // right arc
        const angle = -Math.PI + t * Math.PI;
        return [50 + Math.cos(angle) * 50, -20 + Math.sin(angle) * 50];
    } else if (segment === 2) {
        // right bezier curve down
        return sampleBezier(t, [100, -20], [100, 20], [50, 80], [0, 100]);
    } else {
        // left bezier curve down (reversed so tracer goes continuously)
        return sampleBezier(1 - t, [-100, -20], [-100, 20], [-50, 80], [0, 100]);
    }
}

// ── Particles & effects ────────────────────────────────────────────────────────

function explode(x, y, color, count) {
    for (let i = 0; i < count; i++) {
        particles.push({
            x, y,
            xvelo: Math.random() * 4 - 2,
            yvelo: Math.random() * 4 - 2,
            color,
            fade: 255
        });
    }
}

function spawnBomb(x, y, size) {
    bombs.push({ x, y, size, fade: 155 });
}

// ── Input handlers ─────────────────────────────────────────────────────────────

canvas.onclick = function(event) {
    const { x: mouseX, y: mouseY } = getMousePos(event);
    const rand4 = Math.round(Math.random() * canvas.width);
    dots.push({
        targetx: mouseX, targety: mouseY,
        x: rand4, y: canvas.height,
        xvelo: (mouseX - rand4) / 60,
        yvelo: (mouseY - canvas.height) / 60,
        color: randomColor()
    });
};

canvas.onmousemove = function(event) {
    const { x, y } = getMousePos(event);
    lastX = x;
    lastY = y;
};

canvas.onmouseleave = function() {
    lastX = -100;
    lastY = -100;
};

// ── Drawing ────────────────────────────────────────────────────────────────────

function drawHeart() {
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2 + Math.sin(cycle) * 5);

    // Body
    ctx.fillStyle = "#e73535";

    ctx.beginPath();
    ctx.arc(-50, -20, 50, -Math.PI, 0);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(50, -20, 50, -Math.PI, 0);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(100, -20);
    ctx.bezierCurveTo(100, 20, 50, 80, 0, 100);
    ctx.lineTo(0, -20);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(-100, -20);
    ctx.bezierCurveTo(-100, 20, -50, 80, 0, 100);
    ctx.lineTo(0, -20);
    ctx.fill();

    // Left eye
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.arc(-40, 0, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.arc(-43, -5, 3, 0, Math.PI * 2);
    ctx.fill();

    // Right eye
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.arc(40, 0, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.arc(37, -5, 3, 0, Math.PI * 2);
    ctx.fill();

    // Smile
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.arc(0, 40, 15, 0, Math.PI);
    ctx.fill();

    ctx.restore();
}

function drawEdgeTracer() {
    heartTracer = (heartTracer + 0.02) % 4;
    const heartX = canvas.width / 2;
    const heartY = canvas.height / 2 + Math.sin(cycle) * 5;
    const segment = Math.floor(heartTracer);
    const t = heartTracer - segment;
    const [ex, ey] = heartPointAt(segment, t);
    spawnBomb(heartX + ex, heartY + ey, 3);
}

function drawDots() {
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#ffffff";
    dots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 7, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = dot.color;
        ctx.fill();
    });
    ctx.lineWidth = 0;

    dots = dots.filter(dot => {
        dot.x += dot.xvelo;
        dot.y += dot.yvelo;
        if (dot.y <= dot.targety) {
            explode(dot.x, dot.y, dot.color, 50);
            spawnBomb(dot.x, dot.y, 20);
            return false;
        }
        return true;
    });
}

function drawParticles() {
    particles.forEach(part => {
        ctx.beginPath();
        ctx.arc(part.x, part.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = part.color + part.fade.toString(16).padStart(2, "0");
        ctx.fill();
    });

    particles = particles.filter(part => {
        part.x += part.xvelo;
        part.y += part.yvelo;
        part.fade -= 3;
        return part.fade > 10;
    });
}

function drawBombs() {
    bombs.forEach(b => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size, 0, 2 * Math.PI);
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.stroke();
    });

    bombs = bombs.filter(b => {
        b.size += 4;
        b.fade -= 30;
        return b.fade > 10;
    });
}

// ── Main loop ──────────────────────────────────────────────────────────────────

function animate(time) {
    if (lastTime === null) lastTime = time || 0;
    lastTime = time;

    // Clear
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = "#ffb3b3";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawHeart();
    drawEdgeTracer();

    // Mouse trail particles
    if (lastX > 0 && lastY > 0) {
        if (text) text.innerHTML = `Mouse at x:${Math.round(lastX)}, y:${Math.round(lastY)}`;
        explode(lastX, lastY, randomColor(), 3);
    }

    drawDots();
    drawParticles();
    drawBombs();

    if (text2) text2.innerHTML = `Particles: ${particles.length}`;

    cycle += Math.PI / 30;
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);