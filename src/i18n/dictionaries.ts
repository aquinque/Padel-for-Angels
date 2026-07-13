export const LOCALES = ["fr", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "fr";

export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    tournament: string;
    foundation: string;
    register: string;
    donate: string;
    fundraising: string;
  };
  common: {
    tbd: string;
    loading: string;
    required: string;
    back: string;
  };
  home: {
    heroKicker: string;
    heroTitle: string;
    heroSubtitle: string;
    ctaRegister: string;
    ctaDonate: string;
    aboutTournamentTitle: string;
    aboutTournamentBody: string;
    aboutTournamentLink: string;
    aboutFoundationTitle: string;
    aboutFoundationBody: string;
    aboutFoundationLink: string;
    aboutFundraisingTitle: string;
    aboutFundraisingBody: string;
    aboutFundraisingLink: string;
    howItWorksTitle: string;
    steps: { title: string; body: string }[];
  };
  tournament: {
    title: string;
    intro: string;
    infoCards: { label: string; value: string }[];
    formatTitle: string;
    formatBody: string;
    scheduleTitle: string;
    scheduleBody: string;
    prizesTitle: string;
    prizesBody: string;
    ctaRegister: string;
  };
  foundation: {
    title: string;
    intro: string;
    storyTitle: string;
    storyBody: string;
    missionTitle: string;
    missionBody: string;
    programsTitle: string;
    programs: { title: string; body: string }[];
    statusNote: string;
    officialSite: string;
    ctaDonate: string;
  };
  register: {
    title: string;
    intro: string;
    modeLabel: string;
    modeTeam: string;
    modeTeamDesc: string;
    modeSolo: string;
    modeSoloDesc: string;
    formTitle: string;
    fields: {
      teamName: string;
      player1Name: string;
      player1Email: string;
      player1Phone: string;
      player2Name: string;
      player2Email: string;
      player2Phone: string;
      category: string;
      categoryPlaceholder: string;
      amount: string;
      message: string;
      messagePlaceholder: string;
    };
    priceNote: string;
    submit: string;
    submitting: string;
    paymentStepTitle: string;
    paymentStepIntro: string;
    paymentReferenceLabel: string;
    paymentReferenceHelp: string;
    proofLabel: string;
    proofHelp: string;
    confirmSubmit: string;
    successTitle: string;
    successBody: string;
    errorTitle: string;
    errorBody: string;
    soloFormTitle: string;
    soloFields: {
      name: string;
      email: string;
      phone: string;
      category: string;
      categoryPlaceholder: string;
      amount: string;
      message: string;
      messagePlaceholder: string;
    };
    soloPriceNote: string;
    soloPairingNote: string;
    soloSuccessTitle: string;
    soloSuccessBody: string;
  };
  fundraising: {
    title: string;
    intro: string;
    leaderboardTitle: string;
    leaderboardEmpty: string;
    teamColumn: string;
    amountColumn: string;
    formTitle: string;
    fields: {
      team: string;
      teamPlaceholder: string;
      name: string;
      email: string;
      amount: string;
      message: string;
      messagePlaceholder: string;
    };
    proofLabel: string;
    proofHelp: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    errorTitle: string;
    errorBody: string;
  };
  donate: {
    title: string;
    intro: string;
    howTitle: string;
    howBody: string;
    formTitle: string;
    fields: {
      name: string;
      email: string;
      amount: string;
      message: string;
      messagePlaceholder: string;
    };
    optionalNote: string;
    proofLabel: string;
    proofHelp: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    errorTitle: string;
    errorBody: string;
    skipFormNote: string;
  };
  bizum: {
    title: string;
    holder: string;
    phone: string;
    amount: string;
    instructions: string[];
  };
  footer: {
    tagline: string;
    contact: string;
    rights: string;
  };
  admin: {
    loginTitle: string;
    email: string;
    password: string;
    login: string;
    loggingIn: string;
    loginError: string;
    dashboardTitle: string;
    logout: string;
    tabRegistrations: string;
    tabDonations: string;
    statusPending: string;
    statusConfirmed: string;
    statusRejected: string;
    markConfirmed: string;
    markRejected: string;
    markPending: string;
    viewProof: string;
    noProof: string;
    empty: string;
  };
}

