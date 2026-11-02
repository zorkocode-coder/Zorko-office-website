from PIL import Image
from pathlib import Path
import json
b=Path('corporate/public/media');raw=json.load(open('research/corporate/images.json'));m=json.load(open('corporate/src/images.json'))
for p in range(52,64):
 candidates=[a for a in raw if a['page']==p and .69<a['width']/a['height']<.72 and a['width']>800]
 src=max(candidates,key=lambda a:Image.open(b/a['file']).entropy())['file'];im=Image.open(b/src);w,h=im.size
 for i in range(48):
  col=i%6;row=i//6;box=(.045+col*.153,.235+row*.084,.195+col*.153,.315+row*.084)
  c=im.crop(tuple(round(v*(w if j%2==0 else h)) for j,v in enumerate(box)));c.save(b/f'outlet-{p}-{i}.webp','WEBP',quality=89)
boxes=[]
for y1,y2 in [(148,220),(232,305),(464,536),(549,623)]:
 for x1,x2 in [(14,112),(126,224),(237,335),(347,444)]:boxes.append((x1,y1,x2,y2))
boxes.extend([(130,323,329,449),(14,323,116,382),(14,392,116,449),(341,323,444,381),(341,392,444,449)])
im=Image.open(b/'mag-51-00.webp');w,h=im.size;m=[a for a in m if a['page']!=51]
for i,box in enumerate(boxes):
 c=im.crop(tuple(round(v*(w/460 if j%2==0 else h/650)) for j,v in enumerate(box)));name=f'office-detail-{i}.webp';c.save(b/name,'WEBP',quality=90);m.append({'page':51,'file':name,'width':c.width,'height':c.height})
Path('corporate/src/images.json').write_text(json.dumps(m,indent=2));print('Final office and storefront crops prepared.')
