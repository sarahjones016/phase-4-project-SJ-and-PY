#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Product, User, Order, Cart_Item

fake = Faker()
products_dictionary = [
    {'name': 'Shake Up! 2021', 'price': '28.95', 'description':'A fun pétillant natural wine that is flowing with tropical, citrus, and stone fruit flavors. Spicy on the palate with balanced acidity, and a long fresh finish!', 'units':'17', 'units_sold':'33', 'image_url':'https://cdn.shopify.com/s/files/1/0011/8148/3072/products/Shake-Up_-Purity-natural-sparkling-wine-California-USA-front_1512x.jpg?v=1666059456'},
    {'name': 'Alba Oak 2020', 'price': '23.95', 'description':'Alba from Vinos Ambiz stems from the Spanish Albillo grape variety. It\'s an aromatic,  peachy orange wine. It has a lot more layers though: complexity, bit of creaminess, nuttiness and a slight oakiness. We tasted some caramel in there too.', 'units':'10', 'units_sold':'24', 'image_url':'https://v2r8s3k5.rocketcdn.me/wp-content/uploads/2021/07/Vinos-Ambiz-Alba-2020.jpg.webp'},
    {'name': 'It\'s Your Birthday 2021', 'price': '34.95', 'description':'Stagiaire Wine It\'s Your Birthday is a blend of Pinot Noir, Sauvignon Blanc, and other varieties such as Syrah. This is an experimental wine that Brent has been making for the past four vintages. "Playful and unpretentious party juice. Crunchy and bubbling with life. Chilled red. Coferment. Whatever. Sometimes it tasted like Pinot and sometimes it tastes like Sav Blanc but never both.', 'units':'2', 'units_sold':'35', 'image_url':'https://cdn.shopify.com/s/files/1/0019/3363/9735/files/stagiaire-wine-it_s-your-birthday-natural-wine-primal-wine_552ad361-3491-4da1-bad1-839208c516a0.progressive.jpg?v=1684391959'},
    {'name': 'Pinot Grigio 2015', 'price': '48.95', 'description':'A lovely amber-colored wine that spends 8 days on its skins. It\'s complex with ever-changing tasting notes each time you return! From oranges and plums to honey and caramel, the flavor palate may surprise you!', 'units':'23', 'units_sold':'19', 'image_url':'https://cdn.shopify.com/s/files/1/0011/8148/3072/products/pinot-grigio-dario-princic-natural-Orange-wine-Friuli-VeneziaGiulia-Italy_1512x.png?v=1660166139'},
    {'name': 'Ein Quantum Chop Suey', 'price': '17.95', 'description':'Chop Suey 2019 from Quantum Winery is a dark natural rosé. In the nose you get a beautiful cherry jam aroma which you\'ll find it also on the palate together with strawberry and red currant notes. It\'s fresh, mineral , stony and it has a lovely complexity accompanied by a nice long finish.', 'units':'4', 'units_sold':'7', 'image_url':'https://v2r8s3k5.rocketcdn.me/wp-content/uploads/2022/05/Quantum-Winery-Chop-Suey-2021.webp'},
    {'name': 'Patatina Power Vino Rosado 2021', 'price': '29.95', 'description':'Artesano Vintner Patatina Power Vino Rosado is a natural wine made from a blend of Trepat, Moscatell, and Parellada farmed organically in Catalunya, Spain. 50% of Trepat is directly pressed, and the other 50% of Trepat undergoes carbonic maceration for 5 days. Moscatell has 12 days of skin contact. Parellada is fermented and aged in old oak barrels.', 'units':'11', 'units_sold':'14', 'image_url':'https://cdn.shopify.com/s/files/1/0019/3363/9735/files/artesano-vintners-patatina-power-vino-rosado-natural-wine.progressive.jpg?v=1683313685'},
    {'name': 'Rosé of Mencia & Cabernet Franc 2021', 'price': '28.95', 'description':'An exciting blend from Limited Addition. The Cab Franc pairs perfectly alongside the Mencia to create a juicy and intense summer sipper!', 'units':'13', 'units_sold':'16', 'image_url':'https://cdn.shopify.com/s/files/1/0011/8148/3072/products/rose-of-mencia-and-cabernet-franc-limited-addition-natural-Rose-wine-Oregon-United_States-front_1512x.png?v=1655239336'},
    {'name': 'Brutal 2020', 'price': '35.95', 'description':'Brutal 2020 has a slight fizz at the beginning like many of Christian Tschida\'s wines. It will probably disappear with ageing, though. The short maceration on the skins granted this wine the beautiful bright color as well as an elegant, complex style. Liquorice, violets and blackberries in the nose, raspberry and minerality on the palate. Very delicious!', 'units':'19', 'units_sold':'2', 'image_url':'https://v2r8s3k5.rocketcdn.me/wp-content/uploads/2021/09/Christian-Tschida-Brutal-2020.jpg.webp'},
    {'name': 'Mère Miroir Rosé 2022', 'price': '27.95', 'description':'e Levende Mère Miroir Rosé is a natural wine made from a blend of 42% Zinfandel (Ancient Lake Gardens - Lake County), 36% Syrah (Parenti Vineyard - Suisun Valley), 12% Carignane (Dorn Vineyard - Old Vine), 5% Petite Sirah (Dorn Vineyard - Old Vine), 3% Cabernet Sauvignon (Rhodes Vineyard - Old Vine), 2% Grenache (Dorn Vineyard - Old Vine). All of the wines are whole cluster direct pressed, fermented and aged in tank for seven months and receive a single racking to move to the blending/bottling tank.', 'units':'32', 'units_sold':'16', 'image_url':'https://cdn.shopify.com/s/files/1/0019/3363/9735/files/de-levende-mere-miroir-rose-natural-wine-primal-wine.progressive.jpg?v=1683216570'},
    {'name': 'Flower Power 2021', 'price': '29.95', 'description':'A skin contact Californian white wine with intense tropical fruit flavors, citrus aroma, hints of spice, subtle vegetal notes and fresh acidity.', 'units':'8', 'units_sold':'22', 'image_url':'https://cdn.shopify.com/s/files/1/0011/8148/3072/files/DISKO-Flower-Power-70_-Muscat-Canelli-30_-Gruner-Veltliner-natural-orange-wine-Santa-Barbara-USA_ad3674b0-fead-4efc-b6f0-1385684f33f4_1512x.jpg?v=1684726875'},
    {'name': 'MacAline 2021', 'price': '21.95', 'description':'The name Macaline is a playful combination of the grape variety, Macabeo, and the producer\'s name, Aline. The wine is as fun as it can be, it is balanced  and aromatic. It has notes of melon, yellow apple and hay with a touch of smokiness!', 'units':'14', 'units_sold':'7', 'image_url':'https://v2r8s3k5.rocketcdn.me/wp-content/uploads/2022/07/Domaine-des-Mathoauns-Mac-Aline.jpg.webp'},
    {'name': 'Orange Chardonnay 2022', 'price': '28.95', 'description':'Deux Punx Orange Chardonnay is made from organically farmed grapes grown in San Benito County, California. Spontaneous fermentation with native yeast, bottled unfined, unfiltered, with no added sulfites. Medium body orange wine with apple and hints of tropical fruit. Enjoy well chilled with a nice oven-baked branzino!', 'units':'23', 'units_sold':'13', 'image_url':'https://cdn.shopify.com/s/files/1/0019/3363/9735/files/deux-punx-orange-chardonnay-natural-wine-primal-wine.progressive.jpg?v=1685143695'},
    {'name': 'Cecilia 2021', 'price': '73.95', 'description':'A crisp natural rosé with ripe tropical stone fruit flavors, citrusy aromas, and white floral notes. This Austrian field blend is great to pair with grilled meats and fish!', 'units':'26', 'units_sold':'25', 'image_url':'https://cdn.shopify.com/s/files/1/0011/8148/3072/files/Gut_Oggau_Cecilia_Gemischter_Satz_Field_Blend_natural_Rose_wine_Burgenland_Austria_c42575c2-fe79-4eb5-9008-9b8d5faa9630_1512x.jpg?v=1682520998'},
    {'name': 'Blanc de Chardonnay Extra Brut', 'price': '46.95', 'description':'Blanc de Chardonnay from Chavost is a rich and creamy Champagne. It has the elegance, complexity and the bread-y aftertaste that you would expect in a Champagne . In the nose there are interesting aromas of hazelnut and jasmine. It is fruity on the palate with lots of tasty green apples.', 'units':'12', 'units_sold':'36', 'image_url':'https://v2r8s3k5.rocketcdn.me/wp-content/uploads/2021/07/Champagne-Chavost-blanc-de-chardonnay.jpg'},
    {'name': 'Marinara Red Blend 2022', 'price': '27.95', 'description':'Wonderwerk Marinara is a red natural wine made from a blend of Montepulciano and Petit Sirah farmed organically in Contra Costa County, California.', 'units':'9', 'units_sold':'11', 'image_url':'https://cdn.shopify.com/s/files/1/0019/3363/9735/files/wonderwerk-marinara-natural-wine-primal-wine.progressive.jpg?v=1683996132'},
    {'name': 'Lebnani Ahmar 2021', 'price': '28.95', 'description':'A floral and fruity Lebanese red with ripe berry and dried fruit flavors, hints of spice with floral and smoky notes.', 'units':'10', 'units_sold':'8', 'image_url':'https://cdn.shopify.com/s/files/1/0011/8148/3072/files/Mersel_Wine_Lebnani_Ahmar_Cinsaut_natural_red_wine_Bekaa_Valley_Lebanon_929c955d-01f6-49da-a012-278aad73f3b9_1512x.jpg?v=1682519360'},
    {'name': 'Morgen 2019', 'price': '28.95', 'description':'Morgen from Meinklang is a sparkling rosé although the fizziness is really light. Very complex and fruity in the nose with thousands of flavours like rhubarb, red currant, sour cherry, strawberry, cranberry and other red berries. Mineral, yeasty and with great acidity on the palate. Shake the bottle gently before opening the wine.', 'units':'37', 'units_sold':'15', 'image_url':'https://v2r8s3k5.rocketcdn.me/wp-content/uploads/2020/12/meinklang-morgen-edition2.jpg.webp'},
    {'name': 'Peggy Sue 2022', 'price': '26.95', 'description':'De Levende Peggy Sue is a red natural wine made from Petite Sirah farmed sustainably in Northern California.', 'units':'22', 'units_sold':'20', 'image_url':'https://cdn.shopify.com/s/files/1/0019/3363/9735/files/de-levende-peggy-sue-natural-wine-primal-wine-california.progressive.jpg?v=1683216576'},
    {'name': 'Rosalba 2021', 'price': '29.95', 'description':'A crisp and dry pinot grigio rosé with summery berry fruit aromas, well-structured acidity, and a delicate mineral note in the finish. Perfect to pair with lightly-cooked seafood dishes.', 'units':'16', 'units_sold':'29', 'image_url':'https://cdn.shopify.com/s/files/1/0011/8148/3072/files/Buona_Notte_Rosalba_Pinot_Grigio_natural_Rose_wine_Oregon_USA_15fe5d19-6fdf-410f-b3e6-8a376ae04cf9_1512x.jpg?v=1682520442'},
    {'name': 'Cosi fan tutte 2020', 'price': '18.95', 'description':'Cosi fan tutte is another of Quantum Winery\‘s special editions. Slightly funky in the nose, this Pet Nat has some light citrusy and smoky vibes combined with lovely stony minerality. It has exactly the fun flavours you desire in a sparkling rosé: red berries, strawberry and red currant!', 'units':'19', 'units_sold':'11', 'image_url':'https://v2r8s3k5.rocketcdn.me/wp-content/uploads/2021/11/Quantum-Winery-Cosi-fan-tutte.jpg'},
    {'name': 'Let\'s Get Fizzical 2021', 'price': '38.95', 'description':'Stagiaire Wine Let\'s Get Fizzical in the words of winemaker Brent Mayeaux: \"For 2021, the white is equal parts Sav Blanc, Chardonnay, and Vermentino. The first two varieties coming from the ancient vines at Lolonis in Redwood Valley. The Vermentino is from a steep north facing vineyard that goes straight into Clear Lake in Lake County. Both sites are organic. Lolonis is dryfarmed.\"', 'units':'21', 'units_sold':'8', 'image_url':'https://cdn.shopify.com/s/files/1/0019/3363/9735/files/stagiaire-wine-let_s-get-fizzical-natural-wine-primal-wine_ce30778f-3203-4caf-a5f9-7ef03c6f466c.progressive.jpg?v=1684391957'},
    {'name': '\“A\" VDF Blanc 2020', 'price': '44.95', 'description':'From the picturesque slopes of Saint Jean de la Porte in Savoie. The grapes spend time on skins in big oak barrels which give it a bold character. It\'s a medium-bodied wine that\'s fun to sip on, with a touch of funky charm that makes it truly unique!', 'units':'20', 'units_sold':'3', 'image_url':'https://cdn.shopify.com/s/files/1/0011/8148/3072/files/Domaine_la_Boheme_A_Altesse_Blanc_altesse_chardonnay_natural_white_wine_Alsace_France_e35a9740-6c9d-4700-ae5d-d52490af772c_1512x.jpg?v=1682535542'},
    {'name': 'Bio Dynamite NV', 'price': '24.95', 'description':'The BioDynamite has a new look this year, we all tried the Aline\‘s rosé pet nat the past years and loved it, now you should grab a few of these bangers! The new pet nat is equally delicious, rustic in a way but balanced with citrusy and herbal notes. Aromas of yellow apple, orange zest, mandarine and thyme. Not sure whether to consider it a white or an orange pet nat, we leave this choice up to you!!', 'units':'14', 'units_sold':'0', 'image_url':'https://v2r8s3k5.rocketcdn.me/wp-content/uploads/2022/07/Domaine-des-Mathoans-Bio-Dynamite.jpg.webp'},
    {'name': 'Pash Rash Pet Nat 2022', 'price': '34.95', 'description':'Borachio Pash Rash Pet Nat is a sparkling wine from Australia made from Pinot Noir grown on Mount Compass. Fresh and fruity taste profile, pomegranate, grapefruit, and fresh strawberry, with great acidity. Drink it chilled!', 'units':'24', 'units_sold':'2', 'image_url':'https://cdn.shopify.com/s/files/1/0019/3363/9735/files/borachio-pash-rash-pet-nat-natural-wine-primal-wine.progressive.jpg?v=1683023720'},
    {'name': 'La Lasca Murcia Red 2019', 'price': '34.95', 'description':'A medium-bodied natural red wine that is dark berry fruit forward, with bright acidity, bold tannins, and a long finish!', 'units':'12', 'units_sold':'15', 'image_url':'https://cdn.shopify.com/s/files/1/0011/8148/3072/products/Vina-Enebro-La-Lasca-Murcia-Red-natural-red-wine-Murcia-Spain-front-label_1512x.jpg?v=1676058750'},
    {'name': 'Merlot 2013', 'price': '84.95', 'description':'Dario Princic Merlot is a gorgeous red wine, it\’s powerful and rich, it has deep complex aromas of rum, prunes and tobacco. Blackberry and blueberry in the nose, great acidity and tannins! A wine for special occasions!', 'units':'9', 'units_sold':'33', 'image_url':'https://v2r8s3k5.rocketcdn.me/wp-content/uploads/2022/06/Dario-Princic-Merlot-2013.jpg.webp'},
    {'name': 'Beaujolais Morgon 2019', 'price': '32.95', 'description':'George Descombes Beaujolais Morgon is a red natural wine made from 100% Gamay grapes grown within the Morgon appellation of Beaujolais, France. Carbonic maceration, minimal added sulfites at bottling. Medium-bodied red wine, round fruit, savory, and juicy.', 'units':'5', 'units_sold':'17', 'image_url':'https://cdn.shopify.com/s/files/1/0019/3363/9735/files/george-descombes-morgon-beaujolais-natural-wine-primal-wine.progressive.jpg?v=1685143710'},
    {'name': 'Frankie 2021', 'price': '32.95', 'description':'Our favorite kind of cab franc, only a bit green and perfectly balanced! Notes of tomato, red fruit, graphite, and somehow manages to be savory while also juicy! Also named for their daughter, which is adorable!', 'units':'19', 'units_sold':'20', 'image_url':'https://cdn.shopify.com/s/files/1/0011/8148/3072/products/frankie-good-intentions-wine-co-natural-Red-wine-Mount_Gambier-Australia-front_1512x.png?v=1660312955'},
    {'name': 'Pachna 2016', 'price': '55.95', 'description':'Pacina created this wine to celebrate the Etruscan God of wine, Pachna. This special wine is not produced every year and few bottles were made. The 100% Sangiovese is what you would expect it to be, earthy and powerful plus a natural kick. Definitely complex with blueberries and violets aromas, a real gem. It comes in two beautiful labels, one is designed by Giovanna\'s mother and the other by thier friend\'s daughter!', 'units':'8', 'units_sold':'31', 'image_url':'https://v2r8s3k5.rocketcdn.me/wp-content/uploads/2020/07/Pacina-pachna-16-2.jpg.webp'},
    {'name': 'Peekaboo Grenache Pét-Nat 2021', 'price': '33.95', 'description':'Jauma Peekaboo Grenache Pét-Nat 2020 is a natural wine made from 100% Grenache grapes farmed sustainably in McLaren Vale, Southern Australia.', 'units':'10', 'units_sold':'4', 'image_url':'https://cdn.shopify.com/s/files/1/0019/3363/9735/files/jauma-peek-a-boo-natural-wine-primal-wine.progressive.jpg?v=1683023715'},
    

            ]
# {'name': '', 'price': '', 'description':'', 'units':'', 'units_sold':'', 'image_url':''}
def make_products():
    
    Product.query.delete()

    products = []

    for product_dict in products:
        product = Product(
            name=product_dict["name"],
            price=product_dict["price"],
            description=product_dict["description"],
            units=product_dict["units"],
            units_sold=product_dict["units_sold"],
            image_url=product_dict["image_url"],
        )
        products.append(product)

    db.session.add_all(products)
    db.session.commit()
# def make_users():
#     emails = []
    
#     for _ in range(30):
#         email = fake.free_email()
#         while email in emails:
#             email = fake.email()
#         emails.append(email)
#         user = User(
#             email=email,
#             password = fake.password(length=8),
#             admin = False
#         )
#         emails.append(user)
#     db.session.add_all(emails)
#     db.session.commit()


if __name__ == '__main__':
    
    with app.app_context():
        print("Starting seed...")
        print("Seeding products...")
        make_products()
        print("Seeding users...")
        # make_users()
        # Seed code goes here!
