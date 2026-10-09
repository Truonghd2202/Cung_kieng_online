# Seed data sources

## National intangible-heritage inventory

`dsvh-national-inventory.json` is a metadata extract from the Department of Cultural Heritage's official national inventory page:

- Source: https://dsvh.gov.vn/danh-muc-di-san-van-hoa-phi-vat-the-quoc-gia-1789
- Accessed: 2026-10-09
- Extracted records: 486, with source row number, inventory sequence, title, decision, type, and listed place retained where published.
- A few source rows omit a field; the seed preserves that omission instead of guessing.
- Seeded descriptions only restate these registry facts. They are not presented as full academic articles or as community-approved descriptions of practice. The `verified` flag applies to the listed metadata only; each record's disclaimer states this scope.

## Guanyin lot index

`ctc-guanyin-100.json` records the number, grade, and story title shown by the Chinese Temples Committee's Guanyin-lot search:

- Source: https://www.ctc.org.hk/chim-search/
- Accessed: 2026-10-09
- Coverage: all lot numbers 1–100.
- Only index metadata is stored; poems and modern explanations are not copied. Vietnamese interpretation remains marked unverified. This is the CTC's Hong Kong Guanyin-lot system, not a claim that one identical lot tradition belongs to all Vietnamese regions.

## Lunar cultural calendar

`verified-calendar-events.json` stores only dates stated by the cited source. Event ranges are retained in the description; the calendar record's date is the start day for annual display. This dataset does not convert dates from the Cham calendar into Vietnamese lunar dates.
