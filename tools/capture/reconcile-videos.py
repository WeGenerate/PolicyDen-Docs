"""Record verified video outputs without manufacturing fallback screenshots."""

import json
from pathlib import Path

root = Path(__file__).resolve().parents[2]
reports = root / "tools/capture/reports"
rows = json.loads((reports / "manifest.json").read_text())
clips = {clip["id"]: clip for clip in json.loads((reports / "clips.json").read_text())}
for row in rows:
    if not row["output"].endswith(".mp4"):
        continue
    clip = clips.get(row["id"])
    if clip and clip.get("status", "completed") == "completed" and (root / clip["video"]).is_file():
        row.update(status="completed", caption=clip["caption"])
        row.pop("blocker", None)
        row.pop("replacement", None)
(reports / "manifest.json").write_text(json.dumps(rows, indent=2) + "\n")
