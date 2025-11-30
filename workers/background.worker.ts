import { createNoise3D } from 'simplex-noise';
import type { Star, WorkerMessage } from '../types/worker';

let canvas: OffscreenCanvas | null = null;
let ctx: OffscreenCanvasRenderingContext2D | null = null;
let stars: Star[] = [];
let animationId: number | null = null;
let width = 0;
let height = 0;
let pixelRatio = 1;
let timeRef = 0;

const noise3D = createNoise3D();
const nebulaGradients: {
  x: number;
  y: number;
  radius: number;
  colors: string[];
}[] = [];

// 별 색상 결정 (온도에 따른 색상)
const colorCache = new Map<number, { r: number; g: number; b: number }>();
function getStarColor(temp: number): { r: number; g: number; b: number } {
  const key = Math.round(temp * 100);
  if (colorCache.has(key)) {
    return colorCache.get(key)!;
  }

  let color: { r: number; g: number; b: number };

  if (temp < -0.3) {
    // 청색 계열
    color = { r: 200 + temp * 55, g: 220 + temp * 20, b: 255 };
  } else if (temp > 0.3) {
    // 적~황색 계열
    color = { r: 255, g: 220 - temp * 50, b: 180 - temp * 80 };
  } else {
    // 흰색
    color = { r: 255, g: 255, b: 255 };
  }

  colorCache.set(key, color);
  return color;
}

// 별 생성 (simplex noise로 자연스러운 분포)
function generateStars(w: number, h: number) {
  stars = [];
  const starCount = Math.floor((w * h) / 1000);

  for (let i = 0; i < starCount; i++) {
    // Simplex noise로 별의 위치 결정
    const noiseX = i * 0.1;
    const noiseY = i * 0.15;
    const noiseZ = i * 0.05;

    const posNoise = noise3D(noiseX, noiseY, noiseZ);
    const clusterX = noise3D(noiseX * 0.5, noiseY * 0.5, 0);
    const clusterY = noise3D(noiseX * 0.5, noiseY * 0.5, 100);

    const x = ((posNoise + 1) * 0.5 + (clusterX + 1) * 0.25) * w;
    const y = ((posNoise + 1) * 0.5 + (clusterY + 1) * 0.25) * h;

    const sizeNoise = noise3D(noiseX * 2, noiseY * 2, noiseZ * 2);
    const opacityNoise = noise3D(noiseX * 3, noiseY * 3, noiseZ * 3);
    const colorNoise = noise3D(noiseX * 4, noiseY * 4, noiseZ * 4);

    // 별 타입 결정
    const typeRandom = Math.abs(sizeNoise);
    let type: 'small' | 'medium' | 'large';
    let size: number;
    let shouldTwinkle: boolean;

    if (typeRandom < 0.7) {
      type = 'small';
      size = 0.3 + Math.random() * 0.7;
      shouldTwinkle = false;
    } else if (typeRandom < 0.9) {
      type = 'medium';
      size = 1 + Math.random() * 1.5;
      shouldTwinkle = Math.random() > 0.7;
    } else {
      type = 'large';
      size = 2 + Math.random() * 2;
      shouldTwinkle = true;
    }

    stars.push({
      x: x % w,
      y: y % h,
      baseOpacity: 0.3 + Math.abs(opacityNoise) * 0.7,
      noiseOffsetX: i * 0.1,
      noiseOffsetY: i * 0.15,
      noiseOffsetZ: i * 0.2,
      size,
      color: getStarColor(colorNoise),
      type,
      shouldTwinkle,
    });
  }
}

