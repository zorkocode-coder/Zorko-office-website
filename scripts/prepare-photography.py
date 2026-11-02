from PIL import Image
from pathlib import Path
import json
base=Path('corporate/public/media'); photos=[]
def crop(src,name,box,page,index=0):
 im=Image.open(base/src).convert('RGB');w,h=im.size; im=im.crop(tuple(round(v*(w if i%2==0 else h)) for i,v in enumerate(box)));im.save(base/(name+'.webp'),'WEBP',quality=89)
 photos.append({'page':page,'file':name+'.webp','width':im.width,'height':im.height,'index':index})
crop('mag-02-01.webp','founder-anand',(0,.20,1,.79),2)
crop('mag-03-01.webp','founder-amrit',(0,.20,1,.80),3)
crop('mag-49-02.webp','office-reception',(0,0,1,1),49)
crop('mag-50-02.webp','office-corridor',(0,0,1,1),50)
crop('mag-50-01.webp','office-work',(.04,.675,.965,.966),50,1)
crop('mag-14-01.webp','shark-tank',(.09,.505,.947,.941),14)
crop('mag-40-01.webp','culture-hero',(.035,.205,.96,.55),40)
crop('mag-23-01.webp','cheese-outlets',(.075,.255,.93,.905),23)
crop('mag-26-11.webp','waffle-interior',(0,0,1,1),26)
crop('mag-31-01.webp','consultancy',(.05,.22,.945,.94),31)
for p,source in [(45,0),(46,1),(47,1),(48,1)]:
 for n in range(6 if p!=48 else 2):
  col=n%2;row=n//2;x=.043 if col==0 else .518;y=.254+row*.238
  crop(f'mag-{p}-{source:02}.webp',f'team-{p}-{n}',(x,y,x+.433,y+.15),p,n)
for p,src in [(34,1),(35,1),(38,1),(39,1),(41,1)]:
 boxes={34:[(.05,.28,.54,.445),(.05,.46,.54,.69),(.05,.73,.54,.955),(.57,.635,.96,.785)],35:[(.05,.205,.50,.322),(.52,.205,.95,.322),(.05,.36,.5,.55),(.52,.36,.95,.55),(.05,.63,.52,.92),(.53,.63,.95,.92)],38:[(.075,.23,.93,.465),(.07,.57,.48,.73),(.52,.57,.93,.73),(.07,.75,.48,.92),(.52,.75,.93,.92)],39:[(.08,.28,.485,.40),(.52,.28,.93,.40),(.08,.47,.485,.59),(.52,.47,.93,.59),(.08,.7,.485,.83),(.52,.7,.93,.83)],41:[(.07,.22,.94,.37),(.08,.46,.49,.59),(.52,.46,.94,.59),(.08,.62,.49,.75),(.52,.62,.94,.75)]}[p]
 for i,box in enumerate(boxes):crop(f'mag-{p}-{src:02}.webp',f'life-{p}-{i}',box,p,i)
for p in [15,20,21]:
 src=next((x['file'] for x in json.load(open('research/corporate/images.json')) if x['page']==p and x['width']/x['height']>.65),None)
 if not src:continue
 for i in range(6 if p==15 else 12):
  if p==15:
   col=i%2;row=i//2;box=(.07+col*.46,.225+row*.24,.47+col*.46,.405+row*.24)
  else:
   col=i%4;row=i//4;box=(.04+col*.24,.23+row*.225,.26+col*.24,.425+row*.225)
  crop(src,f'recognition-{p}-{i}',box,p,i)
# Extract individual storefront photographs from the magazine's outlet photo grids.
for p in range(52,64):
 name=f'mag-{p}-00.webp'
 for i in range(48):
  col=i%6;row=i//6
  crop(name,f'outlet-{p}-{i}',(.045+col*.153,.235+row*.084,.195+col*.153,.315+row*.084),p,i)
# Keep only actual interior photographs for the office gallery.
for i in range(1,5):
 src=f'mag-51-{i:02}.webp';im=Image.open(base/src);photos.append({'page':51,'file':src,'width':im.width,'height':im.height})
Path('corporate/src/images.json').write_text(json.dumps(photos,indent=2))
print(f'Prepared {len(photos)} curated photographs and crops')
