# Arcana Forge — Coming Soon

A standalone static website for mldyaf.com. Uses the supplied application screenshots with interactive desktop navigation and a mobile screen selector. No backend, database, or additional service is required.

## Preview

Open index.html directly, or serve this folder with any static web server. The current local preview is http://127.0.0.1:4173.

## Deploy using the existing MLDY infrastructure

1. Create a separate GitHub repository named arcana-forge-website under arcanaforgeapp-oss.
2. Upload the contents of this package to its main branch. Keep index.html at the repository root.
3. In the existing MLDY Vercel account, select Add New > Project and import that repository.
4. Name the Vercel project arcana-forge. Select framework Other, leave the build and install commands empty, and use the repository root as the output directory. The included vercel.json supplies the static project settings.
5. Deploy. Add mldyaf.com and www.mldyaf.com in the new project's Settings > Domains. Apply the exact DNS records Vercel provides at your existing domain registrar; do not change the mldylabs.com project's domain configuration.
6. Verify the deployment is Ready, HTTPS works on mldyaf.com, all 13 navigation screens load, and the mobile selector and enlarge control work on the deployed site.

Deployment was not performed from this chat because the connected Vercel deployment tool was unavailable. Production and DNS verification remain outstanding.

## Verified locally

- All 13 desktop navigation items display the correct image.
- All 13 mobile screen selections work at 390px and 320px widths.
- Responsive layouts at 1440px, 768px, 390px, and 320px; no page overflow.
- Image loading and absence of browser script errors.
- One-card/Celtic Cross reading preview switch.
- Keyboard arrow navigation, feature links, screen deep links, and preview enlargement.

The full application controls shown inside the screenshots are illustrative. Only preview navigation and the explicitly added preview controls are interactive.

The package contains production files only. Asset preparation and browser verification scripts remain alongside the source in the working folder, excluded from Vercel uploads.
