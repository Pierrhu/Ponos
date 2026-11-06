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
        'Assis à la presse, **sécurités en place**. Avant des pieds en bas de la plateforme, largeur d\'épaules, **talons dans le vide**.',
        'Jambes presque tendues, **genoux fixes** pendant toute la série.',
        'Pousse avec la pointe des pieds **le plus loin possible**, **tiens 1 seconde**.',
        '**Reviens lentement** en laissant les talons descendre pour bien étirer le mollet.',
      ],
      erreurs:[
        '**Pieds trop bas** sur la plateforme : ils peuvent glisser, garde bien l\'avant du pied en appui.',
        '**Prendre de l\'élan** avec les genoux.',
        '**Enlever les sécurités** : garde-les, la plateforme est juste au-dessus de toi.',
      ],
      interet:'Même travail que les mollets debout, **si la machine est prise** ou si tu es déjà à la presse. Orteils un peu vers l\'extérieur, tu vises plus l\'intérieur du mollet ; vers l\'intérieur, l\'extérieur.'
    }},
  {id:'x-legcurl',muscle:'Jambes',restTime:90,name:'Leg curl assis',reps:'10-12',format:'3×10-12',sets:3,
    info:{
      gif:'gifs/leg-curl-assis.webp',
      muscles:{ main:['Ischio-jambiers'], secondary:['Mollets'] },
      execution:[
        'Règle la machine : **genoux alignés avec l\'axe de rotation**, dos calé, boudin du bas juste au-dessus des chevilles, boudin du haut sur les cuisses.',
        '**Tiens les poignées** pour rester collé au siège.',
        'Ramène les talons sous le siège en soufflant, **le plus loin possible, tiens 1 seconde**.',
        '**Remonte lentement (2 secondes)**, sans laisser la charge retomber.',
      ],
      erreurs:[
        '**Charger trop** : si les mollets font le travail ou si le buste bouge, baisse la charge.',
        '**Amplitude incomplète**.',
        '**Mouvement saccadé**.',
      ],
      interet:'Isole **l\'arrière des cuisses**, souvent faible chez les cyclistes. Il équilibre le travail des quadriceps à la presse et **protège les genoux**.'
    }},
  {id:'x-legext',muscle:'Jambes',restTime:90,name:'Leg extension',reps:'12-15',format:'3×12-15',sets:3,
    info:{
      gif:'gifs/leg-extension.webp',
      muscles:{ main:['Quadriceps'], secondary:[] },
      execution:[
        'Dos calé, **genoux alignés avec l\'axe** de la machine, boudin juste au-dessus des chevilles.',
        'Tends les jambes jusqu\'en haut **sans verrouiller les genoux**, **tiens 1 seconde**.',
        '**Redescends lentement**, sans reposer la charge entre les répétitions.',
      ],
      erreurs:[
        '**Aller très lourd** : les genoux n\'aiment pas les charges maximales sur cette machine.',
        'Monter **avec de l\'élan**.',
        'Genoux mal alignés avec l\'axe. **Arrête en cas de douleur** au genou.',
      ],
      interet:'**Isole les quadriceps**. Pratique pour remplacer la presse quand elle est prise, ou en finition. Bon aussi pour **échauffer les genoux** avant la presse.'
    }},
  {id:'x-goblet',muscle:'Jambes',restTime:90,name:'Goblet squat',reps:'10-12',format:'3×10-12',sets:3,
    info:{
      gif:'gifs/goblet-squat.webp',
      muscles:{ main:['Quadriceps', 'Fessiers'], secondary:['Ischio-jambiers', 'Abdos (gainage)'] },
      execution:[
        'Haltère tenu verticalement **contre la poitrine**, coudes vers le sol.',
        'Pieds largeur de hanches ou un peu plus, **pointes ouvertes de 10-15°**.',
        'Grande inspiration, gainage, puis descends **buste droit, talons au sol**, bassin qui descend entre les jambes.',
        '**Genoux dans l\'axe des pieds** : ils peuvent passer devant les orteils, tant qu\'ils ne rentrent pas vers l\'intérieur.',
        'Remonte en poussant **sur tout le pied**, poitrine et hanches ensemble.',
      ],
      erreurs:[
        '**Genoux qui rentrent** vers l\'intérieur en bas.',
        '**Talons qui décollent** : le poids doit rester sur tout le pied.',
        'Éloigner l\'haltère du corps : garde-le **collé à la poitrine**.',
      ],
      interet:'**Le squat le plus facile à apprendre** : l\'haltère devant toi fait contrepoids et t\'aide à garder le buste droit. Bonne alternative à la presse, ou échauffement des jambes. **Sa limite : la charge**, vite plafonnée par l\'haltère.'
    }},

  // ── Dos ─────────────────────────────────────────────────────────────────────
  {id:'x-divrow',muscle:'Dos',restTime:120,name:'Divergent row (machine)',reps:'10-12',format:'3×10-12',sets:3,
    info:{
      gif:'gifs/divergent-row.webp',
      muscles:{ main:['Grand dorsal', 'Milieu du dos'], secondary:['Deltoïdes postérieurs', 'Biceps'] },
      execution:[
        '**Règle le siège** : poitrine en appui sur le haut du coussin, poignées à portée de bras tendus.',
        '**Prise neutre ou pronation**, regard devant, coudes près du corps.',
        'Tire les poignées **le plus loin possible vers l\'arrière**, en serrant les omoplates. **Pause de 1 s**.',
        '**Reviens lentement** en gardant une légère flexion des coudes au bout, sans relâcher la charge.',
        'Chaque bras a sa poignée : tu peux aussi le faire **un bras à la fois**.',
      ],
      erreurs:[
        '**Décoller la poitrine** du coussin pour tirer plus lourd.',
        '**Se balancer en arrière**.',
        '**Raccourcir le mouvement** : va chercher l\'omoplate en fin de tirage.',
      ],
      interet:'Rowing poitrine appuyée : tout le travail pour le dos, **zéro contrainte pour le bas du dos**. Parfait quand les lombaires sont fatiguées ou quand le rowing barre est pris. Les bras séparés aident à corriger les **déséquilibres gauche/droite**.'
    }},
  {id:'x-tractions-ass',muscle:'Dos',restTime:120,name:'Tractions assistées',reps:'6-8',format:'3×6-8',sets:3,
    info:{
      gif:'gifs/tractions-assistees.webp',
      muscles:{ main:['Grand dorsal'], secondary:['Biceps', 'Milieu du dos'] },
      execution:[
        '**Règle l\'assistance** (le contrepoids qui t\'aide) et monte à genoux ou debout sur la plateforme.',
        'Prise pronation un peu plus large que les épaules, **départ bras tendus**.',
        'Tire en pensant **« coudes vers le bas »** jusqu\'à ce que **le menton passe la barre**. Souffle en montant.',
        '**Tiens 1-2 s en haut**, puis **redescends lentement** jusqu\'aux bras complètement tendus.',
        'Note l\'assistance en kg dans la case « charge » : **plus elle baisse, plus tu progresses**.',
      ],
      erreurs:[
        'Tirer **avec les bras** plutôt qu\'avec le dos.',
        'Faire des **demi-répétitions** : bras tendus en bas, menton au-dessus de la barre en haut.',
        'Garder la même assistance des semaines : **baisse-la** dès que tu fais toutes tes répétitions.',
      ],
      interet:'**Le mouvement exact de la traction**, avec juste ce qu\'il faut d\'aide. En baissant l\'assistance de séance en séance, c\'est le chemin le plus direct vers **tes 3 tractions strictes**.'
    }},

  // ── Pectoraux ───────────────────────────────────────────────────────────────
  {id:'x-pecfly',muscle:'Pectoraux',restTime:90,name:'Pec fly (machine)',reps:'10-12',format:'3×10-12',sets:3,
    info:{
      gif:'gifs/pec-fly-machine.webp',
      muscles:{ main:['Pectoraux'], secondary:['Deltoïdes antérieurs'] },
      execution:[
        'Règle le siège : **poignées à hauteur de poitrine**. Dos plaqué au dossier, tête dans l\'axe.',
        '**Coudes légèrement fléchis et fixes** pendant tout le mouvement.',
        'Rapproche les poignées devant toi **en arc de cercle** en soufflant, sans qu\'elles se touchent. **Serre les pecs 1 à 2 s**.',
        '**Reviens lentement** jusqu\'à sentir l\'étirement, sans reposer la charge entre les répétitions.',
      ],
      erreurs:[
        '**Avancer le buste** ou pousser avec les pieds.',
        '**Prendre de l\'élan**.',
        '**Ouvrir trop loin** en arrière : arrête-toi quand tu sens l\'étirement.',
      ],
      interet:'Isole les pectoraux sans gérer l\'équilibre, avec une **tension constante**. Bon en finition ou quand les bancs sont pris. **Ne remplace pas un développé** pour la force, mais complète bien.'
    }},
  {id:'x-incline-machine',muscle:'Pectoraux',restTime:120,name:'Développé incliné (machine)',reps:'8-10',format:'3×8-10',sets:3,
    info:{
      gif:'gifs/developpe-incline-machine.webp',
      muscles:{ main:['Haut des pectoraux'], secondary:['Deltoïdes antérieurs', 'Triceps'] },
      execution:[
        '**Règle le siège** : poignées un peu sous la hauteur des épaules, là où serait la barre en bas d\'un développé.',
        'Inspire et **serre les omoplates contre le dossier**, pieds à plat, abdos gainés.',
        'Pousse en soufflant, **sans que les épaules partent vers l\'avant**.',
        '**Reviens lentement** jusqu\'à l\'étirement des pecs, sans reposer la charge.',
      ],
      erreurs:[
        '**Décoller les omoplates** du dossier, surtout si l\'avant de l\'épaule tire.',
        '**Cambrer fort** le bas du dos.',
        '**Pousser avec les jambes** ou bouger le bassin.',
      ],
      interet:'Même rôle que le développé incliné haltères (**le haut des pectoraux**), mais **guidé** : tu peux pousser fort sans gérer l\'équilibre. Parfait quand la salle est pleine ou en fin de séance pecs.'
    }},
  {id:'x-dc-machine',muscle:'Pectoraux',restTime:150,name:'Développé couché (Smith machine)',reps:'6-8',format:'3×6-8',sets:3,
    info:{
      gif:'gifs/developpe-couche-machine.webp',
      muscles:{ main:['Pectoraux'], secondary:['Triceps', 'Deltoïdes antérieurs'] },
      execution:[
        '**Banc centré sous la barre** : elle doit descendre sur le milieu de la poitrine. Barre réglée à hauteur de bras presque tendus.',
        'Prise un peu plus large que les épaules, **omoplates serrées**, pieds bien ancrés.',
        '**Déverrouille la barre** en la tournant, descends lentement jusqu\'à **frôler la poitrine**, courte pause.',
        'Pousse **sans verrouiller les coudes**. Toujours finir en **reverrouillant la barre** sur les crochets.',
      ],
      erreurs:[
        'Faire **rebondir la barre** sur la poitrine.',
        'Placer le banc au hasard : **vérifie la trajectoire** de la barre avant de charger.',
        '**Relâcher les omoplates** ou décoller les fesses.',
      ],
      interet:'Remplaçant du développé couché barre quand le banc est pris : la barre est guidée, **pas besoin de pareur**. Les charges ne sont **pas comparables** avec la barre libre, c\'est pour ça qu\'elles sont enregistrées à part.'
    }},

  // ── Épaules ─────────────────────────────────────────────────────────────────
  {id:'x-epaules-machine',muscle:'Épaules',restTime:150,name:'Développé épaules (machine)',reps:'6-8',format:'3×6-8',sets:3,
    info:{
      gif:'gifs/developpe-epaules-machine.webp',
      muscles:{ main:['Deltoïdes antérieurs et latéraux'], secondary:['Triceps', 'Haut des pectoraux'] },
      execution:[
        'Règle le siège : **poignées à hauteur d\'épaules**. Trop bas, tu perds de l\'amplitude.',
        'Dos contre le dossier, **abdos gainés**, prise pronation (ou neutre si l\'épaule est sensible).',
        'Pousse au-dessus de la tête **jusqu\'aux bras presque tendus**.',
        '**Redescends lentement** jusqu\'au niveau des épaules, sans reposer la charge en bas.',
      ],
      erreurs:[
        '**Cambrer le dos** pour finir la répétition.',
        '**Reposer la pile** entre les répétitions.',
        '**Siège mal réglé**. Si l\'épaule fait mal : plus léger, prise neutre, ou un autre exercice.',
      ],
      interet:'Remplaçant du développé militaire : **plus stable, moins de gainage**, et **sans danger si tu échoues** sur une répétition. Idéal quand le dos est fatigué.'
    }},
  {id:'x-oiseau-machine',muscle:'Épaules',restTime:60,name:'Oiseau (machine)',reps:'15-20',format:'3×15-20',sets:3,
    info:{
      gif:'gifs/oiseau-machine.webp',
      muscles:{ main:['Deltoïdes postérieurs'], secondary:['Rhomboïdes', 'Trapèzes moyens'] },
      execution:[
        'Assis face au dossier de la machine, **poitrine contre le coussin**, bras tendus devant à hauteur d\'épaules.',
        'Prise pronation ou neutre, **coudes légèrement fléchis**.',
        'Ouvre les bras vers l\'arrière **en arc de cercle** : **le mouvement part de l\'épaule**. Serre légèrement les omoplates en fin de mouvement.',
        '**Reviens lentement**. **Charge légère**, mouvement propre.',
      ],
      erreurs:[
        '**Hausser les épaules** : souvent le signe que c\'est trop lourd.',
        '**Avancer la tête**.',
        'Tirer **avec les omoplates seulement**, sans ouvrir les bras.',
      ],
      interet:'Isole **l\'arrière des épaules**, souvent en retard, sans avoir à te stabiliser. **Bon remplaçant du face pull** si la poulie est prise.'
    }},

  // ── Bras ────────────────────────────────────────────────────────────────────
  {id:'x-curl-poulie',muscle:'Bras',restTime:60,name:'Curl biceps poulie basse',reps:'10-12',format:'2×10-12',sets:2,
    info:{
      gif:'gifs/curl-poulie-basse.webp',
      muscles:{ main:['Biceps'], secondary:['Brachial', 'Avant-bras'] },
      execution:[
        'Debout **face à la poulie basse**, pieds largeur d\'épaules, barre droite ou EZ en supination, à largeur d\'épaules.',
        '**Coudes collés au corps** : seul l\'avant-bras bouge.',
        'Monte la barre près des épaules, **pause en contraction**.',
        '**Redescends lentement** jusqu\'aux bras tendus, **sans te reposer en bas** : la poulie garde la tension.',
      ],
      erreurs:[
        '**Coudes qui avancent** ou s\'écartent.',
        '**Élan du buste**.',
        'Amplitude partielle. Dans les trois cas : **baisse la charge**.',
      ],
      interet:'La poulie garde une **tension sur tout le mouvement**, même en bas, là où la barre libre n\'en donne presque pas. Isolation stricte qui permet de progresser en charge **sans tricher**. Bon remplaçant du curl EZ.'
    }},
  {id:'x-triceps-corde',muscle:'Bras',restTime:60,name:'Extension triceps corde au-dessus de la tête',reps:'10-12',format:'2×10-12',sets:2,
    info:{
      gif:'gifs/triceps-corde.webp',
      muscles:{ main:['Triceps (surtout la longue portion)'], secondary:[] },
      execution:[
        'Poulie haute, corde en main, **dos à la machine**, un pied devant l\'autre.',
        'Corde derrière la tête, **coudes pliés près de la tête**, buste légèrement penché en avant. **Rentre un peu le menton**.',
        'Tends les bras vers l\'avant et un peu vers le haut, jusqu\'à ce qu\'ils soient **presque tendus**, en **écartant la corde** en fin de mouvement.',
        'Reviens lentement jusqu\'à **un bon étirement des triceps**, **coudes fixes** : seuls les avant-bras bougent.',
      ],
      erreurs:[
        '**Écarter les coudes** : les triceps travaillent moins.',
        '**Se laisser tirer en arrière** ou cambrer.',
        '**Charger lourd** : le corps devient instable et les coudes souffrent.',
      ],
      interet:'Bras au-dessus de la tête, **la longue portion du triceps**, qui fait la plus grosse partie du bras, **travaille étirée** : c\'est là qu\'elle progresse le mieux. À faire si tu remplaces le superset curl/extension par un curl seul.'
    }},
  // ── Variantes machine (ajoutées le 5/11) ────────────────────────────────────
  {id:'x-militaire-smith',muscle:'Épaules',restTime:150,name:'Développé militaire (Smith)',reps:'6-8',format:'3×6-8',sets:3,
    info:{
      gif:'gifs/developpe-epaules-smith.webp',
      muscles:{ main:['Deltoïdes antérieurs et latéraux'], secondary:['Triceps', 'Haut des pectoraux'] },
      execution:[
        'Banc **réglé à 80-90°** sous la barre guidée, la barre passe **juste devant ton visage**.',
        'Prise un peu plus large que les épaules, **dos et fessiers collés au dossier**, abdos gainés.',
        'Déverrouille en tournant les poignets, puis **pousse jusqu\'aux bras presque tendus**.',
        'Redescends **jusqu\'au menton**, sous contrôle, et **reverrouille** les crochets à la fin de la série.',
      ],
      erreurs:[
        '**Banc mal placé** : la barre doit descendre devant le visage, pas sur le front.',
        '**Cambrer le bas du dos** pour finir la rep.',
        '**Oublier de verrouiller** la barre avant de la lâcher.',
      ],
      interet:'Même mouvement que le militaire, mais **la barre est guidée** : pas d\'équilibre à gérer, et tu peux **verrouiller à tout moment** si tu échoues. Pratique quand le rack est pris.'
    }},
  {id:'x-tirage-machine',muscle:'Dos',restTime:120,name:'Tirage vertical (machine Hammer)',reps:'8-10',format:'3×8-10',sets:3,
    info:{
      gif:'gifs/tirage-vertical-machine.webp',
      muscles:{ main:['Grand dorsal'], secondary:['Biceps', 'Grand rond', 'Rhomboïdes'] },
      execution:[
        'Règle le siège : **cuisses bien calées** sous les boudins, bras tendus pour attraper les poignées.',
        'Poitrine haute, **épaules basses** avant de tirer.',
        'Tire les poignées **vers le haut de la poitrine en amenant les coudes vers les hanches**. Serre le dos 1 seconde.',
        '**Remonte lentement** jusqu\'aux bras tendus, en gardant les épaules basses.',
      ],
      erreurs:[
        '**Tirer avec les bras** au lieu des coudes : pense « coudes dans les poches ».',
        '**Se pencher en arrière** pour s\'aider avec le poids du corps.',
        '**Lâcher la remontée** : la phase lente travaille autant que la montée.',
      ],
      interet:'Remplace le tirage à la poulie quand elle est prise. Les deux bras travaillent **chacun de leur côté** : le plus faible ne peut pas tricher.'
    }},
  {id:'x-lat-machine',muscle:'Épaules',restTime:75,name:'Élévations latérales (machine)',reps:'12-15',format:'3×12-15',sets:3,
    info:{
      gif:'gifs/elevations-laterales-machine.webp',
      muscles:{ main:['Deltoïdes latéraux'], secondary:['Trapèzes supérieurs'] },
      execution:[
        'Règle le siège : **l\'axe de la machine aligné avec tes épaules**, coussins contre l\'extérieur des bras.',
        'Dos droit, **épaules basses**, poignées en main.',
        'Monte les bras sur les côtés **jusqu\'à hauteur d\'épaules**, pas plus haut.',
        '**Redescends lentement** sans reposer la charge en bas.',
      ],
      erreurs:[
        '**Hausser les épaules** : c\'est les trapèzes qui bossent, allège.',
        '**Monter au-dessus des épaules** : ça n\'apporte rien de plus.',
        '**Donner des à-coups** pour finir la série.',
      ],
      interet:'La machine garde **la tension sur tout le mouvement**, même en bas, et tu ne peux pas tricher avec le dos. Excellente quand les poulies sont prises.'
    }},
  {id:'x-mollets-assis',muscle:'Jambes',restTime:60,name:'Mollets assis (machine)',reps:'15-20',format:'3×15-20',sets:3,
    info:{
      gif:'gifs/mollets-assis-machine.webp',
      muscles:{ main:['Soléaire'], secondary:['Mollets (jumeaux)'] },
      execution:[
        'Assis, **avant des pieds sur la marche**, talons dans le vide, **genoux sous les boudins**.',
        'Débloque la sécurité, laisse **les talons descendre** pour bien étirer.',
        'Monte sur la pointe des pieds **le plus haut possible**, **tiens 1 seconde**.',
        '**Redescends lentement**, et remets la sécurité à la fin.',
      ],
      erreurs:[
        '**Faire des demi-reps** rapides en rebond.',
        '**Oublier l\'étirement en bas** : c\'est là que le mollet travaille le plus.',
      ],
      interet:'Genoux pliés, c\'est surtout **le soléaire** qui travaille, le muscle sous le mollet visible. Bon complément ou remplaçant des mollets debout.'
    }},
  // ── Catalogue Basic-Fit (ajouté le 5/11) ──────────────────────────────────────
  {id:'x-chest-press',muscle:'Pectoraux',restTime:120,name:'Développé assis (machine)',reps:'8-12',format:'3×8-12',sets:3,
    info:{
      gif:'gifs/chest-press-machine.webp',
      muscles:{ main:['Pectoraux'], secondary:['Triceps', 'Deltoïdes antérieurs'] },
      execution:[
        'Règle le siège : **poignées au niveau du milieu de la poitrine**.',
        'Dos collé au dossier, **omoplates serrées**, pieds à plat.',
        'Pousse **jusqu\'aux bras presque tendus**, sans verrouiller les coudes.',
        '**Reviens lentement** jusqu\'à sentir l\'étirement des pecs, sans reposer la charge.',
      ],
      erreurs:[
        '**Siège trop haut ou trop bas** : les épaules prennent le relais.',
        '**Décoller le dos** du dossier pour pousser plus lourd.',
      ],
      interet:'Le développé le plus simple qui soit : **pas d\'équilibre à gérer**, idéal pour débuter ou quand le banc est pris.'
    }},
  {id:'x-dips-assistes',muscle:'Pectoraux',restTime:120,name:'Dips assistés (machine)',reps:'8-12',format:'3×8-12',sets:3,
    info:{
      gif:'gifs/dips-assistes-machine.webp',
      muscles:{ main:['Pectoraux (bas)', 'Triceps'], secondary:['Deltoïdes antérieurs'] },
      execution:[
        'Choisis l\'assistance : **plus le poids est lourd, plus la machine t\'aide**.',
        'Genoux sur le coussin, mains sur les poignées, **buste légèrement penché en avant**.',
        'Descends **jusqu\'à ce que les coudes forment environ 90°**.',
        'Remonte en poussant, **sans verrouiller les coudes** en haut.',
      ],
      erreurs:[
        '**Descendre trop bas** : ça tire sur l\'avant des épaules.',
        '**Hausser les épaules** vers les oreilles.',
      ],
      interet:'La version accessible des dips : tu progresses en **retirant de l\'assistance** au fil des semaines, jusqu\'aux dips au poids du corps.'
    }},
  {id:'x-row-machine',muscle:'Dos',restTime:120,name:'Rowing assis (machine)',reps:'8-12',format:'3×8-12',sets:3,
    info:{
      gif:'gifs/rowing-assis-machine.webp',
      muscles:{ main:['Milieu du dos (rhomboïdes, trapèzes)', 'Grand dorsal'], secondary:['Biceps', 'Deltoïdes postérieurs'] },
      execution:[
        'Règle le siège : **poignées à hauteur du bas de la poitrine**, poitrine contre le coussin.',
        'Bras tendus, **épaules basses**.',
        'Tire en amenant **les coudes vers l\'arrière**, près du corps. **Serre les omoplates** 1 seconde.',
        '**Reviens lentement** jusqu\'aux bras tendus.',
      ],
      erreurs:[
        '**Décoller la poitrine** du coussin pour tirer plus lourd.',
        '**Tirer avec les bras** : pense coudes, pas mains.',
      ],
      interet:'Poitrine calée : **zéro stress sur le bas du dos**. Parfait remplaçant des rowings libres quand le dos est fatigué.'
    }},
  {id:'x-tbar',muscle:'Dos',restTime:120,name:'Rowing T-bar (machine)',reps:'8-10',format:'3×8-10',sets:3,
    info:{
      gif:'gifs/rowing-t-bar-machine.webp',
      muscles:{ main:['Milieu du dos', 'Grand dorsal'], secondary:['Biceps', 'Lombaires (gainage)', 'Deltoïdes postérieurs'] },
      execution:[
        'Pieds sur la plateforme, **poitrine contre le coussin** (ou buste penché à 45° dos plat si pas de coussin).',
        'Attrape les poignées, **dos plat, abdos serrés**.',
        'Tire la barre **vers le bas de la poitrine** en serrant les omoplates.',
        '**Redescends sous contrôle** jusqu\'aux bras tendus.',
      ],
      erreurs:[
        '**Arrondir le dos** : c\'est le piège numéro un.',
        '**Donner des coups de reins** pour monter la charge.',
      ],
      interet:'Un rowing **lourd et stable** : tu peux charger plus qu\'aux haltères, avec un dos bien protégé.'
    }},
  {id:'x-pullover-poulie',muscle:'Dos',restTime:75,name:'Pull-over à la poulie',reps:'12-15',format:'3×12-15',sets:3,
    info:{
      gif:'gifs/pull-over-poulie.webp',
      muscles:{ main:['Grand dorsal'], secondary:['Grand rond', 'Triceps (longue portion)'] },
      execution:[
        'Face à la poulie haute, barre droite ou corde, **bras presque tendus**, buste légèrement penché.',
        '**Abdos serrés**, épaules basses.',
        'Ramène la barre **en arc de cercle jusqu\'aux cuisses** en gardant les bras quasi tendus.',
        '**Remonte lentement** jusqu\'à sentir l\'étirement sous les aisselles.',
      ],
      erreurs:[
        '**Plier les coudes** : ça devient un exercice de triceps.',
        '**Charger trop lourd** et balancer le buste.',
      ],
      interet:'Isole le grand dorsal **sans les biceps**. Parfait en fin de séance dos, ou pour apprendre à « sentir » ton dos.'
    }},
  {id:'x-lombaires',muscle:'Dos',restTime:90,name:'Extension lombaire (banc à 45°)',reps:'12-15',format:'3×12-15',sets:3,
    info:{
      gif:'gifs/extension-lombaire-45.webp',
      muscles:{ main:['Lombaires'], secondary:['Fessiers', 'Ischio-jambiers'] },
      execution:[
        'Règle le banc : **le bord du coussin juste sous les hanches**, chevilles calées.',
        'Bras croisés sur la poitrine, **dos droit**.',
        'Descends lentement en **pliant aux hanches**, dos plat.',
        'Remonte **jusqu\'à l\'alignement jambes-buste**, pas plus haut.',
      ],
      erreurs:[
        '**Remonter au-delà de l\'alignement** en se cambrant.',
        '**Faire des à-coups** : tout se fait lentement.',
      ],
      interet:'Renforce le bas du dos et les fessiers : **un dos solide protège tout le reste**, du soulevé de terre aux longues heures assis.'
    }},
  {id:'x-shrugs',muscle:'Dos',restTime:60,name:'Shrugs (haltères)',reps:'12-15',format:'3×12-15',sets:3,
    info:{
      gif:'gifs/shrugs-halteres.webp',
      muscles:{ main:['Trapèzes supérieurs'], secondary:['Avant-bras (prise)'] },
      execution:[
        'Debout, un haltère dans chaque main, **bras le long du corps**.',
        'Monte les épaules **droit vers les oreilles**, le plus haut possible.',
        '**Tiens 1 seconde** en haut.',
        'Redescends lentement.',
      ],
      erreurs:[
        '**Rouler les épaules** en cercle : inutile et mauvais pour l\'articulation.',
        '**Plier les coudes** pour aider.',
      ],
      interet:'Développe les trapèzes, ce qui donne **une carrure plus épaisse** vue de face.'
    }},
  {id:'x-curl-machine',muscle:'Bras',restTime:60,name:'Curl biceps (machine)',reps:'10-12',format:'3×10-12',sets:3,
    info:{
      gif:'gifs/curl-biceps-machine.webp',
      muscles:{ main:['Biceps'], secondary:['Avant-bras'] },
      execution:[
        'Règle le siège : **coudes alignés avec l\'axe de la machine**, bras à plat sur le pupitre.',
        'Prise en supination (paumes vers le haut).',
        'Monte **en contractant le biceps**, sans décoller les coudes.',
        '**Redescends lentement** jusqu\'aux bras presque tendus.',
      ],
      erreurs:[
        '**Coudes mal alignés** avec l\'axe : ça tire sur l\'articulation.',
        '**Soulever les fesses** pour finir la rep.',
      ],
      interet:'Le pupitre bloque toute triche : **100 % biceps**, idéal pour finir une séance bras.'
    }},
  {id:'x-curl-incline',muscle:'Bras',restTime:60,name:'Curl incliné (haltères)',reps:'10-12',format:'3×10-12',sets:3,
    info:{
      gif:'gifs/curl-incline-halteres.webp',
      muscles:{ main:['Biceps (longue portion)'], secondary:['Avant-bras'] },
      execution:[
        'Banc incliné à **45-60°**, dos collé, **bras pendants à la verticale**.',
        'Paumes vers l\'avant.',
        'Monte les haltères **sans avancer les coudes**.',
        '**Redescends complètement**, bras tendus : c\'est l\'étirement qui fait tout.',
      ],
      erreurs:[
        '**Avancer les coudes** pendant la montée.',
        '**Charger trop lourd** et perdre l\'amplitude.',
      ],
      interet:'Bras derrière le corps, le biceps est **étiré au maximum** : un des curls les plus efficaces pour le développer.'
    }},
  {id:'x-curl-pupitre',muscle:'Bras',restTime:60,name:'Curl pupitre (barre EZ)',reps:'8-12',format:'3×8-12',sets:3,
    info:{
      gif:'gifs/curl-pupitre-ez.webp',
      muscles:{ main:['Biceps'], secondary:['Brachial', 'Avant-bras'] },
      execution:[
        'Assis au pupitre, **aisselles calées en haut du coussin**, bras à plat.',
        'Prise sur les parties inclinées de la barre EZ.',
        'Monte **jusqu\'à ce que les avant-bras soient presque verticaux**.',
        '**Redescends lentement** sans tendre complètement les coudes en bas.',
      ],
      erreurs:[
        '**Lâcher la descente** : c\'est là que les coudes trinquent.',
        '**Décoller les bras** du pupitre.',
      ],
      interet:'Le classique pour **isoler les biceps**. La barre EZ soulage les poignets.'
    }},
  {id:'x-triceps-machine',muscle:'Bras',restTime:60,name:'Extensions triceps (machine)',reps:'10-12',format:'3×10-12',sets:3,
    info:{
      gif:'gifs/triceps-machine.webp',
      muscles:{ main:['Triceps'], secondary:[] },
      execution:[
        'Règle le siège : **coudes alignés avec l\'axe**, bras sur le coussin.',
        'Dos contre le dossier.',
        'Pousse **jusqu\'aux bras tendus**, en contractant les triceps 1 seconde.',
        '**Reviens lentement**.',
      ],
      erreurs:[
        '**Décoller les coudes** du coussin.',
        '**Pencher le buste** pour pousser avec le corps.',
      ],
      interet:'Triceps isolés, **sans stress sur les épaules**. Très bien en fin de séance.'
    }},
  {id:'x-triceps-poulie',muscle:'Bras',restTime:60,name:'Extensions triceps poulie haute (corde)',reps:'10-15',format:'3×10-15',sets:3,
    info:{
      gif:'gifs/triceps-poulie-haute.webp',
      muscles:{ main:['Triceps'], secondary:[] },
      execution:[
        'Face à la poulie haute, corde en main, **coudes collés au corps**.',
        'Buste légèrement penché, abdos serrés.',
        'Pousse vers le bas **jusqu\'aux bras tendus** en écartant la corde en bas.',
        '**Remonte lentement** jusqu\'à ce que les avant-bras soient à l\'horizontale.',
      ],
      erreurs:[
        '**Coudes qui partent devant** : ils restent fixes.',
        '**Utiliser le poids du corps** pour descendre la charge.',
      ],
      interet:'Le grand classique du triceps : simple, efficace, **facile à doser**.'
    }},
  {id:'x-dips-assis',muscle:'Bras',restTime:90,name:'Dips assis (machine)',reps:'8-12',format:'3×8-12',sets:3,
    info:{
      gif:'gifs/dips-assis-machine.webp',
      muscles:{ main:['Triceps'], secondary:['Pectoraux (bas)', 'Deltoïdes antérieurs'] },
      execution:[
        'Règle le siège : **poignées à hauteur des côtes**, dos contre le dossier.',
        'Coudes près du corps.',
        'Pousse vers le bas **jusqu\'aux bras tendus**.',
        '**Remonte lentement** sans dépasser 90° aux coudes.',
      ],
      erreurs:[
        '**Ouvrir les coudes** sur les côtés.',
        '**Remonter trop haut** : l\'avant de l\'épaule souffre.',
      ],
      interet:'Les dips **sans le poids du corps** : tu choisis la charge, parfait pour charger lourd les triceps en sécurité.'
    }},
  {id:'x-squat-smith',muscle:'Jambes',restTime:150,name:'Squat (Smith machine)',reps:'8-10',format:'3×8-10',sets:3,
    info:{
      gif:'gifs/squat-smith.webp',
      muscles:{ main:['Quadriceps', 'Fessiers'], secondary:['Ischio-jambiers', 'Lombaires (gainage)'] },
      execution:[
        'Barre sur le **haut du dos** (trapèzes), **pieds un peu en avant** de la barre, largeur d\'épaules.',
        'Déverrouille en tournant les poignets, **abdos serrés**.',
        'Descends **jusqu\'aux cuisses parallèles** au sol, dos droit.',
        'Remonte en poussant dans les talons, puis **reverrouille** la barre.',
      ],
      erreurs:[
        '**Pieds sous la barre** : les genoux et le bas du dos prennent tout.',
        '**Genoux qui rentrent** vers l\'intérieur.',
      ],
      interet:'Le squat **sans gérer l\'équilibre**, avec des crochets de sécurité à chaque cran. Bonne porte d\'entrée vers le squat libre.'
    }},
  {id:'x-hack',muscle:'Jambes',restTime:150,name:'Hack squat',reps:'8-12',format:'3×8-12',sets:3,
    info:{
      gif:'gifs/hack-squat.webp',
      muscles:{ main:['Quadriceps'], secondary:['Fessiers', 'Adducteurs'] },
      execution:[
        'Dos et épaules **bien calés** contre les coussins, pieds au milieu de la plateforme, largeur d\'épaules.',
        'Débloque les sécurités.',
        'Descends **lentement jusqu\'à 90°** ou un peu plus bas si c\'est confortable.',
        'Remonte en poussant dans toute la plante du pied, **sans verrouiller les genoux**, puis remets les sécurités.',
      ],
      erreurs:[
        '**Talons qui décollent** : avance un peu les pieds.',
        '**Verrouiller les genoux** en haut.',
      ],
      interet:'Le meilleur ami des quadriceps : **dos protégé**, charge lourde possible.'
    }},
  {id:'x-legcurl-allonge',muscle:'Jambes',restTime:90,name:'Leg curl allongé',reps:'10-12',format:'3×10-12',sets:3,
    info:{
      gif:'gifs/leg-curl-allonge.webp',
      muscles:{ main:['Ischio-jambiers'], secondary:['Mollets'] },
      execution:[
        'Allongé sur le ventre, **genoux juste au bord du coussin**, boudin au-dessus des talons.',
        'Hanches **plaquées** sur le banc.',
        'Ramène les talons **vers les fesses**, serre 1 seconde.',
        '**Redescends lentement** sans reposer la charge.',
      ],
      erreurs:[
        '**Décoller les hanches** du banc.',
        '**Lâcher la descente**.',
      ],
      interet:'L\'autre version du leg curl, **si la machine assise est prise**. Même muscles, même efficacité.'
    }},
  {id:'x-bulgare',muscle:'Jambes',restTime:90,name:'Squat bulgare (haltères)',reps:'8-10/jambe',format:'3×8-10/jambe',sets:3,
    info:{
      gif:'gifs/squat-bulgare-halteres.webp',
      muscles:{ main:['Quadriceps', 'Fessiers'], secondary:['Ischio-jambiers', 'Adducteurs'] },
      execution:[
        'Un haltère dans chaque main, **pied arrière posé sur un banc**, pied avant à un grand pas devant.',
        'Buste droit ou légèrement penché, **abdos serrés**.',
        'Descends **le genou arrière vers le sol**, le genou avant suit la pointe du pied.',
        'Remonte en poussant dans **le talon avant**. Fais toutes les reps d\'une jambe puis change.',
      ],
      erreurs:[
        '**Pied avant trop proche** du banc : le genou part loin devant.',
        '**Perdre l\'équilibre** : commence sans charge.',
      ],
      interet:'Une jambe à la fois : **corrige les déséquilibres** et brûle les cuisses comme peu d\'exos. Dur, mais redoutable.'
    }},
  {id:'x-rdl',muscle:'Jambes',restTime:120,name:'Soulevé de terre roumain',reps:'8-10',format:'3×8-10',sets:3,
    info:{
      gif:'gifs/souleve-de-terre-roumain.webp',
      muscles:{ main:['Ischio-jambiers', 'Fessiers'], secondary:['Lombaires', 'Avant-bras (prise)'] },
      execution:[
        'Debout, barre (ou haltères) devant les cuisses, **genoux légèrement fléchis**.',
        'Pousse les **fesses vers l\'arrière**, dos plat : la barre glisse le long des cuisses.',
        'Descends **jusqu\'à sentir l\'étirement** derrière les cuisses (souvent sous les genoux).',
        'Remonte en **poussant les hanches vers l\'avant**, serre les fessiers.',
      ],
      erreurs:[
        '**Arrondir le dos** : arrête la descente avant.',
        '**Plier les genoux** comme un squat.',
      ],
      interet:'Le roi des ischio-jambiers et des fessiers. **Charnière de hanche** : un mouvement utile au quotidien pour soulever sans se faire mal.'
    }},
  {id:'x-hip-thrust',muscle:'Jambes',restTime:90,name:'Hip thrust',reps:'8-12',format:'3×8-12',sets:3,
    info:{
      gif:'gifs/hip-thrust.webp',
      muscles:{ main:['Fessiers'], secondary:['Ischio-jambiers', 'Quadriceps'] },
      execution:[
        'Haut du dos contre un banc, **barre sur les hanches** (avec une mousse), pieds à plat.',
        'Menton rentré, **regard vers l\'avant**.',
        'Monte les hanches **jusqu\'à l\'alignement épaules-genoux**, serre les fessiers 1 seconde.',
        'Redescends sous contrôle.',
      ],
      erreurs:[
        '**Se cambrer** en haut au lieu de serrer les fessiers.',
        '**Pieds trop loin** : ce sont les ischios qui travaillent.',
      ],
      interet:'Le meilleur exercice pour **les fessiers**, sans charge sur le dos. Existe aussi en machine ou à la Smith.'
    }},
  {id:'x-fentes',muscle:'Jambes',restTime:90,name:'Fentes avant (haltères)',reps:'10/jambe',format:'3×10/jambe',sets:3,
    info:{
      gif:'gifs/fentes-avant-halteres.webp',
      muscles:{ main:['Quadriceps', 'Fessiers'], secondary:['Ischio-jambiers', 'Mollets'] },
      execution:[
        'Debout, un haltère dans chaque main.',
        'Fais **un grand pas en avant** et descends jusqu\'à ce que **le genou arrière frôle le sol**.',
        'Buste droit, **genou avant aligné** avec la pointe du pied.',
        'Pousse dans le talon avant pour **revenir à la position de départ**. Alterne les jambes.',
      ],
      erreurs:[
        '**Pas trop court** : le genou avant part loin devant.',
        '**Pencher le buste** en avant.',
      ],
      interet:'Travaille chaque jambe séparément, **l\'équilibre et la stabilité**. Très bon complément à la presse.'
    }},
  {id:'x-ext-hanche',muscle:'Jambes',restTime:60,name:'Extension de hanche (machine)',reps:'12-15/jambe',format:'3×12-15/jambe',sets:3,
    info:{
      gif:'gifs/extension-hanche-machine.webp',
      muscles:{ main:['Fessiers'], secondary:['Ischio-jambiers'] },
      execution:[
        'Règle la machine : **le coussin derrière la cuisse**, juste au-dessus du genou.',
        'Mains sur les poignées, buste stable.',
        'Pousse la jambe **vers l\'arrière** en serrant le fessier, sans te cambrer.',
        '**Reviens lentement**. Toutes les reps d\'un côté, puis l\'autre.',
      ],
      erreurs:[
        '**Se cambrer** pour aller plus loin.',
        '**Balancer la jambe** avec élan.',
      ],
      interet:'Isole les fessiers, **une jambe après l\'autre**. Bon en fin de séance jambes.'
    }},
  {id:'x-crunch-machine',muscle:'Abdos',restTime:60,name:'Crunch (machine)',reps:'12-15',format:'3×12-15',sets:3,
    info:{
      gif:'gifs/crunch-machine.webp',
      muscles:{ main:['Grand droit (abdos)'], secondary:['Obliques'] },
      execution:[
        'Règle le siège, **mains sur les poignées**, pieds calés.',
        'Enroule le buste **en rapprochant les côtes du bassin**.',
        '**Serre les abdos** 1 seconde en bas.',
        'Reviens lentement sans laisser la charge retomber.',
      ],
      erreurs:[
        '**Tirer avec les bras** au lieu d\'enrouler le dos.',
        '**Aller trop vite**.',
      ],
      interet:'Des abdos **chargés comme un vrai muscle** : tu progresses en poids, comme sur le reste.'
    }},
  {id:'x-crunch-poulie',muscle:'Abdos',restTime:60,name:'Crunch à la poulie haute',reps:'12-15',format:'3×12-15',sets:3,
    info:{
      gif:'gifs/crunch-poulie.webp',
      muscles:{ main:['Grand droit (abdos)'], secondary:['Obliques'] },
      execution:[
        'À genoux face à la poulie haute, **corde tenue près de la tête**.',
        'Hanches fixes.',
        'Enroule le buste **vers le sol en arrondissant le dos**, coudes vers les cuisses.',
        'Remonte lentement **sans relâcher la tension**.',
      ],
      erreurs:[
        '**Bouger les hanches** : c\'est le dos qui doit s\'enrouler.',
        '**Tirer avec les bras**.',
      ],
      interet:'Très efficace et facile à doser. **La poulie garde la tension** sur tout le mouvement.'
    }},
  {id:'x-releve-jambes',muscle:'Abdos',restTime:60,name:'Relevé de jambes (chaise romaine)',reps:'10-15',format:'3×10-15',sets:3,
    info:{
      gif:'gifs/releve-jambes-chaise-romaine.webp',
      muscles:{ main:['Bas des abdos', 'Fléchisseurs de hanche'], secondary:['Obliques'] },
      execution:[
        'Avant-bras sur les appuis, **dos collé au dossier**, jambes pendantes.',
        'Monte les genoux **vers la poitrine** en enroulant le bassin.',
        '**Tiens 1 seconde** en haut.',
        'Redescends lentement, **sans balancer**.',
      ],
      erreurs:[
        '**Se balancer** pour monter.',
        '**Monter les jambes sans enrouler le bassin** : ce sont les hanches qui bossent.',
      ],
      interet:'Cible **le bas des abdos**. Genoux pliés pour commencer, jambes tendues quand ça devient facile.'
    }},
  {id:'x-planche',muscle:'Abdos',restTime:45,name:'Planche (gainage)',reps:'30-60 s',format:'3×30-60 s',sets:3,
    info:{
      gif:'gifs/planche.webp',
      muscles:{ main:['Abdos (transverse, grand droit)'], secondary:['Lombaires', 'Épaules', 'Fessiers'] },
      execution:[
        'Sur les avant-bras, **coudes sous les épaules**.',
        'Corps **droit de la tête aux talons**.',
        '**Serre les fessiers et les abdos**, respire normalement.',
        'Tiens le temps prévu, sans laisser les hanches tomber.',
      ],
      erreurs:[
        '**Hanches qui tombent** : le dos se creuse.',
        '**Fesses en l\'air** : c\'est trop facile.',
      ],
      interet:'Le gainage de base : **un tronc solide** protège le dos sur tous les autres exercices. Note le temps tenu dans la case répétitions.'
    }},
  // ── Retirés du programme le 5/11 (séances trop longues), gardés au catalogue ──
    {id:'x-tractions-neg',muscle:'Dos',restTime:120,name:'Tractions négatives',format:'2×3-5',sets:2,
      info:{
        gif:'gifs/tractions-negatives.webp',
        muscles:{ main:['Grand dorsal'], secondary:['Biceps', 'Trapèzes inférieurs', 'Avant-bras'] },
        execution:[
          '**Barre bien fixée**, banc ou caisse dessous. Monte en position haute, **menton au-dessus de la barre**, poitrine proche.',
          '**Gaine les abdos** et serre les omoplates vers le bas avant de commencer.',
          'Descends **le plus lentement possible** jusqu\'aux bras tendus : vise **au moins 5 secondes**.',
          'Pour corser : fais **2 ou 3 pauses de 2 secondes** à différentes hauteurs pendant la descente.',
          '**Remonte avec le banc**, jamais en sautant de toute ta force, et recommence. Quand tu tiens **5 descentes de 8 secondes**, tente une vraie traction.',
        ],
        erreurs:[
          '**Se laisser tomber en bas** : c\'est la descente contrôlée qui fait tout le travail.',
          '**Lâcher les épaules en bas** (bras pendants, épaules aux oreilles) : garde-les un peu engagées.',
          'Utiliser une **barre de porte** peu stable.',
        ],
        interet:'Tes muscles sont **plus forts en descente qu\'en montée** : les négatives construisent la force de la traction avant même que tu puisses en faire une. C\'est la méthode la plus rapide pour retrouver **tes 3 tractions strictes**, en complément du tirage vertical neutre.'
      }},
    {id:'x-mollets',muscle:'Jambes',restTime:60,name:'Mollets debout (machine)',format:'3×12-15',sets:3,
      info:{
        gif:'gifs/mollets-debout.webp',
        muscles:{ main:['Mollets (jumeaux)'], secondary:['Soléaire'] },
        execution:[
          'Règle les appuis à ta taille : épaules sous les coussins, avant des pieds sur la marche, **talons dans le vide**, orteils vers l\'avant.',
          'Descends les talons **le plus bas possible** et marque **1 seconde d\'étirement**.',
          'Monte sur la pointe des pieds **le plus haut possible** en soufflant, **tiens 1 seconde en haut**.',
          'Genoux presque tendus et fixes du début à la fin. **Tempo lent, sans rebond**.',
        ],
        erreurs:[
          '**Rebondir en bas** : l\'élan fait le travail à la place du muscle.',
          'Faire des **demi-répétitions** : l\'amplitude complète est ce qui fait progresser ce muscle.',
          '**Verrouiller les genoux** : si l\'arrière du genou tire, garde une légère flexion.',
        ],
        interet:'Des mollets plus forts encaissent mieux les chocs : c\'est **une vraie aide pour tes tibias** avant la reprise de la course. Le mollet est têtu et répond **au tempo lent et à l\'amplitude complète**, pas à la charge.'
      }},
    {id:'x-presse',muscle:'Jambes',restTime:120,name:'Presse à cuisses',format:'3×10-12',sets:3,
      info:{
        gif:'gifs/presse-cuisses.webp',
        muscles:{ main:['Quadriceps', 'Fessiers'], secondary:['Ischio-jambiers', 'Adducteurs'] },
        execution:[
          '**Dos et fessiers plaqués au dossier**. Pieds à plat, **largeur de hanches**, au milieu ou un peu haut sur la plateforme, pointes légèrement ouvertes.',
          '**Déverrouille les sécurités**. Inspire et descends lentement jusqu\'à **environ 90° aux genoux**, ou **plus bas** si le bas du dos reste collé.',
          'Pousse en soufflant, **par les talons et le milieu du pied**, **genoux dans l\'axe des orteils**.',
          'Arrête **juste avant de verrouiller** les genoux en haut. **Remets les sécurités** à la fin.',
        ],
        erreurs:[
          '**Décoller le bas du dos** ou les fessiers en bas : c\'est que tu descends trop bas pour ta mobilité.',
          'Laisser les genoux **rentrer vers l\'intérieur**.',
          '**Verrouiller les genoux** en haut ou faire des demi-répétitions pour charger plus.',
        ],
        interet:'Le plus simple pour travailler les jambes **sans charger le dos** ni apprendre de technique. **Pieds plus hauts**, tu travailles plus les fessiers ; plus bas, plus les quadriceps. Les jambes sont les plus gros muscles du corps : plus de muscle, **plus de calories brûlées au repos**.'
      }},
  // ── Retirés du Jour B le 6/11 (rowing et face pull pas aimés), gardés pour l'historique ──
    {id:'b3',muscle:'Dos',restTime:90,name:'Rowing DB unilatéral',format:'3×10-12/bras',sets:3,
      info:{
        gif:'gifs/rowing-db-unilateral.webp',
        muscles:{ main:['Grand dorsal', 'Rhomboïdes', 'Trapèzes'], secondary:['Deltoïdes postérieurs', 'Biceps'] },
        execution:[
          'Un genou et la main du même côté sur le banc (main sous l\'épaule, genou sous la hanche), l\'autre pied au sol. **Dos plat, nuque dans l\'axe**.',
          'Départ bras tendu, épaule qui descend un peu pour **bien étirer le dos**.',
          'Tire l\'haltère **vers la hanche, pas vers l\'épaule**, coude qui frôle le corps. **Serre l\'omoplate 1 s** en haut.',
          'Redescends lentement. Commence par **ton côté faible**, puis fais le même nombre de répétitions de l\'autre côté.',
        ],
        erreurs:[
          '**Tourner le buste** pour monter l\'haltère.',
          'Tirer **avec le biceps**.',
          'Relever la tête ou arrondir le dos.',
        ],
        interet:'**Un côté à la fois**, pour corriger les déséquilibres gauche/droite que les exercices à deux bras cachent. Plus d\'amplitude qu\'à la barre, donc **un meilleur étirement** du grand dorsal.'
      }},
    {id:'b5',muscle:'Épaules',restTime:60,name:'Face pull corde',format:'3×15-20',sets:3,
      info:{
        gif:'gifs/face-pull.webp',
        muscles:{ main:['Deltoïdes postérieurs'], secondary:['Rhomboïdes', 'Trapèzes moyens', 'Coiffe des rotateurs'] },
        execution:[
          'Poulie réglée **à hauteur du visage**, corde en prise pronation. Recule jusqu\'à avoir les bras tendus, pieds écartés, genoux souples.',
          '**Serre d\'abord les omoplates**, puis tire la corde **vers ton front** en montant les coudes sur les côtés.',
          'En fin de tirage, **écarte les deux bouts de la corde** : les mains finissent de part et d\'autre des oreilles.',
          '**Tiens 1 à 2 secondes**, puis reviens lentement sans relâcher les épaules vers l\'avant.',
          '**Charge légère** : c\'est un mouvement de santé des épaules, pas de force.',
        ],
        erreurs:[
          '**Tirer avec les biceps** : pense **« coudes en arrière »**, les mains suivent.',
          'Laisser les omoplates s\'ouvrir pendant la série (imagine serrer une balle entre elles).',
          '**Se pencher en arrière** pour aider avec le poids du corps.',
        ],
        interet:'**Non négociable** pour un cycliste qui passe des heures penché vers l\'avant : il renforce **l\'arrière des épaules et la coiffe des rotateurs**, qui équilibrent tout le travail de développé. Moins de douleurs d\'épaule, meilleure posture, et l\'arrière de l\'épaule, souvent oublié, prend du volume.'
      }},
  // ── Retirés du Jour C le 6/11 (rowing et face pull pas aimés), gardés pour l'historique ──
    {id:'c2',muscle:'Dos',restTime:90,name:'Tirage horizontal serré',format:'3×10-12',sets:3,
      info:{
        gif:'gifs/tirage-horizontal-serre.webp',
        muscles:{ main:['Milieu du dos (rhomboïdes, trapèzes)', 'Grand dorsal'], secondary:['Deltoïdes postérieurs', 'Biceps'] },
        execution:[
          'Pieds sur les cale-pieds, genoux légèrement fléchis, **poignée serrée**. **Buste droit, abdos gainés**.',
          'Tire la poignée **vers le nombril** en **rapprochant les omoplates**, coudes qui frôlent le corps.',
          'Marque **1 seconde de contraction** en fin de tirage, poitrine sortie.',
          '**Reviens lentement** jusqu\'aux bras tendus en laissant les omoplates s\'écarter, sans que la charge se repose.',
        ],
        erreurs:[
          '**Balancer le buste** d\'avant en arrière pour tirer plus lourd.',
          'Tirer **avec les bras** au lieu des coudes.',
          '**Arrondir le dos** en fin de retour.',
        ],
        interet:'Complète les tirages verticaux des Jours A et B par un tirage horizontal. La prise serrée vise **le milieu du dos**, ce qui donne **l\'épaisseur et une meilleure posture**. En 10-12 pour accumuler du volume sans grosse fatigue.'
      }},
    {id:'c5',muscle:'Épaules',restTime:45,name:'Face pull corde',format:'2×15-20',sets:2,
      info:{
        gif:'gifs/face-pull.webp',
        muscles:{ main:['Deltoïdes postérieurs'], secondary:['Rhomboïdes', 'Trapèzes moyens', 'Coiffe des rotateurs'] },
        execution:[
          'Poulie réglée **à hauteur du visage**, corde en prise pronation. Recule jusqu\'à avoir les bras tendus, pieds écartés, genoux souples.',
          '**Serre d\'abord les omoplates**, puis tire la corde **vers ton front** en montant les coudes sur les côtés.',
          'En fin de tirage, **écarte les deux bouts de la corde** : les mains finissent de part et d\'autre des oreilles.',
          '**Tiens 1 à 2 secondes**, puis reviens lentement sans relâcher les épaules vers l\'avant.',
        ],
        erreurs:[
          '**Tirer avec les biceps** : pense **« coudes en arrière »**, les mains suivent.',
          'Laisser les omoplates s\'ouvrir pendant la série.',
          'Charger trop : si tu dois te pencher en arrière, c\'est **trop lourd**.',
        ],
        interet:'**Deuxième dose de la semaine** après le Jour B : **5 séries hebdomadaires** au total, juste ce qu\'il faut pour protéger les épaules sans y passer du temps. C\'est l\'assurance contre les douleurs d\'épaule quand le développé commence à charger.'
      }},
];

