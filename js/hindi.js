// ================= Hindi (Kruti Dev 010) =================
// Hindi content is written in Unicode and converted to Kruti Dev 010 key sequences,
// i.e. the exact keys a Kruti Dev typist presses on an English keyboard.

const HI_WORDS = [
  "घर", "पानी", "किताब", "स्कूल", "बच्चा", "माता", "पिता", "भाई", "बहन", "दोस्त", "खाना", "समय",
  "काम", "देश", "शहर", "गांव", "सूरज", "चांद", "बादल", "बारिश", "हवा", "पेड़", "फूल", "फल", "नदी",
  "पहाड़", "सड़क", "गाड़ी", "दिन", "रात", "सुबह", "शाम", "कल", "आज", "अच्छा", "सुंदर", "बड़ा",
  "छोटा", "नया", "पुराना", "खुशी", "प्यार", "मेहनत", "सफलता", "ज्ञान", "शिक्षा", "भारत", "भाषा",
  "हिंदी", "कलम", "कागज", "मेज", "कुर्सी", "दरवाजा", "खिड़की", "बाजार", "दुकान", "पैसा", "जीवन",
  "परिवार", "मित्र", "विद्यालय", "अध्यापक", "धर्म", "कार्य", "सूर्य", "प्रकाश", "सरकार", "किसान"
];

const HI_PARAGRAPHS = [
  "भारत एक विशाल देश है। यहां अनेक धर्म, भाषाएं और संस्कृतियां एक साथ मिलकर रहती हैं। हमारे देश की सबसे बड़ी शक्ति इसकी विविधता में एकता है। हर राज्य का अपना खान पान, पहनावा और त्योहार है।",
  "कंप्यूटर आज हमारे जीवन का एक जरूरी हिस्सा बन गया है। बैंक, स्कूल, कार्यालय और अस्पताल सभी जगह इसका उपयोग होता है। टाइपिंग सीखने से काम जल्दी और सही तरीके से होता है।",
  "समय का सही उपयोग करना जीवन में सफलता की कुंजी है। जो व्यक्ति समय का सम्मान करता है, समय भी उसका सम्मान करता है। हमें हर दिन कुछ नया सीखने का प्रयास करना चाहिए।",
  "स्वच्छ भारत अभियान देश को साफ और सुंदर बनाने का एक बड़ा प्रयास है। हमें अपने घर, गली और शहर को स्वच्छ रखना चाहिए। कचरा हमेशा कूड़ेदान में ही डालना चाहिए।",
  "पेड़ हमारे सच्चे मित्र हैं। ये हमें शुद्ध हवा, फल, फूल और छाया देते हैं। हमें अधिक से अधिक पेड़ लगाने चाहिए और उनकी रक्षा करनी चाहिए।",
  "शिक्षा मनुष्य के जीवन का सबसे बड़ा धन है। पढ़ा लिखा व्यक्ति अपने परिवार और समाज दोनों की उन्नति में सहायक होता है। इसलिए हर बच्चे को स्कूल जाना चाहिए।"
];

const HI_ALPHA = [
  "अ", "आ", "इ", "ई", "उ", "ए", "ऐ", "ओ", "औ", "क", "ख", "ग", "घ", "च", "छ", "ज", "झ", "ट", "ठ",
  "ड", "ढ", "ण", "त", "थ", "द", "ध", "न", "प", "फ", "ब", "भ", "म", "य", "र", "ल", "व", "श", "ष",
  "स", "ह", "का", "कि", "की", "कु", "कू", "के", "कै", "को", "कौ", "कं", "मा", "मि", "मी", "मे", "मो"
];

