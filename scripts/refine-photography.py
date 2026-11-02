from PIL import Image
from pathlib import Path
import json
base=Path('corporate/public/media');raw=json.load(open('research/corporate/images.json'));manifest=json.load(open('corporate/src/images.json'))
def best(page):
 candidates=[a for a in raw if a['page']==page and a['height']>a['width']*1.25]
 return max(candidates,key=lambda a: Image.open(base/a['file']).entropy())['file']
def save(src,name,box):
 im=Image.open(base/src).convert('RGB');w,h=im.size;im=im.crop(tuple(round(v*(w if i%2==0 else h)) for i,v in enumerate(box)));im.save(base/(name+'.webp'),'WEBP',quality=89)
for p in range(52,64):
 src=best(p)
 for i in range(48):
  col=i%6;row=i//6
  save(src,f'outlet-{p}-{i}',(.045+col*.153,.235+row*.084,.195+col*.153,.315+row*.084))
for p in [15,20,21]:
 src=best(p)
 for i in range(6 if p==15 else 12):
  if p==15:
   col=i%2;row=i//2;box=(.07+col*.46,.225+row*.24,.47+col*.46,.405+row*.24)
  else:
   col=i%4;row=i//4;box=(.04+col*.24,.23+row*.225,.26+col*.24,.425+row*.225)
  save(src,f'recognition-{p}-{i}',box)
# Use clean original photographs where the PDF includes them separately.
manifest=[a for a in manifest if a['page'] not in [34,35,40] or a['file']=='culture-hero.webp']
for p,ids in [(34,[4,5,6]),(35,[4]),(40,[4])]:
 for i in ids:
  fn=f'mag-{p}-{i:02}.webp';im=Image.open(base/fn);manifest.append({'page':p,'file':fn,'width':im.width,'height':im.height})
Path('corporate/src/images.json').write_text(json.dumps(manifest,indent=2))
print('Corrected composite-page sources and clean original photographs.')
