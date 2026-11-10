import type { AccountUser } from "@/interfaces/account.interface";
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: AccountUser;
    updateError?: string;
  }
  interface User extends AccountUser {
    accessToken: string;
    rememberMe?: boolean;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    rememberMe?: boolean;
    /** OpenID ID Token */
    accessToken: string,
    user: AccountUser;
    updateError?: string;
  }
}
