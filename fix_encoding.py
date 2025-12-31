#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Fix HTML entity encoding issues in the FMCG case study file."""

import os

# Read the corrupted file
file_path = r"d:\OneDrive - 55phcx\portfolio\case-studies\fmcg-erp-case-study.html"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace all the corrupted entities
replacements = {
    '&ldquo;': '"',
    '&rdquo;': '"',
    '&rsquo;': "'",
    '&mdash;': '—',
    '&ndash;': '–',
    '&lt;': '<',
    '&gt;': '>',
    'Ã‚Â·': '·',
    'Ã‚Â©': '©',
}

for old, new in replacements.items():
    content = content.replace(old, new)

# Write the fixed content back
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("File fixed successfully!")
