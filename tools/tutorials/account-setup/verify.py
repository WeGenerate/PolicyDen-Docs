import json, pathlib, subprocess
root=pathlib.Path(__file__).parent/'output'
m=json.loads((root/'manifest.json').read_text())
probe=json.loads(subprocess.check_output(['ffprobe','-v','quiet','-show_format','-show_streams','-of','json',m['recording']]))
(root/'ffprobe.json').write_text(json.dumps(probe,indent=2))
duration=float(probe['format']['duration'])
for s in m['scenes']:
    assert 4<=s['end']-s['start']<=15, s
    assert 0<=s['start']<s['end']<=duration,s
    for label,t in [('start',s['start']+.15),('end',s['end']-.3)]:
        subprocess.run(['ffmpeg','-y','-v','error','-ss',str(t),'-i',m['recording'],'-frames:v','1',str(root/f"proof-{s['id']}-{label}.png")],check=True)
print('Verified duration',duration,'scenes',len(m['scenes']),'narration words',sum(len(s['narration'].split()) for s in m['scenes']))
