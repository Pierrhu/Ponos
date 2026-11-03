// ============ CATALOGUE D'EXERCICES ============
// Exercices en plus de ceux du programme par défaut : jambes, machines, variantes.
// Ils servent (1) de remplaçants pendant une séance, (2) dans la bibliothèque de
// l'éditeur de programme. Images : animations fournies par Pierre (même style
// que les autres GIF de Ponos).
//
// Un ID ne doit jamais changer : les séries enregistrées sont rangées sous
// « ID_numéroDeSérie ». Pas de « _ » dans les ID (séparateur des clés).

const EXTRA_EXERCISES = [
  // ── Jambes ──────────────────────────────────────────────────────────────────
  {id:'x-mollets-presse',muscle:'Jambes',restTime:60,name:'Mollets à la presse',reps:'12-15',format:'3×12-15',sets:3,
    info:{
      gif:'gifs/mollets-presse.webp',
      muscles:{ main:['Mollets (jumeaux)'], secondary:['Soléaire'] },
      execution:[
        'Assis à la presse, sécurités en place. Avant des pieds en bas de la plateforme, largeur d\'épaules, talons dans le vide.',
        'Jambes presque tendues, genoux fixes pendant toute la série.',
        'Pousse avec la pointe des pieds le plus loin possible, tiens 1 seconde.',
        'Reviens lentement en laissant les talons descendre pour bien étirer le mollet.',
      ],
      erreurs:[
        'Pieds trop bas sur la plateforme : ils peuvent glisser, garde bien l\'avant du pied en appui.',
        'Prendre de l\'élan avec les genoux.',
        'Enlever les sécurités : garde-les, la plateforme est juste au-dessus de toi.',
      ],
      interet:'Même travail que les mollets debout, si la machine est prise ou si tu es déjà à la presse. Orteils un peu vers l\'extérieur, tu vises plus l\'intérieur du mollet ; vers l\'intérieur, l\'extérieur.'
    }},
  {id:'x-legcurl',muscle:'Jambes',restTime:90,name:'Leg curl assis',reps:'10-12',format:'3×10-12',sets:3,
    info:{
      gif:'gifs/leg-curl-assis.webp',
      muscles:{ main:['Ischio-jambiers'], secondary:['Mollets'] },
      execution:[
        'Règle la machine : genoux alignés avec l\'axe de rotation, dos calé, boudin du bas juste au-dessus des chevilles, boudin du haut sur les cuisses.',
        'Tiens les poignées pour rester collé au siège.',
        'Ramène les talons sous le siège en soufflant, le plus loin possible, tiens 1 seconde.',
        'Remonte lentement (2 secondes), sans laisser la charge retomber.',
      ],
      erreurs:[
        'Charger trop : si les mollets font le travail ou si le buste bouge, baisse la charge.',
        'Amplitude incomplète.',
        'Mouvement saccadé.',
      ],
      interet:'Isole l\'arrière des cuisses, souvent faible chez les cyclistes. Il équilibre le travail des quadriceps à la presse et protège les genoux.'
    }},
  {id:'x-legext',muscle:'Jambes',restTime:90,name:'Leg extension',reps:'12-15',format:'3×12-15',sets:3,
    info:{
      gif:'gifs/leg-extension.webp',
      muscles:{ main:['Quadriceps'], secondary:[] },
      execution:[
        'Dos calé, genoux alignés avec l\'axe de la machine, boudin juste au-dessus des chevilles.',
        'Tends les jambes jusqu\'en haut sans verrouiller les genoux, tiens 1 seconde.',
        'Redescends lentement, sans reposer la charge entre les répétitions.',
      ],
      erreurs:[
        'Aller très lourd : les genoux n\'aiment pas les charges maximales sur cette machine.',
        'Monter avec de l\'élan.',
        'Genoux mal alignés avec l\'axe. Arrête en cas de douleur au genou.',
      ],
      interet:'Isole les quadriceps. Pratique pour remplacer la presse quand elle est prise, ou en finition. Bon aussi pour échauffer les genoux avant la presse.'
    }},
  {id:'x-goblet',muscle:'Jambes',restTime:90,name:'Goblet squat',reps:'10-12',format:'3×10-12',sets:3,
    info:{
      gif:'gifs/goblet-squat.webp',
      muscles:{ main:['Quadriceps', 'Fessiers'], secondary:['Ischio-jambiers', 'Abdos (gainage)'] },
      execution:[
        'Haltère tenu verticalement contre la poitrine, coudes vers le sol.',
        'Pieds largeur de hanches ou un peu plus, pointes ouvertes de 10-15°.',
        'Grande inspiration, gainage, puis descends buste droit, talons au sol, bassin qui descend entre les jambes.',
        'Genoux dans l\'axe des pieds : ils peuvent passer devant les orteils, tant qu\'ils ne rentrent pas vers l\'intérieur.',
        'Remonte en poussant sur tout le pied, poitrine et hanches ensemble.',
      ],
      erreurs:[
        'Genoux qui rentrent vers l\'intérieur en bas.',
        'Talons qui décollent : le poids doit rester sur tout le pied.',
        'Éloigner l\'haltère du corps : garde-le collé à la poitrine.',
      ],
      interet:'Le squat le plus facile à apprendre : l\'haltère devant toi fait contrepoids et t\'aide à garder le buste droit. Bonne alternative à la presse, ou échauffement des jambes. Sa limite : la charge, vite plafonnée par l\'haltère.'
    }},

  // ── Dos ─────────────────────────────────────────────────────────────────────
  {id:'x-divrow',muscle:'Dos',restTime:120,name:'Divergent row (machine)',reps:'10-12',format:'3×10-12',sets:3,
    info:{
      gif:'gifs/divergent-row.webp',
      muscles:{ main:['Grand dorsal', 'Milieu du dos'], secondary:['Deltoïdes postérieurs', 'Biceps'] },
      execution:[
        'Règle le siège : poitrine en appui sur le haut du coussin, poignées à portée de bras tendus.',
        'Prise neutre ou pronation, regard devant, coudes près du corps.',
        'Tire les poignées le plus loin possible vers l\'arrière, en serrant les omoplates. Pause de 1 s.',
        'Reviens lentement en gardant une légère flexion des coudes au bout, sans relâcher la charge.',
        'Chaque bras a sa poignée : tu peux aussi le faire un bras à la fois.',
      ],
      erreurs:[
        'Décoller la poitrine du coussin pour tirer plus lourd.',
        'Se balancer en arrière.',
        'Raccourcir le mouvement : va chercher l\'omoplate en fin de tirage.',
      ],
      interet:'Rowing poitrine appuyée : tout le travail pour le dos, zéro contrainte pour le bas du dos. Parfait quand les lombaires sont fatiguées ou quand le rowing barre est pris. Les bras séparés aident à corriger les déséquilibres gauche/droite.'
    }},
  {id:'x-tractions-ass',muscle:'Dos',restTime:120,name:'Tractions assistées',reps:'6-8',format:'3×6-8',sets:3,
    info:{
      gif:'gifs/tractions-assistees.webp',
      muscles:{ main:['Grand dorsal'], secondary:['Biceps', 'Milieu du dos'] },
      execution:[
        'Règle l\'assistance (le contrepoids qui t\'aide) et monte à genoux ou debout sur la plateforme.',
        'Prise pronation un peu plus large que les épaules, départ bras tendus.',
        'Tire en pensant « coudes vers le bas » jusqu\'à ce que le menton passe la barre. Souffle en montant.',
        'Tiens 1-2 s en haut, puis redescends lentement jusqu\'aux bras complètement tendus.',
        'Note l\'assistance en kg dans la case « charge » : plus elle baisse, plus tu progresses.',
      ],
      erreurs:[
        'Tirer avec les bras plutôt qu\'avec le dos.',
        'Faire des demi-répétitions : bras tendus en bas, menton au-dessus de la barre en haut.',
        'Garder la même assistance des semaines : baisse-la dès que tu fais toutes tes répétitions.',
      ],
      interet:'Le mouvement exact de la traction, avec juste ce qu\'il faut d\'aide. En baissant l\'assistance de séance en séance, c\'est le chemin le plus direct vers tes 3 tractions strictes.'
    }},

  // ── Pectoraux ───────────────────────────────────────────────────────────────
  {id:'x-pecfly',muscle:'Pectoraux',restTime:90,name:'Pec fly (machine)',reps:'10-12',format:'3×10-12',sets:3,
    info:{
      gif:'gifs/pec-fly-machine.webp',
      muscles:{ main:['Pectoraux'], secondary:['Deltoïdes antérieurs'] },
      execution:[
        'Règle le siège : poignées à hauteur de poitrine. Dos plaqué au dossier, tête dans l\'axe.',
        'Coudes légèrement fléchis et fixes pendant tout le mouvement.',
        'Rapproche les poignées devant toi en arc de cercle en soufflant, sans qu\'elles se touchent. Serre les pecs 1 à 2 s.',
        'Reviens lentement jusqu\'à sentir l\'étirement, sans reposer la charge entre les répétitions.',
      ],
      erreurs:[
        'Avancer le buste ou pousser avec les pieds.',
        'Prendre de l\'élan.',
        'Ouvrir trop loin en arrière : arrête-toi quand tu sens l\'étirement.',
      ],
      interet:'Isole les pectoraux sans gérer l\'équilibre, avec une tension constante. Bon en finition ou quand les bancs sont pris. Ne remplace pas un développé pour la force, mais complète bien.'
    }},
  {id:'x-incline-machine',muscle:'Pectoraux',restTime:120,name:'Développé incliné (machine)',reps:'8-10',format:'3×8-10',sets:3,
    info:{
      gif:'gifs/developpe-incline-machine.webp',
      muscles:{ main:['Haut des pectoraux'], secondary:['Deltoïdes antérieurs', 'Triceps'] },
      execution:[
        'Règle le siège : poignées un peu sous la hauteur des épaules, là où serait la barre en bas d\'un développé.',
        'Inspire et serre les omoplates contre le dossier, pieds à plat, abdos gainés.',
        'Pousse en soufflant, sans que les épaules partent vers l\'avant.',
        'Reviens lentement jusqu\'à l\'étirement des pecs, sans reposer la charge.',
      ],
      erreurs:[
        'Décoller les omoplates du dossier, surtout si l\'avant de l\'épaule tire.',
        'Cambrer fort le bas du dos.',
        'Pousser avec les jambes ou bouger le bassin.',
      ],
      interet:'Même rôle que le développé incliné haltères (le haut des pectoraux), mais guidé : tu peux pousser fort sans gérer l\'équilibre. Parfait quand la salle est pleine ou en fin de séance pecs.'
    }},
  {id:'x-dc-machine',muscle:'Pectoraux',restTime:150,name:'Développé couché (Smith machine)',reps:'6-8',format:'3×6-8',sets:3,
    info:{
      gif:'gifs/developpe-couche-machine.webp',
      muscles:{ main:['Pectoraux'], secondary:['Triceps', 'Deltoïdes antérieurs'] },
      execution:[
        'Banc centré sous la barre : elle doit descendre sur le milieu de la poitrine. Barre réglée à hauteur de bras presque tendus.',
        'Prise un peu plus large que les épaules, omoplates serrées, pieds bien ancrés.',
        'Déverrouille la barre en la tournant, descends lentement jusqu\'à frôler la poitrine, courte pause.',
        'Pousse sans verrouiller les coudes. Toujours finir en reverrouillant la barre sur les crochets.',
      ],
      erreurs:[
        'Faire rebondir la barre sur la poitrine.',
        'Placer le banc au hasard : vérifie la trajectoire de la barre avant de charger.',
        'Relâcher les omoplates ou décoller les fesses.',
      ],
      interet:'Remplaçant du développé couché barre quand le banc est pris : la barre est guidée, pas besoin de pareur. Les charges ne sont pas comparables avec la barre libre, c\'est pour ça qu\'elles sont enregistrées à part.'
    }},

  // ── Épaules ─────────────────────────────────────────────────────────────────
  {id:'x-epaules-machine',muscle:'Épaules',restTime:150,name:'Développé épaules (machine)',reps:'6-8',format:'3×6-8',sets:3,
    info:{
      gif:'gifs/developpe-epaules-machine.webp',
      muscles:{ main:['Deltoïdes antérieurs et latéraux'], secondary:['Triceps', 'Haut des pectoraux'] },
      execution:[
        'Règle le siège : poignées à hauteur d\'épaules. Trop bas, tu perds de l\'amplitude.',
        'Dos contre le dossier, abdos gainés, prise pronation (ou neutre si l\'épaule est sensible).',
        'Pousse au-dessus de la tête jusqu\'aux bras presque tendus.',
        'Redescends lentement jusqu\'au niveau des épaules, sans reposer la charge en bas.',
      ],
      erreurs:[
        'Cambrer le dos pour finir la répétition.',
        'Reposer la pile entre les répétitions.',
        'Siège mal réglé. Si l\'épaule fait mal : plus léger, prise neutre, ou un autre exercice.',
      ],
      interet:'Remplaçant du développé militaire : plus stable, moins de gainage, et sans danger si tu échoues sur une répétition. Idéal quand le dos est fatigué.'
    }},
  {id:'x-oiseau-machine',muscle:'Épaules',restTime:60,name:'Oiseau (machine)',reps:'15-20',format:'3×15-20',sets:3,
    info:{
      gif:'gifs/oiseau-machine.webp',
      muscles:{ main:['Deltoïdes postérieurs'], secondary:['Rhomboïdes', 'Trapèzes moyens'] },
      execution:[
        'Assis face au dossier de la machine, poitrine contre le coussin, bras tendus devant à hauteur d\'épaules.',
        'Prise pronation ou neutre, coudes légèrement fléchis.',
        'Ouvre les bras vers l\'arrière en arc de cercle : le mouvement part de l\'épaule. Serre légèrement les omoplates en fin de mouvement.',
        'Reviens lentement. Charge légère, mouvement propre.',
      ],
      erreurs:[
        'Hausser les épaules : souvent le signe que c\'est trop lourd.',
        'Avancer la tête.',
        'Tirer avec les omoplates seulement, sans ouvrir les bras.',
      ],
      interet:'Isole l\'arrière des épaules, souvent en retard, sans avoir à te stabiliser. Bon remplaçant du face pull si la poulie est prise.'
    }},

  // ── Bras ────────────────────────────────────────────────────────────────────
  {id:'x-curl-poulie',muscle:'Bras',restTime:60,name:'Curl biceps poulie basse',reps:'10-12',format:'2×10-12',sets:2,
    info:{
      gif:'gifs/curl-poulie-basse.webp',
      muscles:{ main:['Biceps'], secondary:['Brachial', 'Avant-bras'] },
      execution:[
        'Debout face à la poulie basse, pieds largeur d\'épaules, barre droite ou EZ en supination, à largeur d\'épaules.',
        'Coudes collés au corps : seul l\'avant-bras bouge.',
        'Monte la barre près des épaules, pause en contraction.',
        'Redescends lentement jusqu\'aux bras tendus, sans te reposer en bas : la poulie garde la tension.',
      ],
      erreurs:[
        'Coudes qui avancent ou s\'écartent.',
        'Élan du buste.',
        'Amplitude partielle. Dans les trois cas : baisse la charge.',
      ],
      interet:'La poulie garde une tension sur tout le mouvement, même en bas, là où la barre libre n\'en donne presque pas. Isolation stricte qui permet de progresser en charge sans tricher. Bon remplaçant du curl EZ.'
    }},
  {id:'x-triceps-corde',muscle:'Bras',restTime:60,name:'Extension triceps corde au-dessus de la tête',reps:'10-12',format:'2×10-12',sets:2,
    info:{
      gif:'gifs/triceps-corde.webp',
      muscles:{ main:['Triceps (surtout la longue portion)'], secondary:[] },
      execution:[
        'Poulie haute, corde en main, dos à la machine, un pied devant l\'autre.',
        'Corde derrière la tête, coudes pliés près de la tête, buste légèrement penché en avant. Rentre un peu le menton.',
        'Tends les bras vers l\'avant et un peu vers le haut, jusqu\'à ce qu\'ils soient presque tendus, en écartant la corde en fin de mouvement.',
        'Reviens lentement jusqu\'à un bon étirement des triceps, coudes fixes : seuls les avant-bras bougent.',
      ],
      erreurs:[
        'Écarter les coudes : les triceps travaillent moins.',
        'Se laisser tirer en arrière ou cambrer.',
        'Charger lourd : le corps devient instable et les coudes souffrent.',
      ],
      interet:'Bras au-dessus de la tête, la longue portion du triceps, qui fait la plus grosse partie du bras, travaille étirée : c\'est là qu\'elle progresse le mieux. À faire si tu remplaces le superset curl/extension par un curl seul.'
    }},
];

