/**
 * Whether the /keystatic editor can run. Locally it edits files on disk; a
 * deployment needs the GitHub App variables (docs/cms/README.md). Without
 * them the site still builds and the editor explains what is missing.
 */
export const cmsConnected = () =>
  (process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE !== "github") ||
  Boolean(
    process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
      process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
      process.env.KEYSTATIC_SECRET,
  );
