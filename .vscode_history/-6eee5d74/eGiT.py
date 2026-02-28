import re
import os

print("\n" + "="*100)
print("COMPREHENSIVE CROSS-DOCUMENT ANALYSIS")
print("="*100 + "\n")

# Read all extracted files
extracted_files = {
    'Bank Statement - Personal': 'EXTRACTED_Bank Statement - Personal.txt',
    'Binder1 (Bank Docs)': 'EXTRACTED_Binder1.txt',
    'Business License': 'EXTRACTED_Business Licence.txt',
    'Travel Itinerary': 'EXTRACTED_Travel Itinerary.txt',
    'Valuation & Affidavit': 'EXTRACTED_Valuation and self affidavit .txt',
    'Personal Information': 'EXTRACTED_Personal Information.txt',
    'Tax Document': 'EXTRACTED_Tax Document.txt',
    'NID': 'EXTRACTED_NID.txt',
    'All': 'EXTRACTED_all.txt',
}

documents = {}
for name, filepath in extracted_files.items():
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            documents[name] = f.read()
    except:
        documents[name] = ""

# ANALYSIS 1: DATE CONSISTENCY
print("\n" + "="*100)
print("ANALYSIS 1: DATE CONSISTENCY ACROSS DOCUMENTS")
print("="*100 + "\n")

dates_found = {}
date_patterns = [
    (r'\d{1,2}[-/\.]\d{1,2}[-/\.]\d{4}', 'DD-MM-YYYY format'),
    (r'\d{4}[-/\.]\d{1,2}[-/\.]\d{1,2}', 'YYYY-MM-DD format'),
    (r'\d{1,2}\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}', 'Word format'),
]

for doc_name, content in documents.items():
    if not content:
        continue
    print(f"\n📄 {doc_name}:")
    found_dates = set()
    for pattern, desc in date_patterns:
        matches = re.findall(pattern, content, re.IGNORECASE)
        if matches:
            unique_dates = set(matches)
            for date in sorted(unique_dates):
                print(f"   • {date}")
                found_dates.add(date)
    dates_found[doc_name] = found_dates

# ANALYSIS 2: NAME CONSISTENCY
print("\n\n" + "="*100)
print("ANALYSIS 2: NAME VARIATIONS ACROSS DOCUMENTS")
print("="*100 + "\n")

names_to_check = [
    ('Rahman spelling', [r'Md[\. ]*Mohibur[\. ]*Ra[hm]+an', r'Md[\. ]*Mohibur[\. ]*Rhman']),
    ('Tahmidur spelling', [r'Tahmidur[\. ]*Rahman']),
    ('Father name', [r'Rokib[\. ]*Ali', r'Rakib[\. ]*Ali']),
]

for name_type, patterns in names_to_check:
    print(f"\n📝 {name_type}:")
    for doc_name, content in documents.items():
        if not content:
            continue
        for pattern in patterns:
            matches = re.findall(pattern, content, re.IGNORECASE)
            if matches:
                unique = set(matches)
                for match in sorted(unique):
                    print(f"   {doc_name}: '{match}'")

# ANALYSIS 3: ADDRESS CONSISTENCY
print("\n\n" + "="*100)
print("ANALYSIS 3: ADDRESS CONSISTENCY")
print("="*100 + "\n")

address_keywords = ['Shoforpur', 'Safarpur', 'Barlekha', 'Dakshinbagh', 'Moulvibazar', 'Dakkhin Bhag']

for doc_name, content in documents.items():
    if not content:
        continue
    print(f"\n📍 {doc_name}:")
    for keyword in address_keywords:
        if keyword.lower() in content.lower():
            # Find the context
            pattern = f'.{{0,50}}{keyword}.{{0,50}}'
            matches = re.findall(pattern, content, re.IGNORECASE)
            if matches:
                unique_matches = list(set(matches))[:2]
                for match in unique_matches:
                    print(f"   • Found: ...{match.strip()}...")

# ANALYSIS 4: FINANCIAL AMOUNTS
print("\n\n" + "="*100)
print("ANALYSIS 4: FINANCIAL AMOUNTS AND ACCOUNT NUMBERS")
print("="*100 + "\n")

# Account numbers
account_patterns = [
    (r'\b\d{12,14}\b', 'Account number'),
    (r'(\d+,\d+,\d+\.\d+)|(\d+\.\d+)', 'Large amounts'),
    (r'(?:AUD|BDT)[\$]?\s*[\d,]+', 'Currency amounts'),
]

