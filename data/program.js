// ============ PROGRAMME ============
const PROGRAM = [
  {
    id:'A', name:'Jour A', subtitle:'Force Horizontale', accent:'#C23B3B', when:'Lundi',
    exercises: [
      {id:'a1',restTime:180,name:'Développé couché barre',format:'3 chauffe + Top set 3-5 + 2×6-8',sets:3,topSet:true,rankKey:'bench',
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
      {id:'a2',restTime:180,name:'Rowing barre pronation',format:'1-2 chauffe + Top set 3-5 + 2×6-8',sets:3,topSet:true,rankKey:'row',
        info:{
          gif:'gifs/rowing-barre-pronation.webp',
          muscles:{ main:['Grand dorsal', 'Milieu du dos (rhomboïdes, trapèzes)'], secondary:['Deltoïdes postérieurs', 'Biceps', 'Lombaires (gainage)'] },
          execution:[
            'Échauffement : **1-2 séries légères** (~50-60 %), le corps est déjà chaud après le développé couché.',
            'Pieds largeur de hanches, genoux légèrement fléchis, prise pronation **juste à l\'extérieur des genoux**.',
            '**Buste penché à ~45°, dos plat**, nuque dans l\'axe, abdos serrés.',
            'Tire la barre **vers le bas du ventre** en envoyant **les coudes vers l\'arrière** et en serrant les omoplates. Marque une courte pause.',
            'Redescends **sous contrôle** jusqu\'aux bras presque tendus, en laissant les omoplates s\'écarter.',
          ],
          erreurs:[
            'Se redresser ou donner un **coup de buste** pour monter la barre.',
            '**Arrondir le dos** : si le bas du dos fatigue, baisse la charge.',
            'Tirer « vers le haut » avec les bras au lieu de **ramener les coudes en arrière**.',
            'Si tu n\'arrives pas à **marquer la pause en haut**, c\'est trop lourd.',
          ],
          interet:'Le gros exercice composé pour **l\'épaisseur du dos**, qui équilibre le développé couché. Un top set et deux back-off, comme au couché, pour garder autant de tirage que de poussée. Si le bas du dos est fatigué, remplace-le par le **divergent row**.'
        }},
      {id:'a3',restTime:120,name:'Développé incliné DB 30°',format:'3×8-10',sets:3,
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
      {id:'a4',restTime:120,name:'Tirage vertical large',format:'3×10-12',sets:3,
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
      {id:'a5',restTime:90,name:'Élévations latérales',format:'3×12-15',sets:3,
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
      {id:'a6',restTime:60,name:'SS: Curl EZ / Ext. corde',format:'2×8-10 / 10-12',sets:2,superset:true,
        info:{
          gif:'gifs/curl-ez.webp',
          muscles:{ main:['Biceps', 'Triceps'], secondary:['Avant-bras'] },
          execution:[
            '**Curl EZ** : debout, prise sur les **parties inclinées de la barre** (moins de contrainte sur les poignets). **Coudes collés au corps**, monte jusqu\'à ce que les avant-bras soient verticaux, **contracte 1 s**, descends lentement.',
            '**Extension à la corde**, poulie haute : coudes collés au corps, pousse vers le bas jusqu\'à l\'extension, **écarte la corde en bas** et tiens 1 s. Remonte jusqu\'à 90° sans que les coudes bougent.',
            'Enchaîne les deux **sans repos**, puis **1:30 de repos** après le tour complet.',
            '**Mouvements stricts** : les bras sont déjà fatigués par les exercices de base, la charge compte moins que la propreté.',
          ],
          erreurs:[
            'Se balancer ou **prendre de l\'élan** avec les genoux au curl.',
            '**Laisser les coudes avancer** (curl) ou s\'écarter (extension).',
            'Charger au point de devoir tricher : baisse le poids.',
          ],
          interet:'Superset biceps/triceps : pendant qu\'un muscle travaille, l\'autre récupère, donc tu gardes presque toute ta force sur chaque exercice en **deux fois moins de temps**. Placé en fin de séance, quand la fatigue ne gêne plus les gros exercices.'
        }},
    ]
  },
  {
    id:'B', name:'Jour B', subtitle:'Force Verticale', accent:'#2D7DD2', when:'Jeudi',
    exercises: [
      {id:'b1',restTime:180,name:'Développé militaire',format:'Top set 3-5 + 3×6-8',sets:4,topSet:true,rankKey:'ohp',
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
      {id:'b2',restTime:150,name:'Tirage vertical neutre',format:'4×6-8 lourd',sets:4,
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
      {id:'b3',restTime:120,name:'Rowing DB unilatéral',format:'3×10-12/bras',sets:3,
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
      {id:'b4',restTime:90,name:'Latérales poulie basse',format:'4×12-15',sets:4,
        info:{
          gif:'gifs/elevations-laterales-poulie.webp',
          muscles:{ main:['Deltoïdes latéraux'], secondary:['Deltoïdes antérieurs et postérieurs', 'Coiffe des rotateurs'] },
          execution:[
            'De côté par rapport à la poulie basse : la main éloignée tient la poignée, **le câble passe devant toi**, l\'autre main tient le montant.',
            '**Penche-toi légèrement** à l\'opposé de la machine pour gagner de l\'amplitude.',
            'Monte le bras sur le côté **jusqu\'à l\'horizontale**, coude légèrement fléchi, paume vers le sol. Courte pause.',
            '**Redescends lentement (2-3 s)** et repars **sans pause en bas** pour garder la tension.',
          ],
          erreurs:[
            'Laisser le câble **ramener le bras d\'un coup**.',
            'Monter nettement **au-dessus de l\'horizontale**.',
            'Balancer le corps pour aider.',
          ],
          interet:'La poulie **garde la tension sur tout le mouvement**, même en bas, là où les haltères n\'en donnent presque pas. Angle complémentaire des latérales haltères du Jour A. **4 séries** parce que les épaules sont un point faible.'
        }},
      {id:'b5',restTime:60,name:'Face pull corde',format:'3×15-20',sets:3,
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
      {id:'x-tractions-neg',restTime:120,name:'Tractions négatives',format:'2×3-5',sets:2,
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
      {id:'x-mollets',restTime:60,name:'Mollets debout (machine)',format:'3×12-15',sets:3,
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
    ]
  },
  {
    id:'C', name:'Jour C', subtitle:'Volume & Rattrapage', accent:'#1A9E8F', when:'Samedi',
    exercises: [
      {id:'c1',restTime:120,name:'Développé couché DB',format:'4×10-12',sets:4,
        info:{
          gif:'gifs/developpe-couche-db.webp',
          muscles:{ main:['Pectoraux'], secondary:['Deltoïdes antérieurs', 'Triceps'] },
          execution:[
            'Assis au bout du banc, **haltères sur les cuisses** : allonge-toi en les ramenant contre la poitrine.',
            '**Pieds ancrés au sol, omoplates serrées et basses**, léger arc naturel du haut du dos.',
            'Inspire, puis **descends lentement** jusqu\'à ce que les haltères arrivent à hauteur de poitrine, **coudes à environ 45°** du buste.',
            'Pousse en rapprochant légèrement les haltères en haut, **sans qu\'ils se touchent** ni que les coudes se verrouillent.',
          ],
          erreurs:[
            '**Verrouiller les coudes en haut** : le muscle se repose, garde la tension.',
            '**Entrechoquer les haltères**.',
            '**Trop cambrer** le bas du dos ou décoller les fessiers. Si l\'avant de l\'épaule tire, resserre les omoplates.',
          ],
          interet:'Complète la barre du Jour A : l\'amplitude est plus grande et **chaque bras travaille seul**, ce qui corrige les déséquilibres et recrute plus les stabilisateurs. Jour de volume : **charges modérées en 10-12**, pas de top set.'
        }},
      {id:'c2',restTime:120,name:'Tirage horizontal serré',format:'4×10-12',sets:4,
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
      {id:'c3',restTime:90,name:'Écarté poulie vis-à-vis',format:'3×12-15',sets:3,
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
      {id:'c4',restTime:90,name:'Latérales drop set méca.',format:'3×(8+8)',sets:3,dropSet:true,
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
      {id:'c5',restTime:60,name:'Face pull corde',format:'2×15-20',sets:2,
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
      {id:'c6',restTime:60,name:'SS: Curl marteau / Ext.',format:'2×10-12 / 10-12',sets:2,superset:true,
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
      {id:'x-presse',restTime:120,name:'Presse à cuisses',format:'3×10-12',sets:3,
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
  }
];