// Remplaçants proposés en premier pour chaque exercice (les autres restent
// accessibles par groupe musculaire).
const ALTERNATIVES = {
  a1: ['c1', 'x-dc-machine', 'x-chest-press'],
  a2: ['x-divrow', 'b3', 'c2', 'x-tbar', 'x-row-machine'],
  a3: ['x-incline-machine', 'c1', 'x-pecfly'],
  a4: ['b2', 'x-tirage-machine', 'x-tractions-ass'],
  a5: ['b4', 'x-lat-machine'],
  a6: ['x-curl-poulie', 'x-triceps-corde', 'c6', 'x-curl-machine', 'x-triceps-poulie'],
  b1: ['x-epaules-machine', 'x-militaire-smith'],
  b2: ['x-tirage-machine', 'a4', 'x-tractions-ass'],
  b3: ['x-divrow', 'c2', 'a2', 'x-row-machine'],
  b4: ['x-lat-machine', 'a5'],
  b5: ['x-oiseau-machine'],
  c1: ['a1', 'x-dc-machine', 'x-incline-machine', 'x-chest-press'],
  c2: ['x-divrow', 'b3', 'x-row-machine', 'x-tbar'],
  c3: ['x-pecfly'],
  c4: ['x-lat-machine', 'a5', 'b4'],
  c5: ['x-oiseau-machine'],
  c6: ['x-curl-poulie', 'x-triceps-corde', 'a6', 'x-curl-incline', 'x-triceps-machine'],
  'x-presse': ['x-goblet', 'x-legext', 'x-hack', 'x-squat-smith'],
  'x-mollets':       ['x-mollets-presse', 'x-mollets-assis'],
  'x-tractions-neg': ['x-tractions-ass'],
  'x-tractions-ass': ['x-tractions-neg'],
  'x-mollets-assis': ['x-mollets', 'x-mollets-presse'],
  'x-tirage-machine': ['b2', 'a4'],
  'x-lat-machine':   ['b4', 'a5'],
  'x-militaire-smith': ['b1', 'x-epaules-machine'],
  'x-curl-poulie': ['x-curl-machine', 'x-curl-incline'],
  'x-triceps-corde': ['x-triceps-poulie', 'x-triceps-machine'],
  'x-goblet': ['x-squat-smith', 'x-bulgare'],
  'x-legcurl': ['x-legcurl-allonge', 'x-rdl'],
  'x-legext': ['x-hack'],
  'x-chest-press': ['c1', 'x-dc-machine', 'a1'],
  'x-dips-assistes': ['x-dips-assis', 'x-chest-press'],
  'x-row-machine': ['x-divrow', 'b3', 'c2'],
  'x-tbar': ['a2', 'x-row-machine', 'x-divrow'],
  'x-pullover-poulie': ['a4', 'b2'],
  'x-lombaires': ['x-rdl'],
  'x-shrugs': [],
  'x-curl-machine': ['x-curl-poulie', 'x-curl-incline', 'x-curl-pupitre'],
  'x-curl-incline': ['x-curl-machine', 'x-curl-pupitre', 'x-curl-poulie'],
  'x-curl-pupitre': ['x-curl-machine', 'x-curl-incline', 'x-curl-poulie'],
  'x-triceps-machine': ['x-triceps-poulie', 'x-triceps-corde', 'x-dips-assis'],
  'x-triceps-poulie': ['x-triceps-machine', 'x-triceps-corde', 'x-dips-assis'],
  'x-dips-assis': ['x-triceps-machine', 'x-dips-assistes'],
  'x-squat-smith': ['x-hack', 'x-presse', 'x-goblet'],
  'x-hack': ['x-presse', 'x-squat-smith', 'x-goblet'],
  'x-legcurl-allonge': ['x-legcurl', 'x-rdl'],
  'x-bulgare': ['x-fentes', 'x-goblet'],
  'x-rdl': ['x-legcurl', 'x-hip-thrust'],
  'x-hip-thrust': ['x-ext-hanche', 'x-rdl'],
  'x-fentes': ['x-bulgare', 'x-goblet'],
  'x-ext-hanche': ['x-hip-thrust'],
  'x-crunch-machine': ['x-crunch-poulie', 'x-releve-jambes'],
  'x-crunch-poulie': ['x-crunch-machine', 'x-releve-jambes'],
  'x-releve-jambes': ['x-crunch-machine', 'x-planche'],
  'x-planche': ['x-releve-jambes'],
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
