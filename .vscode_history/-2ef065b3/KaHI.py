import PyPDF2
import os
from pathlib import Path

# Get all PDF files in the current directory
pdf_files = [f for f in os.listdir('.') if f.endswith('.pdf')]

print(f"\n{'='*100}")
print(f"COMPREHENSIVE PDF EXTRACTION - ALL DOCUMENTS")
print(f"Total PDF files found: {len(pdf_files)}")
print(f"{'='*100}\n")

extracted_data = {}

for pdf_file in sorted(pdf_files):
    try:
        print(f"\n{'='*100}")
        print(f"FILE: {pdf_file}")
        print(f"{'='*100}")
        
        with open(pdf_file, 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            num_pages = len(reader.pages)
            print(f"TOTAL PAGES: {num_pages}\n")
            
            all_text = ""
            for i, page in enumerate(reader.pages):
                text = page.extract_text()
                if text:
                    all_text += f"\n{'='*80}\nPAGE {i+1}\n{'='*80}\n{text}"
            
            if all_text:
                # Save extracted text to file
                output_file = f"EXTRACTED_{pdf_file.replace('.pdf', '')}.txt"
                with open(output_file, 'w', encoding='utf-8') as out:
                    out.write(all_text)
                print(f"✓ Extracted and saved to: {output_file}")
                print(f"✓ Total characters: {len(all_text)}")
                extracted_data[pdf_file] = all_text
            else:
                print(f"⚠ No text found in this PDF (may be image-based)")
                
    except Exception as e:
        print(f"✗ Error processing {pdf_file}: {e}")

print(f"\n{'='*100}")
print(f"EXTRACTION COMPLETE")
print(f"Files processed: {len(extracted_data)}")
print(f"{'='*100}\n")
