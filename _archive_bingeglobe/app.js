/**
 * BingeGlobe — World Web Series Portal
 * Dataset, search, filtering, modal reviews, and interactive persistence.
 */

// Initial curated database of world-renowned web series with official poster images
const DEFAULT_SERIES = [
  {
    id: "breaking-bad",
    title: "Breaking Bad",
    year: "2008 – 2013",
    seasons: "5 Seasons (62 Episodes)",
    country: "USA",
    countryFlag: "🇺🇸",
    platform: "Netflix",
    genres: ["Crime", "Drama", "Thriller"],
    imdb: 9.5,
    rottenTomatoes: "96%",
    creator: "Vince Gilligan",
    cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn", "Giancarlo Esposito", "Bob Odenkirk"],
    image: "images/breaking-bad.jpg",
    fallbackImage: "https://static.tvmaze.com/uploads/images/original_untouched/501/1253519.jpg",
    gradient: "linear-gradient(135deg, #064e3b 0%, #022c22 100%)",
    summary: "A mild-mannered high school chemistry teacher diagnosed with terminal lung cancer teams up with a former delinquent student to manufacture and distribute crystal meth to secure his family's financial future.",
    review: "Universally acknowledged as a masterclass in visual storytelling and moral decay. Bryan Cranston delivers one of the greatest acting performances in television history as Walter White shifts from sympathetic underachiever to ruthless kingpin Heisenberg. The writing is surgical, with flawless character arcs, nail-biting tension, and poetic closure.",
    pros: ["Flawless pacing and zero filler episodes", "Iconic character evolution of Walter White & Jesse Pinkman", "Exceptional cinematography and visual symbolism"],
    cons: ["Early season 1 pacing requires mild patience from newcomers"],
    verdict: "A benchmark of peak television drama that never falters from start to finish."
  },
  {
    id: "dark",
    title: "Dark",
    year: "2017 – 2020",
    seasons: "3 Seasons (26 Episodes)",
    country: "Germany",
    countryFlag: "🇩🇪",
    platform: "Netflix",
    genres: ["Sci-Fi", "Mystery", "Drama", "Thriller"],
    imdb: 8.7,
    rottenTomatoes: "95%",
    creator: "Baran bo Odar, Jantje Friese",
    cast: ["Louis Hofmann", "Oliver Masucci", "Jördis Triebel", "Maja Schöne", "Karoline Eichhorn"],
    image: "images/dark.jpg",
    fallbackImage: "https://static.tvmaze.com/uploads/images/original_untouched/504/1262352.jpg",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)",
    summary: "The disappearance of two children in the small German forest town of Winden exposes the double lives, fractured relationships, and a mind-bending time travel conspiracy spanning four interconnected generations.",
    review: "Dark is arguably the most intricate, meticulously plotted sci-fi mystery ever committed to screen. Unlike time-travel stories that collapse under paradoxes, Dark's creators crafted a deterministic, razor-sharp narrative where every piece clicks into place like clockwork. Augmented by an eerie acoustic score and breathtaking melancholic visuals.",
    pros: ["One of the most coherent and satisfying time-travel conclusions", "Atmospheric, brooding German woodland cinematography", "Extraordinary casting across multi-generational counterparts"],
    cons: ["Demands undivided viewer attention and family tree tracking"],
    verdict: "A cerebral sci-fi masterpiece that rewards deep analytical viewing."
  },
  {
    id: "squid-game",
    title: "Squid Game (오징어 게임)",
    year: "2021 – Present",
    seasons: "2 Seasons (15+ Episodes)",
    country: "South Korea",
    countryFlag: "🇰🇷",
    platform: "Netflix",
    genres: ["Thriller", "Drama", "Action", "Mystery"],
    imdb: 8.0,
    rottenTomatoes: "95%",
    creator: "Hwang Dong-hyuk",
    cast: ["Lee Jung-jae", "Park Hae-soo", "Jung Ho-yeon", "Wi Ha-joon", "Oh Young-soo"],
    image: "images/squid-game.jpg",
    fallbackImage: "https://static.tvmaze.com/uploads/images/original_untouched/576/1440521.jpg",
    gradient: "linear-gradient(135deg, #831843 0%, #1e1b4b 100%)",
    summary: "Hundreds of cash-strapped South Korean citizens accept a mysterious invitation to compete in children's playground games for a 45.6 billion won grand prize, only to discover losing results in immediate death.",
    review: "A thunderous worldwide cultural phenomenon that combines visceral survival suspense with biting socio-economic allegory. The candy-colored art direction provides a haunting contrast to the brutal moral dilemmas contestants face. Lee Jung-jae's grounded, emotional vulnerability anchors the heart-pounding spectacle.",
    pros: ["Brilliant critique of debt, capitalism, and modern inequality", "Instantly recognizable, vibrant production design", "Edge-of-your-seat tension in every children's game contest"],
    cons: ["English-speaking VIP dialogue in later episodes feels theatrical"],
    verdict: "High-octane survival thriller that defined a generation of global streaming."
  },
  {
    id: "money-heist",
    title: "Money Heist (La Casa de Papel)",
    year: "2017 – 2021",
    seasons: "5 Seasons (41 Episodes)",
    country: "Spain",
    countryFlag: "🇪🇸",
    platform: "Netflix",
    genres: ["Crime", "Action", "Thriller", "Drama"],
    imdb: 8.2,
    rottenTomatoes: "94%",
    creator: "Álex Pina",
    cast: ["Álvaro Morte", "Úrsula Corberó", "Pedro Alonso", "Itziar Ituño", "Alba Flores"],
    image: "images/money-heist.jpg",
    fallbackImage: "https://static.tvmaze.com/uploads/images/original_untouched/430/1076004.jpg",
    gradient: "linear-gradient(135deg, #7f1d1d 0%, #450a0a 100%)",
    summary: "A criminal mastermind who goes by 'The Professor' plans the biggest heist in recorded history: infiltrating the Royal Mint of Spain to print billions of euros while playing a psychological chess match with police.",
    review: "Money Heist redefined adrenaline on streaming with non-stop plot twists, iconic Salvador Dalí red-jumpsuit aesthetics, and the magnetic anti-establishment anthem 'Bella Ciao'. The Professor's hyper-calculated contingency plans keep audiences guessing until the final second.",
    pros: ["Unstoppable adrenaline, tactical chess games, and high stakes", "Deeply charismatic ensemble cast, particularly Berlin and El Profesor", "Emotional catharsis and infectious rebellious energy"],
    cons: ["Later bank heists lean heavily into melodrama and improbable escapes"],
    verdict: "An exhilarating, pulse-pounding Spanish crime adventure."
  },
  {
    id: "chernobyl",
    title: "Chernobyl",
    year: "2019",
    seasons: "1 Season (5 Episodes)",
    country: "USA / UK",
    countryFlag: "🇺🇸",
    platform: "HBO",
    genres: ["Historical", "Drama", "Thriller"],
    imdb: 9.4,
    rottenTomatoes: "96%",
    creator: "Craig Mazin",
    cast: ["Jared Harris", "Stellan Skarsgård", "Emily Watson", "Paul Ritter", "Jessie Buckley"],
    image: "images/chernobyl.jpg",
    fallbackImage: "https://static.tvmaze.com/uploads/images/original_untouched/193/482599.jpg",
    gradient: "linear-gradient(135deg, #3f3f46 0%, #18181b 100%)",
    summary: "A harrowing dramatization of the April 1986 catastrophic nuclear power plant explosion in the Ukrainian Soviet Socialist Republic and the brave men and women who sacrificed everything to save Europe from total disaster.",
    review: "Chernobyl is arguably the finest historical miniseries ever created. Craig Mazin treats the human cost of bureaucratic lies and state censorship with unsparing gravity. Jared Harris and Stellan Skarsgård form an indelible duo, and the depiction of ionizing radiation is depicted like an invisible monster film.",
    pros: ["Utterly authentic historical recreation and production design", "Chilling sound design composed using real nuclear plant acoustics", "Profound, timeless exploration of what happens when truth is suppressed"],
    cons: ["Extremely grim and emotionally taxing to watch in a single sitting"],
    verdict: "An extraordinary, chilling historical document that should be mandatory viewing."
  },
  {
    id: "succession",
    title: "Succession",
    year: "2018 – 2023",
    seasons: "4 Seasons (39 Episodes)",
    country: "USA",
    countryFlag: "🇺🇸",
    platform: "HBO",
    genres: ["Drama", "Comedy"],
    imdb: 8.9,
    rottenTomatoes: "95%",
    creator: "Jesse Armstrong",
    cast: ["Brian Cox", "Jeremy Strong", "Sarah Snook", "Kieran Culkin", "Matthew Macfadyen", "Nicholas Braun"],
    image: "images/succession.jpg",
    fallbackImage: "https://static.tvmaze.com/uploads/images/original_untouched/453/1134275.jpg",
    gradient: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
    summary: "The Roy family, owners of the global media and entertainment conglomerate Waystar RoyCo, descend into ruthless corporate betrayal and emotional warfare when their aging patriarch Logan Roy suffers declining health.",
    review: "Modern Shakespeare wrapped in boardrooms and superyachts. Jesse Armstrong's acidic dialogue, combined with Nicholas Britell's iconic classical-hip-hop score, elevates corporate maneuvering to operatic heights. Every sibling's desperation for their father's love and approval is tragic, hilarious, and deeply moving.",
    pros: ["Sharpest, most wickedly witty script in 21st-century drama", "Incredible chemistry between Tom Wambsgans and Cousin Greg", "Jeremy Strong's devastating portrayal of Kendall Roy"],
    cons: ["Unapologetically unlikable characters might alienate some viewers initially"],
    verdict: "The supreme satirical dissection of wealth, power, and generational trauma."
  },
  {
    id: "stranger-things",
    title: "Stranger Things",
    year: "2016 – Present",
    seasons: "4 Seasons (34+ Episodes)",
    country: "USA",
    countryFlag: "🇺🇸",
    platform: "Netflix",
    genres: ["Sci-Fi", "Horror", "Drama", "Fantasy"],
    imdb: 8.7,
    rottenTomatoes: "92%",
    creator: "The Duffer Brothers",
    cast: ["Millie Bobby Brown", "David Harbour", "Winona Ryder", "Finn Wolfhard", "Gaten Matarazzo", "Sadie Sink"],
    image: "images/stranger-things.jpg",
    fallbackImage: "https://static.tvmaze.com/uploads/images/original_untouched/595/1489169.jpg",
    gradient: "linear-gradient(135deg, #881337 0%, #1e1b4b 100%)",
    summary: "In 1980s Indiana, a young boy vanishes into thin air. As his friends and family search for answers, they unravel secret government experiments, terrifying supernatural monsters, and a strange telekinetic girl.",
    review: "A magnificent love letter to 80s Amblin cinema and Stephen King novels. The series captured the global imagination with its irresistible nostalgic synthwave atmosphere, authentic coming-of-age camaraderie, and genuinely frightening creature designs from the Upside Down.",
    pros: ["Endearing, relatable child cast with undeniable chemistry", "Immersive 80s nostalgia and sensational synth-heavy soundtrack", "Blockbuster movie-quality VFX and set-pieces in Season 4"],
    cons: ["Cast bloat in later seasons splits storylines thin at times"],
    verdict: "The quintessential pop-culture adventure series of modern streaming."
  },
  {
    id: "peaky-blinders",
    title: "Peaky Blinders",
    year: "2013 – 2022",
    seasons: "6 Seasons (36 Episodes)",
    country: "UK",
    countryFlag: "🇬🇧",
    platform: "BBC",
    genres: ["Crime", "Drama", "Historical"],
    imdb: 8.8,
    rottenTomatoes: "93%",
    creator: "Steven Knight",
    cast: ["Cillian Murphy", "Paul Anderson", "Helen McCrory", "Tom Hardy", "Sophie Rundle"],
    image: "images/peaky-blinders.jpg",
    fallbackImage: "https://static.tvmaze.com/uploads/images/original_untouched/48/122213.jpg",
    gradient: "linear-gradient(135deg, #27272a 0%, #18181b 100%)",
    summary: "Set in Birmingham, England after World War I, ambitious criminal gang leader Thomas Shelby leads the razor-capped Peaky Blinders as he expands their illegal empire into legitimate politics and international racketeering.",
    review: "Stylized, gritty, and fiercely charismatic. Cillian Murphy's Tommy Shelby is an enigmatic, haunted war veteran whose icy calculations are mesmerizing to observe. Anchored by the late, extraordinary Helen McCrory as Aunt Polly and electrifying appearances by Tom Hardy as Alfie Solomons.",
    pros: ["Unmatched swagger, tailored period fashion, and modern rock soundtrack", "Cillian Murphy's commanding tour-de-force presence", "Brutal and realistic look at post-WWI industrial Britain"],
    cons: ["Formulaic structure in middle seasons where Tommy always outwits rivals last-minute"],
    verdict: "A swaggering, brooding period crime triumph of British television."
  },
  {
    id: "severance",
    title: "Severance",
    year: "2022 – Present",
    seasons: "1+ Season (9+ Episodes)",
    country: "USA",
    countryFlag: "🇺🇸",
    platform: "Apple TV+",
    genres: ["Sci-Fi", "Thriller", "Mystery", "Drama"],
    imdb: 8.7,
    rottenTomatoes: "97%",
    creator: "Dan Erickson (Directed by Ben Stiller)",
    cast: ["Adam Scott", "Patricia Arquette", "John Turturro", "Christopher Walken", "Britt Lower"],
    image: "images/severance.jpg",
    fallbackImage: "https://static.tvmaze.com/uploads/images/original_untouched/548/1371406.jpg",
    gradient: "linear-gradient(135deg, #0369a1 0%, #082f49 100%)",
    summary: "Employees at Lumon Industries undergo a surgical procedure called 'severance' to separate their personal memories from their work memories. When a colleague goes missing outside, an employee begins discovering the sinister reality behind their repetitive tasks.",
    review: "A jaw-droppingly original, claustrophobic workplace thriller. Ben Stiller's direction balances chilling sterile corporate dystopia with poignant human emotion. The Season 1 finale is a textbook lesson in building suspense, leaving audiences gasping for answers.",
    pros: ["Profoundly inventive dystopian premise on work-life balance", "Eerie, immaculate mid-century office architectural design", "One of the most thrilling season finales in modern television history"],
    cons: ["Deliberate slow-burn mystery pacing in the opening three episodes"],
    verdict: "A smart, chilling, and visually captivating original sci-fi triumph."
  },
  {
    id: "sacred-games",
    title: "Sacred Games",
    year: "2018 – 2019",
    seasons: "2 Seasons (16 Episodes)",
    country: "India",
    countryFlag: "🇮🇳",
    platform: "Netflix",
    genres: ["Crime", "Drama", "Mystery", "Thriller"],
    imdb: 8.5,
    rottenTomatoes: "92%",
    creator: "Vikramaditya Motwane, Anurag Kashyap",
    cast: ["Saif Ali Khan", "Nawazuddin Siddiqui", "Radhika Apte", "Pankaj Tripathi", "Kalki Koechlin"],
    image: "images/sacred-games.jpg",
    fallbackImage: "https://static.tvmaze.com/uploads/images/original_untouched/204/511629.jpg",
    gradient: "linear-gradient(135deg, #78350f 0%, #1c1917 100%)",
    summary: "Troubled Mumbai police officer Sartaj Singh receives an anonymous phone call from legendary gang lord Ganesh Gaitonde, warning him that he has only 25 days to save the city from total apocalyptic destruction.",
    review: "The trailblazing series that kicked off the golden age of Indian streaming content. Nawazuddin Siddiqui's portrayal of Ganesh Gaitonde is immortal, reciting philosophical monologues steeped in Mumbai underworld history, political corruption, and spiritual fatalism.",
    pros: ["Unapologetically raw, gritty Mumbai underworld worldbuilding", "Nawazuddin Siddiqui delivers an iconic career-best performance", "Complex blend of Hindu mythology and high-stakes espionage"],
    cons: ["Season 2's philosophical detour loses some of the street-level grit of Season 1"],
    verdict: "A groundbreaking Indian neo-noir thriller that set international streaming standards."
  },
  {
    id: "the-boys",
    title: "The Boys",
    year: "2019 – Present",
    seasons: "4 Seasons (32+ Episodes)",
    country: "USA",
    countryFlag: "🇺🇸",
    platform: "Amazon Prime",
    genres: ["Action", "Sci-Fi", "Comedy", "Drama"],
    imdb: 8.7,
    rottenTomatoes: "93%",
    creator: "Eric Kripke",
    cast: ["Antony Starr", "Karl Urban", "Jack Quaid", "Erin Moriarty", "Jensen Ackles"],
    image: "images/the-boys.jpg",
    fallbackImage: "https://static.tvmaze.com/uploads/images/original_untouched/619/1547768.jpg",
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #312e81 100%)",
    summary: "In a world where corporate superheroes abuse their powers rather than protect humanity, a rogue group of vigilantes known as 'The Boys' embark on a bloody quest to expose the truth about Vought International.",
    review: "The ultimate subversive antidote to superhero fatigue. Antony Starr's performance as Homelander is terrifyingly brilliant—capturing an emotionally stunted, narcissistic god-figure with a razor-thin temper. It balances jet-black humor with savage political satire.",
    pros: ["Antony Starr's Homelander is an all-time great television villain", "Audacious satire of late-stage capitalism and media culture", "Relentlessly fun, irreverent, and action-packed"],
    cons: ["Frequent extreme gore and shock-value scenes are not for the faint of heart"],
    verdict: "Viciously funny and terrifyingly relevant comic-book deconstruction."
  },
  {
    id: "alice-in-borderland",
    title: "Alice in Borderland (今際の国のアリス)",
    year: "2020 – Present",
    seasons: "2+ Seasons (16 Episodes)",
    country: "Japan",
    countryFlag: "🇯🇵",
    platform: "Netflix",
    genres: ["Sci-Fi", "Action", "Mystery", "Thriller"],
    imdb: 7.8,
    rottenTomatoes: "86%",
    creator: "Shinsuke Sato",
    cast: ["Kento Yamazaki", "Tao Tsuchiya", "Nijiro Murakami", "Ayaka Miyoshi", "Dori Sakurada"],
    image: "images/alice-in-borderland.jpg",
    fallbackImage: "https://static.tvmaze.com/uploads/images/original_untouched/589/1473249.jpg",
    gradient: "linear-gradient(135deg, #4c1d95 0%, #1e1b4b 100%)",
    summary: "An obsessed gamer and his two friends suddenly find themselves trapped in an eerily deserted Tokyo, forced to compete in sadistic life-or-death challenges categorized by playing card suits to extend their survival visas.",
    review: "Based on the acclaimed manga, Alice in Borderland thrives on ingenious puzzle design and heart-stopping survival stakes. The psychological 'Hearts' games in particular test the limits of human morality, while the cinematic scale of empty Tokyo is awe-inspiring.",
    pros: ["Terrifically creative psychological and physical game concepts", "Electrifying fight choreography and high survival stakes", "Stunning visual recreation of an abandoned Shibuya intersection"],
    cons: ["Some secondary character anime tropes feel melodramatic on live action"],
    verdict: "A high-octane Japanese survival thriller packed with diabolical puzzles."
  },
  {
    id: "game-of-thrones",
    title: "Game of Thrones",
    year: "2011 – 2019",
    seasons: "8 Seasons (73 Episodes)",
    country: "USA",
    countryFlag: "🇺🇸",
    platform: "HBO",
    genres: ["Fantasy", "Drama", "Action", "Adventure"],
    imdb: 9.2,
    rottenTomatoes: "89%",
    creator: "David Benioff, D.B. Weiss",
    cast: ["Peter Dinklage", "Emilia Clarke", "Kit Harington", "Lena Headey", "Nikolaj Coster-Waldau"],
    image: "images/game-of-thrones.jpg",
    fallbackImage: "https://static.tvmaze.com/uploads/images/original_untouched/498/1245274.jpg",
    gradient: "linear-gradient(135deg, #451a03 0%, #1c1917 100%)",
    summary: "Nine noble families wage bitter war for control over the Iron Throne of Westeros, while an ancient, forgotten army of undead White Walkers marches south to wipe out all living civilization.",
    review: "The defining fantasy spectacle of the 21st century. For six glorious seasons, Game of Thrones broke every television rule with fearless shock-value deaths, political scheming, and legendary battle sequences like 'Hardhome' and 'Battle of the Bastards'. Peter Dinklage's Tyrion Lannister remains legendary.",
    pros: ["Unrivaled worldbuilding, political intrigue, and lore depth", "Monumental cinematic battles that rival Hollywood feature films", "Massive ensemble cast of complex, morally gray characters"],
    cons: ["Rushed pacing and controversial character decisions in the final season"],
    verdict: "An epic television revolution that transformed the global cultural landscape."
  },
  {
    id: "the-last-of-us",
    title: "The Last of Us",
    year: "2023 – Present",
    seasons: "1+ Season (9+ Episodes)",
    country: "USA",
    countryFlag: "🇺🇸",
    platform: "HBO",
    genres: ["Drama", "Sci-Fi", "Action", "Horror"],
    imdb: 8.8,
    rottenTomatoes: "96%",
    creator: "Craig Mazin, Neil Druckmann",
    cast: ["Pedro Pascal", "Bella Ramsey", "Gabriel Luna", "Nick Offerman", "Murray Bartlett"],
    image: "images/the-last-of-us.jpg",
    fallbackImage: "https://static.tvmaze.com/uploads/images/original_untouched/563/1409008.jpg",
    gradient: "linear-gradient(135deg, #14532d 0%, #052e16 100%)",
    summary: "Twenty years after a fungal pandemic decimates human society, a cynical, hardened smuggler is tasked with escorting a 14-year-old girl who may hold the secret to humanity's medical salvation across a ruined America.",
    review: "A gold standard for video game adaptations. Rather than relying solely on zombie action, Craig Mazin and Neil Druckmann emphasize the profound tenderness, grief, and moral compromise of human connections. Episode 3 ('Long, Long Time') stands as one of television's greatest standalone romances.",
    pros: ["Pedro Pascal and Bella Ramsey share heart-wrenching chemistry", "Episode 3 is an emotionally devastating masterpiece of storytelling", "Eerily beautiful fungal-overgrown post-apocalyptic visuals"],
    cons: ["Fewer infected encounters compared to the video game source material"],
    verdict: "The gold standard of video game adaptations and a triumph of post-apocalyptic drama."
  },
  {
    id: "black-mirror",
    title: "Black Mirror",
    year: "2011 – Present",
    seasons: "6 Seasons (27+ Episodes)",
    country: "UK",
    countryFlag: "🇬🇧",
    platform: "Netflix",
    genres: ["Sci-Fi", "Drama", "Mystery", "Thriller"],
    imdb: 8.7,
    rottenTomatoes: "83%",
    creator: "Charlie Brooker",
    cast: ["Daniel Kaluuya", "Bryce Dallas Howard", "Jon Hamm", "Hayley Atwell", "Jesse Plemons"],
    image: "images/black-mirror.jpg",
    fallbackImage: "https://static.tvmaze.com/uploads/images/original_untouched/564/1411764.jpg",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #030712 100%)",
    summary: "A visionary dystopian anthology series that explores humanity's twisted relationship with cutting-edge technology, social media addiction, artificial intelligence, and virtual reality.",
    review: "Black Mirror is the 21st-century Twilight Zone. Charlie Brooker's razor-sharp techno-anxiety holds up an unsettling dark mirror to society's obsessions. Classic episodes like 'San Junipero', 'White Christmas', and 'Nosedive' have proved astonishingly prophetic.",
    pros: ["Brilliantly inventive high-concept anthology format", "Prophetic warnings regarding AI, ratings, and digital consciousness", "Diverse genres ranging from horror and satire to heartfelt romance"],
    cons: ["Anthology nature means episode quality inevitably fluctuates"],
    verdict: "The most provocative and cautionary sci-fi anthology of the digital era."
  },
  {
    id: "fleabag",
    title: "Fleabag",
    year: "2016 – 2019",
    seasons: "2 Seasons (12 Episodes)",
    country: "UK",
    countryFlag: "🇬🇧",
    platform: "Amazon Prime",
    genres: ["Comedy", "Drama"],
    imdb: 8.7,
    rottenTomatoes: "100%",
    creator: "Phoebe Waller-Bridge",
    cast: ["Phoebe Waller-Bridge", "Sian Clifford", "Andrew Scott", "Olivia Colman", "Bill Paterson"],
    image: "images/fleabag.jpg",
    fallbackImage: "https://static.tvmaze.com/uploads/images/original_untouched/192/482341.jpg",
    gradient: "linear-gradient(135deg, #831843 0%, #4c0519 100%)",
    summary: "A witty, grief-stricken, and sexually unfiltered woman in London tries to navigate modern life, complicated family dysfunctions, and personal guilt while constantly speaking directly to the audience.",
    review: "Phoebe Waller-Bridge created pure lightning in a bottle. Season 2 achieved absolute comedy perfection with Andrew Scott's 'Hot Priest'. The fourth-wall breaks aren't just a gimmick—they represent Fleabag's psychological armor against processing unbearable grief.",
    pros: ["Phenomenal fourth-wall deconstruction and intimacy with the viewer", "The 'Hot Priest' romance in Season 2 is transcendent writing", "Hilarious, heartbreaking, and perfectly concluded in just 12 episodes"],
    cons: ["Fleabag's chaotic self-destructive behavior can feel painful to watch"],
    verdict: "A 100% Rotten Tomatoes comedic masterpiece about grief, love, and redemption."
  },
  {
    id: "mirzapur",
    title: "Mirzapur",
    year: "2018 – Present",
    seasons: "3 Seasons (29+ Episodes)",
    country: "India",
    countryFlag: "🇮🇳",
    platform: "Amazon Prime",
    genres: ["Crime", "Action", "Thriller", "Drama"],
    imdb: 8.5,
    rottenTomatoes: "88%",
    creator: "Karan Anshuman, Puneet Krishna",
    cast: ["Pankaj Tripathi", "Ali Fazal", "Divyenndu", "Shweta Tripathi", "Rasika Dugal"],
    image: "images/mirzapur.jpg",
    fallbackImage: "https://static.tvmaze.com/uploads/images/original_untouched/619/1549499.jpg",
    gradient: "linear-gradient(135deg, #991b1b 0%, #450a0a 100%)",
    summary: "The iron-fisted ruler of Mirzapur and carpet exporter Kaleen Bhaiya finds his criminal reign threatened when his volatile son Munna sparks a lethal feud with two upstart brothers, Guddu and Bablu.",
    review: "Mirzapur delivers unapologetic blood-soaked crime entertainment fueled by earthy dialogues and unforgettable rustic characters. Pankaj Tripathi's quiet, polite menace as Akhandanand Tripathi contrasts fiercely with Divyenndu's chaotic, unhinged Munna Bhaiya.",
    pros: ["Pankaj Tripathi's calmly terrifying presence and witty one-liners", "Intense revenge drama that doesn't shy away from brutal consequences", "Memorable cultural catchphrases that dominate Indian internet pop culture"],
    cons: ["Excessive profanity and graphic violence can be polarizing"],
    verdict: "The quintessential Indian hinterland crime drama filled with ruthless betrayal."
  },
  {
    id: "crash-landing-on-you",
    title: "Crash Landing on You (사랑의 불시착)",
    year: "2019 – 2020",
    seasons: "1 Season (16 Episodes)",
    country: "South Korea",
    countryFlag: "🇰🇷",
    platform: "Netflix",
    genres: ["Romance", "Comedy", "Drama"],
    imdb: 8.7,
    rottenTomatoes: "98%",
    creator: "Park Ji-eun",
    cast: ["Hyun Bin", "Son Ye-jin", "Seo Ji-hye", "Kim Jung-hyun"],
    image: "images/crash-landing-on-you.jpg",
    fallbackImage: "https://static.tvmaze.com/uploads/images/original_untouched/235/588087.jpg",
    gradient: "linear-gradient(135deg, #be185d 0%, #4c0519 100%)",
    summary: "A South Korean fashion chaebol heiress gets caught in a paragliding storm and accidentally crash-lands in the North Korean DMZ, where a chivalrous army captain hides and protects her.",
    review: "The crown jewel of Korean romantic television. The premise may sound wildly implausible, but the execution is rich with heart, warm community humor, and genuine danger. Real-life married leads Hyun Bin and Son Ye-jin exude magnetic on-screen chemistry that transcends borders.",
    pros: ["Irresistible romantic chemistry between the lead stars", "Fascinating, humanized portrayal of North Korean village daily life", "Hilarious and loyal supporting squad of North Korean soldiers"],
    cons: ["Episodes run long, frequently stretching beyond 85 minutes each"],
    verdict: "The quintessential modern K-Drama romantic epic that captivated millions worldwide."
  },
  {
    id: "better-call-saul",
    title: "Better Call Saul",
    year: "2015 – 2022",
    seasons: "6 Seasons (63 Episodes)",
    country: "USA",
    countryFlag: "🇺🇸",
    platform: "Netflix",
    genres: ["Crime", "Drama"],
    imdb: 9.0,
    rottenTomatoes: "98%",
    creator: "Vince Gilligan, Peter Gould",
    cast: ["Bob Odenkirk", "Rhea Seehorn", "Jonathan Banks", "Michael McKean", "Giancarlo Esposito"],
    image: "images/better-call-saul.jpg",
    fallbackImage: "https://static.tvmaze.com/uploads/images/original_untouched/501/1253515.jpg",
    gradient: "linear-gradient(135deg, #b45309 0%, #451a03 100%)",
    summary: "The tragic transformation of eager, down-on-his-luck public defender Jimmy McGill into Albuquerque's flamboyant, morally bankrupt criminal attorney Saul Goodman.",
    review: "Against all odds, Better Call Saul matched and occasionally surpassed its predecessor Breaking Bad. Bob Odenkirk and Rhea Seehorn (Kim Wexler) craft an intoxicating dynamic where love and self-destruction collide. The courtroom drama in 'Chicanery' is television at its absolute apex.",
    pros: ["Arguably the most intelligent character study and courtroom writing ever", "Rhea Seehorn delivers a luminous, career-defining performance as Kim Wexler", "Brilliant visual framing and patient, meticulous plot development"],
    cons: ["Slower, more methodical pacing than the high-octane Breaking Bad"],
    verdict: "A rare prequel that stands as an independent monument of storytelling genius."
  },
  {
    id: "narcos",
    title: "Narcos",
    year: "2015 – 2017",
    seasons: "3 Seasons (30 Episodes)",
    country: "USA / Colombia",
    countryFlag: "🇺🇸",
    platform: "Netflix",
    genres: ["Crime", "Drama", "Historical", "Action"],
    imdb: 8.8,
    rottenTomatoes: "89%",
    creator: "Chris Brancato, Carlo Bernard, Doug Miro",
    cast: ["Wagner Moura", "Pedro Pascal", "Boyd Holbrook", "Alberto Ammann"],
    image: "images/narcos.jpg",
    fallbackImage: "https://static.tvmaze.com/uploads/images/original_untouched/498/1246087.jpg",
    gradient: "linear-gradient(135deg, #854d0e 0%, #1c1917 100%)",
    summary: "The true, astonishing rise and bloody reign of Pablo Escobar and the Medellín Cartel as they flood the globe with cocaine, hunted relentlessly by DEA agents Steve Murphy and Javier Peña.",
    review: "Documentary-like realism blended with visceral crime thriller drama. Wagner Moura's quiet, terrifying portrayal of Pablo Escobar balances domestic tenderness with horrific acts of narco-terrorism. The use of real archival footage heightens the terrifying authenticity.",
    pros: ["Wagner Moura is utterly chilling as Pablo Escobar", "Expert integration of real 1980s documentary footage and historical events", "Captivating dual perspectives of both the hunters and the cartel"],
    cons: ["Heavy reliance on voiceover narration to explain complex geopolitical context"],
    verdict: "A gripping, historically faithful cartel chronicle that never takes its foot off the gas."
  }
];

