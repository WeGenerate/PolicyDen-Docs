"""Audit media references and refresh the missing-media report; leave pages unchanged."""
import json,re
from pathlib import Path
root=Path(__file__).resolve().parents[2]
missing=[]
for p in root.rglob('*.mdx'):
 if any(x in p.relative_to(root).parts for x in ['node_modules','.git','docs','tools']):continue
 for s in re.findall(r'(?:src|poster)=[\"\'](/(?:images|videos)/[^\"\']+)',p.read_text()):
  if not (root/s.lstrip('/')).is_file():missing.append({'page':str(p.relative_to(root)),'missing':s})
(root/'tools/capture/reports/missing-media.json').write_text(json.dumps(missing,indent=2)+'\n')
print(f'Missing media: {len(missing)}')
raise SystemExit(bool(missing))
