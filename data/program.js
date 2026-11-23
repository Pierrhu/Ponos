// ============ PROGRAMME ============
// Push / Pull en 2 versions (23/11) : Push A → Pull A → Push B → Pull B, 3 séances par semaine.
const PROGRAM = [
  {
    id:'A', name:'Push A', subtitle:'Couché · épaules · dips · presse', accent:'#C23B3B', when:'Push',
    exercises: [
      {id:'a1',restTime:180,name:'Développé couché barre',format:'Top set 4-6 + 3×6-8 · RIR 1-2',sets:4,topSet:true,rankKey:'bench',
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
      {id:'a5',restTime:60,name:'Élévations latérales',format:'5×12-15 · dernière à fond',sets:5,
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
    {id:'x-legext',restTime:75,name:'Leg extension',reps:'12-15',format:'2×12-15 · RIR 1',sets:2,
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
    ]
  },
  {
    id:'B', name:'Pull A', subtitle:'Hammer · tractions · rowing · leg curl', accent:'#2D7DD2', when:'Pull',
    exercises: [
    {id:'x-tirage-machine',topSet:true,restTime:150,name:'Tirage vertical Hammer',reps:'6-10',format:'Top set 6-8 + 3×8-10 · RIR 1-2',sets:4,
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
    {id:'x-tractions-ass',restTime:120,name:'Tractions assistées',reps:'6-10',format:'4×6-10 · RIR 1-2',sets:4,
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
  },
  {
    id:'C', name:'Push B', subtitle:'Militaire · développé assis · hack', accent:'#D9702E', when:'Push',
    exercises: [
      {id:'b1',topSet:true,restTime:180,name:'Développé militaire',format:'Top set 4-6 + 3×6-8 · RIR 1-2',sets:4,rankKey:'ohp',
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
      {id:'a1v',restTime:150,name:'Développé couché barre · volume',format:'3×8-10 · RIR 2 · ~80 % du top set',sets:3,rankKey:'bench',
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
    {id:'x-pecfly',restTime:75,name:'Pec deck',reps:'12-15',format:'3×12-15 · RIR 0-1',sets:3,
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
      {id:'a5',restTime:60,name:'Élévations latérales',format:'5×12-15 · dernière à fond',sets:5,
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
    {id:'x-triceps-poulie',restTime:60,name:'Triceps corde',reps:'10-12',format:'3×10-12 · RIR 0-1',sets:3,
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
    {id:'x-hack',restTime:150,name:'Hack squat',reps:'8-10',format:'3×8-10 · RIR 2',sets:3,
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
    {id:'x-legext',restTime:75,name:'Leg extension',reps:'12-15',format:'2×12-15 · RIR 1',sets:2,
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
    ]
  },
  {
    id:'D', name:'Pull B', subtitle:'Tirages · T-bar · curl incliné', accent:'#1A9E8F', when:'Pull',
    exercises: [
      {id:'b2',topSet:true,restTime:150,name:'Tirage vertical neutre',format:'Top set 6-8 + 3×8-10 · RIR 1-2',sets:4,
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
      {id:'a4',restTime:120,name:'Tirage vertical large',format:'3×8-12 · RIR 1-2',sets:3,
        info:{
          gif:'gifs/tirage-vertical-large.webp',
          muscles:{ main:['Grand dorsal'], secondary:['Biceps', 'Milieu du dos', 'Grand rond'] },
          execution:[
            '**Cuisses bien calées** sous les boudins, pieds à plat, abdos serrés.',
            '**Prise pronation large**, un peu plus large que les épaules, sans exagérer.',
            '**Abaisse d\'abord les épaules** et les omoplates, puis tire la barre **vers le haut de la poitrine** en bombant légèrement le torse.',
            'Coudes tirés **vers le bas et un peu vers l\'arrière**, buste presque immobile (un léger recul est OK).',
            '**Remonte lentement**, sans laisser la barre tirer les épaules vers les oreilles.',
          ],
          erreurs:[
            '**Se balancer en arrière** pour tirer plus lourd.',
            'Descendre la barre loin sous le menton ou derrière la nuque.',
            'Tirer avec les bras : pense **« coudes vers les hanches »**.',
          ],
          interet:'Ajoute un tirage vertical au rowing du Jour A. La prise large vise **la largeur du dos**. En volume modéré (10-12) pour accumuler du travail **sans fatiguer le bas du dos**, déjà sollicité par le rowing barre.'
        }},
    {id:'x-tbar',restTime:120,name:'Rowing T-bar machine',reps:'8-10',format:'3×8-10 · RIR 1-2',sets:3,
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
    {id:'x-curl-incline',restTime:60,name:'Curl incliné',reps:'10-12',format:'3×10-12 · RIR 0-1',sets:3,
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
    {id:'x-legcurl-allonge',restTime:90,name:'Leg curl allongé',reps:'10-12',format:'3×10-12 · RIR 1-2',sets:3,
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
    ]
  }
];
