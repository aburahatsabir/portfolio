import PyPDF2

files_to_check = [
    'Valuation and self affidavit .pdf',
    'Travel Itinerary.pdf',
    'Business Licence.pdf',
    'Tahmidur  Passport-03.pdf'
]

for file in files_to_check:
    try:
        with open(file, 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            print('\n' + '='*80)
            print(f'FILE: {file}')
            print(f'PAGES: {len(reader.pages)}')
            print('='*80)
            for i, page in enumerate(reader.pages[:3]):  # First 3 pages
                text = page.extract_text()
                print(f'\nPAGE {i+1}:')
                print(text[:1200] if text else "NO TEXT FOUND")
    except Exception as e:
        print(f'Error reading {file}: {e}')
