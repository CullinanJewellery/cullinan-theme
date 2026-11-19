import sys; sys.path.insert(0, r'C:/Users/NITROV~1/AppData/Local/Temp/claude/7109541ebf6a848d/c1300a2b-db77-4090-b592-c50fe61888a1/scratchpad/pylib')
exec(open('text.py',encoding='utf-8').read().split('def make')[0])
from PIL import Image, ImageDraw, ImageFilter
def xmas(src,out,ink,accent,shadow):
    im=Image.open(src).convert('RGB'); W,H=im.size; cx=W/2
    K=fam(['video/font-jost-normal-cyrillic.ttf','video/font-jost-normal-latin.ttf'],66,400)
    P=fam(['ads2/font-prata-normal-cyrillic.ttf','ads2/font-prata-normal-latin.ttf'],190)
    S=fam(['video/font-jost-normal-cyrillic.ttf','video/font-jost-normal-latin.ttf'],62,400)
    # soft shadow layer for legibility, no box
    sh=Image.new('L',(W,H),0); ds=ImageDraw.Draw(sh)
    lay=Image.new('RGBA',(W,H),(0,0,0,0)); d=ImageDraw.Draw(lay)
    def both(fs,s,y,fill,tr):
        draw(ds,fs,s,cx,y,255,tr); draw(d,fs,s,cx,y,fill,tr)
    both(P,'Коледна звезда',4120,ink,2)
    d.line([(cx-90,4385),(cx+90,4385)],fill=accent,width=5)
    both(S,'РЪЧНА ИЗРАБОТКА  ·  ЗЛАТО',4430,accent,22)
    sh=sh.filter(ImageFilter.GaussianBlur(28)).point(lambda v:int(v*shadow))
    im=Image.composite(Image.new('RGB',(W,H),(255,255,255) if sum(ink)<300 else (20,6,8)),im,sh)
    im.paste(lay,(0,0),lay)
    im.save(out+'.png'); im.resize((2160,2682)).save(out+'.jpg',quality=93); im.resize((W//4,H//4)).save(out+'-s.jpg',quality=88)
xmas('f0.png','tx10',(96,18,30),(150,112,58),0.5)
xmas('f1.png','tx11',(246,236,224),(222,190,132),0.45)

def ldraw(d,fs,s,x,y,fill,track=0):
    for ch in s:
        f=pick(fs,ch)
        if ch!=" ": d.text((x,y),ch,font=f,fill=fill)
        x+=f.getlength(ch)+track
def xmasL(src,out,ink,accent,shadow,x0=300,y0=330):
    im=Image.open(src).convert('RGB'); W,H=im.size
    K=fam(['video/font-jost-normal-cyrillic.ttf','video/font-jost-normal-latin.ttf'],62,400)
    P=fam(['ads2/font-prata-normal-cyrillic.ttf','ads2/font-prata-normal-latin.ttf'],230)
    sh=Image.new('L',(W,H),0); ds=ImageDraw.Draw(sh)
    lay=Image.new('RGBA',(W,H),(0,0,0,0)); d=ImageDraw.Draw(lay)
    for fs,s,y,c,tr in ((P,'Коледна',y0,ink,2),(P,'звезда',y0+260,ink,2),(K,'РЪЧНА ИЗРАБОТКА  ·  ЗЛАТО',y0+640,accent,14)):
        ldraw(ds,fs,s,x0,y,255,tr); ldraw(d,fs,s,x0,y,c,tr)
    d.line([(x0+6,y0+590),(x0+186,y0+590)],fill=accent,width=5)
    sh=sh.filter(ImageFilter.GaussianBlur(28)).point(lambda v:int(v*shadow))
    im=Image.composite(Image.new('RGB',(W,H),(20,6,8)),im,sh); im.paste(lay,(0,0),lay)
    im.save(out+'.png'); im.resize((2160,2682)).save(out+'.jpg',quality=93)
xmasL('f1.png','tx11',(246,236,224),(222,190,132),0.45,x0=230)
