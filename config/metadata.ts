export const baseUrl = 'https://sion.is-a.dev';
export const defaultMetadata = {
  title: {
    default: 'Sion | Full-stack Developer',
    template: '%s | Sion Portfolio',
  },
  description: '프론트엔드 개발자 박시온의 포트폴리오입니다.',
  keywords: ['Next.js', 'Portfolio', 'Fullstack', 'Developer'],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    title: 'Sion | Full-stack Developer',
    description: '저의 공간에 초대합니다.',
    url: baseUrl,
    siteName: 'Sion Portfolio',
    images: [
      {
        url: '/icon.png',
        width: 192,
        height: 192,
        alt: 'Sion Portfolio',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },

  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  metadataBase: new URL(baseUrl),
};
