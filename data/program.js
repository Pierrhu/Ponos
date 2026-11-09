// ============ PROGRAMME ============
// Programme « V athlétique » (9/11) : V-taper (latéraux + dorsaux) + jambes et explosivité.
const PROGRAM = [
  {
    id:'A', name:'Jour A', subtitle:'Force', accent:'#C23B3B', when:'Lundi',
    exercises: [
    {id:'x-box-jump',restTime:60,name:'Box jump',reps:'3',format:'3×3 · explosif, sans fatigue',sets:3,
      info:{
        gif:'gifs/box-jump.webp',
        muscles:{ main:['Quadriceps', 'Fessiers'], secondary:['Mollets'] },
        execution:[
          'Face à une box (ou un step solide) **à hauteur de mi-tibia ou de genou**, pieds largeur de hanches.',
          '**Descends vite en quart de squat** en lançant les bras en arrière.',
          '**Saute en explosant**, bras vers le haut, et **atterris en douceur** sur la box, genoux fléchis, pieds à plat.',
          '**Descends en marchant**, pas en sautant. Repos complet entre chaque série.',
        ],
        erreurs:[
          '**Box trop haute** : le but est de sauter vite, pas de replier les jambes au maximum.',
          '**Atterrir genoux rentrés** vers l\'intérieur.',
          '**Enchaîner les sauts fatigué** : 3 sauts nets valent mieux que 10 mous.',
        ],
        interet:'Le travail **explosif** qui rend athlétique : apprendre au corps à produire de la force vite. **Zéro fatigue** : on le fait frais, en début de séance. Pas de box libre ? **Saut vertical** sur place.'
      }},
      {id:'a1',restTime:180,name:'Développé couché barre',format:'Top set 4-6 + 2×6-8 · RIR 1-2',sets:3,topSet:true,rankKey:'bench',
        info:{
          gif:'gifs/developpe-couche-barre.webp',
          muscles:{ main:['Pectoraux'], secondary:['Triceps', 'Deltoïdes antérieurs'] },
          execution:[
            'Échauffement : **3 séries qui montent** (barre à vide ×10, ~50 % ×6, ~70 % ×3) avant le top set.',
            'Installation : yeux sous la barre, **pieds ancrés au sol**, fessiers, haut du dos et tête collés au banc. **Omoplates serrées et basses**, léger arc du haut du dos.',
            'Prise un peu plus large que les épaules, **poignets droits** au-dessus des coudes.',
            'Grande inspiration bloquée, gainage, puis **descente contrôlée (2-3 s)** jusqu\'au bas des pecs, **au niveau des mamelons**.',
            'Pousse **en appuyant dans les talons**, épaules loin des oreilles. Souffle en fin de poussée, **jamais en bas**.',
            'Top set : ta charge max pour **3-5 reps**. Back-off : **~85 % du top set** pour 6-8 reps.',
          ],
          erreurs:[
            'Décoller les fesses ou la tête du banc : c\'est que **la charge est trop lourde**.',
            '**Casser les poignets** en arrière.',
            'Faire **rebondir la barre** sur la poitrine ou raccourcir l\'amplitude.',
            'Sortir une barre lourde seul d\'un support mal réglé : **règle les sécurités** à hauteur de poitrine.',
          ],
          interet:'L\'exercice de base des pectoraux, et **ton marqueur de force principal** (c\'est lui qui donne ton rang). Un top set lourd puis deux séries de back-off : assez de travail pour progresser, en tenant dans l\'heure avec l\'échauffement.'
        }},
    {id:'x-hack',restTime:150,name:'Hack squat',reps:'6-10',format:'3×6-10 · RIR 2',sets:3,
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
    {id:'x-tractions-ass',superset:true,restTime:15,name:'Tractions assistées',reps:'6-10',format:'3×6-10 · RIR 1-2',sets:3,
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
      {id:'a5',restTime:90,name:'Élévations latérales',format:'4×12-20 · dernière à fond',sets:4,
        info:{
          gif:'gifs/elevations-laterales-halteres.webp',
          muscles:{ main:['Deltoïdes latéraux'], secondary:['Trapèzes supérieurs', 'Deltoïdes antérieurs'] },
          execution:[
            'Debout, pieds largeur de bassin, genoux souples, **buste légèrement penché** vers l\'avant (~10-15°).',
            'Haltères le long du corps, **coudes légèrement fléchis et fixes**.',
            'Monte les bras sur les côtés jusqu\'à ce que **les coudes arrivent à l\'horizontale**. **Les coudes mènent**, les mains restent sous les coudes (comme pour verser une carafe).',
            'Courte pause en haut, puis **redescends lentement (2 s)**. Pour garder la tension, **ne repose pas les haltères** contre les cuisses.',
          ],
          erreurs:[
            'Charger trop lourd et monter avec un coup de reins.',
            '**Hausser les épaules** : ce sont les trapèzes qui travaillent alors.',
            'Monter les mains **plus haut que les coudes**.',
          ],
          interet:'Isolation du deltoïde latéral, celui qui donne **la largeur d\'épaules** et que les développés travaillent peu. En 12-15 répétitions, lent et propre : ce muscle répond **au volume et à la technique**, pas à la charge.'
        }},
    {id:'x-row-machine',restTime:120,name:'Rowing assis',reps:'8-12',format:'3×8-12 · RIR 1-2',sets:3,
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
    {id:'x-curl-incline',superset:true,restTime:10,name:'Curl incliné',reps:'10-15',format:'2×10-15 · RIR 0-1',sets:2,
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
    {id:'x-pushdown-barre',restTime:75,name:'Extension triceps barre',reps:'10-15',format:'2×10-15 · RIR 0-1',sets:2,
      info:{
        gif:'gifs/pushdown-barre.webp',
        muscles:{ main:['Triceps'], secondary:[] },
        execution:[
          'Face à la poulie haute, **barre droite** en prise pronation (paumes vers le bas), mains à largeur d\'épaules.',
          '**Coudes collés au corps**, buste légèrement penché, abdos serrés.',
          'Pousse la barre vers le bas **jusqu\'aux bras tendus**, serre les triceps 1 seconde.',
          '**Remonte lentement** jusqu\'à ce que les avant-bras soient à l\'horizontale, sans décoller les coudes.',
        ],
        erreurs:[
          '**Coudes qui partent devant** ou s\'écartent : ils restent fixes contre les côtes.',
          '**Utiliser le poids du corps** pour descendre la barre.',
          '**Poignets cassés** : ils restent dans l\'alignement des avant-bras.',
        ],
        interet:'Le classique du triceps : **simple, stable, facile à charger**. La barre droite permet de pousser plus lourd que la corde.'
      }},
    ]
  },
  {
    id:'B', name:'Jour B', subtitle:'Épaules & dos', accent:'#2D7DD2', when:'Jeudi',
    exercises: [
    {id:'x-kb-swing',restTime:60,name:'Kettlebell swing',reps:'10',format:'3×10 · explosif',sets:3,
      info:{
        gif:'gifs/kettlebell-swing.webp',
        muscles:{ main:['Fessiers', 'Ischio-jambiers'], secondary:['Lombaires', 'Épaules', 'Abdos (gainage)'] },
        execution:[
          'Kettlebell au sol devant toi, pieds un peu plus larges que les hanches. **Charnière de hanche**, dos plat, attrape la poignée.',
          'Fais passer la kettlebell **entre les jambes** comme une passe de rugby en arrière.',
          '**Pousse violemment les hanches vers l\'avant** et serre les fessiers : la kettlebell monte à **hauteur de poitrine** grâce aux hanches, pas aux bras.',
          'Laisse-la redescendre et **enchaîne** en rechargeant les hanches.',
        ],
        erreurs:[
          '**Squatter** au lieu de pousser les fesses en arrière.',
          '**Lever avec les bras** : ils ne font que guider.',
          '**Arrondir le dos** en bas.',
        ],
        interet:'Puissance des hanches, cardio et gainage en un seul mouvement : **le roi de l\'athlétique**. Pas de kettlebell ? Un **haltère tenu par une extrémité** fait l\'affaire.'
      }},
      {id:'b1',restTime:180,name:'Développé militaire',format:'Top set 4-6 + 2×6-8 · RIR 1-2',sets:3,topSet:true,rankKey:'ohp',
        info:{
          gif:'gifs/developpe-militaire-halteres.webp',
          muscles:{ main:['Deltoïdes antérieurs et latéraux'], secondary:['Triceps', 'Haut des pectoraux', 'Abdos (gainage)'] },
          execution:[
            '**Debout, pieds largeur d\'épaules**, barre posée sur le haut de la poitrine, au creux des paumes, **coudes sous la barre**.',
            '**Gaine abdos, fessiers et cuisses**. Inspire avant de pousser.',
            '**Pousse à la verticale** en **reculant légèrement la tête** pour laisser passer la barre, puis ramène la tête sous la barre une fois passée.',
            'En haut, bras tendus, barre **au-dessus du milieu du pied**, coudes très légèrement fléchis. Souffle.',
            'Redescends lentement **jusqu\'aux clavicules**.',
          ],
          erreurs:[
            '**Cambrer le bas du dos** pour finir la répétition : c\'est trop lourd pour ton gainage.',
            '**Balancer le buste** ou pousser avec les jambes.',
            'Barre qui part vers l\'avant au lieu de monter droit. En cas de gêne à l\'épaule, **élargis un peu la prise**.',
          ],
          interet:'Le mouvement de force principal des épaules, et ton **troisième marqueur de rang**. Debout, il demande beaucoup de gainage. Top set puis back-off, comme au développé couché.'
        }},
      {id:'b2',superset:true,restTime:15,name:'Tirage vertical neutre',format:'4×8-12 · RIR 1-2',sets:4,
        info:{
          gif:'gifs/tirage-vertical-neutre.webp',
          muscles:{ main:['Grand dorsal'], secondary:['Biceps', 'Grand rond', 'Milieu du dos'] },
          execution:[
            '**Poignée triangle** (prises parallèles), cuisses bien bloquées, buste légèrement penché en arrière.',
            'Tire la poignée **vers le haut de la poitrine**, **coudes serrés vers les hanches**.',
            'En bas : poitrine sortie, omoplates serrées, **pause de 1-2 s**.',
            '**Remonte lentement**, bras presque tendus, sans laisser les épaules monter aux oreilles.',
          ],
          erreurs:[
            'Charger trop et **raccourcir l\'amplitude**.',
            '**Relâcher les épaules** d\'un coup au retour.',
            'Aller vite : sur un exercice lourd, **le contrôle compte double**.',
          ],
          interet:'Travaillé lourd (6-8), c\'est **ton chemin vers les tractions**. La prise neutre **ménage les épaules** et laisse charger plus. Le jour où tu tireras l\'équivalent de ton poids de corps 6 fois ici, la traction stricte ne sera plus loin.'
        }},
      {id:'a5',restTime:90,name:'Élévations latérales',format:'4×12-20 · dernière à fond',sets:4,
        info:{
          gif:'gifs/elevations-laterales-halteres.webp',
          muscles:{ main:['Deltoïdes latéraux'], secondary:['Trapèzes supérieurs', 'Deltoïdes antérieurs'] },
          execution:[
            'Debout, pieds largeur de bassin, genoux souples, **buste légèrement penché** vers l\'avant (~10-15°).',
            'Haltères le long du corps, **coudes légèrement fléchis et fixes**.',
            'Monte les bras sur les côtés jusqu\'à ce que **les coudes arrivent à l\'horizontale**. **Les coudes mènent**, les mains restent sous les coudes (comme pour verser une carafe).',
            'Courte pause en haut, puis **redescends lentement (2 s)**. Pour garder la tension, **ne repose pas les haltères** contre les cuisses.',
          ],
          erreurs:[
            'Charger trop lourd et monter avec un coup de reins.',
            '**Hausser les épaules** : ce sont les trapèzes qui travaillent alors.',
            'Monter les mains **plus haut que les coudes**.',
          ],
          interet:'Isolation du deltoïde latéral, celui qui donne **la largeur d\'épaules** et que les développés travaillent peu. En 12-15 répétitions, lent et propre : ce muscle répond **au volume et à la technique**, pas à la charge.'
        }},
    {id:'x-rdl',restTime:120,name:'Soulevé de terre roumain',reps:'8-10',format:'3×8-10 · RIR 2',sets:3,
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
    {id:'x-dips-assistes',restTime:120,name:'Dips assistés',reps:'8-12',format:'3×8-12 · RIR 1-2',sets:3,
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
    {id:'x-oiseau-machine',restTime:60,name:'Oiseau',reps:'12-20',format:'3×12-20 · RIR 0-1',sets:3,
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
    ]
  },
  {
    id:'C', name:'Jour C', subtitle:'Athlétique', accent:'#1A9E8F', when:'Samedi',
    exercises: [
    {id:'x-squat-saute',restTime:60,name:'Squat sauté',reps:'5',format:'3×5 · explosif',sets:3,
      info:{
        gif:'gifs/squat-saute.webp',
        muscles:{ main:['Quadriceps', 'Fessiers'], secondary:['Mollets'] },
        execution:[
          'Debout, pieds largeur d\'épaules, mains devant la poitrine.',
          '**Descends en squat** jusqu\'à mi-hauteur, dos droit.',
          '**Explose vers le haut** le plus haut possible.',
          '**Atterris en douceur** sur l\'avant des pieds, genoux fléchis, et repars directement.',
        ],
        erreurs:[
          '**Atterrir jambes tendues** : amortis toujours.',
          '**Genoux qui rentrent** à la réception.',
        ],
        interet:'Explosivité **sans matériel**, à faire frais. Même effet que le box jump, avec plus d\'impacts : reste à 5 sauts nets.'
      }},
      {id:'a3',restTime:120,name:'Développé incliné haltères',format:'3×8-12 · RIR 1-2',sets:3,
        info:{
          gif:'gifs/developpe-incline-db.webp',
          muscles:{ main:['Haut des pectoraux'], secondary:['Deltoïdes antérieurs', 'Triceps'] },
          execution:[
            '**Banc à 30°, pas plus** : au-delà, ce sont les épaules qui prennent le relais.',
            'Assis, haltères sur les cuisses, puis allonge-toi en les ramenant près de la poitrine. **Omoplates serrées**, dos collé au banc.',
            'Inspire, et pousse **en arc de cercle** : les haltères se rapprochent en haut **sans se toucher**.',
            'Descends lentement, coudes à ~45° du buste, jusqu\'à **un bon étirement des pecs** : c\'est là que le muscle travaille le plus.',
            'Garde une **légère flexion des coudes** en haut pour ne pas perdre la tension.',
          ],
          erreurs:[
            '**Entrechoquer les haltères** en haut.',
            'Décoller les omoplates ou cambrer fort le bas du dos.',
            'Partir aussi lourd qu\'au plat : l\'incliné se fait avec **une charge plus légère**.',
          ],
          interet:'Vise **le haut des pectoraux**, souvent en retard. Placé après le couché, il n\'a **pas besoin d\'être lourd** pour être efficace. Les haltères donnent une plus grande amplitude et font travailler chaque bras seul.'
        }},
    {id:'x-tirage-machine',superset:true,restTime:15,name:'Tirage vertical Hammer',reps:'10-12',format:'4×10-12 · RIR 1-2',sets:4,
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
      {id:'a5',dropSet:true,restTime:90,name:'Élévations latérales',format:'4×12-20 · dernière en drop set',sets:4,
        info:{
          gif:'gifs/elevations-laterales-halteres.webp',
          muscles:{ main:['Deltoïdes latéraux'], secondary:['Trapèzes supérieurs', 'Deltoïdes antérieurs'] },
          execution:[
            'Debout, pieds largeur de bassin, genoux souples, **buste légèrement penché** vers l\'avant (~10-15°).',
            'Haltères le long du corps, **coudes légèrement fléchis et fixes**.',
            'Monte les bras sur les côtés jusqu\'à ce que **les coudes arrivent à l\'horizontale**. **Les coudes mènent**, les mains restent sous les coudes (comme pour verser une carafe).',
            'Courte pause en haut, puis **redescends lentement (2 s)**. Pour garder la tension, **ne repose pas les haltères** contre les cuisses.',
          ],
          erreurs:[
            'Charger trop lourd et monter avec un coup de reins.',
            '**Hausser les épaules** : ce sont les trapèzes qui travaillent alors.',
            'Monter les mains **plus haut que les coudes**.',
          ],
          interet:'Isolation du deltoïde latéral, celui qui donne **la largeur d\'épaules** et que les développés travaillent peu. En 12-15 répétitions, lent et propre : ce muscle répond **au volume et à la technique**, pas à la charge.'
        }},
    {id:'x-bulgare',restTime:90,name:'Squat bulgare',reps:'8-10',format:'3×8-10 par jambe · RIR 2',sets:3,
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
    {id:'x-row-machine',restTime:120,name:'Rowing assis',reps:'10-12',format:'3×10-12 · RIR 1-2',sets:3,
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
    {id:'x-curl-marteau',superset:true,restTime:10,name:'Curl marteau',reps:'10-15',format:'2×10-15 · RIR 0-1',sets:2,
      info:{
        gif:'gifs/curl-marteau.webp',
        muscles:{ main:['Biceps', 'Brachio-radial (avant-bras)'], secondary:['Brachial'] },
        execution:[
          'Debout, haltères en **prise neutre** (paumes face au corps), **coudes collés**.',
          'Monte les haltères **sans bouger les coudes**, le plus haut possible.',
          '**Contracte 1 seconde** en haut.',
          '**Redescends lentement**, bras presque tendus en bas.',
        ],
        erreurs:[
          '**Balancer le buste** pour monter.',
          '**Coudes qui avancent**.',
        ],
        interet:'Épaissit le bras **et l\'avant-bras** : le bras paraît plus large de face comme de profil.'
      }},
    {id:'x-triceps-poulie',restTime:75,name:'Extension triceps corde',reps:'10-15',format:'2×10-15 · RIR 0-1',sets:2,
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
    {id:'x-farmer',restTime:75,name:'Marche du fermier',reps:'30-40 m',format:'2×30-40 m · lourd',sets:2,
      info:{
        gif:'gifs/farmer-walk.webp',
        muscles:{ main:['Avant-bras (prise)', 'Trapèzes'], secondary:['Abdos (gainage)', 'Épaules', 'Jambes'] },
        execution:[
          'Un **haltère ou une kettlebell lourde dans chaque main**, bras le long du corps.',
          '**Épaules basses et en arrière**, poitrine haute, abdos serrés.',
          'Marche **à petits pas rapides** sur 30-40 m, sans te pencher.',
          'Pose les charges **en pliant les jambes**, dos droit.',
        ],
        erreurs:[
          '**Hausser les épaules** ou se pencher d\'un côté.',
          '**Lâcher la posture** en fin de trajet.',
        ],
        interet:'Le test athlétique par excellence : **prise, gainage, trapèzes et posture** en même temps. Tu notes la charge par main et la distance.'
      }},
    ]
  }
];
