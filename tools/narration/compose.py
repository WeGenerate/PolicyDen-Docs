"""Join recorded app scenes with reviewed OpenAI narration and English captions."""
import argparse
import json
import re
import subprocess
from pathlib import Path


def run(arguments):
    result = subprocess.run(arguments, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
    if result.returncode:
        raise RuntimeError(result.stderr.decode(errors='replace')[-1800:])


def timestamp(seconds):
    total = round(seconds * 1000)
    hours, total = divmod(total, 3600000)
    minutes, total = divmod(total, 60000)
    seconds, milliseconds = divmod(total, 1000)
    return f"{hours:02}:{minutes:02}:{seconds:02}.{milliseconds:03}"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('tutorial', type=Path)
    parser.add_argument('narration', type=Path)
    parser.add_argument('output', type=Path)
    arguments = parser.parse_args()
    tutorial = json.loads(arguments.tutorial.read_text())
    narration = json.loads(arguments.narration.read_text())
    scenes, segments = tutorial['scenes'], narration['segments']
    assert len(scenes) == len(segments) > 0
    recording = Path(tutorial['recording'])
    if not recording.is_absolute():
        recording = arguments.tutorial.parent / recording
    assert recording.is_file(), recording
    destination = arguments.output.resolve()
    destination.parent.mkdir(parents=True, exist_ok=True)
    working = (arguments.narration.parent / 'composed-scenes').resolve()
    working.mkdir(exist_ok=True)
    clips, captions, scene_marks = [], ['WEBVTT', ''], []
    elapsed = 0.0
    for index, (scene, audio) in enumerate(zip(scenes, segments)):
        assert scene['id'] == audio['id']
        start, end = float(scene['start']), float(scene['end'])
        assert 0 <= start < end
        duration = max(end - start, float(audio['duration']) + 0.7)
        clip = working / f'{index:02}.mp4'
        filters = []
        if scene.get('crop'):
            crop = scene['crop']
            x, y, width, height = (int(crop[key]) for key in ['x', 'y', 'width', 'height'])
            assert min(x, y) >= 0 and width > 0 and height > 0
            assert x + width <= tutorial['width'] and y + height <= tutorial['height']
            filters.append(f'crop={width}:{height}:{x}:{y}')
        filters.extend(['fps=24', 'scale=1440:1000:force_original_aspect_ratio=decrease',
                        'pad=1440:1000:(ow-iw)/2:(oh-ih)/2:color=white', 'setsar=1',
                        f'tpad=stop_mode=clone:stop_duration={duration}'])
        run(['ffmpeg', '-y', '-ss', str(start), '-t', str(end - start), '-i', str(recording),
             '-i', audio['audio'], '-map', '0:v:0', '-map', '1:a:0',
             '-vf', ','.join(filters),
             '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11,apad', '-t', str(duration), '-c:v', 'libx264', '-preset', 'fast',
             '-crf', '24', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '96k',
             '-ar', '48000', '-movflags', '+faststart', str(clip)])
        duration = float(subprocess.check_output([
            'ffprobe', '-v', 'error', '-show_entries', 'format=duration',
            '-of', 'default=noprint_wrappers=1:nokey=1', str(clip)
        ], text=True))
        clips.append(clip)
        words = audio['script'].split()
        for offset in range(0, len(words), 10):
            end_word = min(offset + 10, len(words))
            cue_start = elapsed + float(audio['duration']) * offset / len(words)
            cue_end = elapsed + float(audio['duration']) * end_word / len(words)
            captions.extend([f'{timestamp(cue_start)} --> {timestamp(cue_end)}',
                             ' '.join(words[offset:end_word]), ''])
        scene_marks.append({'id': scene['id'], 'start': elapsed, 'end': elapsed + duration,
                            'narration': audio['script'], 'spokenSeconds': audio['duration']})
        elapsed += duration
    concat = working / 'concat.txt'
    assert all("'" not in str(clip) for clip in clips), 'Unsupported apostrophe in working path'
    concat.write_text(''.join(f"file '{clip}'\n" for clip in clips))
    run(['ffmpeg', '-y', '-f', 'concat', '-safe', '0', '-i', str(concat),
         '-c:v', 'copy', '-af', 'loudnorm=I=-17:TP=-3:LRA=11',
         '-c:a', 'aac', '-b:a', '128k', '-ar', '48000',
         '-movflags', '+faststart', str(destination)])
    final_duration = float(subprocess.check_output([
        'ffprobe', '-v', 'error', '-show_entries', 'format=duration',
        '-of', 'default=noprint_wrappers=1:nokey=1', str(destination)
    ], text=True))
    assert abs(final_duration - elapsed) < 0.5, 'Scene timing drift exceeds half a second'
    destination.with_suffix('.vtt').write_text('\n'.join(captions))
    run(['ffmpeg', '-y', '-ss', '0.3', '-i', str(destination), '-frames:v', '1',
         str(destination.with_suffix('.png'))])
    metadata = {'id': tutorial['id'], 'page': tutorial['page'], 'title': tutorial['title'],
                'description': tutorial.get('description', ''),
                'sourceRevision': tutorial['sourceRevision'], 'duration': final_duration,
                'provider': narration['provider'], 'model': narration['model'],
                'voice': narration['voice'], 'aiNarration': True, 'scenes': scene_marks}
    (working.parent / 'tutorial-result.json').write_text(json.dumps(metadata, indent=2) + '\n')
    print(json.dumps({'video': str(destination), 'duration': round(final_duration, 2), 'scenes': len(scenes)}))


if __name__ == '__main__':
    main()
