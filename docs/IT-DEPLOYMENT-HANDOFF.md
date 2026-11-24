# UCR Website — IT Deployment Handoff

This document explains what UCR’s IT team needs to provide so the website can be deployed on **UCR-owned accounts** instead of the current temporary setup.

---

## Current architecture (summary)

The website uses **two separate systems**:

| Layer | What it is | Current approach |
|---|---|---|
| **Frontend (website)** | Next.js app (pages, UI, contact form, caching) | Deployed on **Vercel** |
| **CMS (content)** | WordPress (blogs + products via GraphQL) | Hosted WordPress with WPGraphQL + ACF |

Content editors update blogs/products in WordPress. The live website reads that content over GraphQL. When content is published/updated, WordPress calls a small API on the frontend so the live site refreshes **without a full redeploy**.

```
Editors → WordPress CMS → GraphQL
                              ↓
Visitors ← Next.js site on Vercel ← (revalidate webhook on publish)
```

Until **both** accounts/environments belong to UCR, we cannot fully hand over ownership of production.

---

## What IT needs to provide

### 1. Frontend hosting account

**Preferred:** a **Vercel** account under UCR (team/org), with access for the development team to connect the Git repository and configure environment variables.

**Also acceptable** (same Next.js app can be deployed there with the right setup):

- Netlify
- AWS (e.g. Amplify, or container/ECS + Node hosting suitable for Next.js)
- Other Node-capable hosts that support Next.js App Router

**Minimum needed from IT for frontend:**

- Account ownership under UCR
- Ability to connect the project Git repo
- Ability to set environment variables
- Production domain / DNS control (or coordination with whoever manages DNS)
- HTTPS enabled for the production URL

---

### 2. WordPress CMS account / hosting

The CMS is **WordPress**. UCR needs a WordPress environment they own (or control), with the same type of setup we use today.

**Minimum needed from IT for CMS:**

- WordPress hosting (or a WP install on UCR infrastructure)
- Admin access for initial setup
- Ability to install plugins
- Public HTTPS URL for the WordPress site
- GraphQL endpoint available (typically `https://your-wp-domain/graphql`)

**Required WordPress capabilities / plugins (same pattern as current setup):**

- **WPGraphQL** — exposes content to the frontend
- **Advanced Custom Fields (ACF)** — product/post custom fields (ACF Pro if repeaters are needed later; current setup uses fields that work without Pro where possible)
- Custom post type for **Products** (e.g. via CPT UI), mapped correctly in GraphQL
- Native **Posts** for blogs/news
- Ability to add a small **Code Snippet** (or equivalent) that calls the frontend revalidate API when a post/product is saved

Content types today:

- **Blogs / News** → WordPress Posts  
- **Products** → Custom post type `product` + ACF product fields  

---

## Once both accounts are ready

After UCR provides:

1. Frontend hosting account (Vercel preferred), and  
2. WordPress CMS hosting/account  

…the development team can:

1. Deploy the Next.js codebase to UCR’s frontend account  
2. Point environment variables at UCR’s WordPress GraphQL URL  
3. Recreate / migrate the WordPress content structure (or migrate the existing WP site)  
4. Configure the publish webhook so CMS updates appear on the live site without redeploying  
5. Connect the production domain and hand over day-to-day ownership  

**Bottom line:** code and CMS integration are already built. Handover depends on **UCR-owned hosting for the frontend** and **UCR-owned WordPress for the CMS**.

---

## Environment variables (frontend)

These must be set on the frontend host (Vercel / Netlify / AWS equivalent):

| Variable | Purpose |
|---|---|
| `WORDPRESS_GRAPHQL_URL` | Full GraphQL URL, e.g. `https://cms.example.com/graphql` |
| `REVALIDATE_SECRET` | Long random secret shared with WordPress (used to authorize cache refresh) |

**Optional** (contact form email):

| Variable | Purpose |
|---|---|
| `SMTP_HOST` | SMTP server hostname |
| `SMTP_PORT` | Usually `465` |
| `SMTP_SECURE` | `true` for 465 |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password |
| `SMTP_FROM` | From address (optional; can fall back to `SMTP_USER`) |
| `SMTP_TO` | Inbox that receives contact form messages |

Generate `REVALIDATE_SECRET` with:

```bash
openssl rand -hex 32
```

Use the **same** value in:

- Frontend host environment variables  
- WordPress revalidate snippet  

---

## Content update flow (no redeploy for CMS edits)

1. Editor publishes/updates a post or product in WordPress.  
2. WordPress sends an authenticated `POST` to:  
   `https://<frontend-domain>/api/revalidate`  
3. Frontend refreshes cached pages/tags for blogs/products.  
4. Visitors see updated content without a full site redeploy.

This only works if:

- `REVALIDATE_SECRET` is set on the frontend, and  
- WordPress is configured to call that endpoint on save.

---

## Suggested checklist for IT

- [ ] UCR Vercel (or Netlify / AWS) account created and shared with the web team  
- [ ] Git repository access arranged for deployment  
- [ ] Production domain / DNS ownership confirmed  
- [ ] UCR WordPress hosting ready (HTTPS)  
- [ ] WPGraphQL + ACF (+ product CPT) installable  
- [ ] SMTP credentials available if contact form should send from UCR mail  
- [ ] Confirm who owns ongoing access (admins, billing, DNS)

---

## Notes / clarifications

- **Frontend hosting ≠ WordPress hosting.** Both are required.  
- Moving only the Vercel app without WordPress leaves the site without a CMS.  
- Moving only WordPress without redeploying the frontend leaves the live site pointed at the old CMS URL.  
- Vercel is the current production path and the least friction for this Next.js app; Netlify/AWS are fine if IT prefers them and supports Next.js correctly.  
- Do **not** store WordPress admin passwords in frontend environment variables. The site only needs the public GraphQL URL and the revalidate secret.

---

## Contact / next step

Please provide:

1. Confirmation of preferred frontend host (Vercel / Netlify / AWS) and account access  
2. WordPress hosting URL + admin access for setup  

Once both are available, deployment onto UCR systems can proceed.
