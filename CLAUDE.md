# Cullinan Jewellery — Shopify theme

## The business

Cullinan Jewellery (Бижутерия Кулинан) — handmade 14K gold jewellery, made in a family
atelier in Veliko Tarnovo, Bulgaria, trading since 1991. There is a physical shop at
бул. Васил Левски 21. Roughly 4,000 designs exist; only a curated ~50 will go online first.

- Customers: mostly Bulgarian women aged 30–55, buying for themselves or as gifts.
  Local and regional first, wider Bulgaria second.
- Instagram: @cullinan_jewellery.bg
- Store currency: EUR. Customer-facing language: Bulgarian.
- The old site (studio-cullinan.com, Zen Cart) is being replaced by this Shopify store.

## What this repository is

A fork of Shopify's **Dawn 16** theme, connected to the Shopify store through the GitHub
integration. **Pushing to `main` updates the theme in Shopify automatically.**

The theme is currently **unpublished (draft)** and the store is private. Do not publish
the theme or launch the store — that is the owner's decision, not an implementation step.

## Design direction

The reference the owner chose is **moonmagic.com** — light, quiet, generous with space.
Not a copy of that site; the same qualities, applied to a Bulgarian goldsmith.

Rules that matter here:

- **Nothing is written on top of an image.** No logo, no slogan, no badges, no "СРЕБРО 925".
  Facts belong in the caption or the product description. This is the single most important
  rule on the project — the owner's previous marketing broke it constantly.
- **Restraint reads as expensive.** Empty space is the main luxury signal. When in doubt,
  remove rather than add.
- **Gold comes from the photographs, not the interface.** The gold accent is muted and used
  sparingly (badges, small accents). Never gold gradients, never gold text on black.
- **No pure white or pure black.** Both read cheap on screen.
- Product photography should be worn on real people where possible — jewellery is impossible
  to judge for scale on a white background.

## Design tokens (set in `config/settings_data.json`)

| Scheme | Background | Text | Use |
|---|---|---|---|
| scheme-1 | `#FCFCFB` warm off-white | `#221F1C` | Default. Page ground, product cards. |
| scheme-2 | `#F2F0EC` soft stone | `#221F1C` | Alternating sections. |
| scheme-3 | `#221F1C` warm near-black | `#F5F2EE` | Footer, dramatic bands. |
| scheme-4 | `#8C6A2E` deep muted gold | `#FFFFFF` | Badges and accents only. |
| scheme-5 | `#E7E1D6` warm sand | `#221F1C` | Feature blocks. |

- Type: **Jost** for headings and body. Heading scale 95 (deliberately restrained).
- Page width 1400. Grid spacing 24 horizontal / 48 vertical — the generous gaps are
  intentional and should not be tightened.
- Square corners throughout (buttons, badges, variant pills, cards). No rounded pills.
- No borders around media. Product cards sit on the page ground, not in grey boxes.

## Working agreements

- Customer-facing copy is written in **Bulgarian**. Code, comments and commit messages
  in English.
- Product titles are descriptive, never catalogue codes. Old codes (e.g. `3353`) belong in
  the SKU field, not the title.
- Ask before publishing the theme, changing the store's currency, or touching anything that
  affects checkout or payments.
- Legal pages, tax and company details are being handled with an accountant. Do not invent
  legal text and present it as ready to use.

## Current state

- Design foundation applied (palette, type, spacing). Committed and live on the draft theme.
- Homepage is still **Dawn's placeholder content** — mountains illustration, "Welcome to our
  store", demo t-shirt products. All of it is to be replaced.
- **No real products yet. No photography yet.** The homepage cannot be finished until the
  atelier photo session happens.
- Bulgarian needs setting as the store's default language (currently English).
- Check that Jost renders Cyrillic correctly; if it falls back, swap the font.