// State Management
let allSeries = [];
let bookmarks = JSON.parse(localStorage.getItem('bingeglobe_bookmarks') || '[]');
let userReviews = JSON.parse(localStorage.getItem('bingeglobe_user_reviews') || '{}');
let activePlatformFilter = 'all';

// Initialize
function initApp() {
  loadSeriesData();
  setupEventListeners();
  renderGrid();
  updateStats();
}

// Load data from localStorage or default, ensuring latest images are synced
function loadSeriesData() {
  const localData = localStorage.getItem('bingeglobe_series');
  if (localData) {
    try {
      const parsed = JSON.parse(localData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Sync fresh image and fallback links from DEFAULT_SERIES for known items
        allSeries = parsed.map(item => {
          const match = DEFAULT_SERIES.find(d => d.id === item.id);
          if (match) {
            return {
              ...item,
              image: match.image,
              fallbackImage: match.fallbackImage,
              gradient: match.gradient
            };
          }
          return item;
        });
      } else {
        allSeries = [...DEFAULT_SERIES];
      }
    } catch (e) {
      allSeries = [...DEFAULT_SERIES];
    }
  } else {
    allSeries = [...DEFAULT_SERIES];
  }
  localStorage.setItem('bingeglobe_series', JSON.stringify(allSeries));
}

