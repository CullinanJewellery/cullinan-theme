import sys; sys.path.insert(0, r'C:/Users/NITROV~1/AppData/Local/Temp/claude/7109541ebf6a848d/c1300a2b-db77-4090-b592-c50fe61888a1/scratchpad/pylib')
exec(open('text.py',encoding='utf-8').read().split('def make')[0])
from PIL import Image, ImageDraw, ImageFilter
GV=lambda s: fam(['ads2/font-greatvibes.ttf'],s)
JO=lambda s,w=400: fam(['video/font-jost-normal-cyrillic.ttf','video/font-jost-normal-latin.ttf'],s,w)
def put(d,ds,fs,s,x,y,fill,tr=0,align='c'):
    w=width(fs,s,tr); x0={'c':x-w/2,'l':x,'r':x-w}[align]
    for dd,f in ((ds,255),(d,fill)):
        xx=x0
        for ch in s:
            ff=pick(fs,ch)
            if ch!=' ': dd.text((xx,y),ch,font=ff,fill=f)
            xx+=ff.getlength(ch)+tr
def render(src,out,items,halo,shadow):
    im=Image.open(src).convert('RGB'); W,H=im.size
    sh=Image.new('L',(W,H),0); ds=ImageDraw.Draw(sh)
    lay=Image.new('RGBA',(W,H),(0,0,0,0)); d=ImageDraw.Draw(lay)
    for it in items:
        if it[0]=='rule':
            _,x,y,w,c,al=it; x0={'c':x-w/2,'l':x,'r':x-w}[al]; d.line([(x0,y),(x0+w,y)],fill=c,width=5)
        else: put(d,ds,*it)
    sh=sh.filter(ImageFilter.GaussianBlur(30)).point(lambda v:int(v*shadow))
    im=Image.composite(Image.new('RGB',(W,H),halo),im,sh); im.paste(lay,(0,0),lay)
    im.save(out+'.png'); im.resize((2160,2682)).save(out+'.jpg',quality=93)
wine=(110,16,30); gd=(140,100,46); iv=(246,236,224); gl=(224,192,134)
# 10: red set on snow
render('f0.png','ty10',[
 (GV(230),'Весела',3480,560,wine,0,'r'),
 (GV(230),'Коледа',3480,800,wine,0,'r'),
 (JO(58),'ПРИСТИГА В КУТИЯ',3480,1130,gd,10,'r'),
 (JO(58),'С ИНДИВИДУАЛЕН СЕРТИФИКАТ',3480,1215,gd,10,'r'),
 (JO(74,400),'Обеци и висулка',200,2060,wine,3,'l'),
 (JO(66,300),'злато и цирконии',200,2175,wine,3,'l'),
 (JO(66,300),'цвят рубин',200,2275,wine,3,'l'),
 ('rule',206,2420,170,gd,'l'),
 (GV(260),'Коледна звезда',1856,4060,wine,0,'c'),
 ('rule',1856,4400,180,gd,'c'),
 (JO(60),'РЪЧНА ИЗРАБОТКА  ·  ЗЛАТО',1856,4440,gd,16,'c'),
],(255,255,255),0.55)
# 11: green set on red paper
render('f1.png','ty11',[
 (GV(270),'Коледна',260,300,iv,0,'l'),
 (GV(270),'звезда',420,590,iv,0,'l'),
 ('rule',266,960,180,gl,'l'),
 (JO(60),'РЪЧНА ИЗРАБОТКА  ·  ЗЛАТО',260,1000,gl,14,'l'),
 (JO(74,400),'Обеци и висулка',390,1880,iv,3,'l'),
 (JO(66,300),'пристигат в кутия',390,1995,iv,3,'l'),
 (JO(66,300),'с индивидуален сертификат',390,2095,iv,3,'l'),
 (GV(210),'Весела',3250,1950,iv,0,'r'),
 (GV(210),'Коледа',3250,2170,iv,0,'r'),
],(20,6,8),0.45)
