# ACP Website — Google Sheets Setup Guide

## Your Sheet ID
1J4tI-pDzK3F0IQuNlHhJsB9wItt1BFUFGGQeKSEAPsc

## Step 1 — Make Sheet Public
1. Open your Google Sheet
2. Click **Share** button (top right)
3. Click **"Change to anyone with the link"**
4. Make sure it says **"Viewer"**
5. Click **Done**

---

## Step 2 — Set Up Column Headers
In Row 1 of your sheet, type these exact headers
(one per cell, starting from A1):

| A  | B    | C      | D     | E      | F        | G       | H   | I    |
|----|------|--------|-------|--------|----------|---------|-----|------|
| id | name | partNo | brand | sector | category | imgType | img | desc |

---

## Step 3 — Add Products (Example Row)

| id     | name    | partNo       | brand          | sector                  | category          | imgType    | img | desc                          |
|--------|---------|--------------|----------------|-------------------------|-------------------|------------|-----|-------------------------------|
| IR-001 | IR Kit  | UP.5.30 1972 | Ingersoll Rand | Industrial Compressors  | Valve & Rebuild Kits | kit     |     | Rebuild kit for IR compressors |
| AC-001 | Oil Filter | 1613610500 | Atlas Copco  | Industrial Compressors  | Oil Filters       | oil-filter |     | Oil filter for Atlas Copco GA  |
| TN-001 | Rock Drill Kit | TN-RD-01 | Atlas Copco | Tunneling             | Rebuild Kits      | kit        |     | Seal kit for rock drills       |

---

## Column Guide

| Column   | What to put                                                    |
|----------|----------------------------------------------------------------|
| id       | Unique code e.g. IR-001, AC-002, TN-003                       |
| name     | Product name e.g. IR Kit, Oil Filter, Air Filter               |
| partNo   | Part number e.g. UP.5.30 1972, 1613610500                     |
| brand    | Brand name (see list below)                                    |
| sector   | Which sector (see list below)                                  |
| category | Which category (see list below)                                |
| imgType  | Icon type (see list below)                                     |
| img      | Google Drive image link (leave blank if no photo)              |
| desc     | Short description of the product                               |

---

## Allowed Values

### sector (copy exactly)
- Industrial Compressors
- Tunneling
- Mining
- Construction Equipment
- EOT Cranes

### category (copy exactly)
- Valve & Rebuild Kits
- Oil Filters
- Air Filters
- Oil Separators
- Valves
- Belts
- Bearing Kits
- Gasket Kits
- Engine Parts
- Hydraulic Parts
- Axle & Transmission
- Drifter Parts
- Mining Accessories

### imgType (copy exactly)
- kit
- oil-filter
- air-filter
- separator
- valve
- belt
- bearing
- gasket

### brand (copy exactly)
- Ingersoll Rand
- Atlas Copco
- ELGi
- Kaeser
- Chicago Pneumatic
- Deutz
- Cummins
- Rexroth
- Dana Spicer
- Generic OEM

---

## Step 4 — Add Product Photo (Optional)

1. Go to **drive.google.com**
2. Upload your product photo
3. Right click the photo → **Share** → **Anyone with the link** → Viewer → Copy link
4. The link looks like:
   `https://drive.google.com/file/d/FILEID/view`
5. Change it to:
   `https://drive.google.com/uc?export=view&id=FILEID`
6. Paste this in the **img** column of your sheet

---

## Step 5 — See Changes on Website

After adding/editing any row in the sheet:
- Just **refresh the website page**
- Products update automatically — no code changes needed!

---

## How Client Adds a New Product (Simple Steps)

1. Open Google Sheet
2. Scroll to the last row
3. Add a new row with product details
4. Copy the id pattern (IR-001, IR-002... → next is IR-003)
5. Fill all columns
6. Save (Ctrl+S)
7. Go to website and refresh — product appears!
