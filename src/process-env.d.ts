namespace NodeJS {
  interface ProcessEnv {
    /**
     * The current environment.
     */
    readonly NODE_ENV: "development" | "production" | "test";
    /**
     * The publishable/public key for Clerk (https://clerk.dev).
     */
    readonly NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
    /**
     * The secret key for Clerk (https://clerk.dev).
     */
    readonly CLERK_SECRET_KEY: string;
    /**
     * The (server-side) API key for OpenAI (https://openai.com).
     */
    readonly OPEN_AI_API_KEY: string;
  }
}
