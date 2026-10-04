"""Generate locally hosted, character-scoped Atlas Sans font files.

Optional authoring dependency: fonttools[woff].
Usage: python scripts/subset-font.py /path/to/NotoSansSC-VF.ttf
"""

from hashlib import sha256
from io import BytesIO
from pathlib import Path
import sys

from fontTools import subset
from fontTools.ttLib import TTFont


def unicode_ranges(characters):
    ranges = []
    for character in sorted(characters):
        if ranges and character == ranges[-1][1] + 1:
            ranges[-1][1] = character
        else:
            ranges.append([character, character])
    return ", ".join(
        f"U+{start:X}" if start == end else f"U+{start:X}-{end:X}"
        for start, end in ranges
    )


def latin(character):
    # English technical copy also uses Greek letters and mathematical/UI symbols
    # (e.g. ≈ and ✓); these must not trigger the much larger Chinese face.
    cjk_ranges = ((0x2E80, 0xA4CF), (0xAC00, 0xD7AF), (0xF900, 0xFAFF),
                  (0xFE10, 0xFE6F), (0xFF00, 0xFFEF), (0x20000, 0x323AF))
    return not any(start <= character <= end for start, end in cjk_ranges)


def main():
    if len(sys.argv) != 2:
        raise SystemExit("Usage: python scripts/subset-font.py /path/to/NotoSansSC-VF.ttf")
    root = Path(__file__).resolve().parent.parent / "src"
    text = "".join(path.read_text(encoding="utf-8") for path in sorted(root.iterdir()) if path.suffix in {".html", ".js", ".css"})
    characters = {ord(char) for char in text} | set(range(32, 256))
    groups = {"latin": {char for char in characters if latin(char)}, "cjk": {char for char in characters if not latin(char)}}
    output = root / "assets"
    output.mkdir(exist_ok=True)
    css = ['/* Noto Sans SC subsets. SIL Open Font License 1.1; see OFL.txt. */\n']
    for name, codepoints in groups.items():
        font = TTFont(sys.argv[1], recalcTimestamp=False)
        options = subset.Options()
        options.name_IDs = ["*"]
        options.name_legacy = True
        options.name_languages = ["*"]
        subsetter = subset.Subsetter(options=options)
        subsetter.populate(unicodes=codepoints)
        subsetter.subset(font)
        font.flavor = "woff2"
        buffer = BytesIO()
        font.save(buffer)
        body = buffer.getvalue()
        filename = f"atlas-sans-{name}.woff2"
        (output / filename).write_bytes(body)
        css.append(
            '@font-face {\n'
            '  font-family: "Atlas Sans";\n'
            f'  src: url("{filename}?v={sha256(body).hexdigest()[:12]}") format("woff2");\n'
            '  font-weight: 100 900;\n'
            '  font-style: normal;\n'
            '  font-display: swap;\n'
            f'  unicode-range: {unicode_ranges(font.getBestCmap())};\n'
            '}\n'
        )
        print(f"Saved {filename}: {len(body):,} bytes; {len(font.getBestCmap())} supported characters.")
    (output / "noto-sans-sc.css").write_text("".join(css), encoding="utf-8")
    print(f"Font CSS: {(output / 'noto-sans-sc.css').stat().st_size:,} bytes.")


if __name__ == "__main__":
    main()
