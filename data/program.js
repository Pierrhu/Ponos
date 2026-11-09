// ============ PROGRAMME ============
const PROGRAM = [
  {
    id:'A', name:'Jour A', subtitle:'Force Horizontale', accent:'#C23B3B', when:'Lundi',
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
    {id:'x-row-machine',restTime:120,name:'Rowing assis (machine)',reps:'8-12',format:'3×8-12 · RIR 1-2',sets:3,
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
      {id:'a3',restTime:120,name:'Développé incliné DB 30°',format:'3×8-12 · RIR 1-2',sets:3,
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
      {id:'a5',restTime:75,name:'Élévations latérales',format:'3×12-20 · dernière à fond',sets:3,
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
    {id:'x-curl-incline',superset:true,restTime:10,name:'Curl incliné (haltères)',reps:'10-15',format:'3×10-15 · RIR 0-1 (superset)',sets:3,
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
    {id:'x-pushdown-barre',restTime:90,name:'Extensions triceps poulie haute (barre droite)',reps:'10-15',format:'3×10-15 · RIR 0-1',sets:3,
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
    id:'B', name:'Jour B', subtitle:'Force Verticale', accent:'#2D7DD2', when:'Jeudi',
    exercises: [
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
    {id:'x-tractions-ass',restTime:150,name:'Tractions assistées',reps:'6-10',format:'3×6-10 · RIR 1-2',sets:3,
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
      {id:'b2',restTime:120,name:'Tirage vertical neutre',format:'3×8-12 · RIR 1-2',sets:3,
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
      {id:'a5',restTime:60,name:'Élévations latérales',format:'4×12-20 · dernière à fond',sets:4,
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
    {id:'x-oiseau-machine',restTime:60,name:'Oiseau (machine)',reps:'12-20',format:'3×12-20 · RIR 0-1',sets:3,
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
    {id:'x-curl-poulie',superset:true,restTime:10,name:'Curl biceps poulie basse',reps:'10-15',format:'3×10-15 · RIR 0-1 (superset)',sets:3,
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
    {id:'x-triceps-poulie',restTime:90,name:'Extensions triceps poulie haute (corde)',reps:'10-15',format:'3×10-15 · RIR 0-1',sets:3,
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
    ]
  },
  {
    id:'C', name:'Jour C', subtitle:'Volume & Rattrapage', accent:'#1A9E8F', when:'Samedi',
    exercises: [
    {id:'x-incline-machine',restTime:120,name:'Développé incliné (machine)',reps:'8-12',format:'3×8-12 · RIR 1-2',sets:3,
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
    {id:'x-tirage-machine',restTime:120,name:'Tirage vertical (machine Hammer)',reps:'8-12',format:'3×8-12 · RIR 1-2',sets:3,
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
    {id:'x-dips-assistes',restTime:120,name:'Dips assistés (machine)',reps:'8-12',format:'3×8-12 · RIR 1-2',sets:3,
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
      {id:'c3',restTime:75,name:'Écarté poulie vis-à-vis',format:'3×12-15 · RIR 0-1',sets:3,
        info:{
          gif:'gifs/ecarte-poulie.webp',
          muscles:{ main:['Pectoraux'], secondary:['Deltoïdes antérieurs'] },
          execution:[
            '**Poulies à hauteur de poitrine**, un pied devant l\'autre, buste légèrement penché. Les câbles sont **déjà tendus** au départ.',
            'Bras écartés, **coudes légèrement fléchis et fixes**, paumes vers l\'avant.',
            'Ramène les mains l\'une vers l\'autre **en grand arc de cercle**, comme pour enlacer un arbre.',
            '**Serre les pecs 1 à 2 secondes**, puis **reviens lentement** jusqu\'à l\'étirement.',
          ],
          erreurs:[
            '**Plier et tendre les coudes** pendant le mouvement : ça devient un développé.',
            'Laisser les mains aller **derrière la ligne des épaules** au retour.',
            '**Cogner les poignées** en fin de mouvement ou les serrer trop fort.',
          ],
          interet:'Isolation des pectoraux avec une **tension constante**, **plus douce pour les épaules** que les haltères. En fin de séance pecs, pour finir le muscle avec du volume après les développés.'
        }},
      {id:'c4',restTime:60,name:'Élévations latérales (drop set)',format:'4×12-20 · dernière en drop set',sets:4,dropSet:true,
        info:{
          gif:'gifs/elevations-laterales-halteres.webp',
          muscles:{ main:['Deltoïdes latéraux'], secondary:['Deltoïdes postérieurs', 'Trapèzes'] },
          execution:[
            '**Phase 1, buste penché à ~45°** : **8 élévations** latérales, coudes qui mènent, jusqu\'à l\'horizontale.',
            '**Phase 2, sans repos** : redresse-toi et fais **8 élévations classiques debout**, avec **les mêmes haltères**.',
            'Debout, le mouvement est plus facile : c\'est ce qui te permet de continuer sans changer de poids.',
            '**Mouvement lent et contrôlé** dans les deux phases. **1:30 de repos** après chaque série complète.',
          ],
          erreurs:[
            '**Prendre trop lourd** : tu dois tenir **les 16 répétitions** proprement.',
            '**Hausser les épaules** quand la fatigue arrive.',
            'Accélérer la deuxième phase avec de l\'élan.',
          ],
          interet:'**Drop set mécanique** : on change d\'angle au lieu de baisser la charge, pour aller chercher **16 répétitions efficaces** par série. Beaucoup de travail pour le deltoïde latéral en peu de temps.'
        }},
      {id:'c6',restTime:75,name:'SS: Curl marteau / Ext.',format:'3×10-15 / 10-15 · RIR 0-1',sets:3,superset:true,
        info:{
          gif:'gifs/curl-marteau.webp',
          muscles:{ main:['Biceps', 'Brachio-radial (avant-bras)', 'Triceps'], secondary:['Brachial'] },
          execution:[
            '**Curl marteau** : debout, haltères en **prise neutre** (paumes face au corps), **coudes collés et fixes**. Monte le plus haut possible, contracte, **descends lentement**.',
            '**Extension à la poulie haute** : coudes collés au corps, pousse jusqu\'à l\'extension complète, **tiens 1 s en bas**, remonte jusqu\'à 90°.',
            'Enchaîne les deux **sans repos**, **1:30 de repos** après le tour complet.',
            'Mouvements stricts, **pas d\'élan**.',
          ],
          erreurs:[
            '**Se pencher en arrière** ou balancer les haltères.',
            '**Bâcler la descente**.',
            '**Laisser les coudes bouger** pendant l\'extension.',
          ],
          interet:'Le curl marteau vise l\'avant-bras et le brachial, qui donnent **l\'épaisseur du bras**. Variante différente du curl EZ du Jour A, pour varier le travail. Superset avec le triceps pour les mêmes raisons qu\'au Jour A : **deux fois moins de temps**, presque sans perte de force.'
        }},
    ]
  }
];