// 성운 초기화
function initNebula(w: number, h: number) {
  nebulaGradients.length = 0;
  const nebulaCount = 5;
  const nebulaColors = [
    ['rgba(138, 43, 226, 0.03)', 'rgba(138, 43, 226, 0.01)'],
    ['rgba(75, 0, 130, 0.02)', 'rgba(138, 43, 226, 0.01)'],
    ['rgba(255, 20, 147, 0.02)', 'rgba(138, 43, 226, 0.01)'],
    ['rgba(30, 144, 255, 0.02)', 'rgba(138, 43, 226, 0.01)'],
    ['rgba(148, 0, 211, 0.02)', 'rgba(138, 43, 226, 0.01)'],
  ];

  for (let i = 0; i < nebulaCount; i++) {
    const x = (w / nebulaCount) * i + w * 0.1;
    const y = h * (0.2 + i * 0.15);
    const radius = 200 + i * 50;

    nebulaGradients.push({
      x,
      y,
      radius,
      colors: nebulaColors[i % nebulaColors.length],
    });
  }
}

// 성운 그리기
function drawNebula() {
  if (!ctx) return;

  for (const nebula of nebulaGradients) {
    const gradient = ctx.createRadialGradient(
      nebula.x,
      nebula.y,
      0,
      nebula.x,
      nebula.y,
      nebula.radius
    );
    gradient.addColorStop(0, nebula.colors[0]);
    gradient.addColorStop(0.5, nebula.colors[1]);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
}

// 애니메이션 루프
function animate() {
  if (!ctx || !canvas) return;

  timeRef += 0.005;

  // 캔버스 클리어
  ctx.clearRect(0, 0, width, height);

  // 성운 효과
  drawNebula();

  // 별 그리기
  const time = timeRef;

  for (let i = 0; i < stars.length; i++) {
    const star = stars[i];
    let opacity: number;
    let currentSize: number;

    if (star.shouldTwinkle) {
      // 반짝이는 별: Simplex noise로 밝기 변화
      const twinkleNoise = noise3D(
        star.noiseOffsetX + time * 0.5,
        star.noiseOffsetY + time * 0.5,
        star.noiseOffsetZ + time * 0.3
      );
      opacity = Math.max(
        0.1,
        Math.min(1, star.baseOpacity + twinkleNoise * 0.4)
      );
      currentSize = star.size * (0.6 + opacity * 0.4);
    } else {
      // 정적인 별
      opacity = star.baseOpacity;
      currentSize = star.size;
    }

    // 별 그리기
    ctx.fillStyle = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${opacity})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, currentSize, 0, Math.PI * 2);
    ctx.fill();

    // 큰 별만 십자 광선 효과
    if (star.type === 'large' && opacity > 0.6) {
      ctx.strokeStyle = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${opacity * 0.3})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(star.x - currentSize * 4, star.y);
      ctx.lineTo(star.x + currentSize * 4, star.y);
      ctx.moveTo(star.x, star.y - currentSize * 4);
      ctx.lineTo(star.x, star.y + currentSize * 4);
      ctx.stroke();
    }

    // 밝은 별만 글로우 효과
    if (star.shouldTwinkle && opacity > 0.7) {
      const glowSize =
        star.type === 'large' ? 6 : star.type === 'medium' ? 4 : 3;
      ctx.shadowBlur = glowSize;
      ctx.shadowColor = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, 0.7)`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, currentSize * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  animationId = requestAnimationFrame(animate);
}

// 메시지 핸들러
self.onmessage = (e: MessageEvent<WorkerMessage>) => {
  const message = e.data;

  switch (message.type) {
    case 'init':
      canvas = message.canvas;
      width = message.width;
      height = message.height;
      pixelRatio = message.pixelRatio;

      ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;
        ctx.scale(pixelRatio, pixelRatio);

        generateStars(width, height);
        initNebula(width, height);
        animate();
      }
      break;

    case 'resize':
      width = message.width;
      height = message.height;
      pixelRatio = message.pixelRatio;

      if (canvas && ctx) {
        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;
        ctx.scale(pixelRatio, pixelRatio);

        generateStars(width, height);
        initNebula(width, height);
      }
      break;

    case 'stop':
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
      break;
  }
};

export {};
