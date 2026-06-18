import type { Locale } from './config'

// Full bilingual dictionary for the public surface.
// Spanish is professional LatAm (Panama/Costa Rica) tone.

export const dictionaries = {
  en: {
    nav: {
      banner: 'ISD Pilot — Now accepting founders and builders',
      applyNow: 'Apply now',
      howItWorks: 'How It Works',
      apply: 'Apply',
      join: 'Join',
      logIn: 'Log In',
      applyFounder: 'Apply as Founder',
      joinBuilder: 'Join as Builder',
    },
    hero: {
      initiative: 'An Innovation Smart District Initiative',
      banner: 'La Mesa Summer 2026 Table — Now accepting applications',
      titleLine1: 'Bring your idea',
      titleLine2: 'to the table.',
      subtitle:
        'La Mesa helps founders, students, and builders form teams, map the roles they need, and move from idea to prototype.',
      applyFounder: 'Apply as Founder',
      joinBuilder: 'Join as Builder',
      stats: ['Batch 01', '30-Day Build Cycle', 'ISD Powered'],
    },
    problem: {
      eyebrow: 'The Problem',
      title: 'Great ideas die alone.',
      subtitle:
        'Finding the right people to build with is one of the hardest parts of turning an idea into something real.',
      cards: [
        { icon: '💡', title: 'Ideas stall without teams', desc: 'Most early-stage founders have the vision but not the builders. Ideas die in isolation.' },
        { icon: '🎯', title: 'Skills go unmatched', desc: "Talented students and builders want to contribute but can't find the right projects to join." },
        { icon: '🗺️', title: 'No structured path', desc: 'Without a clear process, early teams waste weeks figuring out who should do what.' },
      ],
    },
    solution: {
      eyebrow: 'The Solution',
      title: 'AI-powered team formation.',
      subtitle:
        'La Mesa uses AI to map the roles your project needs, score your readiness, and help ISD coordinators assemble aligned, capable teams — fast.',
      cards: [
        { icon: '🧭', title: 'AI Role Mapping', desc: 'Submit your idea and get an instant breakdown of what roles and skills your project needs.' },
        { icon: '📊', title: 'Readiness Score', desc: "Get a clear picture of your project's strengths, gaps, and what to tackle first." },
        { icon: '🤝', title: 'Admin-Guided Matching', desc: 'ISD coordinators review AI suggestions and assemble your team with care.' },
      ],
    },
    how: {
      eyebrow: 'How It Works',
      title: 'Four steps to your team.',
      steps: [
        { step: '01', title: 'Submit Your Idea', desc: 'Fill out the founder application with your project details, goals, and what you need.' },
        { step: '02', title: 'AI Analysis', desc: 'Our AI scores your project, maps recommended roles, and generates a 30-day roadmap.' },
        { step: '03', title: 'ISD Forms Your Table Team', desc: 'ISD coordinators review AI suggestions and assemble your Table 01 team with care.' },
        { step: '04', title: 'Build Together', desc: 'Your team forms, aligned on the roadmap. Track progress and move toward prototype.' },
      ],
    },
    who: {
      eyebrow: "Who It's For",
      title: 'Built for builders and dreamers.',
      founders: {
        title: 'Founders with Ideas',
        desc: 'You have a startup idea, a product vision, or a project you want to bring to life — but you need a team.',
        bullets: ['AI role mapping for your project', 'Readiness score & gap analysis', '30-day prototype roadmap', 'Admin-curated team matching'],
        cta: 'Apply as Founder',
      },
      builders: {
        title: 'Students & Builders',
        desc: 'You have skills — design, code, marketing, research — and want to put them to work on real projects.',
        bullets: ['Matched to relevant projects', 'Build real portfolio work', 'Flexible availability options', 'ISD community network'],
        cta: 'Join as Builder',
      },
      isd: {
        title: 'ISD Communities',
        desc: 'Programs, cohorts, and innovation communities looking for a structured team formation platform.',
        cta: 'Learn More',
      },
    },
    table: {
      eyebrow: 'The Table',
      title: 'Join the La Mesa Summer 2026 Table.',
      subtitle: '30 days. Real teams. Real prototypes. One Demo Day.',
      stats: [
        { stat: '30 Days', desc: 'Build cycle' },
        { stat: '20 Projects', desc: 'Selected ideas' },
        { stat: '1 Demo Day', desc: 'Final showcase' },
      ],
      cta: 'Apply for a Seat',
    },
    founderCta: {
      title: 'Ready to bring your idea to the table?',
      desc: 'Submit your project application and get AI-powered role mapping, readiness scoring, and a 30-day roadmap in minutes.',
      note: 'No experience required. Just a real idea.',
      cta: 'Apply as Founder',
      time: 'Takes less than 5 minutes',
    },
    builderCta: {
      title: 'Have skills? Find a project.',
      desc: 'Create your builder profile, share your skills and availability, and get matched to projects where you can make a real impact.',
      note: 'Any skill level welcome. Developers, designers, marketers, researchers.',
      cta: 'Join as Builder',
      time: 'Any skill level welcome',
    },
    about: {
      eyebrow: 'About This Pilot',
      title: 'An early experiment in community-powered innovation.',
      desc: 'La Mesa is an ISD-powered pilot platform designed to test whether structured team formation can help founders, students, and builders move faster from idea to prototype. This is an early-stage pilot. Features and access are managed by ISD coordinators.',
      tags: ['ISD Powered', 'Early-Stage Pilot', 'Costa Rica'],
    },
    footer: {
      initiative: 'An ISD Initiative',
      tagline: 'Part of the Innovation Smart District ecosystem — where ideas take shape and the future is built. La Mesa is the table where founders and builders form teams.',
      platform: 'Platform',
      account: 'Account',
      howItWorks: 'How It Works',
      applyFounder: 'Apply as Founder',
      joinBuilder: 'Join as Builder',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      rights: '© 2026 La Mesa. Powered by Mindful Tech. All rights reserved.',
      builtWith: 'Built with ❤️ for ISD communities',
    },
  },

  es: {
    nav: {
      banner: 'Piloto ISD — Ya recibimos founders y builders',
      applyNow: 'Postúlate',
      howItWorks: 'Cómo Funciona',
      apply: 'Postular',
      join: 'Unirse',
      logIn: 'Iniciar Sesión',
      applyFounder: 'Postular como Founder',
      joinBuilder: 'Unirse como Builder',
    },
    hero: {
      initiative: 'Una iniciativa de Innovation Smart District',
      banner: 'La Mesa Summer 2026 Table — Ya recibimos postulaciones',
      titleLine1: 'Trae tu idea',
      titleLine2: 'a la mesa.',
      subtitle:
        'La Mesa ayuda a founders, estudiantes y builders a formar equipos, mapear los roles que necesitan y avanzar de la idea al prototipo.',
      applyFounder: 'Postular como Founder',
      joinBuilder: 'Unirse como Builder',
      stats: ['Batch 01', 'Ciclo de 30 Días', 'Impulsado por ISD'],
    },
    problem: {
      eyebrow: 'El Problema',
      title: 'Las grandes ideas mueren solas.',
      subtitle:
        'Encontrar a las personas indicadas para construir es una de las partes más difíciles de convertir una idea en algo real.',
      cards: [
        { icon: '💡', title: 'Las ideas se estancan sin equipo', desc: 'La mayoría de los founders tienen la visión, pero no el equipo. Las ideas mueren en aislamiento.' },
        { icon: '🎯', title: 'El talento queda sin conectar', desc: 'Estudiantes y builders con talento quieren aportar, pero no encuentran los proyectos correctos.' },
        { icon: '🗺️', title: 'Sin un camino claro', desc: 'Sin un proceso definido, los equipos pierden semanas decidiendo quién hace qué.' },
      ],
    },
    solution: {
      eyebrow: 'La Solución',
      title: 'Formación de equipos con IA.',
      subtitle:
        'La Mesa usa IA para mapear los roles que tu proyecto necesita, evaluar tu preparación y ayudar a los coordinadores de ISD a formar equipos alineados y capaces — rápido.',
      cards: [
        { icon: '🧭', title: 'Mapeo de Roles con IA', desc: 'Envía tu idea y obtén al instante un desglose de los roles y habilidades que tu proyecto necesita.' },
        { icon: '📊', title: 'Puntaje de Preparación', desc: 'Obtén una imagen clara de las fortalezas de tu proyecto, sus brechas y qué abordar primero.' },
        { icon: '🤝', title: 'Matching Guiado por Admin', desc: 'Los coordinadores de ISD revisan las sugerencias de IA y forman tu equipo con cuidado.' },
      ],
    },
    how: {
      eyebrow: 'Cómo Funciona',
      title: 'Cuatro pasos hacia tu equipo.',
      steps: [
        { step: '01', title: 'Envía Tu Idea', desc: 'Completa la postulación de founder con los detalles de tu proyecto, tus metas y lo que necesitas.' },
        { step: '02', title: 'Análisis con IA', desc: 'Nuestra IA evalúa tu proyecto, mapea los roles recomendados y genera una hoja de ruta de 30 días.' },
        { step: '03', title: 'ISD Forma Tu Equipo de Mesa', desc: 'Los coordinadores de ISD revisan las sugerencias de IA y forman tu equipo de Table 01 con cuidado.' },
        { step: '04', title: 'Construyan Juntos', desc: 'Tu equipo se forma, alineado en la hoja de ruta. Registra el avance y acércate al prototipo.' },
      ],
    },
    who: {
      eyebrow: 'Para Quién Es',
      title: 'Hecho para builders y soñadores.',
      founders: {
        title: 'Founders con Ideas',
        desc: 'Tienes una idea de startup, una visión de producto o un proyecto que quieres hacer realidad — pero necesitas un equipo.',
        bullets: ['Mapeo de roles con IA para tu proyecto', 'Puntaje de preparación y análisis de brechas', 'Hoja de ruta de prototipo en 30 días', 'Matching de equipo curado por admin'],
        cta: 'Postular como Founder',
      },
      builders: {
        title: 'Estudiantes y Builders',
        desc: 'Tienes habilidades — diseño, código, marketing, investigación — y quieres ponerlas a trabajar en proyectos reales.',
        bullets: ['Conectado a proyectos relevantes', 'Construye portafolio real', 'Opciones de disponibilidad flexibles', 'Red de comunidad ISD'],
        cta: 'Unirse como Builder',
      },
      isd: {
        title: 'Comunidades ISD',
        desc: 'Programas, cohortes y comunidades de innovación que buscan una plataforma estructurada de formación de equipos.',
        cta: 'Conoce Más',
      },
    },
    table: {
      eyebrow: 'La Mesa',
      title: 'Únete a La Mesa Summer 2026 Table.',
      subtitle: '30 días. Equipos reales. Prototipos reales. Un Demo Day.',
      stats: [
        { stat: '30 Días', desc: 'Ciclo de construcción' },
        { stat: '20 Proyectos', desc: 'Ideas seleccionadas' },
        { stat: '1 Demo Day', desc: 'Showcase final' },
      ],
      cta: 'Postula por un Lugar',
    },
    founderCta: {
      title: '¿List@ para traer tu idea a la mesa?',
      desc: 'Envía la postulación de tu proyecto y obtén mapeo de roles con IA, puntaje de preparación y una hoja de ruta de 30 días en minutos.',
      note: 'No se requiere experiencia. Solo una idea real.',
      cta: 'Postular como Founder',
      time: 'Toma menos de 5 minutos',
    },
    builderCta: {
      title: '¿Tienes habilidades? Encuentra un proyecto.',
      desc: 'Crea tu perfil de builder, comparte tus habilidades y disponibilidad, y conéctate con proyectos donde puedas generar un impacto real.',
      note: 'Todos los niveles son bienvenidos. Developers, diseñadores, marketers, investigadores.',
      cta: 'Unirse como Builder',
      time: 'Todos los niveles bienvenidos',
    },
    about: {
      eyebrow: 'Sobre Este Piloto',
      title: 'Un experimento temprano de innovación impulsada por la comunidad.',
      desc: 'La Mesa es una plataforma piloto impulsada por ISD, diseñada para probar si la formación estructurada de equipos puede ayudar a founders, estudiantes y builders a avanzar más rápido de la idea al prototipo. Este es un piloto en etapa temprana. Las funciones y el acceso son gestionados por los coordinadores de ISD.',
      tags: ['Impulsado por ISD', 'Piloto en Etapa Temprana', 'Costa Rica'],
    },
    footer: {
      initiative: 'Una Iniciativa ISD',
      tagline: 'Parte del ecosistema de Innovation Smart District — donde las ideas toman forma y se construye el futuro. La Mesa es la mesa donde founders y builders forman equipos.',
      platform: 'Plataforma',
      account: 'Cuenta',
      howItWorks: 'Cómo Funciona',
      applyFounder: 'Postular como Founder',
      joinBuilder: 'Unirse como Builder',
      signIn: 'Iniciar Sesión',
      signUp: 'Crear Cuenta',
      rights: '© 2026 La Mesa. Impulsado por Mindful Tech. Todos los derechos reservados.',
      builtWith: 'Hecho con ❤️ para las comunidades ISD',
    },
  },
} as const

export type Dictionary = (typeof dictionaries)['en']

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] as Dictionary
}
