# Root & Route Shopify Theme

This branch uses **Cascade V3.1.0** as the Shopify base theme and layers the Root & Route brand direction on top.

## Brand Layer

The Root & Route styling lives in `assets/custom.css`, loaded from `layout/theme.liquid`.

Brand source:
- Paper: `#FAFAF8`
- Ink: `#141414`
- Forest: `#2F5E3A`
- Sage: `#93A487`
- Stone: `#DAD9D3`
- Typography: Cormorant Garamond for editorial headings, Jost for body and labels
- Motif: Root & Route leaf mark and repeated leaf texture

## Templates Added / Adjusted

- Homepage: `templates/index.json`
- About: `templates/page.about.json`
- Services: `templates/page.services.json`
- Process: `templates/page.process.json`
- Portfolio: `templates/page.portfolio.json`
- Contact / Inquiry: `templates/page.contact.json`

These templates use Cascade's `custom-liquid` section for Root & Route-specific brand storytelling while preserving Cascade's core theme architecture.

## Shopify Setup

After connecting the theme to Shopify, create pages and assign templates:

- `about` -> `page.about`
- `services` -> `page.services`
- `process` -> `page.process`
- `portfolio` -> `page.portfolio`
- `contact` -> `page.contact`

Upload final product and portfolio photography through Cascade sections or replace the branded placeholder surfaces in the custom-liquid sections.
