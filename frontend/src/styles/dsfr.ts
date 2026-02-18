/**
 * Styles DSFR - Système de Design de l'État Français
 * Classes Tailwind personnalisées pour reproduire le design gouvernemental
 */

// Couleurs DSFR officielles
export const dsfrColors = {
  // Bleu France (couleur principale)
  blueFrance: {
    main: '#000091',      // Bleu France principal
    hover: '#1212FF',     // Bleu France hover
    active: '#2323FF',    // Bleu France actif
    sun: '#000091',       // Bleu France soleil (principal)
  },
  
  // Couleurs de texte
  text: {
    default: '#161616',    // Texte principal
    mention: '#666666',    // Texte secondaire
    disabled: '#929292',   // Texte désactivé
    inverted: '#FFFFFF',   // Texte inversé
  },
  
  // Couleurs de fond
  background: {
    default: '#FFFFFF',    // Fond principal
    alt: '#F6F6F6',        // Fond alternatif
    contrast: '#EEEEEE',   // Fond contrasté
    raised: '#FFFFFF',     // Fond élevé
  },
  
  // Couleurs d'action
  action: {
    highBlueFrance: '#000091',
    lowBlueFrance: '#E3E3FD',
  },
  
  // Couleurs de statut
  status: {
    success: '#18753C',     // Vert succès
    successLight: '#B8FEC9',
    error: '#CE0500',       // Rouge erreur
    errorLight: '#FFE9E9',
    warning: '#B34000',     // Orange avertissement
    warningLight: '#FFE9E6',
    info: '#0063CB',        // Bleu info
    infoLight: '#E8EDFF',
  },
  
  // Bordures
  border: {
    default: '#E5E5E5',
    plain: '#CECECE',
    active: '#000091',
  }
};

