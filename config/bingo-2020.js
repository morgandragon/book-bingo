conn = new Mongo();
db = conn.getDB("bookbingo");

db.bingosquares.drop();

db.bingosquares.insert({name:"Novel Translated from its Original Language",
description: "The spirit of this square would be to read a book that's originally not written in English. But you can also read books in another language you speak. Doesn't matter what language you read the book in, as long as it's not the original language it was first published in.",
hardmode: "Written by a woman. Coauthor does not count.",
card: '2020'});

db.bingosquares.insert({name:"Setting Featuring Snow, Ice, or Cold",
description: "This setting must used be for a good portion of the book.",
hardmode: "The entire book takes place in this setting.",
card: '2020'});

db.bingosquares.insert({name:"Optimistic SFF",
description: "The sun is shining, the birds are singing, and while we've come across some trouble, we're going to overcome it *together*. Sometimes very bad things happen (like an entire apocalypse) but ultimately you're left feeling things will get better, with a sense of hope. Includes genres like hopepunk and noblebright.",
hardmode: "Not Becky Chambers",
card: '2020'});

db.bingosquares.insert({name:"Novel Featuring Necromancy",
description: "Raising the dead, woot! Self-explanatory.",
hardmode: "Necromancer is the protagonist.",
card: '2020'});

db.bingosquares.insert({name:"A novel featuring Asexual and/or Aromantic character(s). It should be explicitly stated (either by the character themselves, another character, or the author) that a character isn't interested in romance or sex.",
description: "This setting must used be for a good portion of the book.",
hardmode: "Ace / Aro protagonist.",
card: '2020'});

db.bingosquares.insert({name:"Novel Featuring a Ghost",
description: "This one is pretty self-explanatory.",
hardmode: "At least one main protagonist is a ghost.",
card: '2020'});

db.bingosquares.insert({name:"Novel Featuring Exploration",
description: "Boldly go.... Again, pretty self-explanatory.",
hardmode: "The exploration is the central plot.",
card: '2020'});

db.bingosquares.insert({name:"Climate Fiction",
description: "Climate should play a significant role in the story. This includes the genres of solarpunk, post-apocalyptic, ecopunk, clifi.",
hardmode: "Not post-apocalyptic",
card: '2020'});

db.bingosquares.insert({name:"Novel with a Colour in the Title",
description: "Self-explanatory.",
hardmode: "Not black, red, grey, or white.",
card: '2020'});

db.bingosquares.insert({name:"Any r/fantasy Book Club Book of the Month OR r/fantasy Read-along Book",
description: "Any past or still active book clubs count, as well as past or current read-alongs.",
hardmode: "Must read a current selection of either a book club or read-along and participate in the discussion.",
card: '2020'});

db.bingosquares.insert({name:"Self-Published SFF Novel ",
description: "Only self-published novels will count for this square. If the novel has been picked up by a publisher as long as you read it when it was self-pubbed it will still count.",
hardmode: "Self-pubbed and has fewer than 50 ratings on goodreads.",
card: '2020'});

db.bingosquares.insert({name:"Novel with Chapter Epigraphs",
description: "A quote used to introduce a chapter, it often serves as a summary or counterpoint to the passage that follows, although it may simply set the stage for it.",
hardmode: "Original to the novel (i.e., not a quotation from another source).",
card: '2020'});

db.bingosquares.insert({name:"Novel Published in 2020",
description: "Self-explanatory.",
hardmode: "It's also a Debut Novel.",
card: '2020'});

db.bingosquares.insert({name:"Novel Set in a School or University",
description: "Self-explanatory.",
hardmode: "Not Harry Potter or the Magicians.",
card: '2020'});

db.bingosquares.insert({name:"Book About Books",
description: "Books must be central to the plot somehow.",
hardmode: "Does not feature a library (public, school, or private).",
card: '2020'});

db.bingosquares.insert({name:"A Book that Made You Laugh",
description: "Doesn't have to be a comedy, but should make you laugh at least once while reading.",
hardmode: "Not Pratchett.",
card: '2020'});

db.bingosquares.insert({name:"Five SFF Short Stories",
description: "Self-explanatory.",
hardmode: "Read an entire SFF anthology or collection.",
card: '2020'});

db.bingosquares.insert({name:"Big Dumb Object",
description: "A novel featuring any mysterious object of unknown origin and immense power which generates an intense sense of wonder or horror by its mere existence and which people must seek to understand before it's too late. In this case, we are counting mythical forests, objects under the sea or in space, mysterious signals or illnesses, and science that is too futuristic for our protagonists to understand. NOT a monster. Examples: Mythago Wood (Holdstock), Sphere (Crichton), Under the Dome (King), Mass Effect, Wanderers (Wendig), Noumenon (Lostetter), The Expanse (Corey), The Interdependency (Scalzi), The Chronicles of the One (Roberts), Themis Files (Neuvel), World War Z (Brooks), Uprooted (Novik).",
hardmode: "HARD MODE: The classic golden-age of science fiction definition of Big Dumb Object - Dyson Spheres, alien spaceships, a BIG thing that appears with no explanation.",
card: '2020'});

db.bingosquares.insert({name:"Feminist Novel",
description: "Includes feminist themes such as but not limited to gender inequality, sexuality, race, economics, and reproduction. It's not enough to have strong female characters or a setting where women are equal to men, feminist themes must be central to and directly addressed in a critical manner by the plot.",
hardmode: "(Updated 4/4) Feminist novel by a person of colour or Indigeous author.",
card: '2020'});

db.bingosquares.insert({name:"Novel by a Canadian Author",
description: "Canada has a fantastic SFF scene, let's explore some of the authors there using this square.",
hardmode: "Book from an Canadian small press OR self-published Canadian author.",
card: '2020'});

db.bingosquares.insert({name:"Novel with a Number in the Title",
description: "Self-explanatory.",
hardmode: "Also features a colour in the title.",
card: '2020'});

db.bingosquares.insert({name:"Romantic Fantasy / Paranormal Romance",
description: "Romance needs to be central to the plot and the story would not make sense if it was removed. Should also either have a happily ever after or a happy for now ending.",
hardmode: "Read and participate in HEA Book Club pick.",
card: '2020'});

db.bingosquares.insert({name:"Novel with a Magical Pet",
description: "Self-explanatory.",
hardmode: "Magical pet can also speak.",
card: '2020'});

db.bingosquares.insert({name:"Format: Graphic Novel (at least 1 vol.) OR Audiobook / Audio drama",
description: "This is a format, not a genre however, please stick to something within speculative fiction. If you are reading individual comics for this square please read a volume’s worth. You can also use a manga volume for this square (again, please keep it to speculative fiction genres). You may also choose to listen to an audiobook OR an audio drama for this square - any speculative fiction audiobook / audio drama will count (novel length).",
hardmode: "Graphic Novel - stand alone graphic novel. Audiobook / audio drama - has to be over 25 hours long.",
card: '2020'});

db.bingosquares.insert({name:"Novel Featuring Politics",
description: "Politics are central to the plot. This covers everything from royalty, elections, wars, and even smaller local politics.",
hardmode: "Not featuring royalty.",
card: '2020'});