// Event Listeners
function setupEventListeners() {
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const genreSelect = document.getElementById('genreSelect');
  const countrySelect = document.getElementById('countrySelect');
  const sortSelect = document.getElementById('sortSelect');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');
  const emptyStateResetBtn = document.getElementById('emptyStateResetBtn');
  
  // Search
  searchInput.addEventListener('input', (e) => {
    clearSearchBtn.style.display = e.target.value.trim() ? 'block' : 'none';
    renderGrid();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';
    searchInput.focus();
    renderGrid();
  });

  // Select Filters & Sorting
  genreSelect.addEventListener('change', renderGrid);
  countrySelect.addEventListener('change', renderGrid);
  sortSelect.addEventListener('change', renderGrid);

  // Platform Pill buttons
  document.querySelectorAll('.filter-pill').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      activePlatformFilter = e.target.dataset.filter;
      renderGrid();
    });
  });

  // Reset buttons
  resetFiltersBtn.addEventListener('click', resetAllFilters);
  emptyStateResetBtn.addEventListener('click', resetAllFilters);

  // Detail Modal Close
  document.getElementById('modalCloseBtn').addEventListener('click', closeDetailModal);
  document.getElementById('detailModal').addEventListener('click', (e) => {
    if (e.target.id === 'detailModal') closeDetailModal();
  });

  // Add Series Modal
  const openAddBtn = document.getElementById('openAddModalBtn');
  const addModal = document.getElementById('addModal');
  const addModalCloseBtn = document.getElementById('addModalCloseBtn');
  const cancelAddBtn = document.getElementById('cancelAddBtn');
  const addSeriesForm = document.getElementById('addSeriesForm');

  openAddBtn.addEventListener('click', () => {
    addModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  const closeAddModal = () => {
    addModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    addSeriesForm.reset();
  };

  addModalCloseBtn.addEventListener('click', closeAddModal);
  cancelAddBtn.addEventListener('click', closeAddModal);
  addModal.addEventListener('click', (e) => {
    if (e.target.id === 'addModal') closeAddModal();
  });

  // Submit New Series
  addSeriesForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleAddNewSeries();
    closeAddModal();
  });

  // Keyboard Escape to close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDetailModal();
      closeAddModal();
    }
  });
}