const fr: Dictionary = {
  meta: {
    title: "Padel for Angels — Tournoi caritatif de padel",
    description:
      "Tournoi de padel caritatif au profit de Tierra's Angels, fondation qui soutient des enfants et familles au Pérou, en Haïti et à Los Angeles.",
  },
  nav: {
    home: "Accueil",
    tournament: "Le tournoi",
    foundation: "La fondation",
    register: "S'inscrire",
    donate: "Faire un don",
    fundraising: "Cagnotte des équipes",
  },
  common: {
    tbd: "À confirmer",
    loading: "Chargement…",
    required: "obligatoire",
    back: "Retour",
  },
  home: {
    heroKicker: "Tournoi caritatif de padel",
    heroTitle: "Padel for Angels",
    heroSubtitle:
      "Un tournoi de padel entre amis, en famille, pour une cause qui compte : tous les fonds récoltés sont reversés à Tierra's Angels.",
    ctaRegister: "Inscrire mon équipe",
    ctaDonate: "Faire un don",
    aboutTournamentTitle: "Le tournoi",
    aboutTournamentBody:
      "Les informations complètes (date, lieu, format, planning) seront publiées ici dès qu'elles seront confirmées. Les inscriptions sont d'ores et déjà ouvertes.",
    aboutTournamentLink: "Voir les infos du tournoi",
    aboutFoundationTitle: "Tierra's Angels",
    aboutFoundationBody:
      "Tierra's Angels est une fondation familiale à but non lucratif qui soutient des enfants et des familles au Pérou, en Haïti et à Los Angeles, à travers l'accès aux soins, à l'éducation et à l'alimentation.",
    aboutFoundationLink: "Découvrir la fondation",
    aboutFundraisingTitle: "Cagnotte des équipes",
    aboutFundraisingBody:
      "Un tournoi dans le tournoi : chaque équipe concourt pour lever le plus de fonds possible. Choisis ton équipe préférée et soutiens-la par Bizum.",
    aboutFundraisingLink: "Voir le classement",
    howItWorksTitle: "Comment participer",
    steps: [
      {
        title: "1. Inscris ton équipe",
        body: "Remplis le formulaire d'inscription avec les infos de ton binôme.",
      },
      {
        title: "2. Règle ton inscription par Bizum",
        body: "Envoie le montant par Bizum et indique la référence demandée.",
      },
      {
        title: "3. Reçois ta confirmation",
        body: "Une fois le paiement vérifié, ton inscription est confirmée par email.",
      },
    ],
  },
  tournament: {
    title: "Le tournoi",
    intro:
      "Toutes les informations pratiques seront ajoutées ici dès qu'elles seront disponibles. Reviens bientôt, ou inscris déjà ton équipe !",
    infoCards: [
      { label: "Date", value: "À confirmer" },
      { label: "Lieu", value: "À confirmer" },
      { label: "Format", value: "À confirmer" },
      { label: "Nombre d'équipes", value: "À confirmer" },
    ],
    formatTitle: "Format du tournoi",
    formatBody:
      "Le format exact (poules, élimination directe, niveaux) sera communiqué prochainement.",
    scheduleTitle: "Programme de la journée",
    scheduleBody:
      "Le planning détaillé (horaires des matchs, remise des prix, animations) sera publié ici.",
    prizesTitle: "Récompenses",
    prizesBody:
      "Des lots seront remis aux équipes finalistes. Détails à venir.",
    ctaRegister: "Inscrire mon équipe",
  },
  foundation: {
    title: "Tierra's Angels",
    intro:
      "Tierra's Angels est une fondation familiale à but non lucratif (501(c)(3)) qui aide des enfants et des familles à travers le monde.",
    storyTitle: "Notre histoire",
    storyBody:
      "Tierra's Angels a été créée par Thierry et Maïa, basés à Los Angeles, après le décès soudain de leur fille Lou. Ils ont choisi de transformer tout l'amour et le soutien reçus pendant cette épreuve en une fondation dédiée à aider le plus grand nombre d'enfants possible à travers le monde.",
    missionTitle: "Notre mission",
    missionBody:
      "Apporter un soutien médical, éducatif et alimentaire aux enfants et familles qui en ont besoin, au Pérou, en Haïti et à Los Angeles.",
    programsTitle: "Nos actions",
    programs: [
      {
        title: "Soins médicaux au Pérou",
        body: "Soutien médical aux familles péruviennes à travers la clinique Kausay Wasi.",
      },
      {
        title: "Repas scolaires en Haïti",
        body: "Distribution de repas aux enfants dans une école locale, en partenariat avec Convoy of Hope.",
      },
      {
        title: "Soutien aux jeunes à Los Angeles",
        body: "Accompagnement des enfants et adolescents en difficulté, en partenariat avec des associations locales.",
      },
    ],
    statusNote:
      "Tierra's Angels est une organisation 501(c)(3) : les dons sont déductibles d'impôts aux États-Unis.",
    officialSite: "Voir le site officiel de Tierra's Angels",
    ctaDonate: "Soutenir la fondation",
  },
  register: {
    title: "Inscription au tournoi",
    intro:
      "Inscris-toi en quelques minutes, en équipe ou seul(e). L'inscription est confirmée après réception et vérification du paiement Bizum.",
    modeLabel: "Comment veux-tu t'inscrire ?",
    modeTeam: "En équipe",
    modeTeamDesc: "Tu as déjà un binôme : inscrivez-vous ensemble.",
    modeSolo: "Seul(e)",
    modeSoloDesc:
      "Pas encore de partenaire ? Inscris-toi seul(e), on te trouve un coéquipier automatiquement.",
    formTitle: "Informations de l'équipe",
    fields: {
      teamName: "Nom de l'équipe (optionnel)",
      player1Name: "Nom complet — Joueur 1",
      player1Email: "Email — Joueur 1",
      player1Phone: "Téléphone — Joueur 1",
      player2Name: "Nom complet — Joueur 2",
      player2Email: "Email — Joueur 2 (optionnel)",
      player2Phone: "Téléphone — Joueur 2 (optionnel)",
      category: "Niveau / catégorie",
      categoryPlaceholder: "Ex : loisir, intermédiaire, confirmé",
      amount: "Montant réglé (€)",
      message: "Message (optionnel)",
      messagePlaceholder: "Une info à nous communiquer ?",
    },
    priceNote:
      "20 € par joueur, soit 40 € par équipe. Tu peux aussi choisir de régler plus pour soutenir davantage Tierra's Angels !",
    submit: "Continuer vers le paiement",
    submitting: "Envoi en cours…",
    paymentStepTitle: "Règlement de l'inscription par Bizum",
    paymentStepIntro:
      "Envoie le montant de l'inscription via Bizum aux coordonnées ci-dessous, puis complète les informations pour finaliser ta demande.",
    paymentReferenceLabel: "Référence / concept utilisé sur Bizum",
    paymentReferenceHelp:
      "Indique le nom ou la référence que tu as utilisé lors de l'envoi Bizum, pour qu'on puisse retrouver ton paiement.",
    proofLabel: "Capture d'écran du paiement (optionnel mais recommandé)",
    proofHelp: "Formats acceptés : JPG, PNG, PDF — 5 Mo max.",
    confirmSubmit: "Envoyer ma demande d'inscription",
    successTitle: "Demande envoyée !",
    successBody:
      "Merci ! Ton inscription est enregistrée avec le statut « en attente ». Elle sera confirmée par email dès que ton paiement Bizum aura été vérifié.",
    errorTitle: "Une erreur est survenue",
    errorBody:
      "Ta demande n'a pas pu être envoyée. Vérifie ta connexion et réessaie, ou contacte-nous directement.",
    soloFormTitle: "Tes informations",
    soloFields: {
      name: "Nom complet",
      email: "Email",
      phone: "Téléphone",
      category: "Niveau / catégorie",
      categoryPlaceholder: "Ex : loisir, intermédiaire, confirmé",
      amount: "Montant réglé (€)",
      message: "Message (optionnel)",
      messagePlaceholder: "Une info à nous communiquer ? Un partenaire de niveau similaire souhaité ?",
    },
    soloPriceNote:
      "20 € par joueur. Tu peux aussi choisir de régler plus pour soutenir davantage Tierra's Angels !",
    soloPairingNote:
      "Dès qu'un autre joueur ou une autre joueuse s'inscrit seul(e), vous serez associés automatiquement en équipe, avec un nom de pays de coupe du monde. Retrouve ton équipe sur la page « Cagnotte des équipes » une fois les paiements confirmés.",
    soloSuccessTitle: "Inscription envoyée !",
    soloSuccessBody:
      "Merci ! Ton inscription est enregistrée avec le statut « en attente ». Tu seras associé(e) automatiquement à un autre joueur ou une autre joueuse solo pour former une équipe, dès que ton paiement Bizum aura été vérifié.",
  },
  fundraising: {
    title: "Cagnotte des équipes",
    intro:
      "Un tournoi dans le tournoi ! Chaque équipe inscrite concourt pour lever le plus de fonds possible pour Tierra's Angels. Choisis une équipe et soutiens-la en lui envoyant un don par Bizum.",
    leaderboardTitle: "Classement des équipes",
    leaderboardEmpty: "Aucune équipe pour l'instant — reviens bientôt !",
    teamColumn: "Équipe",
    amountColumn: "Fonds levés",
    formTitle: "Soutenir une équipe",
    fields: {
      team: "Équipe à soutenir",
      teamPlaceholder: "Choisis une équipe",
      name: "Ton nom (optionnel)",
      email: "Email (optionnel)",
      amount: "Montant du don (€)",
      message: "Message (optionnel)",
      messagePlaceholder: "Un mot d'encouragement pour l'équipe ?",
    },
    proofLabel: "Capture d'écran du paiement (optionnel)",
    proofHelp: "Formats acceptés : JPG, PNG, PDF — 5 Mo max.",
    submit: "Envoyer mon soutien",
    submitting: "Envoi en cours…",
    successTitle: "Merci pour ton soutien !",
    successBody:
      "Ton don est enregistré pour cette équipe. Il apparaîtra dans le classement une fois confirmé.",
    errorTitle: "Une erreur est survenue",
    errorBody: "Ton don n'a pas pu être envoyé. Vérifie ta connexion et réessaie.",
  },
  donate: {
    title: "Faire un don",
    intro:
      "Tu ne peux pas participer au tournoi mais tu veux quand même soutenir Tierra's Angels ? Chaque don compte, quel que soit le montant.",
    howTitle: "Comment faire un don",
    howBody:
      "Envoie le montant de ton choix par Bizum aux coordonnées ci-dessous. Tu peux ensuite (facultativement) nous laisser tes coordonnées pour qu'on puisse te remercier.",
    formTitle: "Tes informations (optionnel)",
    fields: {
      name: "Nom",
      email: "Email",
      amount: "Montant du don (€)",
      message: "Message (optionnel)",
      messagePlaceholder: "Un mot pour la fondation ou les organisateurs ?",
    },
    optionalNote:
      "Ce formulaire est optionnel : tu peux faire un don par Bizum sans le remplir. Il nous aide simplement à suivre les dons et à te remercier.",
    proofLabel: "Capture d'écran du paiement (optionnel)",
    proofHelp: "Formats acceptés : JPG, PNG, PDF — 5 Mo max.",
    submit: "Envoyer",
    submitting: "Envoi en cours…",
    successTitle: "Merci infiniment !",
    successBody:
      "Ton don est enregistré. Merci pour ton soutien à Tierra's Angels !",
    errorTitle: "Une erreur est survenue",
    errorBody:
      "Ton message n'a pas pu être envoyé, mais ton don Bizum est bien reçu par la fondation. Merci !",
    skipFormNote: "Tu préfères ne pas remplir le formulaire ? Aucun souci, le don par Bizum seul suffit.",
  },
  bizum: {
    title: "Coordonnées Bizum",
    holder: "Titulaire",
    phone: "Numéro",
    amount: "Montant",
    instructions: [
      "Ouvre l'application de ta banque et sélectionne Bizum.",
      "Envoie le montant au numéro indiqué ci-dessous.",
      "Indique la référence demandée dans le message Bizum.",
      "Garde une capture d'écran de la confirmation si possible.",
    ],
  },
  footer: {
    tagline: "Un tournoi, une équipe, une cause.",
    contact: "Contact",
    rights: "Tous les fonds récoltés sont reversés à Tierra's Angels.",
  },
  admin: {
    loginTitle: "Espace organisateur",
    email: "Email",
    password: "Mot de passe",
    login: "Se connecter",
    loggingIn: "Connexion…",
    loginError: "Identifiants incorrects.",
    dashboardTitle: "Inscriptions et dons",
    logout: "Se déconnecter",
    tabRegistrations: "Inscriptions",
    tabDonations: "Dons",
    statusPending: "En attente",
    statusConfirmed: "Confirmé",
    statusRejected: "Rejeté",
    markConfirmed: "Confirmer",
    markRejected: "Rejeter",
    markPending: "Remettre en attente",
    viewProof: "Voir la preuve",
    noProof: "Aucune preuve jointe",
    empty: "Rien pour l'instant.",
  },
};

