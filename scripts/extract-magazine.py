from pathlib import Path
from pypdf import PdfReader
from PIL import Image
import json
r=PdfReader(r'C:\Users\Guest User\Downloads\LV - NEW BLACK BG MAGAZINE FINAL 1.1.1.pdf')
out=Path('corporate/public/media'); manifest=[]
for number in list(range(2,4))+list(range(6,10))+list(range(14,64)):
 p=r.pages[number-1]
 for i,obj in enumerate(p.images):
  im=obj.image
  if im.width<150 or im.height<130 or im.width*im.height<50000: continue
  im=im.convert('RGB');im.thumbnail((2000,1600))
  name=f'mag-{number:02}-{i:02}.webp';im.save(out/name,'WEBP',quality=86)
  manifest.append({'page':number,'index':i,'file':name,'width':im.width,'height':im.height})
 print(f'Page {number}: extracted',flush=True)
Path('research/corporate/images.json').write_text(json.dumps(manifest,indent=2))
print(f'{len(manifest)} authentic images extracted')
