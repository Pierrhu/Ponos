// ============ CATALOGUE D'EXERCICES ============
// Exercices en plus de ceux du programme par défaut : jambes, machines, variantes.
// Ils servent (1) de remplaçants pendant une séance, (2) dans la bibliothèque de
// l'éditeur de programme. Les images viennent de free-exercise-db (domaine public,
// Unlicense) : github.com/yuhonas/free-exercise-db
//
// Un ID ne doit jamais changer : les séries enregistrées sont rangées sous
// « ID_numéroDeSérie ». Pas de « _ » dans les ID (séparateur des clés).

const EXTRA_EXERCISES = [
  // ── Jambes ──────────────────────────────────────────────────────────────────
  {id:'x-mollets-presse', muscle:'Jambes', restTime:60, name:'Mollets à la presse', reps:'12-15', format:'3×12-15', sets:3,
    info:{ gif:'gifs/mollets-presse.webp',
      execution:[
        'Assis à la presse, avant des pieds en bas de la plateforme, talons dans le vide.',
        'Jambes presque tendues, sécurités en place.',
        'Pousser avec la pointe des pieds le plus loin possible, puis revenir en étirant bien les mollets.',
        'Mouvement lent, sans rebond.'
      ],
      interet:'Variante si la machine à mollets est prise : même travail, et tu restes à la presse.'
    }},
  {id:'x-legcurl', muscle:'Jambes', restTime:90, name:'Leg curl assis', reps:'10-12', format:'3×10-12', sets:3,
    info:{ gif:'gifs/leg-curl-assis.webp',
      execution:[
        'Genoux alignés avec l\'axe de la machine, boudin juste au-dessus des chevilles.',
        'Ramener les talons sous le siège en contractant l\'arrière des cuisses.',
        'Remonter lentement (2 s), sans laisser la charge retomber.'
      ],
      interet:'Isole les ischio-jambiers, souvent faibles chez les cyclistes. Équilibre le travail des quadriceps à la presse et protège les genoux.'
    }},
  {id:'x-legext', muscle:'Jambes', restTime:90, name:'Leg extension', reps:'12-15', format:'3×12-15', sets:3,
    info:{ gif:'gifs/leg-extension.webp',
      execution:[
        'Dos contre le dossier, genoux alignés avec l\'axe de la machine.',
        'Tendre les jambes jusqu\'en haut, contracter 1 seconde.',
        'Redescendre lentement, sans claquer la charge.'
      ],
      interet:'Isole les quadriceps. Pratique en remplacement de la presse si elle est prise, ou en finition.'
    }},
  {id:'x-goblet', muscle:'Jambes', restTime:90, name:'Goblet squat', reps:'10-12', format:'3×10-12', sets:3,
    info:{ gif:'gifs/goblet-squat.webp',
      execution:[
        'Haltère tenu verticalement contre la poitrine, coudes vers le bas.',
        'Pieds un peu plus larges que les hanches, pointes légèrement ouvertes.',
        'Descendre en gardant le buste droit, genoux dans l\'axe des pieds.',
        'Remonter en poussant le sol, sans arrondir le dos.'
      ],
      interet:'Le squat le plus facile à apprendre : l\'haltère devant aide à garder le buste droit. Bonne alternative à la presse.'
    }},

  // ── Dos ─────────────────────────────────────────────────────────────────────
  {id:'x-divrow', muscle:'Dos', restTime:120, name:'Divergent row (machine)', reps:'10-12', format:'3×10-12', sets:3,
    info:{ gif:'gifs/divergent-row.webp',
      execution:[
        'Régler le siège pour que les poignées arrivent à hauteur de poitrine, buste contre l\'appui.',
        'Tirer les poignées vers le bas des côtes en serrant les omoplates.',
        'Coudes près du corps, pause 1 seconde en fin de mouvement.',
        'Revenir lentement, bras presque tendus, sans perdre l\'appui.'
      ],
      interet:'Rowing machine à bras séparés, poitrine appuyée : zéro contrainte pour le bas du dos. Chaque bras travaille seul, ce qui corrige les déséquilibres gauche/droite.'
    }},
  {id:'x-tractions-ass', muscle:'Dos', restTime:120, name:'Tractions assistées', reps:'6-8', format:'3×6-8', sets:3,
    info:{ gif:'gifs/tractions-assistees.webp',
      execution:[
        'Machine à tractions assistées (genoux sur le support) ou élastique sous un genou.',
        'Prise un peu plus large que les épaules, paumes vers l\'avant.',
        'Tirer en amenant le menton au-dessus de la barre, coudes vers les hanches.',
        'Redescendre lentement jusqu\'aux bras tendus.',
        'Note l\'assistance en kg dans « charge » : plus elle baisse, plus tu progresses.'
      ],
      interet:'Le chemin le plus direct vers ta première traction : le mouvement exact, avec juste ce qu\'il faut d\'aide. Baisse l\'assistance de séance en séance.'
    }},

  // ── Pectoraux ───────────────────────────────────────────────────────────────
  {id:'x-pecfly', muscle:'Pectoraux', restTime:90, name:'Pec fly (machine)', reps:'10-12', format:'3×10-12', sets:3,
    info:{ gif:'gifs/pec-fly-machine.webp',
      execution:[
        'Dos plaqué au dossier, poignées à hauteur de poitrine, coudes légèrement fléchis.',
        'Rapprocher les mains devant toi en arc de cercle, en serrant les pecs 1 seconde.',
        'Revenir lentement jusqu\'à sentir l\'étirement, sans aller au-delà.'
      ],
      interet:'Isolation des pectoraux, avec une tension constante. Bon en finition ou si les bancs sont pris. Ne remplace pas un développé pour la force.'
    }},
  {id:'x-incline-machine', muscle:'Pectoraux', restTime:120, name:'Développé incliné (machine)', reps:'8-10', format:'3×8-10', sets:3,
    info:{ gif:'gifs/developpe-incline-machine.webp',
      execution:[
        'Régler le siège pour que les poignées arrivent au niveau du haut de la poitrine.',
        'Omoplates serrées contre le dossier, pousser vers le haut et l\'avant.',
        'Redescendre lentement jusqu\'à l\'étirement des pecs.'
      ],
      interet:'Même rôle que le développé incliné haltères (haut des pecs), en plus guidé. Parfait quand la salle est pleine.'
    }},
  {id:'x-dc-machine', muscle:'Pectoraux', restTime:150, name:'Développé couché (machine)', reps:'6-8', format:'3×6-8', sets:3,
    info:{ gif:'gifs/developpe-couche-machine.webp',
      execution:[
        'Poignées à hauteur du milieu de la poitrine, pieds au sol.',
        'Omoplates serrées, pousser sans décoller les épaules du dossier.',
        'Revenir en contrôlant, jusqu\'à l\'étirement.'
      ],
      interet:'Remplaçant du développé couché barre quand le banc est pris. Les charges ne sont pas comparables avec la barre : c\'est enregistré à part.'
    }},

  // ── Épaules ─────────────────────────────────────────────────────────────────
  {id:'x-epaules-machine', muscle:'Épaules', restTime:150, name:'Développé épaules (machine)', reps:'6-8', format:'3×6-8', sets:3,
    info:{ gif:'gifs/developpe-epaules-machine.webp',
      execution:[
        'Dos contre le dossier, poignées à hauteur d\'épaules.',
        'Pousser au-dessus de la tête sans cambrer, abdos gainés.',
        'Redescendre lentement jusqu\'au niveau des épaules.'
      ],
      interet:'Remplaçant du développé militaire : plus stable, moins de gainage, idéal si le dos est fatigué.'
    }},
  {id:'x-oiseau-machine', muscle:'Épaules', restTime:60, name:'Oiseau (machine)', reps:'15-20', format:'3×15-20', sets:3,
    info:{ gif:'gifs/oiseau-machine.webp',
      execution:[
        'Face au dossier de la machine à pec fly, poignées à hauteur d\'épaules.',
        'Écarter les bras vers l\'arrière, coudes légèrement fléchis, en serrant les omoplates.',
        'Revenir lentement. Charge légère, mouvement propre.'
      ],
      interet:'Travaille l\'arrière des épaules, comme le face pull. Bon remplaçant si la poulie est prise.'
    }},

  // ── Bras ────────────────────────────────────────────────────────────────────
  {id:'x-curl-poulie', muscle:'Bras', restTime:60, name:'Curl biceps poulie basse', reps:'10-12', format:'2×10-12', sets:2,
    info:{ gif:'gifs/curl-poulie-basse.webp',
      execution:[
        'Debout face à la poulie basse, barre droite ou EZ, prise en supination.',
        'Coudes collés au corps, monter la barre jusqu\'aux épaules.',
        'Redescendre lentement, sans élan du buste.'
      ],
      interet:'La poulie garde une tension sur tout le mouvement, même en bas. Bon remplaçant du curl EZ.'
    }},
  {id:'x-triceps-corde', muscle:'Bras', restTime:60, name:'Extension triceps à la corde', reps:'10-12', format:'2×10-12', sets:2,
    info:{ gif:'gifs/triceps-corde.webp',
      execution:[
        'Poulie haute, corde en main, coudes collés au corps.',
        'Tendre les bras vers le bas en écartant la corde en fin de mouvement.',
        'Remonter lentement jusqu\'à 90°, coudes fixes.'
      ],
      interet:'Isolation des triceps, à faire si tu remplaces le superset curl/extension par un curl seul.'
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
