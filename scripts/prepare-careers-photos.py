from PIL import Image
from pathlib import Path
b=Path('corporate/public/media')
boxes36=[(95,521,503,770),(605,521,1013,770),(95,890,504,1143),(602,890,1010,1143),(95,1258,504,1512),(602,1250,1010,1507)]
boxes37=[(36,465,357,667),(399,465,721,667),(765,465,1089,667),(36,773,357,977),(399,773,721,977),(765,791,1089,973),(36,1245,357,1451),(399,1245,721,1451),(765,1245,1089,1451)]
for page,boxes in [(36,boxes36),(37,boxes37)]:
 im=Image.open(b/f'mag-{page}-01.webp')
 for i,box in enumerate(boxes):im.crop(box).save(b/f'perk-{page}-{i}.webp','WEBP',quality=90)
print('Prepared 15 magazine benefit photographs.')
