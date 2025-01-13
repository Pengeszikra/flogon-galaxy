Az én nézőpontomból inkább az a kérdésem, hogy miért használunk túlkomplikált CSS megoldásokat?
háttérinfo: enyhén legacy nagyvállalati rendszeren dolgozok, és folyamatosan megy a para, hogy ki épp hogyan szeretné megvalósítani a kívánt frontend fejlesztést, épp milyen extra könyvtárakat akarnak még az aktuális mellé behúzni. Van hogy a build 1 óráig fut az AWS-en és múltkor közölte hogy a 8gb nem elég a  fordításhoz. A devops felhúzta 16gb-ra ... minden ment rendben. ...... agybaj!
Na ez volt az a pont ahol megszabadultam attól a gondolattol, hogy mindenre framework-öt használjak.
De akkor miért maradt mégis a tailwind? Mert végtelenül leegyszerűsíti a fejlesztést. Legallábbis a számomra. 

- Ugyanis egyből eliminálja a felesleges CSS class nevezéket. Egyszerűen nincs szükség csak azért class-t adni valaminek, hogy utána arra hivatkozhassak a css részen.
- Tulajdonképpen onnan kezdve nincs is szükség CSS-re, ha csak nem olyan részt akarok programozni, amire a tailwind nincs felkészítve, például 3D és animáció.
- Főleg a layout megfogalmazására használom aminek, szerintem nem a CSS ben van a helye hanem annál a komponensnél ahol használom. Pld.:
```html
<section class="grid gap-2">
    <p>tartalom</p>
    <p>masik paragrafus</p>
    <img src="foo.jpg" />
    <p><i>ez a kep egy ... </i></p>
    ...
</section>
```
ez ugye egy függőleges 1 oszlopos lista ahol szépen minden elem 2-es távolságra van egymástól.

- mivel componenseket vayg HTML esetén template tag-eket használok, nem kell minden akár összetett stílust se megismételni. HTML esetén lehet az idézőjelet több soros módban is használni:

```html
  <section class="
    w-[11rem] rounded-2xl aspect-[4/6] lg
    px-1 py-3 bg-neutral-800 absolute top-0 left-0
    transition-all duration-500
    --pointer-events-none

    bg-[url(sprites/many-card-002.jpeg)]
    --bg-[url(sprites/elf-cardset.jpg)]
    --bg-[url(sprites/cat-cardset.jpg)]
    bg-[length:570%]
    bg-[position:4%_4%]
    bg-no-repeat
    transform-style:preserve-3d 
  ">
  </section>
``` 
Ez mondjuk egy összetettebb kártyának a stílusa a skin-t egyszerűen úgy cserélhetem, hogy a bg-[url rész elé írok: --, vagy éppen hozzárakom.
És az egész sokkal olvashatóbb marad mintha egy CSS-t kellene átnyálazni.
- a tailwind egy nagyon korrekt CSS reset-et is biztosít
- nem távolít el a CSS-től, ha be van kapcsolva az IDE tanácsadása, akkor látod, hogy mit milyen CSS-re fordít.
- rém könnyű vele responsive oldalt csinálni
- totál egyszerű vele a dark / light theme váltást megcsinálni.