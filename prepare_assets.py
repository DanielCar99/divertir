from pathlib import Path
import json
from PIL import Image, ImageOps

root = Path(__file__).resolve().parent.parent
site = root / "divertir-web" / "dist"
product_dir = site / "assets" / "products"
product_dir.mkdir(parents=True, exist_ok=True)

manifest = json.loads((root / "work" / "catalog_manifest.json").read_text(encoding="utf-8"))
edits = json.loads((root / "work" / "edits.json").read_text(encoding="utf-8"))
originals = root / "work" / "originales"

for product in manifest:
    original_name = product["source"]
    source = Path(edits.get(original_name, originals / original_name))
    output_name = f"{Path(original_name).stem}.webp"
    output = product_dir / output_name
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image).convert("RGB")
        image.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
        image.save(output, "WEBP", quality=88, method=6)
    product["source"] = output_name

(site / "products.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
(site / "assets" / "Catalogo_Divertir.pdf").write_bytes((root / "outputs" / "Catalogo_Divertir.pdf").read_bytes())
print(f"Preparados {len(manifest)} productos para la web")
