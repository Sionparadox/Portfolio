import { createNoise3D } from 'simplex-noise';
import type { Cloud, Star, ThemeType, WorkerMessage } from '../types/worker';

let canvas: OffscreenCanvas | null = null;
let ctx: OffscreenCanvasRenderingContext2D | null = null;
let stars: Star[] = [];
let clouds: Cloud[] = [];
let animationId: number | null = null;
let width = 0;
let height = 0;
let pixelRatio = 1;
let timeRef = 0;
let currentTheme: ThemeType = 'dark';

// 테마 전환 애니메이션용
let targetStarOpacity = 1;
let currentStarOpacity = 1;
let targetCloudOpacity = 0;
let currentCloudOpacity = 0;

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

// 구름 Y 위치 결정 (상단 20%, 중단 60%, 하단 20%)
function getCloudY(h: number): number {
  const rand = Math.random();
  if (rand < 0.2) {
    // 상단 20% (화면의 5%~25% 영역)
    return h * 0.05 + Math.random() * (h * 0.2);
  } else if (rand < 0.8) {
    // 중단 60% (화면의 30%~70% 영역)
    return h * 0.3 + Math.random() * (h * 0.4);
  } else {
    // 하단 20% (화면의 75%~95% 영역)
    return h * 0.75 + Math.random() * (h * 0.2);
  }
}