const es: Dictionary = {
  meta: {
    title: "Padel for Angels — Torneo benéfico de pádel",
    description:
      "Torneo benéfico de pádel a beneficio de Tierra's Angels, fundación que apoya a niños y familias en Perú, Haití y Los Ángeles.",
  },
  nav: {
    home: "Inicio",
    tournament: "El torneo",
    foundation: "La fundación",
    register: "Inscribirse",
    donate: "Donar",
    fundraising: "Recaudación de equipos",
  },
  common: {
    tbd: "Por confirmar",
    loading: "Cargando…",
    required: "obligatorio",
    back: "Volver",
  },
  home: {
    heroKicker: "Torneo benéfico de pádel",
    heroTitle: "Padel for Angels",
    heroSubtitle:
      "Un torneo de pádel entre amigos y familia, por una causa que importa: todo lo recaudado se destina a Tierra's Angels.",
    ctaRegister: "Inscribir mi equipo",
    ctaDonate: "Hacer una donación",
    aboutTournamentTitle: "El torneo",
    aboutTournamentBody:
      "La información completa (fecha, lugar, formato, horarios) se publicará aquí en cuanto esté confirmada. Las inscripciones ya están abiertas.",
    aboutTournamentLink: "Ver información del torneo",
    aboutFoundationTitle: "Tierra's Angels",
    aboutFoundationBody:
      "Tierra's Angels es una fundación familiar sin ánimo de lucro que apoya a niños y familias en Perú, Haití y Los Ángeles, dando acceso a salud, educación y alimentación.",
    aboutFoundationLink: "Conocer la fundación",
    aboutFundraisingTitle: "Recaudación de equipos",
    aboutFundraisingBody:
      "¡Un torneo dentro del torneo! Cada equipo compite por recaudar la mayor cantidad posible. Elige tu equipo favorito y apóyalo por Bizum.",
    aboutFundraisingLink: "Ver la clasificación",
    howItWorksTitle: "Cómo participar",
    steps: [
      {
        title: "1. Inscribe tu equipo",
        body: "Rellena el formulario de inscripción con los datos de tu pareja.",
      },
      {
        title: "2. Paga la inscripción por Bizum",
        body: "Envía el importe por Bizum e indica la referencia solicitada.",
      },
      {
        title: "3. Recibe tu confirmación",
        body: "Una vez verificado el pago, tu inscripción se confirma por email.",
      },
    ],
  },
  tournament: {
    title: "El torneo",
    intro:
      "Toda la información práctica se añadirá aquí en cuanto esté disponible. ¡Vuelve pronto, o inscribe ya a tu equipo!",
    infoCards: [
      { label: "Fecha", value: "Por confirmar" },
      { label: "Lugar", value: "Por confirmar" },
      { label: "Formato", value: "Por confirmar" },
      { label: "Número de equipos", value: "Por confirmar" },
    ],
    formatTitle: "Formato del torneo",
    formatBody:
      "El formato exacto (grupos, eliminación directa, niveles) se comunicará próximamente.",
    scheduleTitle: "Programa del día",
    scheduleBody:
      "El horario detallado (partidos, entrega de premios, actividades) se publicará aquí.",
    prizesTitle: "Premios",
    prizesBody: "Se entregarán premios a los equipos finalistas. Detalles próximamente.",
    ctaRegister: "Inscribir mi equipo",
  },
  foundation: {
    title: "Tierra's Angels",
    intro:
      "Tierra's Angels es una fundación familiar sin ánimo de lucro (501(c)(3)) que ayuda a niños y familias en todo el mundo.",
    storyTitle: "Nuestra historia",
    storyBody:
      "Tierra's Angels fue creada por Thierry y Maïa, en Los Ángeles, tras el fallecimiento repentino de su hija Lou. Decidieron transformar todo el amor y apoyo recibido en esos momentos difíciles en una fundación dedicada a ayudar al mayor número posible de niños en el mundo.",
    missionTitle: "Nuestra misión",
    missionBody:
      "Ofrecer apoyo médico, educativo y alimentario a niños y familias que lo necesitan, en Perú, Haití y Los Ángeles.",
    programsTitle: "Nuestros programas",
    programs: [
      {
        title: "Atención médica en Perú",
        body: "Apoyo médico a familias peruanas a través de la clínica Kausay Wasi.",
      },
      {
        title: "Comidas escolares en Haití",
        body: "Reparto de comidas a niños en una escuela local, en colaboración con Convoy of Hope.",
      },
      {
        title: "Apoyo a jóvenes en Los Ángeles",
        body: "Acompañamiento de niños y adolescentes en dificultad, junto a organizaciones locales.",
      },
    ],
    statusNote:
      "Tierra's Angels es una organización 501(c)(3): las donaciones son deducibles de impuestos en Estados Unidos.",
    officialSite: "Ver el sitio oficial de Tierra's Angels",
    ctaDonate: "Apoyar a la fundación",
  },
  register: {
    title: "Inscripción al torneo",
    intro:
      "Inscríbete en pocos minutos, en equipo o en solitario. La inscripción se confirma tras recibir y verificar el pago por Bizum.",
    modeLabel: "¿Cómo quieres inscribirte?",
    modeTeam: "En equipo",
    modeTeamDesc: "Ya tienes pareja: inscribíos juntos.",
    modeSolo: "En solitario",
    modeSoloDesc:
      "¿Aún no tienes compañero/a? Inscríbete solo/a, te buscamos uno automáticamente.",
    formTitle: "Datos del equipo",
    fields: {
      teamName: "Nombre del equipo (opcional)",
      player1Name: "Nombre completo — Jugador 1",
      player1Email: "Email — Jugador 1",
      player1Phone: "Teléfono — Jugador 1",
      player2Name: "Nombre completo — Jugador 2",
      player2Email: "Email — Jugador 2 (opcional)",
      player2Phone: "Teléfono — Jugador 2 (opcional)",
      category: "Nivel / categoría",
      categoryPlaceholder: "Ej: iniciación, intermedio, avanzado",
      amount: "Importe pagado (€)",
      message: "Mensaje (opcional)",
      messagePlaceholder: "¿Algo que quieras contarnos?",
    },
    priceNote:
      "20 € por jugador, es decir 40 € por equipo. ¡También puedes pagar más para apoyar aún más a Tierra's Angels!",
    submit: "Continuar al pago",
    submitting: "Enviando…",
    paymentStepTitle: "Pago de la inscripción por Bizum",
    paymentStepIntro:
      "Envía el importe de la inscripción por Bizum a los datos indicados abajo y completa la información para finalizar tu solicitud.",
    paymentReferenceLabel: "Referencia / concepto usado en Bizum",
    paymentReferenceHelp:
      "Indica el nombre o referencia que usaste al enviar el Bizum, para poder localizar tu pago.",
    proofLabel: "Captura de pantalla del pago (opcional pero recomendado)",
    proofHelp: "Formatos aceptados: JPG, PNG, PDF — máx. 5 MB.",
    confirmSubmit: "Enviar mi solicitud de inscripción",
    successTitle: "¡Solicitud enviada!",
    successBody:
      "¡Gracias! Tu inscripción queda registrada con estado «pendiente». Se confirmará por email en cuanto se verifique tu pago por Bizum.",
    errorTitle: "Ha ocurrido un error",
    errorBody:
      "No se pudo enviar tu solicitud. Comprueba tu conexión e inténtalo de nuevo, o contáctanos directamente.",
    soloFormTitle: "Tus datos",
    soloFields: {
      name: "Nombre completo",
      email: "Email",
      phone: "Teléfono",
      category: "Nivel / categoría",
      categoryPlaceholder: "Ej: iniciación, intermedio, avanzado",
      amount: "Importe pagado (€)",
      message: "Mensaje (opcional)",
      messagePlaceholder: "¿Algo que quieras contarnos? ¿Un compañero de nivel similar?",
    },
    soloPriceNote:
      "20 € por jugador. ¡También puedes pagar más para apoyar aún más a Tierra's Angels!",
    soloPairingNote:
      "En cuanto se inscriba otro jugador o jugadora en solitario, os asociaremos automáticamente en un equipo, con el nombre de un país del mundial. Consulta tu equipo en la página «Recaudación de equipos» una vez confirmados los pagos.",
    soloSuccessTitle: "¡Inscripción enviada!",
    soloSuccessBody:
      "¡Gracias! Tu inscripción queda registrada con estado «pendiente». Te asociaremos automáticamente con otro jugador o jugadora en solitario para formar un equipo, en cuanto se verifique tu pago por Bizum.",
  },
  fundraising: {
    title: "Recaudación de equipos",
    intro:
      "¡Un torneo dentro del torneo! Cada equipo inscrito compite por recaudar la mayor cantidad posible para Tierra's Angels. Elige un equipo y apóyalo enviándole una donación por Bizum.",
    leaderboardTitle: "Clasificación de equipos",
    leaderboardEmpty: "Todavía no hay equipos — ¡vuelve pronto!",
    teamColumn: "Equipo",
    amountColumn: "Fondos recaudados",
    formTitle: "Apoyar a un equipo",
    fields: {
      team: "Equipo a apoyar",
      teamPlaceholder: "Elige un equipo",
      name: "Tu nombre (opcional)",
      email: "Email (opcional)",
      amount: "Importe de la donación (€)",
      message: "Mensaje (opcional)",
      messagePlaceholder: "¿Unas palabras de ánimo para el equipo?",
    },
    proofLabel: "Captura de pantalla del pago (opcional)",
    proofHelp: "Formatos aceptados: JPG, PNG, PDF — máx. 5 MB.",
    submit: "Enviar mi apoyo",
    submitting: "Enviando…",
    successTitle: "¡Gracias por tu apoyo!",
    successBody:
      "Tu donación queda registrada para este equipo. Aparecerá en la clasificación una vez confirmada.",
    errorTitle: "Ha ocurrido un error",
    errorBody: "No se pudo enviar tu donación. Comprueba tu conexión e inténtalo de nuevo.",
  },
  donate: {
    title: "Hacer una donación",
    intro:
      "¿No puedes participar en el torneo pero quieres apoyar a Tierra's Angels? Cada donación cuenta, sea cual sea el importe.",
    howTitle: "Cómo donar",
    howBody:
      "Envía el importe que quieras por Bizum a los datos indicados abajo. Después puedes (opcionalmente) dejarnos tus datos para poder agradecértelo.",
    formTitle: "Tus datos (opcional)",
    fields: {
      name: "Nombre",
      email: "Email",
      amount: "Importe de la donación (€)",
      message: "Mensaje (opcional)",
      messagePlaceholder: "¿Unas palabras para la fundación o los organizadores?",
    },
    optionalNote:
      "Este formulario es opcional: puedes donar por Bizum sin rellenarlo. Simplemente nos ayuda a hacer seguimiento y agradecerte.",
    proofLabel: "Captura de pantalla del pago (opcional)",
    proofHelp: "Formatos aceptados: JPG, PNG, PDF — máx. 5 MB.",
    submit: "Enviar",
    submitting: "Enviando…",
    successTitle: "¡Muchísimas gracias!",
    successBody: "Tu donación queda registrada. ¡Gracias por apoyar a Tierra's Angels!",
    errorTitle: "Ha ocurrido un error",
    errorBody:
      "No se pudo enviar tu mensaje, pero tu donación por Bizum sí llega a la fundación. ¡Gracias!",
    skipFormNote: "¿Prefieres no rellenar el formulario? No pasa nada, con el Bizum es suficiente.",
  },
  bizum: {
    title: "Datos de Bizum",
    holder: "Titular",
    phone: "Número",
    amount: "Importe",
    instructions: [
      "Abre la app de tu banco y selecciona Bizum.",
      "Envía el importe al número indicado abajo.",
      "Indica la referencia solicitada en el concepto del Bizum.",
      "Guarda una captura de la confirmación si puedes.",
    ],
  },
  footer: {
    tagline: "Un torneo, un equipo, una causa.",
    contact: "Contacto",
    rights: "Todo lo recaudado se destina íntegramente a Tierra's Angels.",
  },
  admin: {
    loginTitle: "Zona de organización",
    email: "Email",
    password: "Contraseña",
    login: "Entrar",
    loggingIn: "Entrando…",
    loginError: "Credenciales incorrectas.",
    dashboardTitle: "Inscripciones y donaciones",
    logout: "Cerrar sesión",
    tabRegistrations: "Inscripciones",
    tabDonations: "Donaciones",
    statusPending: "Pendiente",
    statusConfirmed: "Confirmado",
    statusRejected: "Rechazado",
    markConfirmed: "Confirmar",
    markRejected: "Rechazar",
    markPending: "Volver a pendiente",
    viewProof: "Ver comprobante",
    noProof: "Sin comprobante adjunto",
    empty: "Nada por ahora.",
  },
};

const dictionaries: Record<Locale, Dictionary> = { fr, es };

export function getDictionary(locale: string): Dictionary {
  return dictionaries[(locale as Locale) in dictionaries ? (locale as Locale) : DEFAULT_LOCALE];
}