// Remplaçants proposés en premier pour chaque exercice (les autres restent
// accessibles par groupe musculaire).
const ALTERNATIVES = {
  a1: ['c1', 'x-dc-machine'],
  a2: ['x-divrow', 'b3', 'c2'],
  a3: ['x-incline-machine', 'c1', 'x-pecfly'],
  a4: ['b2', 'x-tractions-ass'],
  a5: ['b4'],
  a6: ['x-curl-poulie', 'x-triceps-corde', 'c6'],
  b1: ['x-epaules-machine'],
  b2: ['a4', 'x-tractions-ass'],
  b3: ['x-divrow', 'c2', 'a2'],
  b4: ['a5'],
  b5: ['x-oiseau-machine'],
  c1: ['a1', 'x-dc-machine', 'x-incline-machine'],
  c2: ['x-divrow', 'b3'],
  c3: ['x-pecfly'],
  c4: ['a5', 'b4'],
  c5: ['x-oiseau-machine'],
  c6: ['x-curl-poulie', 'x-triceps-corde', 'a6'],
  'x-presse':        ['x-goblet', 'x-legext'],
  'x-mollets':       ['x-mollets-presse'],
  'x-tractions-neg': ['x-tractions-ass'],
  'x-tractions-ass': ['x-tractions-neg'],
};

