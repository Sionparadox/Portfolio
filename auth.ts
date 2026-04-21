import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: '/admin/signin',
  },
  callbacks: {
    async signIn({ profile }) {
      // GitHub 로그인 시 profile.id(고유 숫자 ID)가 환경변수와 일치하는지 확인
      const isAllowedToSignIn =
        profile?.id?.toString() === process.env.ADMIN_GITHUB_ID;

      if (isAllowedToSignIn) {
        return true; // 세션 생성 허용
      } else {
        // 관리자가 아니면 세션 생성 거절
        return false;
      }
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      const isOnSignIn = nextUrl.pathname === '/admin/signin';

      if (isOnAdmin && !isOnSignIn) {
        if (!isLoggedIn) return false; // 미로그인 시 로그인 페이지로
        return true; // 로그인했으면 접근 허용
      } else if (isOnSignIn) {
        if (isLoggedIn) {
          return Response.redirect(new URL('/admin', nextUrl)); // 이미 로그인했으면 /admin으로
        }
        return true;
      }
      return true;
    },
  },
});
