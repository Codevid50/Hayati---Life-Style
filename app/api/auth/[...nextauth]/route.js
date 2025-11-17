import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { connectDB } from "@/lib/mongodb";
import AuthUser from "@/models/AuthUser";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/", // Redirect to home page after login
    error: "/", // Redirect to home page on error
  },

  callbacks: {
    async signIn({ user, account }) {
      await connectDB();

      const existing = await AuthUser.findOne({ email: user.email });

      if (!existing) {
        await AuthUser.create({
          name: user.name,
          email: user.email,
          image: user.image,
          provider: account.provider,
        });
      }

      return true;
    },

    async session({ session }) {
      await connectDB();
      const userData = await AuthUser.findOne({ email: session.user.email });

      session.user.id = userData._id;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
