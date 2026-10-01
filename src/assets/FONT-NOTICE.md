# Noto Sans SC

The bundled `noto-sans-sc.css` embeds a WOFF2 character subset of the Noto Sans SC variable font, distributed under the SIL Open Font License 1.1. The original copyright and license metadata are retained in the font. The accompanying `OFL.txt` contains the license.

Upstream source: https://github.com/notofonts/noto-cjk

Source file: https://raw.githubusercontent.com/notofonts/noto-cjk/main/Sans/Variable/TTF/Subset/NotoSansSC-VF.ttf

This local subset covers the text used by this website and Latin characters. The CSS family alias is “Atlas Sans”. Embedding the font allows both HTTP and direct file previews to use the same typeface. No font requests are made to external services at runtime.

To regenerate after content changes, install the optional authoring tool `fonttools[woff]` and run `python scripts/subset-font.py /path/to/NotoSansSC-VF.ttf`.
