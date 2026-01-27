import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  webpack(config) {
    // CssMinimizerPlugin 제거 - bg-conic 등 커스텀 CSS가 제거되는 것을 방지
    config.optimization.minimizer = config.optimization.minimizer.filter(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (plugin: any) => {
        return !plugin.constructor.name.includes('CssMinimizerPlugin');
      }
    );
    return config;
  },
};

export default nextConfig;
