import { jwtDecode } from "jwt-decode";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { encode } from "next-auth/jwt";
import { shortSessionAge, rememberedSessionAge } from "@/lib/auth";
import { passwordSchema, profileSchema } from "@/schema/account.schema";
import { accountRequest, AccountApiError } from "@/services/account.service";

interface AuthResponse {
  token?: string;
  user?: { name: string; email: string; phone?: string; role?: string };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "FreshCart",
      credentials: {
        rememberMe: { label: "Keep me signed in", type: "checkbox" },
        email: {
          label: "Email",
          type: "email",
          placeholder: "eg. ramez@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "******",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
            signal: AbortSignal.timeout(15000),
          },
        );
        if (!response.ok) {
          return null;
        }
        const data: AuthResponse = await response.json();
        if (!data.token || !data.user) return null;
        const decodedToken = jwtDecode<{ id: string; role?: string }>(
          data.token,
        );
        return {
          id: decodedToken.id,
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone,
          role: data.user.role || decodedToken.role || "user",
          rememberMe: credentials.rememberMe === "true",
          accessToken: data.token,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.rememberMe = user.rememberMe;
        token.user = {
          id: user.id,
          name: user.name || "",
          email: user.email || "",
          phone: user.phone,
          role: user.role,
        };
      }

      if (trigger === "update" && token.accessToken) {
        delete token.updateError;
        try {
          if (session?.profile) {
            const values = profileSchema.parse(session.profile);
            const data = await accountRequest<AuthResponse>(
              "users/updateMe/",
              token.accessToken,
              {
                method: "PUT",
                body: JSON.stringify(values),
              },
            );
            token.user = {
              ...token.user,
              ...values,
              name: data.user?.name ?? values.name,
              email: data.user?.email ?? values.email,
            };
          } else if (session?.password) {
            const values = passwordSchema.parse(session.password);
            const data = await accountRequest<AuthResponse>(
              "users/changeMyPassword",
              token.accessToken,
              {
                method: "PUT",
                body: JSON.stringify(values),
              },
            );
            if (!data.token) throw new Error("Missing replacement token");
            token.accessToken = data.token;
          }
        } catch (error) {
          token.updateError =
            error instanceof AccountApiError
              ? error.message
              : "Your changes could not be saved. Check your details and try again.";
        }
      }
      return token;
    },
    session({ token, session }) {
      if (token) {
        session.user = token.user;
        session.updateError = token.updateError;
        session.expires = new Date(
          Date.now() +
            (token.rememberMe === false
              ? shortSessionAge
              : rememberedSessionAge) *
              1000,
        ).toISOString();
      }
      return session;
    },
  },

  jwt: {
    encode: (params) =>
      encode({
        ...params,
        maxAge:
          params.token?.rememberMe === false
            ? shortSessionAge
            : rememberedSessionAge,
      }),
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7,
  },
  pages: {
    signIn: "/login",
  },
};