print("\nAccount/Reference Numbers Found:")
for doc_name, content in documents.items():
    if not content:
        continue
    # Look for account numbers (common pattern: 12-14 digits)
    accounts = re.findall(r'\b\d{10,14}\b', content)
    if accounts:
        unique_accounts = set(accounts)
        print(f"\n{doc_name}:")
        for acc in sorted(unique_accounts):
            print(f"   • {acc}")

# ANALYSIS 5: BUSINESS TYPE
print("\n\n" + "="*100)
print("ANALYSIS 5: BUSINESS TYPE AND TRANSACTIONS")
print("="*100 + "\n")

business_keywords = {
    'Construction': ['hardware', 'cement', 'rod', 'steel', 'construction', 'builder'],
    'Jewelry': ['jewel', 'gold', 'silver', 'ring', 'chain', 'ornament'],
    'Trading': ['traders', 'trade', 'merchant'],
    'Building/Property': ['building', 'plaza', 'mohibur plaza', 'storey'],
}

for doc_name, content in documents.items():
    if not content:
        continue
    found_types = set()
    print(f"\n{doc_name}:")
    for biz_type, keywords in business_keywords.items():
        for keyword in keywords:
            if keyword.lower() in content.lower():
                found_types.add(biz_type)
                # Count occurrences
                count = content.lower().count(keyword.lower())
                if count > 0:
                    print(f"   • {biz_type}: '{keyword}' ({count} times)")

# ANALYSIS 6: SPELLING ERRORS AND TYPOS
print("\n\n" + "="*100)
print("ANALYSIS 6: SPELLING ERRORS AND TYPOS")
print("="*100 + "\n")

typo_patterns = [
    (r'my soon', 'Should be: my son'),
    (r'TAIKEN TAHT', 'Should be: Taken that'),
    (r'THE HAS FOUND', 'Should be: That he has found'),
    (r'Rhman', 'Should be: Rahman'),
    (r'bo okings', 'Should be: bookings'),
    (r'vi\s*$', 'Incomplete word at line end'),
]

print("Potential spelling/typo errors found:\n")
for doc_name, content in documents.items():
    if not content:
        continue
    found_errors = False
    for pattern, correction in typo_patterns:
        matches = re.findall(pattern, content, re.IGNORECASE)
        if matches:
            if not found_errors:
                print(f"\n{doc_name}:")
                found_errors = True
            for match in set(matches):
                print(f"   ⚠️  '{match}' → {correction}")

# ANALYSIS 7: TRAVEL PURPOSE AND DATES
print("\n\n" + "="*100)
print("ANALYSIS 7: TRAVEL PURPOSE AND DATES")
print("="*100 + "\n")

travel_keywords = {
    'Eid': ['eid', 'ramadan', 'islamic'],
    'Tourism': ['tourism', 'tourist', 'cultural', 'exploration', 'sightseeing'],
    'Feb': ['february', 'feb', '15 february', '28 february'],
    'March': ['march', 'mar '],
}

for doc_name, content in documents.items():
    if not content:
        continue
    print(f"\n{doc_name}:")
    for purpose, keywords in travel_keywords.items():
        for keyword in keywords:
            if keyword.lower() in content.lower():
                print(f"   • {purpose}: Found '{keyword}'")

# ANALYSIS 8: CRITICAL INCONSISTENCIES SUMMARY
print("\n\n" + "="*100)
print("ANALYSIS 8: CRITICAL INCONSISTENCIES SUMMARY")
print("="*100 + "\n")

# Check for contradictions
print("⚠️  POTENTIAL CONTRADICTIONS:\n")

contradictions = [
    ("Travel Date Mismatch", 
     "Affidavit says 'Eid vacation' (March) but Itinerary says Feb 15-28"),
    ("Business Type Mismatch", 
     "Trade License: Construction/Hardware vs Bank Statement: Jewelry transactions"),
    ("Address Mismatch", 
     "Some docs say 'Shoforpur' others say 'Safarpur'"),
    ("Name Spelling Inconsistency", 
     "Father: 'Mohibur Rahman' vs 'Mohibur Rhman' (missing 'a')"),
]

for i, (issue, description) in enumerate(contradictions, 1):
    print(f"{i}. {issue}")
    print(f"   {description}\n")

print("\n" + "="*100)
print("CROSS-DOCUMENT ANALYSIS COMPLETE")
print("="*100 + "\n")
