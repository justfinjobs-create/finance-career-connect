# Correct JUSTFIN logo and CV uploads for Vercel

## Changes
- Replace the Lovable-hosted logo pointer with a real bundled image so the navigation, footer, and sign-in page render correctly on Vercel.
- Change CV handling from a large base64 form request to a direct private-storage upload, then submit only the secure file reference and application details.
- Preserve PDF/DOC/DOCX validation, the 5MB limit, private storage, database saving, and email delivery with the CV attached to the linked recruitment mailbox.
- Show clear upload/submission progress and actionable errors, including on mobile.

## Validation
- Test the application flow with a valid CV in a phone-sized browser.
- Confirm the application is saved and its email-delivery status is successful, then remove test data.
- Confirm the current build has no errors and the bundled logo loads without a Lovable-only URL.

## GitHub and Vercel
- Keep the code ready for the repository’s `main` branch. This workspace is currently on a Lovable edit branch and its configured remote is Lovable’s managed repository, not the external GitHub repository; no direct GitHub `main` push is available from this checkout.
- After validation, merge/apply this change to `main` through the project’s GitHub sync workflow; Vercel will deploy from `main` according to its existing configuration.