// Add New Series
function handleAddNewSeries() {
  const title = document.getElementById('newTitle').value.trim();
  const country = document.getElementById('newCountry').value.trim();
  const year = document.getElementById('newYear').value.trim();
  const platform = document.getElementById('newPlatform').value.trim();
  const genres = document.getElementById('newGenres').value.split(',').map(g => g.trim()).filter(Boolean);
  const imdb = parseFloat(document.getElementById('newImdb').value);
  const seasons = document.getElementById('newSeasons').value.trim();
  const creator = document.getElementById('newCreator').value.trim() || 'Unknown Creator';
  const cast = document.getElementById('newCast').value.split(',').map(c => c.trim()).filter(Boolean);
  const imageUrlInput = document.getElementById('newImage') ? document.getElementById('newImage').value.trim() : '';
  const summary = document.getElementById('newSummary').value.trim();
  const review = document.getElementById('newReview').value.trim();

  const userImage = imageUrlInput || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80';

  const newEntry = {
    id: 'custom-' + Date.now(),
    title,
    year,
    seasons,
    country,
    countryFlag: '🌐',
    platform,
    genres,
    imdb: isNaN(imdb) ? 8.0 : imdb,
    rottenTomatoes: Math.min(100, Math.round(imdb * 10)) + '%',
    creator,
    cast: cast.length ? cast : ['Ensemble Cast'],
    image: userImage,
    fallbackImage: userImage,
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
    summary,
    review,
    pros: ['Original premise and creative direction', 'Engaging character chemistry'],
    cons: ['Pacing depends on individual viewer preference'],
    verdict: 'A notable global web series addition.'
  };

  allSeries.unshift(newEntry);
  localStorage.setItem('bingeglobe_series', JSON.stringify(allSeries));
  renderGrid();
  updateStats();
  showToast(`"${title}" has been successfully added to BingeGlobe!`, 'success');
}

