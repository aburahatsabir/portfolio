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

# ANALYSIS 2: NAME CONSISTENCY
print("\n" + "="*100)
print("ANALYSIS 1: NAME VARIATIONS ACROSS DOCUMENTS")
print("="*100 + "\n")

name_issues = {}

# Father's name variations
print("FATHER'S NAME (Rokib vs Rakib):\n")
for doc_name, content in documents.items():
    if not content:
        continue
    rokib = len(re.findall(r'Rokib', content, re.IGNORECASE))
    rakib = len(re.findall(r'Rakib', content, re.IGNORECASE))
    if rokib > 0 or rakib > 0:
        print(f"  {doc_name}: Rokib={rokib}x, Rakib={rakib}x", end="")
        if rokib > 0 and rakib > 0:
            print(" [CONFLICT!]")
            name_issues[doc_name] = "Father's name spelled both ways"
        else:
            print()

# Rahman vs Rhman
print("\n\nMOHIBUR RAHMAN SPELLING (Rahman vs Rhman):\n")
for doc_name, content in documents.items():
    if not content:
        continue
    rahman = len(re.findall(r'Mohibur\s+Rahman', content, re.IGNORECASE))
    rhman = len(re.findall(r'Mohibur\s+Rhman', content, re.IGNORECASE))
    if rahman > 0 or rhman > 0:
        print(f"  {doc_name}: Rahman={rahman}x, Rhman={rhman}x", end="")
        if rhman > 0:
            print(" [SPELLING ERROR!]")
            if doc_name not in name_issues:
                name_issues[doc_name] = []
            if isinstance(name_issues.get(doc_name), str):
                name_issues[doc_name] = [name_issues[doc_name], "Missing 'a' in Rahman"]
            else:
                name_issues[doc_name].append("Missing 'a' in Rahman")
        else:
            print()

# ANALYSIS 3: ADDRESS CONSISTENCY
print("\n\n" + "="*100)
print("ANALYSIS 2: ADDRESS CONSISTENCY")
print("="*100 + "\n")

address_issues = {}
print("ADDRESS VARIANTS FOUND:\n")

for doc_name, content in documents.items():
    if not content:
        continue
    shoforpur = len(re.findall(r'Shoforpur', content, re.IGNORECASE))
    safarpur = len(re.findall(r'Safarpur', content, re.IGNORECASE))
    dakshinbagh = len(re.findall(r'Dakshinba[gh]', content, re.IGNORECASE))
    
    if shoforpur > 0 or safarpur > 0:
        print(f"  {doc_name}: Shoforpur={shoforpur}x, Safarpur={safarpur}x, Dakshinbagh={dakshinbagh}x", end="")
        if shoforpur > 0 and safarpur > 0:
            print(" [MISMATCH!]")
            address_issues[doc_name] = "Uses both Shoforpur and Safarpur"
        elif shoforpur > 0:
            print(" [Shoforpur]")
        elif safarpur > 0:
            print(" [Safarpur]")
        else:
            print()

# ANALYSIS 4: ACCOUNT NUMBERS
print("\n\n" + "="*100)
print("ANALYSIS 3: ACCOUNT NUMBERS AND FINANCIAL")
print("="*100 + "\n")

account_pattern = r'\b2810101017974\b|\b28101010179747\b|\b2810104003203\b'

print("ACCOUNT NUMBERS FOUND:\n")
account_issues = {}

for doc_name, content in documents.items():
    if not content:
        continue
    accounts = re.findall(account_pattern, content)
    if accounts:
        unique_accounts = set(accounts)
        print(f"  {doc_name}:")
        for acc in sorted(unique_accounts):
            count = accounts.count(acc)
            print(f"    • {acc} ({count}x)")
            if len(acc) != len(list(unique_accounts)[0]) and len(unique_accounts) > 1:
                account_issues[doc_name] = "Different account number formats"

# ANALYSIS 5: BUSINESS TYPE
print("\n\n" + "="*100)
print("ANALYSIS 4: BUSINESS TYPE & TRANSACTIONS")
print("="*100 + "\n")

business_issues = {}

business_keywords = {
    'Construction': ['hardware', 'cement', 'rod', 'steel', 'construction'],
    'Jewelry': ['jewel', 'gold', 'silver', 'ring', 'chain'],
    'Trading': ['traders', 'trade'],
    'Building': ['building', 'plaza', 'storey'],
}

print("BUSINESS TYPE BY DOCUMENT:\n")

for doc_name, content in documents.items():
    if not content:
        continue
    found_types = {}
    
    for biz_type, keywords in business_keywords.items():
        count = 0
        for keyword in keywords:
            count += content.lower().count(keyword.lower())
        if count > 0:
            found_types[biz_type] = count
    
    if found_types:
        print(f"  {doc_name}:")
        for biz_type, count in sorted(found_types.items(), key=lambda x: x[1], reverse=True):
            print(f"    • {biz_type}: {count} mentions")
        
        # Check for mismatch
        if 'Construction' in found_types and 'Jewelry' in found_types:
            business_issues[doc_name] = "Contains BOTH construction AND jewelry keywords!"

# ANALYSIS 6: SPELLING ERRORS
print("\n\n" + "="*100)
print("ANALYSIS 5: SPELLING ERRORS & TYPOS")
print("="*100 + "\n")

spelling_issues = {}

typo_patterns = [
    (r'my soon\b', "Should be: 'my son'"),
    (r'bo\s*okings', "Should be: 'bookings'"),
    (r'Rhman\b', "Should be: 'Rahman'"),
    (r'TAIKEN TAHT', "Should be: 'Taken that'"),
    (r'THE HAS FOUND', "Grammatically wrong"),
]

print("TYPOS FOUND:\n")