// Unicode -> Kruti Dev 010, applied in this order (longest / most specific first)
const KRUTI_MAP = [
  ["।", "A"], [",", "]"],
  ["क्ष्", "{"], ["क्ष", "{k"], ["त्र", "="], ["ज्ञ", "K"], ["श्र", "J"],
  ["द्ध", ")"], ["द्य", "|"], ["द्व", "}"], ["रु", "#"], ["रू", ":"],
  ["्र", "z"],
  ["क्", "D"], ["ख्", "["], ["ग्", "X"], ["घ्", "?"], ["च्", "P"], ["ज्", "T"], ["त्", "R"],
  ["थ्", "F"], ["ध्", "/"], ["न्", "U"], ["प्", "I"], ["ब्", "C"], ["भ्", "H"], ["म्", "E"],
  ["ल्", "Y"], ["व्", "O"], ["श्", "'"], ["ष्", "\""], ["स्", "L"],
  ["औ", "vkS"], ["ओ", "vks"], ["ऐ", ",s"], ["आ", "vk"], ["अ", "v"], ["इ", "b"], ["ई", "bZ"],
  ["उ", "m"], ["ए", ","], ["ऋ", "_"],
  ["ख", "[k"], ["घ", "?k"], ["ण", ".k"], ["थ", "Fk"], ["ध", "/k"], ["भ", "Hk"], ["श", "'k"], ["ष", "\"k"],
  ["क", "d"], ["ग", "x"], ["च", "p"], ["छ", "N"], ["ज", "t"], ["झ", ">"], ["ट", "V"], ["ठ", "B"],
  ["ड", "M"], ["ढ", "<"], ["त", "r"], ["द", "n"], ["न", "u"], ["प", "i"], ["फ", "Q"], ["ब", "c"],
  ["म", "e"], ["य", ";"], ["र", "j"], ["ल", "y"], ["व", "o"], ["स", "l"], ["ह", "g"],
  ["ो", "ks"], ["ौ", "kS"], ["ा", "k"], ["ी", "h"], ["ु", "q"], ["ू", "w"], ["ृ", "`"],
  ["े", "s"], ["ै", "S"], ["ं", "a"], ["ः", "%"], ["़", "+"], ["्", "~"]
];

const CONS = "[क-ह]़?";
const REPH_RE = new RegExp(`र्(${CONS}(?:्${CONS})*)([ा-ौं]*)`, "g");
const I_MATRA_RE = new RegExp(`((?:${CONS}्)*${CONS})ि`, "g");

function toKruti(text) {
  // reph (र् above a letter) is typed as Z after the letter and its matra
  let s = text.replace(REPH_RE, "$1$2Z");
  // ि is typed (f) before the whole consonant cluster
  s = s.replace(I_MATRA_RE, "f$1");
  for (const [from, to] of KRUTI_MAP) s = s.split(from).join(to);
  return s;
}

// Split Unicode text into aksharas (what you see as one letter) and attach the
// Kruti Dev keys for each, so the screen shows real Hindi while typing uses Kruti keys.
const AKSHARA_RE = new RegExp(
  `(?:${CONS}्)*${CONS}[ा-ौ]?[ँ-ः]?|[अ-औ][ँ-ः]?|[\\s\\S]`, "g"
);

function toSegments(text) {
  return text.match(AKSHARA_RE).map((u) => ({ u, k: toKruti(u) }));
}

// Kruti Dev key -> the Hindi sign it types (shown on the on-screen keyboard)
const KEY_GLYPH = { f: "ि", Z: "र्", ".": "ण्" };
for (const [u, k] of KRUTI_MAP) if (k.length === 1 && !(k in KEY_GLYPH)) KEY_GLYPH[k] = u;

// Matras and signs get a dotted circle so they are readable on their own
function glyphFor(key) {
  const g = KEY_GLYPH[key];
  if (!g) return "";
  return /^[ऀ-ःऺ-ॏ]/.test(g) ? "◌" + g : g;
}

const HINDI = {
  words: HI_WORDS.map(toSegments),
  paragraphs: HI_PARAGRAPHS.map(toSegments),
  alpha: HI_ALPHA.map(toSegments)
};

if (typeof module !== "undefined") module.exports = { toKruti, toSegments, glyphFor, HINDI, HI_WORDS, HI_PARAGRAPHS, HI_ALPHA };