// Classes Tailwind personnalisées pour DSFR
export const dsfrClasses = {
  // Conteneurs
  container: 'max-w-5xl mx-auto px-4 md:px-6 lg:px-8',
  card: 'bg-white border border-gray-200 rounded-none shadow-sm',
  cardElevated: 'bg-white shadow-lg border-0',
  
  // Typographie
  title: {
    xl: 'text-3xl md:text-4xl font-bold text-[#161616] tracking-tight',
    lg: 'text-2xl md:text-3xl font-bold text-[#161616]',
    md: 'text-xl md:text-2xl font-semibold text-[#161616]',
    sm: 'text-lg font-semibold text-[#161616]',
  },
  text: {
    default: 'text-base text-[#161616]',
    sm: 'text-sm text-[#161616]',
    mention: 'text-sm text-[#666666]',
    xs: 'text-xs text-[#666666]',
  },
  
  // Boutons
  btn: {
    primary: 'inline-flex items-center justify-center px-6 py-3 bg-[#000091] text-white font-medium hover:bg-[#1212FF] active:bg-[#2323FF] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#000091]',
    secondary: 'inline-flex items-center justify-center px-6 py-3 bg-white text-[#000091] font-medium border-2 border-[#000091] hover:bg-[#F6F6F6] active:bg-[#EEEEEE] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#000091]',
    tertiary: 'inline-flex items-center justify-center px-4 py-2 text-[#000091] font-medium hover:bg-[#F6F6F6] active:bg-[#EEEEEE] transition-colors duration-150 underline underline-offset-4',
    icon: 'inline-flex items-center justify-center w-10 h-10 text-[#000091] hover:bg-[#F6F6F6] active:bg-[#EEEEEE] rounded-full transition-colors duration-150',
    danger: 'inline-flex items-center justify-center px-6 py-3 bg-[#CE0500] text-white font-medium hover:bg-[#B00000] active:bg-[#900000] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CE0500]',
    success: 'inline-flex items-center justify-center px-6 py-3 bg-[#18753C] text-white font-medium hover:bg-[#146333] active:bg-[#10512A] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#18753C]',
  },
  
  // Inputs
  input: {
    base: 'w-full px-4 py-3 border-b-2 border-[#3A3A3A] bg-[#F6F6F6] text-[#161616] placeholder-[#666666] focus:border-[#000091] focus:bg-white focus:outline-none transition-colors duration-150',
    error: 'w-full px-4 py-3 border-b-2 border-[#CE0500] bg-[#FFE9E9] text-[#161616] focus:outline-none',
    success: 'w-full px-4 py-3 border-b-2 border-[#18753C] bg-[#B8FEC9] text-[#161616] focus:outline-none',
  },
  
  // Select
  select: 'w-full px-4 py-3 border-b-2 border-[#3A3A3A] bg-[#F6F6F6] text-[#161616] focus:border-[#000091] focus:bg-white focus:outline-none appearance-none cursor-pointer',
  
  // Textarea
  textarea: 'w-full px-4 py-3 border-b-2 border-[#3A3A3A] bg-[#F6F6F6] text-[#161616] placeholder-[#666666] focus:border-[#000091] focus:bg-white focus:outline-none resize-none transition-colors duration-150',
  
  // Labels
  label: 'block text-sm font-medium text-[#161616] mb-1',
  labelRequired: 'text-[#CE0500]',
  hint: 'text-xs text-[#666666] mt-1',
  
  // Tables
  table: {
    container: 'w-full overflow-x-auto',
    base: 'w-full border-collapse',
    header: 'bg-[#F6F6F6] text-left text-sm font-semibold text-[#161616] uppercase tracking-wider',
    headerCell: 'px-4 py-3 border-b-2 border-[#000091]',
    row: 'border-b border-gray-200 hover:bg-[#F6F6F6] transition-colors',
    cell: 'px-4 py-3 text-sm text-[#161616]',
    cellInput: 'w-full px-2 py-1 bg-transparent border-0 border-b border-gray-300 focus:border-[#000091] focus:outline-none',
  },
  
  // Stepper
  stepper: {
    container: 'flex items-center justify-between mb-8',
    step: 'flex flex-col items-center',
    stepNumber: {
      default: 'w-10 h-10 rounded-full border-2 border-[#CECECE] bg-white text-[#666666] flex items-center justify-center font-bold text-sm',
      active: 'w-10 h-10 rounded-full border-2 border-[#000091] bg-[#000091] text-white flex items-center justify-center font-bold text-sm',
      completed: 'w-10 h-10 rounded-full border-2 border-[#18753C] bg-[#18753C] text-white flex items-center justify-center font-bold text-sm',
    },
    stepLabel: {
      default: 'mt-2 text-xs text-[#666666] text-center max-w-[80px]',
      active: 'mt-2 text-xs text-[#000091] font-semibold text-center max-w-[80px]',
      completed: 'mt-2 text-xs text-[#18753C] text-center max-w-[80px]',
    },
    connector: {
      default: 'flex-1 h-0.5 bg-[#CECECE] mx-2',
      completed: 'flex-1 h-0.5 bg-[#18753C] mx-2',
    }
  },
  
  // Badges
  badge: {
    default: 'inline-flex items-center px-2 py-1 text-xs font-medium bg-[#F6F6F6] text-[#161616] rounded-full',
    primary: 'inline-flex items-center px-2 py-1 text-xs font-medium bg-[#E3E3FD] text-[#000091] rounded-full',
    success: 'inline-flex items-center px-2 py-1 text-xs font-medium bg-[#B8FEC9] text-[#18753C] rounded-full',
    error: 'inline-flex items-center px-2 py-1 text-xs font-medium bg-[#FFE9E9] text-[#CE0500] rounded-full',
    warning: 'inline-flex items-center px-2 py-1 text-xs font-medium bg-[#FFE9E6] text-[#B34000] rounded-full',
  },
  
  // Alerts
  alert: {
    info: 'p-4 bg-[#E8EDFF] border-l-4 border-[#0063CB] text-[#161616]',
    success: 'p-4 bg-[#B8FEC9] border-l-4 border-[#18753C] text-[#161616]',
    warning: 'p-4 bg-[#FFE9E6] border-l-4 border-[#B34000] text-[#161616]',
    error: 'p-4 bg-[#FFE9E9] border-l-4 border-[#CE0500] text-[#161616]',
  },
  
  // Accordéon
  accordion: {
    container: 'border border-gray-200 divide-y divide-gray-200',
    header: 'flex items-center justify-between w-full px-4 py-4 text-left bg-white hover:bg-[#F6F6F6] transition-colors cursor-pointer',
    title: 'text-base font-semibold text-[#161616]',
    content: 'px-4 py-4 bg-white',
  },
  
  // Progress
  progress: {
    container: 'w-full bg-[#EEEEEE] rounded-full h-2',
    bar: 'bg-[#000091] h-2 rounded-full transition-all duration-300',
  }
};

// Icônes recommandées par le DSFR
export const dsfrIcons = {
  // Navigation
  arrowLeft: 'ri-arrow-left-line',
  arrowRight: 'ri-arrow-right-line',
  arrowUp: 'ri-arrow-up-line',
  arrowDown: 'ri-arrow-down-line',
  
  // Actions
  add: 'ri-add-line',
  delete: 'ri-delete-bin-line',
  edit: 'ri-pencil-line',
  search: 'ri-search-line',
  download: 'ri-download-line',
  upload: 'ri-upload-line',
  
  // Status
  check: 'ri-check-line',
  close: 'ri-close-line',
  info: 'ri-information-line',
  warning: 'ri-alert-line',
  error: 'ri-error-warning-line',
  success: 'ri-checkbox-circle-line',
  
  // Objets
  file: 'ri-file-line',
  folder: 'ri-folder-line',
  user: 'ri-user-line',
  settings: 'ri-settings-line',
  
  // Autres
  menu: 'ri-menu-line',
  more: 'ri-more-line',
  external: 'ri-external-link-line',
};
