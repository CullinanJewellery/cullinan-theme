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

render('f0.png','tw10',[
 (GV(230),'Тази Коледа',3480,700,wine,0,'r'),
 (GV(230),'подарете',3480,960,wine,0,'r'),
 (GV(230),'звезда',3480,1220,wine,0,'r'),
 ('rule',3480,1600,170,gd,'r'),
 (JO(60),'РЪЧНО ИЗРАБОТЕНО ЗЛАТО',3480,1645,gd,10,'r'),
 (JO(60),'В КУТИЯ СЪС СЕРТИФИКАТ',3480,1730,gd,10,'r'),
 ('rule',1856,4190,180,gd,'c'),
 (GV(160),'Весела Коледа',620,2330,(150,104,40),0,'c'),
 ('rule',620,2560,120,(150,104,40),'c'),
 (JO(104,500),'Поръчайте навреме за празниците',1856,4260,wine,3,'c'),
],(255,255,255),0.55)
render('f1.png','tw11',[
 (GV(270),'Звезда',260,300,iv,0,'l'),
 (GV(270),'под елхата',420,590,iv,0,'l'),
 ('rule',266,960,180,gl,'l'),
 (JO(74,300),'Обеци и висулка от злато,',260,1000,iv,3,'l'),
 (JO(74,300),'ръчна изработка',260,1105,iv,3,'l'),
 (JO(96,500),'ПОРЪЧАЙТЕ',260,2050,iv,14,'l'),
 (JO(96,500),'ЗА КОЛЕДА',260,2180,iv,14,'l'),
 ('rule',266,2000,180,gl,'l'),
 (GV(170),'Весела',2930,1980,gl,0,'c'),
 (GV(170),'Коледа',2960,2170,gl,0,'c'),
 ('rule',2945,2440,110,gl,'c'),
],(20,6,8),0.45)
