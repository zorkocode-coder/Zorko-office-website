from pypdf import PdfReader
from pathlib import Path
from PIL import Image,ImageDraw
import json
r=PdfReader(r'C:\Users\Guest User\Downloads\LV - NEW BLACK BG MAGAZINE FINAL 1.1.1.pdf')
manifest=[]
for n in [49,50,51,45,46,47,48,2,3]:
 for i,obj in enumerate(r.pages[n-1].images):
  im=obj.image
  if im.width<150 or im.height<130 or im.width*im.height<50000:continue
  im=im.convert('RGB');im.thumbnail((2000,1600));name=f'mag-{n:02}-{i:02}.webp'; im.save('corporate/public/media/'+name,'WEBP',quality=86);manifest.append({'page':n,'file':name,'width':im.width,'height':im.height})
 print(n,flush=True)
Path('research/corporate/priority-images.json').write_text(json.dumps(manifest,indent=2))
for start in range(0,len(manifest),30):
 chunk=manifest[start:start+30];c=Image.new('RGB',(1500,((len(chunk)+4)//5)*200),'#eee');d=ImageDraw.Draw(c)
 for j,a in enumerate(chunk):
  im=Image.open('corporate/public/media/'+a['file']);im.thumbnail((290,170));x=j%5*300;y=j//5*200;c.paste(im,(x,y));d.text((x+3,y+175),a['file'],fill='black')
 c.save(f'research/corporate/priority-{start}.jpg')