for doc_name, content in documents.items():
    if not content:
        continue
    doc_issues = []
    
    for pattern, correction in typo_patterns:
        matches = re.findall(pattern, content, re.IGNORECASE)
        if matches:
            for match in set(matches):
                doc_issues.append(f"'{match}' -> {correction}")
    
    if doc_issues:
        print(f"  {doc_name}:")
        for issue in doc_issues:
            print(f"    X {issue}")
        spelling_issues[doc_name] = doc_issues

# ANALYSIS 7: DATE ISSUES
print("\n\n" + "="*100)
print("ANALYSIS 6: DATE ISSUES")
print("="*100 + "\n")

date_issues = {}

print("KEY DATES BY DOCUMENT:\n")

# Check for specific travel dates
travel_dates = {
    'February 15-28': r'15\s+February\s+2026|15-02-2026|15/02/2026|28\s+February\s+2026|28-02-2026',
    'January 21': r'21[\.\-/]01[\.\-/]2026|21\s+January\s+2026',
    'March': r'\bMarch\s+2026|\bMarch\b',
    'Eid': r'\bEid\b|\bRamadan\b',
}

for doc_name, content in documents.items():
    if not content:
        continue
    print(f"  {doc_name}:")
    doc_date_issues = []
    
    for date_type, pattern in travel_dates.items():
        if re.search(pattern, content, re.IGNORECASE):
            print(f"    • {date_type}: YES")
            doc_date_issues.append(date_type)
    
    if doc_date_issues:
        date_issues[doc_name] = doc_date_issues

# ANALYSIS 8: CRITICAL CROSS-DOCUMENT CONFLICTS
print("\n\n" + "="*100)
print("ANALYSIS 7: CRITICAL CROSS-DOCUMENT CONFLICTS")
print("="*100 + "\n")

print("POTENTIAL CONTRADICTIONS BETWEEN DOCUMENTS:\n")

conflicts = []

# Conflict 1: Travel dates
if 'Travel Itinerary' in documents and 'Valuation & Affidavit' in documents:
    itinerary_text = documents['Travel Itinerary'].lower()
    affidavit_text = documents['Valuation & Affidavit'].lower()
    
    has_feb = 'february' in itinerary_text or '15 february 2026' in itinerary_text
    has_eid = 'eid' in affidavit_text or 'ramadan' in affidavit_text
    has_march_in_affidavit = 'march' in affidavit_text
    
    if has_feb and has_eid and not has_march_in_affidavit:
        conflicts.append((1, "TRAVEL DATE CONFLICT", 
                         "Affidavit says 'Eid vacation' but Itinerary says Feb 15-28, 2026",
                         "Eid 2026 is March 30-31, NOT February"))

# Conflict 2: Business type
if 'Business License' in documents and 'Binder1 (Bank Docs)' in documents:
    license_text = documents['Business License'].lower()
    bank_text = documents['Binder1 (Bank Docs)'].lower()
    
    has_construction = 'hardware' in license_text or 'cement' in license_text or 'steel' in license_text
    has_jewelry = 'gold' in bank_text or 'silver' in bank_text or 'ring' in bank_text or 'chain' in bank_text
    
    if has_construction and has_jewelry:
        conflicts.append((2, "BUSINESS TYPE MISMATCH",
                         "License: Construction/Hardware. Bank Statements: Jewelry transactions",
                         "These are DIFFERENT business types - fraud indicator!"))

# Conflict 3: Father's name
if 'Rokib' in str(documents) and 'Rakib' in str(documents):
    conflicts.append((3, "FATHER'S NAME INCONSISTENCY",
                     "Father listed as both 'Rokib Ali' and 'Rakib Ali'",
                     "Should be ONE consistent spelling"))

# Conflict 4: Address
if 'Shoforpur' in str(documents) and 'Safarpur' in str(documents):
    conflicts.append((4, "ADDRESS INCONSISTENCY",
                     "Application uses both 'Shoforpur' and 'Safarpur'",
                     "These appear to be DIFFERENT villages"))

# Conflict 5: Account numbers
if '2810101017974' in str(documents) and '28101010179747' in str(documents):
    conflicts.append((5, "ACCOUNT NUMBER MISMATCH",
                     "Certificate: 2810101017974 (12 digits) vs Statement: 28101010179747 (14 digits)",
                     "Cannot be same account with different numbers"))

# Conflict 6: Future/Outdated dates
if '21.01.2026' in str(documents) or '21-01-2026' in str(documents):
    conflicts.append((6, "OUTDATED VALUATION DATE",
                     "Affidavit dated 21-01-2026 (3 days ago, now 24-01-2026)",
                     "Exchange rates and calculations may be outdated"))

for num, conflict, desc, impact in sorted(conflicts):
    print(f"{num}. {conflict}")
    print(f"   Issue: {desc}")
    print(f"   Impact: {impact}\n")

# ANALYSIS 9: SUMMARY
print("\n" + "="*100)
print("ANALYSIS 8: ISSUE SUMMARY")
print("="*100 + "\n")

all_issues = {
    'Name Issues': name_issues,
    'Address Issues': address_issues,
    'Account Issues': account_issues,
    'Business Issues': business_issues,
    'Spelling Issues': spelling_issues,
    'Cross-Document Conflicts': {f"Conflict {i}": f"{c[1]}" for i, c in enumerate(conflicts, 1)}
}

print("TOTAL ISSUES FOUND BY CATEGORY:\n")
for category, issues_dict in all_issues.items():
    if issues_dict:
        print(f"{category}: {len(issues_dict)} documents with issues")

print("\n" + "="*100)
print("CROSS-DOCUMENT ANALYSIS COMPLETE")
print("="*100 + "\n")
