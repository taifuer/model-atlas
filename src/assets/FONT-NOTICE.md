# Noto Sans SC

The bundled `noto-sans-sc.css` references two local WOFF2 character subsets of the Noto Sans SC variable font, distributed under the SIL Open Font License 1.1. The original copyright and license metadata are retained in both font files. The accompanying `OFL.txt` contains the license.

Upstream source: https://github.com/notofonts/noto-cjk

Source file: https://raw.githubusercontent.com/notofonts/noto-cjk/main/Sans/Variable/TTF/Subset/NotoSansSC-VF.ttf

These local subsets cover the text used by this website and Latin characters. `atlas-sans-latin.woff2` contains Latin text, shared punctuation and technical or interface symbols; `atlas-sans-cjk.woff2` contains Chinese characters and CJK punctuation. CSS `unicode-range` loads each face only when its characters are needed, so an English page does not need the larger Chinese face until Chinese text is displayed. The CSS family alias is “Atlas Sans”. All files are hosted with the site; no font requests are made to external services at runtime. Both HTTP and direct file previews use these local files where supported by the browser.

To regenerate after content changes, install the optional authoring tool `fonttools[woff]` and run `python scripts/subset-font.py /path/to/NotoSansSC-VF.ttf`.