// ── Couleurs des groupes musculaires ─────────────────────────────────────────
const MUSCLE_COLORS = {
  'Pectoraux': '#C23B3B',
  'Dos':       '#2D7DD2',
  'Épaules':   '#1A9E8F',
  'Bras':      '#8B5CF6',
  'Jambes':    '#D2912D',
  'Abdos':     '#9A9AA8',
  'Autre':     '#888888',
};

// Groupe d'un muscle cité dans une fiche (« Deltoïdes postérieurs » → Épaules)
const MUSCLE_KEYWORDS = [
  ['Abdos',     /abdo/i],
  ['Pectoraux', /pector/i],
  ['Épaules',   /deltoïde|coiffe|épaule/i],
  ['Bras',      /biceps|triceps|avant-bras|brachia|brachio/i],
  ['Dos',       /dorsal|\bdos\b|rhombo|trapèze|grand rond|lombaire/i],
  ['Jambes',    /quadri|fessier|ischio|mollet|jumeau|soléaire|adducteur/i],
];
function muscleGroupOf(name) {
  const hit = MUSCLE_KEYWORDS.find(([, re]) => re.test(name));
  return hit ? hit[0] : 'Autre';
}

// ── Recherche d'un exercice partout (programme, programmes perso, catalogue) ──
function getExerciseById(id) {
  for (const day of PROGRAM) {
    const ex = day.exercises.find(e => e.id === id);
    if (ex) return ex;
  }
  const extra = EXTRA_EXERCISES.find(e => e.id === id);
  if (extra) return extra;
  for (const prog of (state.customPrograms || [])) {
    for (const day of prog.days) {
      const ex = day.exercises.find(e => e.id === id);
      if (ex) return ex;
    }
  }
  return null;
}

