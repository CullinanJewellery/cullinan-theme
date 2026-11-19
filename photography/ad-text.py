import sys; sys.path.insert(0, r'C:/Users/NITROV~1/AppData/Local/Temp/claude/7109541ebf6a848d/c1300a2b-db77-4090-b592-c50fe61888a1/scratchpad/pylib')
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from fontTools.ttLib import TTFont
B=r'C:/Users/NITROV~1/AppData/Local/Temp/claude/7109541ebf6a848d/c1300a2b-db77-4090-b592-c50fe61888a1/scratchpad/'
def fam(paths, size, wght=None):
    out=[]
    for p in paths:
        f=ImageFont.truetype(B+p, size)
        if wght:
            try: f.set_variation_by_axes([wght])
            except Exception: pass
        out.append((f, set(TTFont(B+p).getBestCmap())))
    return out
def pick(fs,ch):
    if ch==" ": return fs[-1][0]
    for f,c in fs:
        if ord(ch) in c: return f
    return fs[-1][0]
def width(fs,s,track=0):
    return sum(pick(fs,ch).getlength(ch)+track for ch in s)-track
def draw(d,fs,s,cx,y,fill,track=0):
    x=cx-width(fs,s,track)/2
    for ch in s:
        f=pick(fs,ch)
        if ch!=" ": d.text((x,y),ch,font=f,fill=fill)
        x+=f.getlength(ch)+track
def make(src,out,kicker,lines,sub,top):
    im=Image.open(src).convert('RGB'); W,H=im.size
    # soft dark gradient behind the text block
    g=Image.new('L',(1,H))
    for yy in range(H):
        t=(yy-top+250)/700
        g.putpixel((0,yy), int(max(0,min(1,t))*150))
    g=g.resize((W,H)); im=Image.composite(Image.new('RGB',(W,H),(14,4,6)),im,g)
    d=ImageDraw.Draw(im)
    ivory=(244,234,222); gold=(214,180,124)
    K=fam(['video/font-jost-normal-cyrillic.ttf','video/font-jost-normal-latin.ttf'],70,400)
    P=fam(['ads2/font-prata-normal-cyrillic.ttf','ads2/font-prata-normal-latin.ttf'],235)
    Sb=fam(['video/font-jost-normal-cyrillic.ttf','video/font-jost-normal-latin.ttf'],86,300)
    cx=W/2; y=top
    draw(d,K,kicker,cx,y,gold,track=26); y+=170
    for ln in lines:
        draw(d,P,ln,cx,y,ivory,track=2); y+=275
    y+=40; d.line([(cx-110,y),(cx+110,y)],fill=gold,width=5); y+=90
    for ln in sub:
        draw(d,Sb,ln,cx,y,ivory,track=3); y+=125
    print(out,'text ends at',y,'of',H)
    im.save(out+'.png'); im.resize((2160,2682)).save(out+'.jpg',quality=93)
    im.resize((W//4,H//4)).save(out+'-s.jpg',quality=88)
make(B+'ads2/c0.png',B+'ads2/t01','РЪЧНА ИЗРАБОТКА  ·  ЗЛАТО',['Създадена,','за да бъде забелязана'],['Червеното на страстта и любовта –','подарък за човек, когото обичате'],3180)
make(B+'ads2/c1.png',B+'ads2/t02','РЪЧНА ИЗРАБОТКА  ·  ЗЛАТО',['Светлина отвътре'],['Като любовта – вижда се отдалеч','и топли отблизо'],3420)
