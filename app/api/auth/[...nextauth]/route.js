import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import { connectToDB } from "@utils/database";

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      await connectToDB();
      const sessionUser = await User.findOne({ email: session.user.email });
      if (sessionUser) {
        session.user.id = sessionUser._id.toString();
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      try {
        await connectToDB();

        // Check if user already exists in DB
        const userExists = await User.findOne({ email: profile.email });

        // If not, create user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.email.split("@")[0].toLowerCase(),
            image: profile.picture,
          });
        }

        // Return true to allow sign in
        return true;
      } catch (e) {
        console.error("Error signing in", e);
        return false;
      }
    },
  },
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
    error: "/auth/error", // Error page
  },
  debug: true, // Enable debug mode
};

const handler = (req, res) => NextAuth(req, res, options);

export { handler as GET, handler as POST };
