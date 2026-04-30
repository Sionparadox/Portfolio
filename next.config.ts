import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    // 4K(3840) 후보를 제외해 과도한 원본 다운로드를 줄입니다.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'owhjjrjy6ylsf5ck.public.blob.vercel-storage.com',
        port: '',
      },
    ],
  },
  // webpack(config) {
  //   // CssMinimizerPlugin 제거 - bg-conic 등 커스텀 CSS가 제거되는 것을 방지
  //   config.optimization.minimizer = config.optimization.minimizer.filter(
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     (plugin: any) => {
  //       return !plugin.constructor.name.includes('CssMinimizerPlugin');
  //     }
  //   );
  //   return config;
  // },
};

export default nextConfig;
