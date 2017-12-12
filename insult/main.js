

 // words borrowed from http://www.pangloss.com/seidel/shake_rule.html
  var adjectives = "artless, bawdy, beslubbering, bootless, churlish, cockered, clouted, craven, currish, dankish, dissembling, droning, errant, fawning, fobbing, froward, frothy, gleeking, goatish, gorbellied, impertinent, infectious, jarring, loggerheaded, lumpish, mammering, mangled, mewling, paunchy, pribbling, puking, puny, qualling, rank, reeky, roguish, ruttish, saucy, spleeny, spongy, surly, tottering, unmuzzled, vain, venomed, villainous, warped, wayward, weedy, yeasty, cullionly, fusty, caluminous, wimpled, burly-boned, misbegotten, odiferous, poisonous, fishified, Wart-necked".split(", ");
  var adverbes = "base-court, bat-fowling, ef-witted, beetle-headed, boil-brained, clapper-clawed, clay-brained, common-kissing, crook-pated, dismal-dreaming, dizzy-eyed, doghearted, dread-bolted, earth-vexing, elf-skinned, fat-kidneyed, fen-sucked, flap-mouthed, fly-bitten, folly-fallen, fool-born, full-gorged, guts-griping, lf-faced, hasty-witted, hedge-born, hell-hated, idle-headed, ill-breeding, ill-nurtured, knotty-pated, milk-livered, motley-minded, onion-eyed, plume-plucked, pottle-deep, pox-marked, reeling-ripe, rough-hewn, rude-growing, rump-fed, shard-borne, sheep-biting, spur-galled, swag-bellied, tardy-gaited, tickle-brained, toad-spotted, unchin-snouted, weather-bitten, whoreson, malmsey-nosed, rampallian, lily-livered, scurvy-valiant, brazen-faced, unwash'd, bunch-back'd, leaden-footed, muddy-mettled".split(", ");
  var nouns = "apple-john, baggage, barnacle, bladder, boar-pig, bugbear, bum-bailey, canker-blossom, clack-dish, clotpole, coxcomb, codpiece, death-token, dewberry, flap-dragon, flax-wench, flirt-gill, foot-licker, fustilarian, giglet, gudgeon, haggard, harpy, hedge-pig, horn-beast, hugger-mugger, joithead, lewdster, lout, maggot-pie, malt-worm, mammet, measle, minnow, miscreant, moldwarp, mumble-news, nut-hook, pigeon-egg, pignut, puttock, pumpion, ratsbane, scut, skainsmate, strumpet, varlot, vassal, whey-face, wagtail, knave, blind-worm, popinjay, scullian, jolt-head, malcontent, devil-monk, toad, rascal, Basket-Cockle".split(", ");
  var handActions = "Wave, Stroke, Pet, Tickle, Pat, Touch, Slap, Punch, Scratch, Grab, Snap, Click, Fiddle".toLowerCase().split (", ")
  var bodyParts = "ankle, arch, arm, armpit, beard, breast, calf, cheek, chest, chin, earlobe, elbow, eyebrow, eyelash, eyelid, face, finger, forearm, forehead, gum, heel, hip, index finger, jaw, knee, knuckle, leg, lip, mouth, mustache, nail, neck, nostril, palm, penis, pinkie, pupil, scalp, shin, shoulder, sideburns, thigh, throat, thumb, tongue, tooth, vagina, waist, wrist".split (", ");
  var familyMembers = "mother, mom, father, dad, parent, children, son, daughter, sister, brother, grandmother, grandfather, grandparent, grandson, granddaughter, grandchild, aunt, uncle, niece, nephew, cousin, husband, wife, sister-in-law, brother-in-law, mother-in-law, father-in-law, partner, fiancé, fiancée, stepmother, stepfather, ex".split (", ");
  var smells = "Agreeable, Airy, Antiseptic, Appealing, Aromatic, Bad, Balmy, Bitter, Bouquet, Burning, Citrus Clean, Damp, Decomposing, Delicious, Deodorized, Disagreeable, Disgusting, like disinfectant, Distinct, Earthy, Fetid, Fetid, Fishy, Flowery, Foul, Foul, Fragrant, Fresh, Fulsome, Fusty, Gamy, Graveolent, like Incense, Intoxicating, Lemony, like Lilac,Malodorous, Medicinal, Mild, Minty, Moldy, Musky, Musty, Niodorous, Noxious, Odoriferous, Offensive, Oily, Olid, Perfumed, Piney, Pleasing, Poisonous, like Potpourri, Pungent, Putrefy, Putrid,Rancid, Rank, Redolent, Reek, Resinous, Roses, Rotten, Salty, Savory, Scented, Sickening, like Skunk, Smelly, Smoky, Snuffly, Sour, Spicy, Stale, Stinky, Strong, Sweet, Tangy, Unscented, Ventilated, Wet, Woodsy".toLowerCase().split (", ");
  var tastes = "Acerbic, Acidic, Acrid, Appetizing, Biting, Bitter, Bitter, Bland, Briny, Cold, Cool, Creamy, Delectable, Delicious, Dry, Dulcet, Flavorful, Foul, Fresh, Fruity, Full-bodied, Gamy, Gooey, Hearty, Honey, Hot, Juicy, Medium, Mild, Mouth-watering, Nutty, Palatable, Peppery, Pickled, Piquant, Pleasing, Pungent, Rancid, Rank, Rare, Ripe, Rotten, Saccharine, Saline, Salty, Saporific, Savory, Scrumptious, Seasonings, Sec, Sharp, Sour, Spicy, Spoiled, Sticky, Stinky, Strong, Succulent, Sugary, Sweet, Sweet-and-sour, Syrupy, Tangy, Tart, Tasteless, Tasty, Vinegary, Warm, Weak, Well-done, Yummy, Zesty".toLowerCase().split (", ");
  var mammals = "african lion, little red flying fox, llama, lynx, manatee, mandrill, meerkat, mongoose, moose (elk), mountain goat, mountain gorilla, mountain lion, mouse lemur, musk-ox, mole rat, narwhal, north american river otter, nutria, ocelot, opossum, orangutan, orca killer whale, ozark big-eared bat, platypus, polar bear, porcupine, prairie dog, proboscis monkey, pronghorn, przewalski’s horse, raccoon, red fox, red kangaroo, red leaf monkey, red panda, red uakari, rhesus monkey, right whale, ringed seal, ring-tailed lemur, rocky mountain bighorn sheep, sea otter, siberian tiger, sifaka, skunk, sloth bear, snow leopard, snowshoe hare, spectacled bear, sperm whale, spider monkey, spotted hyena, squirrel, steller sea lion, sumatran rhinoceros, sumatran tiger, sun bear, tapir, tasmanian devil, thomson’s gazelle, three-toed sloth, two-toed sloth, wallaby, walrus, warthog, water buffalo, weddell seal, western lowland gorilla, white rhinoceros, blue whale, humpback whale".toLowerCase().split(", ")


 function noun(){ return nouns[Math.floor(Math.random()*nouns.length)] }
 function adj(){ return adjectives[Math.floor(Math.random()*adjectives.length)] }
 function adv(){ return adverbes[Math.floor(Math.random()*adverbes.length)] }
 function hand(){ return handActions[Math.floor(Math.random()*handActions.length)] }
 function body(){ return bodyParts[Math.floor(Math.random()*bodyParts.length)] }
 function animal(){ return mammals[Math.floor(Math.random()* mammals.length)] }
 function fam(){ return familyMembers[Math.floor(Math.random()*familyMembers.length)] }
 function smell(){ return smells[Math.floor(Math.random()*smells.length)] }
 function taste(){ return tastes[Math.floor(Math.random()*tastes.length)] }
 function toProper(word){
   var properWord = word[0].toUpperCase();
   for (var i = 1; i < word.length; i++){
     properWord += word[i];
   }
   return properWord;
 }
 function insult(){
   var insultArray = []
   insultArray.push(["You ", animal(), ", you ", body(), ", you ", noun(), "!"]);
   insultArray.push(["Your ", body(), " smells ", smell(), " and your ", fam(), " is quite a ", adj(), " ", animal(), "."]);
   insultArray.push(["You're ", adv(), " and your ", fam(), " is a ", adj(), " ", noun(), "."]);
   insultArray.push(["Your ", body(), " tastes ", taste(), ", like a ", smell(), " ", animal(), "."]);
   insultArray.push(["I ", hand(), " your ", body(), ", like a ", adj(), " ", animal(), "."]);
   insultArray.push(["Your ",fam(), " smells ", smell(),", like a ", adv(), " ", body(), "."]);
   insultArray.push(["My ",body(), " smells better than your ", fam(), "!"]);
   insultArray.push(["Wild ",animal(), " will certainly ", hand(), " your ", fam(), "'s ", body(), " given the first opportunity."]);
   insultArray.push(["Stop eating all the ", taste(), " ", animal(), "s, you ", smell()," ", body(), "!"]);
   return insultArray[Math.floor(Math.random()*insultArray.length)].join("");
 }

function respondToKey(e){
   if (e.keyCode == "32") {
     document.getElementById("insult").innerHTML = insult();
   }
}


  document.getElementById("button").addEventListener("click", function(){
     document.getElementById("insult").innerHTML = insult();
  });

  document.addEventListener('keyup', respondToKey, false);
  document.getElementById("insult").innerHTML = insult();
