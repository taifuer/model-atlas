"""Regenerate the local font after changing the page's Chinese text.

Optional authoring dependency: fonttools[woff].
Usage: python scripts/subset-font.py /path/to/NotoSansSC-VF.ttf
"""

from base64 import b64encode
from io import BytesIO
from pathlib import Path
import sys

from fontTools import subset
from fontTools.ttLib import TTFont


def main():
    if len(sys.argv) != 2:
        raise SystemExit("Usage: python scripts/subset-font.py /path/to/NotoSansSC-VF.ttf")
    root = Path(__file__).resolve().parent.parent / "src"
    text = "".join((root / name).read_text(encoding="utf-8") for name in ("index.html", "agents.html", "hardware.html", "technology.html", "about.html", "site.js", "app.js", "data.js", "data-en.js", "data-agents.js", "data-hardware.js", "data-technology.js", "data-access.js", "data-specs.js", "data-prices.js", "data-scores.js", "data-model-types.js", "filters.js", "styles.css"))
    characters = {ord(char) for char in text} | set(range(32, 256))
    font = TTFont(sys.argv[1])
    options = subset.Options()
    options.name_IDs = ["*"]
    options.name_legacy = True
    options.name_languages = ["*"]
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=characters)
    subsetter.subset(font)
    font.flavor = "woff2"
    buffer = BytesIO()
    font.save(buffer)
    encoded = b64encode(buffer.getvalue()).decode("ascii")
    output = root / "assets/noto-sans-sc.css"
    output.parent.mkdir(exist_ok=True)
    output.write_text(
        '/* Noto Sans SC subset. SIL Open Font License 1.1; see OFL.txt. */\n'
        '@font-face {\n'
        '  font-family: "Atlas Sans";\n'
        f'  src: url("data:font/woff2;base64,{encoded}") format("woff2");\n'
        '  font-weight: 100 900;\n'
        '  font-style: normal;\n'
        '  font-display: swap;\n'
        '}\n',
        encoding="utf-8",
    )
    print(f"Saved {output.stat().st_size:,} bytes; {len(font.getBestCmap())} supported characters.")


if __name__ == "__main__":
    main()
