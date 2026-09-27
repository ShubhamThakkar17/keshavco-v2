# Insights editor and Our Work (Keystatic)

Decision log #21. Articles for **Insights** and case studies for **Our Work**
are written in an editor at **`/keystatic`** on the website. It is
[Keystatic](https://keystatic.com): free, no database, no monthly bill.
Everything you write (text and uploaded images) is saved into this GitHub
repository, and Vercel republishes the site about 1–2 minutes after you
click Save.

```
/keystatic (sign in with GitHub) ──Save──► commit to GitHub ──► Vercel rebuild ──► live
```

- Articles: `src/content/insights/*.mdoc`. Images: `public/images/insights/`.
- Case studies: `src/content/work/*.mdoc`. Images: `public/images/work/`.
- Only people with write access to the GitHub repository can sign in.
- Until the one-time setup below is done, `/keystatic` on the live site shows
  "The editor is not connected yet". The rest of the site is unaffected.

## One-time setup (about 15 minutes)

The editor signs in through a small GitHub App that you own.

1. **Create the GitHub App.** On GitHub: your profile picture → Settings →
   Developer settings → GitHub Apps → **New GitHub App**.
   - GitHub App name: `KeshavCo editor` (any name works).
   - Homepage URL: `https://keshavco.com`
   - Callback URLs (add one per domain you will edit from):
     - `https://keshavco.com/api/keystatic/github/oauth/callback`
     - `https://keshavco-v2-git-redesign-v3-shubhamthakkar17s-projects.vercel.app/api/keystatic/github/oauth/callback` (the preview, optional)
   - Tick **Expire user authorization tokens**. Leave **Request user
     authorization (OAuth) during installation** unticked.
   - Webhook: untick **Active**.
   - Repository permissions: **Contents: Read and write**, **Metadata:
     Read-only**, **Pull requests: Read and write**.
   - Where can this GitHub App be installed: **Only on this account**.
   - Create it. On the next page note the **Client ID**, click **Generate a
     new client secret** and copy it, and note the app's URL name (the part
     after `github.com/apps/`), which is its *slug*.
2. **Install it on the repository.** On the app's page: Install App → your
   account → Only select repositories → `keshavco-v2` → Install.
3. **Add four variables in Vercel** (project → Settings → Environment
   Variables, for Production and Preview):
   - `KEYSTATIC_GITHUB_CLIENT_ID`: the Client ID
   - `KEYSTATIC_GITHUB_CLIENT_SECRET`: the client secret
   - `KEYSTATIC_SECRET`: a long random string (40+ letters and numbers)
   - `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`: the app's slug
4. **Redeploy**, open `https://keshavco.com/keystatic` and sign in with GitHub.

Alternative for step 1: from a laptop with the repository cloned, run
`NEXT_PUBLIC_KEYSTATIC_STORAGE=github npm run dev`, open
`http://localhost:3000/keystatic` and follow Keystatic's "Create GitHub App"
button. It creates the app and writes the four values into `.env`; copy them
into Vercel.

**Which branch it saves to.** The editor has a branch picker in the top
left. It defaults to the repository's default branch (the one production
deploys from). While the v3 redesign is still on `redesign/v3`, pick that
branch to try the editor on the preview.

## Writing an article

1. `/keystatic` → **Insights** → **Add**.
2. Fill in the sidebar:
   - **Title** (the slug, the web address, is made from it).
   - **Status**: *Draft* while writing. Only *Published* articles appear on
     the site. A draft with **"list the title under What we are writing
     next"** ticked shows its title, with no link, as DRAFTING.
   - **Publish date**, **Topic**, **Summary** (one or two sentences: it is
     the card text, the search result and the social preview), **Author**.
   - **Cover**: a ready-made graphic (pick from the list) or an uploaded
     image (1600 px wide, under 1 MB, with alt text).
3. Write in the main area. The toolbar has headings, bold, italic, links,
   lists, quotes, tables, images and a divider. **Insert (+)** adds the
   blocks below.
4. **Save**. The article is live about 1–2 minutes later at
   `/insights/<slug>` and in the sitemap.

The draft **"Sample article (not published) showing every block"** shows
every block in use. Open it to see how they work; leave it as a draft.

### Blocks

| Block | What it does |
| :-- | :-- |
| Graphic | One of the site's ready-made vector or motion graphics: growth engine, channel hub, process, the four capability drawings, the seven industry scenes, packages, network, With vs Without, the mark, wave texture, the 3D dot landscape. |
| Steps flow | 2–6 steps you name, joined by a moving dotted line. |
| Funnel | 2–6 stages with your numbers; the step-to-step percentage is worked out for you. |
| Bar chart | 2–10 bars with your numbers and an optional unit. |
| Key figure | One number, what it measures, and its source (required). |
| Callout | A note, key takeaway or warning around normal text. |
| Pull quote | A line from the article, set large. |

All the motion stops offscreen, when the tab is hidden, for visitors who
prefer reduced motion, and with the footer's Motion switch off.

**Numbers:** only publish figures you can stand behind, and name the source.
The site's rule is no invented statistics, testimonials or results.

### Notes

- A future publish date does not schedule anything: an article appears when
  it is saved as Published. To publish on a set day, save it as Published
  that day.
- Unpublishing: set Status back to Draft and save. The page returns 404
  after the rebuild.
- Deleting: the bin icon in the editor. Uploaded images are deleted with it.

## Our Work (hidden)

`/our-work` and `/our-work/<slug>` are built but **hidden**: they return 404,
are not in the sitemap, and are not linked anywhere (brief §15, item 10).

- Write case studies in `/keystatic` → **Our Work (hidden page)**. Only ones
  with **Published** ticked are shown, and only with the client's
  permission and results you can verify.
- To preview on a Vercel preview deployment: add `OUR_WORK_PREVIEW` = `1`
  for **Preview** only, and redeploy.
- To launch: set `visible: true` in `src/content/work.ts` and add an
  "Our work" link to `navV3.links` in `src/content/site.ts`.
