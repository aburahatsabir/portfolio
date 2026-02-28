#!/usr/bin/env python3
"""
Comprehensive Visa Officer Review of Binder1.pdf
Extract and analyze all documents for inconsistencies
"""

import PyPDF2
from pathlib import Path

def extract_full_binder():
    pdf_path = Path("Binder1.pdf")
    
    if not pdf_path.exists():
        print(f"❌ File not found: {pdf_path}")
        return ""
    
    full_text = ""
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            total_pages = len(reader.pages)
            
            print(f"📄 Extracting Binder1.pdf ({total_pages} pages)...\n")
            
            for page_num in range(total_pages):
                page = reader.pages[page_num]
                text = page.extract_text()
                
                full_text += f"\n{'='*100}\n"
                full_text += f"PAGE {page_num + 1} OF {total_pages}\n"
                full_text += f"{'='*100}\n"
                full_text += text
                
                if (page_num + 1) % 10 == 0:
                    print(f"  Processed {page_num + 1}/{total_pages} pages...")
        
        return full_text
    
    except Exception as e:
        print(f"❌ Error: {e}")
        return ""

def main():
    print("="*100)
    print("BINDER1.PDF - FULL EXTRACTION FOR VISA OFFICER REVIEW")
    print("="*100)
    print()
    
    content = extract_full_binder()
    
    if content:
        output_file = "BINDER1_FULL_EXTRACTED.txt"
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(content)
        
        print(f"\n✓ Extraction complete!")
        print(f"✓ Saved to: {output_file}")
        print(f"✓ Total size: {len(content)} characters")
        
        # Display preview
        print("\n" + "="*100)
        print("PREVIEW OF EXTRACTED CONTENT:")
        print("="*100)
        print(content[:3000])
        print("\n[... Full content saved to file ...]")
    else:
        print("❌ Failed to extract content")

if __name__ == "__main__":
    main()
