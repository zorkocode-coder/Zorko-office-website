from PIL import Image
from pathlib import Path
import json
mapping={
'Sales':'sales-team.webp','Purchase':'Purchase-Team.jpg','Existing outlets support':'Existing-Outlets-Support-Team.webp','Upcoming outlets support':'upcoming-outlets-support-team.webp','Human resources':'HR-team.webp','Marketing':'Marketing-Team.webp','Administration':'admin-team.webp','Legal':'legal-team.webp','Graphics':'graphics-team.webp','Training':'trainers-team.webp','Social media':'social-media-team.webp','Video editing':'Video-Editing-Team.jpg','Accounts':'accounts-team.webp','Influencer marketing':'Influencers-Marketing-Team.webp','Technology':'tech-team.jpg','Location':'location-team.webp'}
assets=json.load(open('research/asset-map.json'));output={};provenance=[]
for name,original in mapping.items():
 url='https://zorko.in/wp-content/uploads/2026/04/'+original;src=assets[url];im=Image.open('public'+src).convert('RGB');im.thumbnail((1600,1200));filename='site-team-'+name.lower().replace(' ','-')+'.webp';im.save('corporate/public/media/'+filename,'WEBP',quality=87);output[name]=filename;provenance.append({'team':name,'original':url,'file':'/media/'+filename,'width':im.width,'height':im.height})
Path('corporate/src/site-photos.json').write_text(json.dumps(output,indent=2));Path('corporate/scripts/site-photo-provenance.json').write_text(json.dumps(provenance,indent=2));print('Prepared 16 higher-resolution department photos from the retained original website.')
