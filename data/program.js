// ============ PROGRAMME ============
// Push / Pull en alternance (23/11) : 3 séances par semaine, jambes en fin de séance.
const PROGRAM = [
  {
    id:'A', name:'Push', subtitle:'Pecs · épaules · triceps · quadris', accent:'#C23B3B', when:'Alterné',
    exercises: [
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
    {id:'x-epaules-machine',restTime:150,name:'Développé épaules machine',reps:'6-8',format:'3×6-8 · RIR 1-2',sets:3,
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
    {id:'x-incline-machine',restTime:120,name:'Développé incliné machine',reps:'8-10',format:'3×8-10 · RIR 1-2',sets:3,
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
      {id:'a5',restTime:60,name:'Élévations latérales',format:'4×12-15 · dernière à fond',sets:4,
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
    {id:'x-pushdown-barre',restTime:60,name:'Triceps barre droite',reps:'10-12',format:'3×10-12 · RIR 0-1',sets:3,
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
      {id:'x-presse',restTime:120,name:'Presse à cuisses',format:'3×8-10 · RIR 2',sets:3,
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
    ]
  },
  {
    id:'B', name:'Pull', subtitle:'Dos · arrière d\'épaule · biceps · ischios', accent:'#2D7DD2', when:'Alterné',
    exercises: [
    {id:'x-tirage-machine',topSet:true,restTime:150,name:'Tirage vertical Hammer',reps:'6-10',format:'Top set 6-8 + 2×8-10 · RIR 1-2',sets:3,
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
    {id:'x-tractions-ass',restTime:120,name:'Tractions assistées',reps:'6-10',format:'3×6-10 · RIR 1-2',sets:3,
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
    {id:'x-row-machine',restTime:120,name:'Rowing assis machine',reps:'8-12',format:'3×8-12 · RIR 1-2',sets:3,
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
    {id:'x-oiseau-machine',restTime:60,name:'Oiseau machine',reps:'12-15',format:'3×12-15 · RIR 0-1',sets:3,
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
      {id:'a5',restTime:60,name:'Élévations latérales',format:'3×12-15 · dernière à fond',sets:3,
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
    {id:'x-curl-machine',restTime:60,name:'Curl machine',reps:'10-12',format:'3×10-12 · RIR 0-1',sets:3,
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
    {id:'x-legcurl',restTime:90,name:'Leg curl',reps:'10-12',format:'3×10-12 · RIR 1-2',sets:3,
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
    ]
  }
];