// Filter and Sort Engine
function getFilteredSeries() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
  const selectedGenre = document.getElementById('genreSelect').value;
  const selectedCountry = document.getElementById('countrySelect').value;
  const sortBy = document.getElementById('sortSelect').value;

  let results = allSeries.filter(series => {
    // Search query matches title, cast, summary, country, or genres
    const matchesSearch = !searchTerm || (
      series.title.toLowerCase().includes(searchTerm) ||
      series.country.toLowerCase().includes(searchTerm) ||
      series.platform.toLowerCase().includes(searchTerm) ||
      series.summary.toLowerCase().includes(searchTerm) ||
      series.genres.some(g => g.toLowerCase().includes(searchTerm)) ||
      (series.cast && series.cast.some(c => c.toLowerCase().includes(searchTerm)))
    );

    // Genre Filter
    const matchesGenre = selectedGenre === 'all' || series.genres.includes(selectedGenre);

    // Country Filter
    const matchesCountry = selectedCountry === 'all' || series.country.toLowerCase().includes(selectedCountry.toLowerCase());

    // Platform Filter
    const matchesPlatform = activePlatformFilter === 'all' || series.platform.toLowerCase().includes(activePlatformFilter.toLowerCase());

    return matchesSearch && matchesGenre && matchesCountry && matchesPlatform;
  });

  // Sorting
  results.sort((a, b) => {
    if (sortBy === 'rating-desc') return b.imdb - a.imdb;
    if (sortBy === 'year-desc') return parseInt(b.year) - parseInt(a.year);
    if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
    if (sortBy === 'title-desc') return b.title.localeCompare(a.title);
    return 0;
  });

  return results;
}

