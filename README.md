# Root & Route Shopify Theme Framework

This repository is a Shopify Online Store 2.0 theme framework for Root & Route Creations Inc.

## Brand Source

The visual system comes from `Rooted Brand Sheet (standalone).html`:

- Paper: `#FAFAF8`
- Ink: `#141414`
- Forest: `#2F5E3A`
- Sage: `#93A487`
- Stone: `#DAD9D3`
- Headlines: Cormorant Garamond
- Body and labels: Jost
- Motif: Root & Route leaf mark and repeated leaf texture
- Positioning: "Uncovering the roots. Creating the routes."

## Site Structure

- Homepage: brand proposition, curated collections, portfolio, collaborative journey, client proof
- Portfolio: product display as editorial/art photography
- About: manifesto and material selection philosophy
- Services: material innovation, structural engineering, global supply alignment
- Process: vertical collaborative journey timeline with scroll fade-in
- Contact: guided B2B inquiry form
- Collection/Product: basic commerce-ready templates for future Shopify products

## Shopify Setup

1. Create a GitHub repository for this folder.
2. Push the theme files to GitHub.
3. In Shopify, go to **Online Store > Themes > Add theme > Connect from GitHub**.
4. Select the repository and branch.
5. In the Shopify theme editor, create pages and assign templates:
   - `about` -> `page.about`
   - `services` -> `page.services`
   - `process` -> `page.process`
   - `portfolio` -> `page.portfolio`
   - `contact` -> `page.contact`
6. Upload real packaging photography through each section's image picker.

## Notes

The theme is intentionally section-first rather than Webflow-derived. The old Webflow export can remain as reference, but the live Shopify build should use the Liquid, JSON, CSS, and JS files in this framework.
