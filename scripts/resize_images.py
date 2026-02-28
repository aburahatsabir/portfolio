"""
Image resizer for portfolio project images
Resizes images to 4 standard sizes while maintaining aspect ratio
"""
from PIL import Image
import os

# Define responsive sizes based on code requirements
# These match the srcSet convention used in Work.tsx and CaseStudyPage.tsx
# Added 1920w for HiDPI/Retina screens (2x DPR)
SIZES = {
    '600w': 600,      # For mobile screens
    '900w': 900,      # For tablets
    '1140w': 1140,    # For desktops
    '1920w': 1920     # For HiDPI/Retina displays
}

# Source and destination paths
SOURCE_DIR = r'C:\Users\abura\portfolio\public\images\projects\New folder'
DEST_DIR = r'C:\Users\abura\portfolio\public\images\projects'

def resize_image(input_path, output_path, target_width):
    """
    Resize image to target width while maintaining aspect ratio
    """
    with Image.open(input_path) as img:
        # Calculate new height maintaining aspect ratio
        aspect_ratio = img.height / img.width
        new_height = int(target_width * aspect_ratio)
        
        # Resize with high-quality resampling
        resized = img.resize((target_width, new_height), Image.Resampling.LANCZOS)
        
        # Save as WebP with high quality to preserve sharpness
        # Using quality=95 to maintain clarity from high-res originals (5131×2800)
        resized.save(output_path, 'WEBP', quality=95, method=6)
        print(f"✓ Created: {os.path.basename(output_path)} ({target_width}x{new_height})")

def process_images():
    """
    Process all images in source directory
    """
    # Get all webp files from source directory
    image_files = [f for f in os.listdir(SOURCE_DIR) if f.endswith('.webp')]
    
    if not image_files:
        print("No WebP images found in source directory")
        return
    
    print(f"\nFound {len(image_files)} images to process\n")
    
    for image_file in image_files:
        # Get base name without extension
        base_name = os.path.splitext(image_file)[0]
        input_path = os.path.join(SOURCE_DIR, image_file)
        
        print(f"Processing: {image_file}")
        
        # Create each size variant
        for size_name, target_width in SIZES.items():
            # Naming: projectname-sizename.webp (e.g., fmcg-erp-thumbnail.webp)
            output_filename = f"{base_name}-{size_name}.webp"
            output_path = os.path.join(DEST_DIR, output_filename)
            
            resize_image(input_path, output_path, target_width)
        
        print()  # Empty line between images
    
    print(f"✓ Successfully processed {len(image_files)} images into {len(SIZES)} sizes each")
    print(f"  Total files created: {len(image_files) * len(SIZES)}")

if __name__ == "__main__":
    print("=" * 60)
    print("Portfolio Image Resizer")
    print("=" * 60)
    print(f"\nSource: {SOURCE_DIR}")
    print(f"Destination: {DEST_DIR}\n")
    print("Sizes:")
    for size_name, width in SIZES.items():
        print(f"  - {size_name}: {width}px width")
    print()
    
    process_images()
    
    print("\n" + "=" * 60)
    print("Processing complete!")
    print("=" * 60)
