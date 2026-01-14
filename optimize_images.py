import os
import glob
from PIL import Image

def optimize_images():
    # Define directory path relative to project root
    sequence_dir = os.path.join("public", "sequence")
    
    # Check if directory exists
    if not os.path.exists(sequence_dir):
        print(f"Directory not found: {sequence_dir}")
        return

    # Find all PNG files
    files = glob.glob(os.path.join(sequence_dir, "*.png"))
    total_files = len(files)
    print(f"Found {total_files} PNG images to convert.")

    if total_files == 0:
        return

    converted_count = 0
    total_original_size = 0
    total_new_size = 0

    for file_path in files:
        try:
            # Get file info
            filename = os.path.basename(file_path)
            name, ext = os.path.splitext(filename)
            new_file_path = os.path.join(sequence_dir, f"{name}.webp")
            
            # Calculate original size
            original_size = os.path.getsize(file_path)
            total_original_size += original_size

            # Convert to WebP
            with Image.open(file_path) as img:
                img.save(new_file_path, "WEBP", quality=80)
            
            # Calculate new size
            new_size = os.path.getsize(new_file_path)
            total_new_size += new_size
            
            # Delete original file
            os.remove(file_path)
            
            converted_count += 1
            print(f"[{converted_count}/{total_files}] Converted {filename} ({original_size/1024:.1f}KB -> {new_size/1024:.1f}KB)")

        except Exception as e:
            print(f"Error processing {filename}: {e}")

    print("-" * 30)
    print(f"Optimization Complete!")
    print(f"Total Original Size: {total_original_size / 1024 / 1024:.2f} MB")
    print(f"Total New Size: {total_new_size / 1024 / 1024:.2f} MB")
    print(f"Space Saved: {(total_original_size - total_new_size) / 1024 / 1024:.2f} MB")

if __name__ == "__main__":
    optimize_images()
