import os
import sys
from pathlib import Path

try:
    import PyPDF2
except ImportError:
    os.system(f"{sys.executable} -m pip install PyPDF2 -q")
    import PyPDF2

def extract_binder_pdf(pdf_path):
    """Extract comprehensive content from Binder1.pdf"""
    try:
        text = ""
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            print(f"Total pages in Binder1.pdf: {len(reader.pages)}\n")
            
            for page_num in range(len(reader.pages)):
                page = reader.pages[page_num]
                text += f"\n{'='*100}\n"
                text += f"PAGE {page_num + 1}\n"
                text += f"{'='*100}\n"
                text += page.extract_text()
        return text
    except Exception as e:
        return f"ERROR reading PDF: {str(e)}"

def main():
    pdf_path = Path("Binder1.pdf")
    
    if not pdf_path.exists():
        print("❌ ERROR: Binder1.pdf not found in current directory!")
        print(f"Current directory: {Path.cwd()}")
        print("\nSearching for Binder1.pdf...")
        
        search_results = list(Path(".").glob("**/Binder1.pdf"))
        if search_results:
            print(f"Found at: {search_results[0]}")
            pdf_path = search_results[0]
        else:
            print("Binder1.pdf not found anywhere!")
            return
    
    print("="*100)
    print("EXTRACTING BINDER1.PDF - COMPREHENSIVE ANALYSIS")
    print("="*100)
    
    content = extract_binder_pdf(pdf_path)
    
    # Save to file
    output_file = "BINDER1_EXTRACTED_CONTENT.txt"
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(content)
    
    print(f"\n✓ Content saved to: {output_file}")
    print("\nDISPLAYING EXTRACTED CONTENT:\n")
    print(content)

if __name__ == "__main__":
    main()
