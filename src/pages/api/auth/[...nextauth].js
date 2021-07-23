import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
      domain: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
      profileUrl: "https://api.github.com/user",
      profile(profile) {
        return {
          id: profile.id,
          name: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  }
})
