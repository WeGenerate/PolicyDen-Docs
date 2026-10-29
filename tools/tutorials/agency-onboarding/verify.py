import json, subprocess, pathlib
from PIL import Image, ImageDraw
root=pathlib.Path(__file__).parent
for source in root.glob('*.json'):
 d=json.loads(source.read_text())
 if d.get('status')!='completed': continue
 out=root/'output'; meta=json.loads(subprocess.check_output(['ffprobe','-v','quiet','-show_format','-show_streams','-of','json',d['recording']]))
 (out/(d['id']+'-ffprobe.json')).write_text(json.dumps(meta,indent=2))
 duration=float(meta['format']['duration']); thumbs=[]
 for s in d['scenes']:
  assert 4<=s['end']-s['start']<=15, s
  assert s['end']<=duration+0.25,(s,duration)
  for label,t in [('start',s['start']+.2),('end',s['end']-.25)]:
   dest=out/(d['id']+'-'+s['id']+'-'+label+'-frame.png')
   subprocess.run(['ffmpeg','-loglevel','error','-y','-ss',str(t),'-i',d['recording'],'-frames:v','1',str(dest)],check=True)
   im=Image.open(dest).convert('RGB');im.thumbnail((480,334));thumb=Image.new('RGB',(480,358),'white');thumb.paste(im,(0,24));ImageDraw.Draw(thumb).text((5,5),s['id']+' '+label+' '+str(round(t,2)),fill='black');thumbs.append(thumb)
 sheet=Image.new('RGB',(960,358*((len(thumbs)+1)//2)),'#ddd')
 for i,im in enumerate(thumbs):sheet.paste(im,((i%2)*480,(i//2)*358))
 sheet.save(out/(d['id']+'-proof.jpg'))
 print(d['id'],'raw seconds',duration,'marked seconds',sum(s['end']-s['start'] for s in d['scenes']),'words',len(' '.join(s['narration'] for s in d['scenes']).split()),'errors',d['browserErrors'])
