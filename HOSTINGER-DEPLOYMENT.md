# Hostinger deployment checklist

This is a static website. It does not need Node.js, a database, or a build command.

1. In Hostinger hPanel, open **Websites** and select the domain.
2. Open **File Manager** and enter `public_html`.
3. Upload the contents of this folder into `public_html`. `index.html` must sit directly inside `public_html`.
4. Enable SSL in hPanel and verify the site at `https://your-domain/`.
5. In Google Sheets, set the catalogue sheet to **Anyone with the link — Viewer**. The site fetches products directly from the Sheet.

## Before launch

- Test the home page, product listing, product detail, cart, contact form, WhatsApp, phone, and email links on a phone.
- If the live domain is not `acpindustrial.com`, replace that domain in `robots.txt`, `sitemap.xml`, and HTML canonical URLs.
- Test a new product row in the Google Sheet and refresh the website to confirm it appears.

## Updates after launch

- Product catalogue changes: edit the Google Sheet and refresh the site.
- Website code or images: upload the changed files to the same path in `public_html`.