// Fourchette de répétitions d'un exercice (« 8-10 »), pour l'afficher en remplaçant
function repRange(ex) {
  if (ex.reps) return ex.reps;
  const m = (ex.format || '').match(/(\d+-\d+)/);
  return m ? m[1] : '8-12';
}

// L'exercice tel qu'il se fait à la place de `slot` : il garde le nombre de séries
// du programme et ses propres répétitions, son repos et sa fiche.
function makeSubstitute(slot, altId) {
  const alt = getExerciseById(altId);
  if (!alt) return slot;
  return {
    id:       alt.id,
    name:     alt.name,
    sets:     slot.sets,
    format:   `${slot.sets}×${repRange(alt)}`,
    restTime: alt.restTime || slot.restTime,
    info:     alt.info,
    _slotId:   slot.id,
    _slotName: slot.name,
  };
}

// Exercices d'un jour avec les remplacements (`swaps` : { idDuProgramme: idRemplaçant })
function applySwaps(day, swaps) {
  if (!swaps) return day.exercises;
  return day.exercises.map(ex => swaps[ex.id] ? makeSubstitute(ex, swaps[ex.id]) : ex);
}

// Séance en cours
function getSessionExercises(day) { return applySwaps(day, state.swaps); }

// Séance enregistrée
function getEntryExercises(entry, day) { return applySwaps(day, entry.swaps); }
