"""Embed a completed tutorial after the existing page introduction."""
import argparse
import html
import json
import math
import re
from pathlib import Path


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('result', type=Path)
    arguments = parser.parse_args()
    result = json.loads(arguments.result.read_text())
    root = Path(__file__).resolve().parents[2]
    tutorial_id = result['id']
    assert re.fullmatch(r'[a-z0-9-]+', tutorial_id)
    page = root / (result['page'] + '.mdx')
    assert page.resolve().is_relative_to(root) and page.is_file()
    video = f'/videos/tutorials/{tutorial_id}.mp4'
    captions = f'/videos/tutorials/{tutorial_id}.vtt'
    poster = f'/images/tutorials/{tutorial_id}.png'
    for asset in [video, captions, poster]:
        assert (root / asset.lstrip('/')).is_file(), asset
    seconds = math.ceil(result['duration'])
    duration = f'{seconds // 60}:{seconds % 60:02}'
    title = html.escape(result['title'], quote=True)
    description = html.escape(result.get('description', ''))
    transcript = '\n\n'.join(html.escape(scene['narration']) for scene in result['scenes'])
    def cue_seconds(value):
        hours, minutes, seconds = value.split(':')
        return int(hours) * 3600 + int(minutes) * 60 + float(seconds)
    cues = []
    for cue in (root / captions.lstrip('/')).read_text().strip().split('\n\n')[1:]:
        lines = cue.splitlines()
        cue_start, cue_end = lines[0].split(' --> ')
        cues.append({'start': cue_seconds(cue_start), 'end': cue_seconds(cue_end), 'text': '\n'.join(lines[1:])})
    cue_attribute = html.escape(json.dumps(cues, ensure_ascii=False, separators=(',', ':')), quote=True)
    start = '{/* tutorial:' + tutorial_id + ':start */}'
    end = '{/* tutorial:' + tutorial_id + ':end */}'
    block = f'''{start}
## Watch the tutorial

{description}

<Frame caption="{duration} · AI narration">
  <video className="w-full rounded-xl" controls playsInline preload="none" poster="{poster}" aria-label="Video tutorial: {title}" data-tutorial-captions="{cue_attribute}">
    <source src="{video}" type="video/mp4" />
    <a href="{video}">Download the tutorial.</a>
  </video>
</Frame>

<Accordion title="Read the video transcript">
{transcript}
</Accordion>
{end}'''
    text = page.read_text()
    if start in text:
        text = re.sub(re.escape(start) + r'.*?' + re.escape(end), lambda _: block, text, flags=re.S)
    else:
        position = text.index('\n## ')
        text = text[:position] + '\n' + block + '\n' + text[position:]
    page.write_text(text)
    print(f'Embedded {tutorial_id} in {result["page"]}')


if __name__ == '__main__':
    main()
