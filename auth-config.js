// @ts-check

/**
 * Google Identity Services configuration for the Techinance static site.
 *
 * HOW TO GET A CLIENT ID
 * ----------------------
 * 1. Go to https://console.cloud.google.com/ and pick (or create) a project.
 * 2. APIs & Services > OAuth consent screen. Choose "External", fill in the app
 *    name, support email and developer contact, then save. While the app is in
 *    "Testing" you must add each tester's Google account under "Test users";
 *    publish the app when you want anyone to be able to sign in.
 * 3. APIs & Services > Credentials > "+ Create credentials" > "OAuth client ID".
 * 4. Application type: "Web application". Give it a name, e.g. "Techinance web".
 * 5. Under "Authorized JavaScript origins" add every origin the site is served
 *    from. Origin = scheme + host + port, with NO path and NO trailing slash:
 *      http://localhost:5173          (vite dev server)
 *      https://<your-user>.github.io  (GitHub Pages, origin only. The
 *                                      /techinance/ path is NOT part of it)
 *    Add a custom domain too if you have one, e.g. https://techinance.org
 * 6. "Authorized redirect URIs" can stay empty. Google Identity Services runs
 *    entirely in the browser and never redirects back to a server route.
 * 7. Click Create and copy the client ID. It looks like
 *    "1234567890-abcdefghijklmnop.apps.googleusercontent.com".
 * 8. Paste it below, between the quotes, and commit.
 *
 * The client ID is public by design, so it ships in the page source. It isn't a
 * secret. Never put a client *secret* in this repo; the static site does not
 * need one.
 *
 * Leaving this empty is fine: Google sign-in is simply unavailable and the site
 * falls back to guest mode. Nothing breaks.
 *
 * @type {string}
 */
export const GOOGLE_CLIENT_ID = "";