// Render Series Grid
function renderGrid() {
  const grid = document.getElementById('seriesGrid');
  const resultsCount = document.getElementById('resultsCount');
  const noResults = document.getElementById('noResults');
  const activeFiltersContainer = document.getElementById('activeFiltersContainer');
  const activeFilterTags = document.getElementById('activeFilterTags');

  const filtered = getFilteredSeries();
  resultsCount.textContent = filtered.length;

  // Active filters tags display
  const activeTags = [];
  const searchTerm = document.getElementById('searchInput').value.trim();
  const selectedGenre = document.getElementById('genreSelect').value;
  const selectedCountry = document.getElementById('countrySelect').value;

  if (searchTerm) activeTags.push(`Search: "${searchTerm}"`);
  if (selectedGenre !== 'all') activeTags.push(`Genre: ${selectedGenre}`);
  if (selectedCountry !== 'all') activeTags.push(`Country: ${selectedCountry}`);
  if (activePlatformFilter !== 'all') activeTags.push(`Platform: ${activePlatformFilter}`);

  if (activeTags.length > 0) {
    activeFiltersContainer.style.display = 'flex';
    activeFilterTags.innerHTML = activeTags.map(tag => `
      <span class="active-tag">${escapeHtml(tag)}</span>
    `).join('');
  } else {
    activeFiltersContainer.style.display = 'none';
  }

  // Handle empty state
  if (filtered.length === 0) {
    grid.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }
  noResults.style.display = 'none';

  // Build Cards
  grid.innerHTML = filtered.map(series => {
    const isBookmarked = bookmarks.includes(series.id);
    const genrePills = series.genres.slice(0, 3).map(g => `<span class="genre-chip">${escapeHtml(g)}</span>`).join('');
    const imageSrc = series.image || series.fallbackImage || '';
    const fallbackSrc = series.fallbackImage || series.image || '';

    return `
      <article class="series-card" data-id="${series.id}">
        <div class="card-header" style="background: ${series.gradient};">
          <!-- Authentic Series Poster Image with Fallback -->
          <img 
            class="card-poster-bg" 
            src="${escapeHtml(imageSrc)}" 
            alt="${escapeHtml(series.title)} poster"
            loading="lazy"
            onerror="this.onerror=null; this.src='${escapeHtml(fallbackSrc)}';"
          />
          <div class="card-header-overlay"></div>

          <div class="card-top-badges">
            <span class="rating-badge" title="IMDb Rating">
              <i class="fa-solid fa-star"></i> ${series.imdb}
            </span>
            <span class="platform-badge">
              <i class="fa-solid fa-play"></i> ${escapeHtml(series.platform)}
            </span>
          </div>

          <span class="origin-badge">
            ${series.countryFlag || '🌍'} ${escapeHtml(series.country)}
          </span>
        </div>

        <div class="card-body">
          <div class="card-title-row">
            <h3 class="card-title">${escapeHtml(series.title)}</h3>
            <span class="card-year">${escapeHtml(series.year)}</span>
          </div>

          <div class="card-meta">
            <span><i class="fa-solid fa-layer-group"></i> ${escapeHtml(series.seasons)}</span>
            <span><i class="fa-solid fa-user-pen"></i> ${escapeHtml(series.creator.split(',')[0])}</span>
          </div>

          <div class="genre-chips">
            ${genrePills}
          </div>

          <div class="card-summary-box">
            <div class="summary-heading">
              <i class="fa-solid fa-bolt"></i> Story Synopsis
            </div>
            <p class="card-summary-text">${escapeHtml(series.summary)}</p>
          </div>

          <p class="card-review-snippet">
            "${escapeHtml(series.review)}"
          </p>

          <div class="card-footer">
            <button class="btn-card-details" onclick="openDetailModal('${series.id}')">
              <i class="fa-solid fa-eye"></i> View Full Review & Info
            </button>
            <button 
              class="btn-bookmark ${isBookmarked ? 'bookmarked' : ''}" 
              onclick="toggleBookmark('${series.id}')"
              title="${isBookmarked ? 'Remove from Watchlist' : 'Add to Watchlist'}"
            >
              <i class="fa-${isBookmarked ? 'solid' : 'regular'} fa-bookmark"></i>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Modal View with cinematic dual poster banner
function openDetailModal(seriesId) {
  const series = allSeries.find(s => s.id === seriesId);
  if (!series) return;

  const modal = document.getElementById('detailModal');
  const modalBody = document.getElementById('modalBody');

  const castList = series.cast && series.cast.length > 0 
    ? series.cast.map(c => escapeHtml(c)).join(', ') 
    : 'Not Specified';

  const prosList = (series.pros || []).map(p => `<li>${escapeHtml(p)}</li>`).join('');
  const consList = (series.cons || []).map(c => `<li>${escapeHtml(c)}</li>`).join('');
  const userComment = userReviews[series.id] || null;

  const imageSrc = series.image || series.fallbackImage || '';
  const fallbackSrc = series.fallbackImage || series.image || '';

  modalBody.innerHTML = `
    <!-- Cinematic Banner Header with Blurred Background and Crisp Poster -->
    <div class="modal-banner" style="background: ${series.gradient};">
      <img 
        class="modal-banner-backdrop" 
        src="${escapeHtml(imageSrc)}" 
        alt="" 
        onerror="this.onerror=null; this.src='${escapeHtml(fallbackSrc)}';" 
      />
      <div class="modal-banner-overlay"></div>

      <div class="modal-header-flex">
        <img 
          class="modal-poster-thumb" 
          src="${escapeHtml(imageSrc)}" 
          alt="${escapeHtml(series.title)}" 
          onerror="this.onerror=null; this.src='${escapeHtml(fallbackSrc)}';" 
        />

        <div class="modal-header-info">
          <div class="card-top-badges" style="margin-bottom: 0.8rem;">
            <span class="rating-badge" style="font-size: 0.95rem; padding: 0.35rem 0.8rem;">
              <i class="fa-solid fa-star"></i> IMDb ${series.imdb} / 10
            </span>
            <span class="platform-badge" style="font-size: 0.85rem; padding: 0.35rem 0.8rem;">
              <i class="fa-solid fa-circle-play"></i> ${escapeHtml(series.platform)}
            </span>
          </div>

          <h2>${escapeHtml(series.title)}</h2>

          <div class="modal-meta-row">
            <span><i class="fa-solid fa-calendar"></i> ${escapeHtml(series.year)}</span>
            <span><i class="fa-solid fa-earth-americas"></i> ${series.countryFlag || ''} ${escapeHtml(series.country)}</span>
            <span><i class="fa-solid fa-film"></i> ${escapeHtml(series.seasons)}</span>
            <span><i class="fa-solid fa-fire"></i> RT: ${escapeHtml(series.rottenTomatoes || 'N/A')}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-content-inner">
      
      <!-- Key Metadata Info Grid -->
      <div class="details-meta-grid section-block">
        <div class="detail-item">
          <label><i class="fa-solid fa-clapperboard"></i> Creator / Showrunner</label>
          <p>${escapeHtml(series.creator)}</p>
        </div>
        <div class="detail-item">
          <label><i class="fa-solid fa-tags"></i> Genres</label>
          <p>${series.genres.map(g => escapeHtml(g)).join(' • ')}</p>
        </div>
        <div class="detail-item">
          <label><i class="fa-solid fa-users"></i> Lead Cast</label>
          <p>${castList}</p>
        </div>
        <div class="detail-item">
          <label><i class="fa-solid fa-tv"></i> Network / Platform</label>
          <p>${escapeHtml(series.platform)}</p>
        </div>
      </div>

      <!-- Small Summary / Plot -->
      <div class="section-block">
        <h3><i class="fa-solid fa-align-left"></i> Plot Summary</h3>
        <p class="storyline-text">${escapeHtml(series.summary)}</p>
      </div>

      <!-- Comprehensive Review & Breakdown -->
      <div class="section-block">
        <h3><i class="fa-solid fa-quote-left"></i> Critical Review & Breakdown</h3>
        <div class="review-box">
          <p class="review-consensus">${escapeHtml(series.review)}</p>
          
          <div class="pros-cons-grid">
            <div class="pros-list">
              <h4><i class="fa-solid fa-circle-check"></i> What Works Great</h4>
              <ul>${prosList || '<li>Captivating narrative arc</li>'}</ul>
            </div>
            <div class="cons-list">
              <h4><i class="fa-solid fa-circle-exclamation"></i> Things to Keep in Mind</h4>
              <ul>${consList || '<li>Requires viewer engagement</li>'}</ul>
            </div>
          </div>
        </div>

        <div style="background: rgba(255,255,255,0.04); border-left: 3px solid var(--accent-gold); padding: 0.85rem 1.1rem; border-radius: 4px;">
          <strong style="color: var(--accent-gold); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px;">Final Verdict:</strong>
          <p style="color: #e2e8f0; font-size: 0.95rem; margin-top: 0.2rem;">${escapeHtml(series.verdict || 'A high-recommendation must-watch series.')}</p>
        </div>
      </div>

      <!-- User Community Review / Feedback Form -->
      <div class="user-reviews-box">
        <h3><i class="fa-solid fa-comment-dots"></i> Community Verdict & Notes</h3>
        
        <div id="savedUserCommentBox" style="${userComment ? 'display:block;' : 'display:none;'} margin-bottom: 1.2rem;">
          <div style="background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.3); border-radius: 8px; padding: 0.9rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.4rem;">
              <span style="font-size:0.82rem; color: #a5b4fc; font-weight:700;"><i class="fa-solid fa-user-check"></i> Your Saved Note:</span>
              <button onclick="removeUserReview('${series.id}')" style="background:none; border:none; color:var(--accent); cursor:pointer; font-size:0.8rem;">Delete</button>
            </div>
            <p id="savedUserCommentText" style="color:#e2e8f0; font-size: 0.92rem; font-style:italic;">"${escapeHtml(userComment || '')}"</p>
          </div>
        </div>

        <form class="user-review-form" onsubmit="handleUserReviewSubmit(event, '${series.id}')">
          <label style="display:block; font-size:0.85rem; color:var(--text-muted); margin-bottom:0.4rem;">
            ${userComment ? 'Update your personal notes / review for this show:' : 'Leave your personal thoughts or review for this series:'}
          </label>
          <textarea id="userReviewText" rows="2" placeholder="Write what you loved or felt about this web series..." required></textarea>
          <div style="display:flex; justify-content:flex-end;">
            <button type="submit" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.85rem;">
              <i class="fa-solid fa-paper-plane"></i> Save Note
            </button>
          </div>
        </form>
      </div>

    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeDetailModal() {
  const modal = document.getElementById('detailModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// User Personal Review Handling
window.handleUserReviewSubmit = function(event, seriesId) {
  event.preventDefault();
  const textarea = document.getElementById('userReviewText');
  const text = textarea.value.trim();
  if (!text) return;

  userReviews[seriesId] = text;
  localStorage.setItem('bingeglobe_user_reviews', JSON.stringify(userReviews));
  
  const savedBox = document.getElementById('savedUserCommentBox');
  const savedText = document.getElementById('savedUserCommentText');
  if (savedBox && savedText) {
    savedText.textContent = `"${text}"`;
    savedBox.style.display = 'block';
  }
  textarea.value = '';
  showToast('Your review note has been saved!', 'success');
};

window.removeUserReview = function(seriesId) {
  delete userReviews[seriesId];
  localStorage.setItem('bingeglobe_user_reviews', JSON.stringify(userReviews));
  const savedBox = document.getElementById('savedUserCommentBox');
  if (savedBox) savedBox.style.display = 'none';
  showToast('Your note was removed.', 'info');
};

// Bookmark handling
window.toggleBookmark = function(seriesId) {
  if (bookmarks.includes(seriesId)) {
    bookmarks = bookmarks.filter(id => id !== seriesId);
    showToast('Removed from Watchlist.', 'info');
  } else {
    bookmarks.push(seriesId);
    showToast('Saved to your Watchlist!', 'success');
  }
  localStorage.setItem('bingeglobe_bookmarks', JSON.stringify(bookmarks));
  renderGrid();
};

// Quick Genre & Country links from footer
window.filterByGenre = function(genre) {
  const genreSelect = document.getElementById('genreSelect');
  genreSelect.value = genre;
  renderGrid();
  window.location.hash = '#browse';
};

window.filterByCountry = function(country) {
  const countrySelect = document.getElementById('countrySelect');
  countrySelect.value = country;
  renderGrid();
  window.location.hash = '#browse';
};

// Reset All Filters
function resetAllFilters() {
  document.getElementById('searchInput').value = '';
  document.getElementById('clearSearchBtn').style.display = 'none';
  document.getElementById('genreSelect').value = 'all';
  document.getElementById('countrySelect').value = 'all';
  document.getElementById('sortSelect').value = 'rating-desc';
  activePlatformFilter = 'all';
  document.querySelectorAll('.filter-pill').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === 'all');
  });
  renderGrid();
}

// Update Stats
function updateStats() {
  const statTotalSeries = document.getElementById('statTotalSeries');
  const statTotalCountries = document.getElementById('statTotalCountries');
  const statAvgRating = document.getElementById('statAvgRating');
  const statTotalGenres = document.getElementById('statTotalGenres');

  const total = allSeries.length;
  const countries = new Set(allSeries.map(s => s.country.split('/')[0].trim()));
  const genres = new Set();
  let totalRating = 0;

  allSeries.forEach(s => {
    totalRating += s.imdb;
    s.genres.forEach(g => genres.add(g));
  });

  const avg = total > 0 ? (totalRating / total).toFixed(1) : '0.0';

  statTotalSeries.textContent = total;
  statTotalCountries.textContent = countries.size;
  statAvgRating.textContent = avg;
  statTotalGenres.textContent = genres.size;
}

// Toast notification
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast show toast-${type}`;
  setTimeout(() => {
    toast.className = 'toast';
  }, 3200);
}

// Security Helper to avoid XSS
function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Global modal opener for inline onclicks
window.openDetailModal = openDetailModal;

// Run on page load
document.addEventListener('DOMContentLoaded', initApp);