// 별 생성 (simplex noise로 자연스러운 분포)
function generateStars(w: number, h: number) {
  stars = [];
  const starCount = Math.floor((w * h) / 500);

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

// 구름 생성 (라이트 모드용)
function generateClouds(w: number, h: number) {
  clouds = [];
  const cloudCount = 13 + Math.floor(Math.random() * 4); // 13~16개

  for (let i = 0; i < cloudCount; i++) {
    // 구름을 구성하는 여러 원형 세그먼트
    const segmentCount = 8 + Math.floor(Math.random() * 6); // 8~13개
    const segments: { offsetX: number; offsetY: number; radius: number }[] = [];

    // 구름 크기
    const sizeVariant = Math.random();
    let baseWidth: number;
    let baseRadius: number;

    if (sizeVariant < 0.3) {
      // 작은 구름
      baseWidth = 60 + Math.random() * 40;
      baseRadius = 15 + Math.random() * 10;
    } else if (sizeVariant < 0.7) {
      // 중간 구름
      baseWidth = 120 + Math.random() * 80;
      baseRadius = 25 + Math.random() * 15;
    } else {
      // 큰 구름
      baseWidth = 200 + Math.random() * 100;
      baseRadius = 35 + Math.random() * 20;
    }

    // 자연스러운 구름 형태 생성
    for (let j = 0; j < segmentCount; j++) {
      const t = j / (segmentCount - 1); // 0 ~ 1
      const xPos = t * baseWidth - baseWidth / 2;

      // 중앙이 더 높고 양쪽이 낮은 형태 (포물선)
      const heightFactor = 1 - Math.pow((t - 0.5) * 2, 2);
      const yOffset = -heightFactor * baseRadius * 0.8;

      // 랜덤한 변화 추가
      const randomOffset = (Math.random() - 0.5) * baseRadius * 0.4;

      segments.push({
        offsetX: xPos + (Math.random() - 0.5) * 10,
        offsetY: yOffset + randomOffset,
        radius: baseRadius * (0.6 + Math.random() * 0.6),
      });
    }

    // 아래쪽에 추가 세그먼트
    const bottomSegments = 3 + Math.floor(Math.random() * 3);
    for (let j = 0; j < bottomSegments; j++) {
      segments.push({
        offsetX: (Math.random() - 0.5) * baseWidth * 0.7,
        offsetY: baseRadius * 0.3 + Math.random() * baseRadius * 0.3,
        radius: baseRadius * (0.5 + Math.random() * 0.4),
      });
    }

    clouds.push({
      x: Math.random() * (w + 400) - 200,
      y: getCloudY(h), // 상단 20%, 중단 60%, 하단 20%
      width: baseWidth,
      height: baseRadius * 2,
      speed: 0.08 + Math.random() * 0.15, // 더 느린 속도
      opacity: 0.65 + Math.random() * 0.3, // 더 선명하게 (0.65~0.95)
      segments,
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
  if (!ctx || currentStarOpacity <= 0) return;

  ctx.globalAlpha = currentStarOpacity;

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

  ctx.globalAlpha = 1;
}

// 별 그리기
function drawStars() {
  if (!ctx || currentStarOpacity <= 0) return;

  const time = timeRef;

  for (let i = 0; i < stars.length; i++) {
    const star = stars[i];
    let opacity: number;
    let currentSize: number;

    if (star.shouldTwinkle) {
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
      opacity = star.baseOpacity;
      currentSize = star.size;
    }

    // 테마 전환에 따른 opacity 적용
    const finalOpacity = opacity * currentStarOpacity;

    ctx.fillStyle = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${finalOpacity})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, currentSize, 0, Math.PI * 2);
    ctx.fill();

    // 큰 별만 십자 광선 효과
    if (star.type === 'large' && opacity > 0.6 && currentStarOpacity > 0.5) {
      ctx.strokeStyle = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${finalOpacity * 0.3})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(star.x - currentSize * 4, star.y);
      ctx.lineTo(star.x + currentSize * 4, star.y);
      ctx.moveTo(star.x, star.y - currentSize * 4);
      ctx.lineTo(star.x, star.y + currentSize * 4);
      ctx.stroke();
    }

    // 밝은 별만 글로우 효과
    if (star.shouldTwinkle && opacity > 0.7 && currentStarOpacity > 0.5) {
      const glowSize =
        star.type === 'large' ? 6 : star.type === 'medium' ? 4 : 3;
      ctx.shadowBlur = glowSize;
      ctx.shadowColor = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${0.7 * currentStarOpacity})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, currentSize * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }
}

// 구름 그리기
function drawClouds() {
  if (!ctx || currentCloudOpacity <= 0) return;

  for (const cloud of clouds) {
    // 구름 이동
    cloud.x += cloud.speed;

    // 화면 밖으로 나가면 왼쪽에서 다시 시작
    if (cloud.x - cloud.width / 2 > width) {
      cloud.x = -cloud.width / 2 - 100;
      cloud.y = getCloudY(height);
    }

    // 각 세그먼트를 그라데이션으로 그리기
    for (const segment of cloud.segments) {
      const x = cloud.x + segment.offsetX;
      const y = cloud.y + segment.offsetY;
      const r = segment.radius;

      // 부드러운 방사형 그라데이션
      const gradient = ctx.createRadialGradient(x, y - r * 0.2, 0, x, y, r);

      const baseOpacity = cloud.opacity * currentCloudOpacity;

      // 흰색에서 투명으로 부드럽게 (더 선명하게)
      gradient.addColorStop(0, `rgba(255, 255, 255, ${baseOpacity})`);
      gradient.addColorStop(0.4, `rgba(252, 252, 255, ${baseOpacity * 0.9})`);
      gradient.addColorStop(0.7, `rgba(248, 250, 252, ${baseOpacity * 0.6})`);
      gradient.addColorStop(1, `rgba(245, 248, 252, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // 구름 하이라이트 (상단에 밝은 부분)
    const highlightX = cloud.x;
    const highlightY = cloud.y - cloud.height * 0.3;
    const highlightR = cloud.width * 0.25;

    const highlightGradient = ctx.createRadialGradient(
      highlightX,
      highlightY,
      0,
      highlightX,
      highlightY,
      highlightR
    );

    const hlOpacity = cloud.opacity * currentCloudOpacity * 0.3;
    highlightGradient.addColorStop(0, `rgba(255, 255, 255, ${hlOpacity})`);
    highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = highlightGradient;
    ctx.beginPath();
    ctx.arc(highlightX, highlightY, highlightR, 0, Math.PI * 2);
    ctx.fill();
  }
}

// 테마 전환 시 opacity 부드럽게 변경
function updateOpacities() {
  const lerpSpeed = 0.02;

  // 별 opacity
  if (currentStarOpacity !== targetStarOpacity) {
    const diff = targetStarOpacity - currentStarOpacity;
    if (Math.abs(diff) < 0.01) {
      currentStarOpacity = targetStarOpacity;
    } else {
      currentStarOpacity += diff * lerpSpeed;
    }
  }

  // 구름 opacity
  if (currentCloudOpacity !== targetCloudOpacity) {
    const diff = targetCloudOpacity - currentCloudOpacity;
    if (Math.abs(diff) < 0.01) {
      currentCloudOpacity = targetCloudOpacity;
    } else {
      currentCloudOpacity += diff * lerpSpeed;
    }
  }
}

// 테마 변경 처리
function handleThemeChange(theme: ThemeType) {
  currentTheme = theme;

  if (theme === 'dark') {
    targetStarOpacity = 1;
    targetCloudOpacity = 0;
  } else {
    targetStarOpacity = 0;
    targetCloudOpacity = 1;
  }
}

// 애니메이션 루프
function animate() {
  if (!ctx || !canvas) return;

  timeRef += 0.005;

  // opacity 업데이트
  updateOpacities();

  // 그라데이션 배경 설정 (테마에 따라)
  let gradient: CanvasGradient;
  if (currentTheme === 'dark') {
    gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#1a0a2e');
    gradient.addColorStop(1, '#0a0a0a');
  } else {
    gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#e0f2fe');
    gradient.addColorStop(1, '#93c5fd');
  }
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // 다크 모드: 성운 + 별
  if (currentStarOpacity > 0) {
    drawNebula();
    drawStars();
  }

  // 라이트 모드: 구름
  if (currentCloudOpacity > 0) {
    drawClouds();
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
      currentTheme = message.theme;

      // 초기 테마에 따라 opacity 설정
      if (currentTheme === 'dark') {
        currentStarOpacity = 1;
        targetStarOpacity = 1;
        currentCloudOpacity = 0;
        targetCloudOpacity = 0;
      } else {
        currentStarOpacity = 0;
        targetStarOpacity = 0;
        currentCloudOpacity = 1;
        targetCloudOpacity = 1;
      }

      ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;
        ctx.scale(pixelRatio, pixelRatio);

        generateStars(width, height);
        generateClouds(width, height);
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
        generateClouds(width, height);
        initNebula(width, height);
      }
      break;

    case 'theme-change':
      handleThemeChange(message.theme);
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
