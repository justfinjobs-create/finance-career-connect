# JUSTFIN Financial Careers Platform

## Goal
Build a premium, responsive financial-careers marketplace using the uploaded gold “J” mark, with frictionless public job discovery and applications, plus a separately protected recruiter workspace.

## Public experience
- Replace the placeholder home page with a polished midnight-navy, ivory, gold, and emerald visual system.
- Use the uploaded logo in the navigation, footer, and a derived browser icon; pair it with a geometric JUSTFIN wordmark.
- Build the requested navigation, dramatic finance-careers introduction, trust cards, job search, featured sample opportunities, industry categories, career categories, four-step process, editorial resources, institutional About section, company reference cards, legal disclaimer, and footer.
- Keep all institution references text-only and clearly state that JUSTFIN is independent and unaffiliated.
- Use subtle data-grid, network, candlestick, line-motion, and floating job-card visuals without fabricated financial results or unverified statistics.
- Ensure the full experience adapts cleanly to desktop, tablet, and mobile, with visible application actions and restrained motion that respects reduced-motion settings.

## Jobs and application flow
- Create realistic records under clearly labeled “Sample opportunity” status; do not identify them as live roles from real institutions or publish JobPosting schema for them.
- Add working search and filters for category, workplace type, country, employment type, experience, and salary disclosure.
- Open a detailed opportunity view with responsibilities, requirements, preferred qualifications, deadline status, and a clear application action.
- Build a no-account application form with every requested field, mobile-friendly resume upload, consent confirmation, client and server validation, and a polished success state/page.
- Restrict resumes to approved document types and size, store them privately, validate metadata and content signatures, sanitize text inputs, add bot traps/challenge handling, and enforce server-side submission limits.

## Secure backend and recruiter email
- Use Lovable Cloud for private resume storage and application records.
- Store application status, recruiter notes, archive state, timestamps, and job linkage with locked-down access rules.
- Connect the workspace Gmail account selected by the user and send each application to the private `RECRUITER_EMAIL` address with the requested subject/body and resume attachment.
- Keep Gmail credentials and the recruiter address server-side only; request the recruiter address through the secure secret form during implementation.
- Make submission resilient: save the application first, record email delivery outcome, and show candidates an accurate result without exposing internal errors.

## Recruiter workspace
- Add a separate recruiter sign-in and protected administration area; public candidates never see or need authentication.
- Use server-verified recruiter roles stored separately from user profiles, with no client-side role trust or self-promotion path.
- Provide application search, job filtering, detail review, private resume download, status updates, recruiter notes, and archiving.
- Include clear empty, loading, error, and access-denied states.

## Metadata and legal pages
- Add unique search/social metadata for every page, using JUSTFIN-specific titles and descriptions.
- Add Organization and breadcrumb structured data where appropriate; omit JobPosting markup until genuine active vacancies exist.
- Create Privacy Policy, Terms of Use, Cookie Policy, and Applicant Privacy Notice pages aligned with the application data flow.

## Validation
- Verify public browsing, filters, opportunity details, validation failures, resume restrictions, successful application submission, Gmail delivery handling, recruiter access protection, and recruiter actions.
- Check visual layout and interaction at desktop and mobile sizes, including motion preferences and keyboard accessibility.
- Run focused security checks on access rules, private documents, server validation, and dependency risks.

## Setup note
Lovable Cloud is now enabled for secure database, private file storage, authentication, and server-side functions. Gmail linking and the private recruiter email value will require short secure setup prompts during implementation.
