import { mediaUrls as u } from '../assets/media'

export interface ServiceEntry {
  title: string
  tagline: string
  image: string
  intro: string
  body: string[]
  quote?: string
  body2?: string[]
  closing?: string
}

export const SERVICES: Record<string, ServiceEntry> = {
  carrelage: {
    title: "Carrelage",
    tagline: "Pose de carrelage",
    image: u.carrelage,
    intro: "Vous souhaitez moderniser votre intérieur avec un carrelage soigné et durable ? JER Rénovation met à votre service son expertise pour la pose de carrelage sur Paris et sa région.",
    body: [
      "Du carrelage grand format aux mosaïques contemporaines, je vous accompagne dans le choix des matériaux et dans la mise en œuvre, en garantissant un alignement parfait, des joints réguliers et un résultat à la hauteur de vos exigences.",
      "Sol ou mur, cuisine, salle de bain ou pièces à vivre, chaque projet bénéficie d'une préparation soignée du support, condition indispensable à la longévité du carrelage.",
    ],
    quote: "Un carrelage bien posé, c'est un sol qui traverse les années sans bouger d'un millimètre.",
    closing: "Contactez-moi pour discuter de votre projet et obtenir un devis personnalisé et transparent.",
  },
  claustra: {
    title: "Claustra",
    tagline: "Pose de claustra",
    image: u.claustra,
    intro: "À la recherche d'une solution élégante pour délimiter vos espaces intérieurs ou extérieurs tout en préservant la luminosité et l'esthétique de votre environnement ? JER Rénovation vous propose mon expertise dans la pose de claustras sur Paris et sa région.",
    body: [
      "La pose de claustras représente bien plus qu'une simple division spatiale. Elle incarne une fusion subtile entre fonctionnalité et design, offrant une alternative contemporaine aux cloisons traditionnelles. Je comprends l'importance de créer des espaces harmonieux qui répondent aux besoins pratiques tout en apportant une touche esthétique.",
      "Que ce soit pour structurer un espace extérieur, créer des zones d'intimité dans un jardin ou ajouter une touche de sophistication à votre intérieur, je mets à votre disposition mon savoir-faire pour réaliser une pose de claustra sur mesure. Je travaille avec une variété de matériaux de haute qualité, du bois à l'aluminium en passant par le PVC, pour répondre à vos exigences esthétiques et fonctionnelles.",
    ],
    quote: "Le claustra est un art ancestral qui remonte à l'antiquité. De retour en vogue, il permet de créer des jeux de lumière et d'apporter du cachet à vos lieux de vie !",
    body2: [
      "Mon approche méticuleuse commence par une évaluation minutieuse de vos besoins et de l'environnement dans lequel le claustra sera installé. Je conçois ensuite une solution personnalisée qui prend en compte l'esthétique, la sécurité et la durabilité. Mon processus de pose est réalisé avec précision et expertise, garantissant un résultat final à la fois solide et esthétique.",
      "Conscient de l'importance des détails, j'installe chaque claustra avec le plus grand soin pour assurer un ajustement parfait et une finition impeccable. Mon engagement envers la satisfaction client se reflète dans mon approche collaborative, où je vous implique à chaque étape du processus pour garantir que vos attentes sont pleinement satisfaites.",
    ],
    closing: "Contactez-moi dès aujourd'hui pour discuter de votre projet de pose de claustra et obtenir un devis personnalisé. Avec JER Rénovation, donnez vie à vos espaces avec élégance et fonctionnalité !",
  },
  cloison: {
    title: "Cloison",
    tagline: "Découpe et pose de cloison",
    image: u.cloison,
    intro: "Vous souhaitez redéfinir vos espaces, créer une nouvelle pièce ou ouvrir un volume ? JER Rénovation prend en charge la découpe et la pose de cloisons sur l'ensemble de l'Île-de-France.",
    body: [
      "Que ce soit en plaques de plâtre, en placo phonique, en carreaux de plâtre ou en cloisons amovibles, je conçois et installe la solution adaptée à votre logement et à vos contraintes : isolation acoustique, passage de gaines, ouvertures, finitions.",
      "Chaque cloison est posée d'aplomb, avec un soin particulier pour les jonctions, l'enduit et la préparation à la peinture ou au revêtement.",
    ],
    quote: "Une cloison bien pensée, c'est une pièce qui respire et un espace qui prend du sens.",
    closing: "Parlons ensemble de votre projet pour définir la solution la plus pertinente, dans le respect de votre budget.",
  },
  cuisine: {
    title: "Cuisine",
    tagline: "Pose installation & rénovation",
    image: u.cuisine,
    intro: "Création et intégration de cuisines fonctionnelles et esthétiques. Des designs modernes aux concepts classiques, je personnalise chaque projet pour transformer votre expérience en cuisine !",
    body: [
      "Je réalise l'installation et la pose de votre cuisine, et m'engage à offrir des solutions clés en main pour la conception, la réalisation et la rénovation complète d'espaces culinaires, en collaborant étroitement avec mes clients pour créer des cuisines sur mesure qui reflètent leur style de vie et leurs goûts.",
    ],
    quote: "Une belle cuisine vous donnera envie de mettre la main à la pâte… une activité saine qui encouragera à bien manger, et à moins dépenser dans des restos pas toujours très équilibrés…",
    body2: [
      "Lorsque vous choisissez JER Rénovation pour votre projet de cuisine, vous bénéficiez d'une approche personnalisée dès la planification initiale jusqu'à la réalisation finale. J'accorde une attention particulière à vos besoins et préférences, veillant à ce que chaque détail soit pris en compte pour créer un espace harmonieux et fonctionnel qui correspond parfaitement à vos attentes.",
      "Mon expertise technique et ma connaissance des dernières tendances en design d'intérieur me permettent de proposer des solutions innovantes pour tous les styles de cuisine, que ce soit contemporain, traditionnel ou minimaliste.",
    ],
    closing: "Discutons ensemble de votre projet de cuisine et obtenez un devis détaillé, sans engagement.",
  },
  electricite: {
    title: "Électricité",
    tagline: "Petits travaux électriques",
    image: u.electricite,
    intro: "Remplacement de prises, ajout d'interrupteurs, installation de points lumineux ou de luminaires : je m'occupe des petits travaux électriques dans votre logement, en respectant la norme NF C 15-100.",
    body: [
      "Sécurité et propreté de l'intervention sont mes priorités. Les saignées sont rebouchées, les passages de câbles dissimulés, et chaque modification est documentée pour faciliter les interventions futures.",
      "Pour les chantiers plus ambitieux (mise aux normes complète, rénovation totale du tableau), je travaille avec un électricien certifié de confiance que je coordonne pour vous.",
    ],
    closing: "Décrivez-moi votre besoin, je vous propose une solution claire et un devis sans surprise.",
  },
  enduit: {
    title: "Enduit",
    tagline: "Enduit intérieur",
    image: u.enduit,
    intro: "L'enduit intérieur, c'est l'étape qui révèle la qualité d'un chantier. Un mur parfaitement préparé, c'est une peinture qui accroche la lumière et qui dure.",
    body: [
      "J'applique enduits de rebouchage, enduits de lissage et finitions de qualité pour offrir à vos murs une surface impeccable, prête à recevoir peinture, papier peint ou revêtement décoratif.",
      "Je traite également les fissures, les défauts de planéité et les raccords après travaux, pour redonner une seconde vie à vos murs anciens.",
    ],
    quote: "Une belle finition commence toujours par un mur impeccablement préparé.",
    closing: "Parlons de l'état de vos murs et du rendu que vous souhaitez obtenir.",
  },
  escalier: {
    title: "Escalier",
    tagline: "Rénovation et installation d'escalier",
    image: u.escalier,
    intro: "Pièce centrale d'un logement à étage, l'escalier mérite toute l'attention d'un artisan. Je vous accompagne dans la rénovation ou la pose d'un escalier neuf, bois, métal ou mixte.",
    body: [
      "Ponçage, vitrification, remplacement de marches ou contremarches, habillage, rénovation de garde-corps : chaque intervention est pensée pour redonner vie à votre escalier sans dénaturer son caractère.",
      "Pour une installation neuve, je travaille à partir de vos contraintes (hauteur sous plafond, trémie, encombrement) afin de proposer la solution la plus adaptée.",
    ],
    closing: "Envoyez-moi quelques photos et mesures, je reviens vers vous avec une estimation rapide.",
  },
  luminaire: {
    title: "Luminaire",
    tagline: "Conception et installation de votre éclairage",
    image: u.luminaire,
    intro: "Un bon éclairage transforme un intérieur. Je vous aide à concevoir l'ambiance lumineuse de chaque pièce et installe les luminaires, suspensions, spots et liseuses de votre choix.",
    body: [
      "Sources directes ou indirectes, lumière chaude ou neutre, scénographie par pièce : je vous conseille sur l'implantation et les températures de couleur en fonction des usages.",
      "Je m'occupe également des raccordements électriques, du passage des câbles et des finitions au plafond ou aux murs.",
    ],
    quote: "La lumière sculpte un espace bien mieux qu'un mur ne le ferait.",
    closing: "Parlons de votre projet d'éclairage : ambiance, usages, et points lumineux à créer.",
  },
  parquet: {
    title: "Parquet",
    tagline: "Pose de parquet bois",
    image: u.parquet,
    intro: "Massif, contrecollé, à coller ou flottant : la pose d'un parquet bois demande précision et savoir-faire. JER Rénovation pose votre parquet dans les règles de l'art.",
    body: [
      "Préparation soignée du sol, choix du sens de pose, raccords aux portes et plinthes, finitions à l'huile ou au vernis : chaque détail compte pour un rendu durable et élégant.",
      "Pour un parquet ancien, je propose ponçage, rénovation et vitrification afin de retrouver l'éclat d'origine du bois.",
    ],
    quote: "Un parquet bien posé traverse les modes ; il devient simplement plus beau avec le temps.",
    closing: "Décrivez votre pièce et le type de parquet souhaité, je vous propose un devis détaillé.",
  },
  peinture: {
    title: "Peinture",
    tagline: "Travaux de peinture intérieur",
    image: u.peinture,
    intro: "Repeindre un appartement, rafraîchir une pièce ou créer un mur d'accent : la peinture est souvent le geste qui transforme le plus radicalement un intérieur.",
    body: [
      "Murs, plafonds, boiseries, radiateurs : je prépare chaque surface (lessivage, rebouchage, ponçage) avant d'appliquer une peinture de qualité, mate, satinée ou velours selon le rendu souhaité.",
      "Je vous conseille sur le choix des teintes et des finitions en fonction de la luminosité et de l'usage des pièces.",
    ],
    closing: "Demandez un devis : vous serez agréablement surpris du résultat sur quelques jours seulement.",
  },
  plomberie: {
    title: "Plomberie",
    tagline: "Petits travaux de plomberie",
    image: u.plomberie,
    intro: "Remplacement de robinetterie, installation d'un lavabo ou d'une douche, raccordement d'un lave-vaisselle : je prends en charge les petits travaux de plomberie dans le cadre de vos projets de rénovation.",
    body: [
      "Chaque intervention est réalisée avec rigueur, tests d'étanchéité à l'appui. Pour les chantiers plus lourds, je collabore avec un plombier de confiance que je coordonne pour vous.",
    ],
    closing: "Précisez-moi votre besoin, je vous indique sous 24h ce qui peut être fait et à quel coût.",
  },
  "salle-de-bain": {
    title: "Salle de bain",
    tagline: "Installation et rénovation de salle de bain",
    image: u.salleDeBain,
    intro: "La salle de bain est devenue une pièce à part entière, un espace de bien-être au quotidien. JER Rénovation vous accompagne pour transformer la vôtre, du diagnostic à la pose finale.",
    body: [
      "Carrelage mural et au sol, douche à l'italienne, baignoire, meuble vasque, robinetterie, éclairage : je coordonne tous les corps d'état nécessaires pour vous livrer une salle de bain clé en main.",
      "Étanchéité, ventilation, choix des matériaux résistants à l'humidité : chaque détail technique est traité avec sérieux pour garantir la durabilité de l'ouvrage.",
    ],
    quote: "Une salle de bain réussie, c'est l'alliance d'un beau geste esthétique et d'une technique irréprochable.",
    closing: "Parlons de votre projet de salle de bain : surface, équipements souhaités, contraintes du logement.",
  },
  salon: {
    title: "Salon",
    tagline: "Rénovation et aménagement de salon",
    image: u.salon,
    intro: "Pièce de vie centrale, le salon mérite une rénovation pensée dans son ensemble : sols, murs, éclairage, rangements et finitions.",
    body: [
      "Je vous aide à repenser votre salon de manière cohérente, avec des choix de matériaux et de couleurs qui valorisent l'espace et la luminosité.",
      "Création de meubles intégrés, mur d'accent, pose de parquet ou de revêtement décoratif, remise à neuf des plinthes et des portes : tout est possible.",
    ],
    closing: "Échangeons sur votre projet et la manière dont vous souhaitez vivre votre salon au quotidien.",
  },
  sanitaire: {
    title: "Sanitaire",
    tagline: "Rénovation de sanitaire",
    image: u.sanitaire,
    intro: "Toilettes invitées, sanitaires d'appoint, lave-mains, WC suspendus : je rénove ou installe vos espaces sanitaires avec soin, dans le respect des normes en vigueur.",
    body: [
      "Carrelage, peinture, robinetterie, raccordement, finitions : chaque détail est traité pour que l'espace, même petit, soit pratique, propre et agréable à l'œil.",
      "Une intervention rapide est souvent possible, sur quelques jours seulement.",
    ],
    closing: "Décrivez-moi votre besoin et l'état actuel de la pièce, je vous propose un plan d'action clair.",
  },
}

export const SERVICES_ORDER = [
  "carrelage",
  "claustra",
  "cloison",
  "cuisine",
  "electricite",
  "enduit",
  "escalier",
  "luminaire",
  "parquet",
  "peinture",
  "plomberie",
  "salle-de-bain",
  "salon",
  "sanitaire"
] as const
