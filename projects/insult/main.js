

 // words borrowed from http://www.pangloss.com/seidel/shake_rule.html
  var adjectives = "artless, bawdy, beslubbering, bootless, churlish, cockered, clouted, craven, currish, dankish, dissembling, droning, errant, fawning, fobbing, froward, frothy, gleeking, goatish, gorbellied, impertinent, infectious, jarring, loggerheaded, lumpish, mammering, mangled, mewling, paunchy, pribbling, puking, puny, qualling, rank, reeky, roguish, ruttish, saucy, spleeny, spongy, surly, tottering, unmuzzled, vain, venomed, villainous, warped, wayward, weedy, yeasty, cullionly, fusty, caluminous, wimpled, burly-boned, misbegotten, odiferous, poisonous, fishified, Wart-necked".split(", ");
  var adverbes = "base-court, bat-fowling, ef-witted, beetle-headed, boil-brained, clapper-clawed, clay-brained, common-kissing, crook-pated, dismal-dreaming, dizzy-eyed, doghearted, dread-bolted, earth-vexing, elf-skinned, fat-kidneyed, fen-sucked, flap-mouthed, fly-bitten, folly-fallen, fool-born, full-gorged, guts-griping, lf-faced, hasty-witted, hedge-born, hell-hated, idle-headed, ill-breeding, ill-nurtured, knotty-pated, milk-livered, motley-minded, onion-eyed, plume-plucked, pottle-deep, pox-marked, reeling-ripe, rough-hewn, rude-growing, rump-fed, shard-borne, sheep-biting, spur-galled, swag-bellied, tardy-gaited, tickle-brained, toad-spotted, unchin-snouted, weather-bitten, whoreson, malmsey-nosed, rampallian, lily-livered, scurvy-valiant, brazen-faced, unwash'd, bunch-back'd, leaden-footed, muddy-mettled".split(", ");
  var nouns = "apple-john, baggage, barnacle, bladder, boar-pig, bugbear, bum-bailey, canker-blossom, clack-dish, clotpole, coxcomb, codpiece, death-token, dewberry, flap-dragon, flax-wench, flirt-gill, foot-licker, fustilarian, giglet, gudgeon, haggard, harpy, hedge-pig, horn-beast, hugger-mugger, joithead, lewdster, lout, maggot-pie, malt-worm, mammet, measle, minnow, miscreant, moldwarp, mumble-news, nut-hook, pigeon-egg, pignut, puttock, pumpion, ratsbane, scut, skainsmate, strumpet, varlot, vassal, whey-face, wagtail, knave, blind-worm, popinjay, scullian, jolt-head, malcontent, devil-monk, toad, rascal, Basket-Cockle".split(", ");
  var handActions = "Wave, Stroke, Pet, Tickle, Pat, Touch, Slap, Punch, Scratch, Grab, Snap, Click, Fiddle".toLowerCase().split (", ");
  var bodyParts = "ankle, arch, arm, armpit, beard, breast, calf, cheek, chest, chin, earlobe, elbow, eyebrow, eyelash, eyelid, face, finger, forearm, forehead, gum, heel, hip, index finger, jaw, knee, knuckle, leg, lip, mouth, mustache, nail, neck, nostril, palm, penis, pinkie, pupil, scalp, shin, shoulder, sideburns, thigh, throat, thumb, tongue, tooth, vagina, waist, wrist".split (", ");
  var familyMembers = "mother, mom, father, dad, parent, children, son, daughter, sister, brother, grandmother, grandfather, grandparent, grandson, granddaughter, grandchild, aunt, uncle, niece, nephew, cousin, husband, wife, sister-in-law, brother-in-law, mother-in-law, father-in-law, partner, fiancé, fiancée, stepmother, stepfather, ex".split (", ");
  var smells = "Agreeable, Airy, Antiseptic, Appealing, Aromatic, Bad, Balmy, Bitter, Bouquet, Burning, Citrus Clean, Damp, Decomposing, Delicious, Deodorized, Disagreeable, Disgusting, like disinfectant, Distinct, Earthy, Fetid, Fetid, Fishy, Flowery, Foul, Foul, Fragrant, Fresh, Fulsome, Fusty, Gamy, Graveolent, like Incense, Intoxicating, Lemony, like Lilac,Malodorous, Medicinal, Mild, Minty, Moldy, Musky, Musty, Niodorous, Noxious, Odoriferous, Offensive, Oily, Olid, Perfumed, Piney, Pleasing, Poisonous, like Potpourri, Pungent, Putrefy, Putrid,Rancid, Rank, Redolent, Reek, Resinous, Roses, Rotten, Salty, Savory, Scented, Sickening, like Skunk, Smelly, Smoky, Snuffly, Sour, Spicy, Stale, Stinky, Strong, Sweet, Tangy, Unscented, Ventilated, Wet, Woodsy".toLowerCase().split (", ");
  var tastes = "Acerbic, Acidic, Acrid, Appetizing, Biting, Bitter, Bitter, Bland, Briny, Cold, Cool, Creamy, Delectable, Delicious, Dry, Dulcet, Flavorful, Foul, Fresh, Fruity, Full-bodied, Gamy, Gooey, Hearty, Honey, Hot, Juicy, Medium, Mild, Mouth-watering, Nutty, Palatable, Peppery, Pickled, Piquant, Pleasing, Pungent, Rancid, Rank, Rare, Ripe, Rotten, Saccharine, Saline, Salty, Saporific, Savory, Scrumptious, Seasonings, Sec, Sharp, Sour, Spicy, Spoiled, Sticky, Stinky, Strong, Succulent, Sugary, Sweet, Sweet-and-sour, Syrupy, Tangy, Tart, Tasteless, Tasty, Vinegary, Warm, Weak, Well-done, Yummy, Zesty".toLowerCase().split (", ");
  var mammals = "Aardvark, African Elephant, African Wild Dog, African Lion, Arabian (Dromedary) Camel Arctic Fox, Arctic Hare, Armadillo, Asian Elephant, Asian Lion, Aye-Aye, Baboon, Bactrian Camel, Beaver, Black Bear, Beluga Whale, Bengal Tiger, Black Bear, Black-Footed Ferret, Black Rhinoceros, Blue Whale, Bobcat, Bottlenose Dolphin, Brown Bear, California Sea Lion, Caribou, Cheetah, Chimpanzee, Chipmunk, Clouded Leopard, Common Vampire Bat Common Wombat, Cottontail Rabbit, Cougar, Coyote, Dingo, Domestic Cat, Domestic Dog, Dugong, Eastern Gray Kangaroo, African Elephant, Asian Elephant, Elephant Seal, Elk (Moose), Fennec Fox, Fossa, Fennec Fox, Fur Seal, Gelada, Giant Anteater, Giant Panda, Giant River Otter, Gibbon, Giraffe, Golden Lion Tamarin, Gray Whale, Grizzly Bear, Groundhog, Harbor Porpoise, Hare, Arctic Hare, Harp Seal, Hawaiian Monk Seal, Hedgehog, Hippopotamus, Horse, Howler Monkey, Humpback Whale, Impala, Indian Rhinoceros, Jaguar, Orca Killer Whale, Kinkajou, Koala, Leopard, Leopard Seal, African Lion, Little Red Flying Fox, Llama, Lynx, Manatee, Mandrill, Meerkat, Mongoose, Moose (Elk), Mountain Goat, Mountain Gorilla, Mountain Lion, Mouse Lemur, Musk-Ox, Mole Rat, Narwhal, North American River Otter, Nutria, Ocelot, Opossum, Orangutan, Orca Killer Whale, Ozark Big-Eared Bat, Platypus, Polar Bear, Porcupine, Prairie Dog, Proboscis Monkey, Pronghorn, Przewalski’s Horse, Raccoon, Red Fox, Red Kangaroo, Red Leaf Monkey, Red Panda, Red Uakari, Rhesus Monkey, Right Whale, Ringed Seal, Ring-Tailed Lemur, Rocky Mountain Bighorn Sheep, Sea Otter, Siberian Tiger, Sifaka, Skunk, Sloth Bear, Snow Leopard, Snowshoe Hare, Spectacled Bear, Sperm Whale, Spider Monkey, Spotted Hyena, Squirrel, Steller Sea Lion, Sumatran Rhinoceros, Sumatran Tiger, Sun Bear, Tapir, Tasmanian Devil, Thomson’s Gazelle, Three-Toed Sloth, Two-Toed Sloth, Wallaby, Walrus, Warthog, Water Buffalo, Weddell Seal, Western Lowland Gorilla, White Rhinoceros, Blue Whale, Humpback Whale, White-Eared Kob, White-Tailed Deer, Wildebeest, Wolf, Wolverine, Zebra".toLowerCase().split (", ");
  var outrageText = "You don't mean that., You wouldn't!, Oh no you didn't., Say what?, Say that one more time., How dare you!".split(", ");


 function noun(){ return nouns[Math.floor(Math.random()*nouns.length)] }
 function adj(){ return adjectives[Math.floor(Math.random()*adjectives.length)] }
 function adv(){ return adverbes[Math.floor(Math.random()*adverbes.length)] }
 function hand(){ return handActions[Math.floor(Math.random()*handActions.length)] }
 function body(){ return bodyParts[Math.floor(Math.random()*bodyParts.length)] }
 function animal(){ return mammals[Math.floor(Math.random()* mammals.length)] }
 function fam(){ return familyMembers[Math.floor(Math.random()*familyMembers.length)] }
 function smell(){ return smells[Math.floor(Math.random()*smells.length)] }
 function taste(){ return tastes[Math.floor(Math.random()*tastes.length)] }
 function outrage(){ return outrageText[Math.floor(Math.random()*outrageText.length)] }
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
     updateInsult();
   }
}


  document.getElementById("button").addEventListener("click", function(){
     updateInsult();
  });

  document.addEventListener('keyup', respondToKey, false);

  updateInsult();

  function updateInsult(){
  	document.getElementById("insult").innerHTML = insult();
  	document.getElementById("button").innerHTML = outrage();
  }
