"""Place verified clips beside their instructions and audit local media files."""

import argparse
import html
import json
import re
import struct
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
REPORTS = ROOT / "tools/capture/reports"
FRAME = re.compile(r"^[ \t]*<Frame\b[^>]*>.*?</Frame>", re.MULTILINE | re.DOTALL)
PROTECTED = {"index", "quickstart"}
EXCLUDED_DIRS = {"node_modules", ".git", "docs", "tools", "essentials", "ai-tools", "api-reference", "docs-review", "drafts", "snippets"}


def integrate_clip(clip, excluded):
    page = clip["page"]
    path = ROOT / f"{page}.mdx"
    if page in PROTECTED or page in excluded or page.startswith("start/") or not path.exists():
        return False
    video = "/" + clip["video"]
    poster = "/" + clip["output"]
    if not (ROOT / clip["video"]).is_file() or not (ROOT / clip["output"]).is_file():
        raise ValueError(f"Missing clip or still image for {clip['id']}")

    original = path.read_text()
    text = original
    old_position = None
    for frame in reversed(list(FRAME.finditer(text))):
        if f'src="{video}"' in frame[0]:
            old_position = frame.start()
            text = text[:frame.start()] + text[frame.end():]
    text = text.replace("\nThe still image above shows the same screen. Use the video controls to pause the loop.\n", "\n")

    caption = html.escape(clip["caption"], quote=True)
    media = (
        f'<Frame caption="{caption}">\n'
        f'  <video className="w-full rounded-xl motion-reduce:hidden" autoPlay muted loop playsInline controls preload="metadata" poster="{poster}" src="{video}" aria-label="{caption}" />\n'
        f'  <img className="hidden motion-reduce:block" src="{poster}" alt="{caption}" />\n'
        '</Frame>'
    )
    still = next((frame for frame in FRAME.finditer(text) if f'src="{poster}"' in frame[0]), None)
    if still:
        indent = re.match(r"[ \t]*", still[0])[0]
        replacement = "\n".join(indent + line for line in media.splitlines())
        text = text[:still.start()] + replacement + text[still.end():]
    elif old_position is not None:
        text = text[:old_position] + media + text[old_position:]
    else:
        raise ValueError(f"No instructional media position for {clip['id']}; place it manually")
    text = re.sub(r"\n{3,}", "\n\n", text).rstrip() + "\n"
    if text != original:
        path.write_text(text)
        return True
    return False


def audit():
    missing = []
    for page in ROOT.rglob("*.mdx"):
        relative = page.relative_to(ROOT)
        if any(part in EXCLUDED_DIRS for part in relative.parts):
            continue
        for source in re.findall(r'(?:src|poster)=["\'](/(?:images|videos)/[^"\']+)', page.read_text()):
            if not (ROOT / source.lstrip("/")).is_file():
                missing.append({"page": str(relative), "missing": source})
    dimensions = []
    for path in (ROOT / "images").rglob("*.png"):
        with path.open("rb") as file:
            header = file.read(24)
        if header[:8] == b"\x89PNG\r\n\x1a\n":
            width, height = struct.unpack(">II", header[16:24])
            dimensions.append({"path": str(path.relative_to(ROOT)), "width": width, "height": height, "bytes": path.stat().st_size})
    (REPORTS / "missing-media.json").write_text(json.dumps(missing, indent=2) + "\n")
    (REPORTS / "dimensions.json").write_text(json.dumps(dimensions, indent=2) + "\n")
    print(f"Missing media: {len(missing)}; PNG files: {len(dimensions)}")
    return missing


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--layout-only", action="store_true", help="Leave audit reports untouched while another capture task owns them")
    parser.add_argument("--exclude-page", action="append", default=[])
    args = parser.parse_args()
    clips = json.loads((REPORTS / "clips.json").read_text())
    changed = sum(integrate_clip(clip, set(args.exclude_page)) for clip in clips)
    print(f"Updated clip layout on {changed} pages")
    if not args.layout_only and audit():
        raise SystemExit(1)
