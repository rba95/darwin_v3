export interface VM {
    environnement: string;
    nom: string;
    resilience: string;
    role: string;
    os: string;
    cpu: number;
    ram: number;
}

export interface Acteur {
    acteur: string;
    role: string;
    droits: string;
    commentaires?: string;
}

export interface DatFormValues {
    titre_projet: string;
    chef_projet: string;
    contact_tech: string;
    date: string;
    description_doc: string;
    objet_document: string;
    description_architecture: string;
    description_authentification: string;
    description_administrationtechnique: string;
    description_adminfonctionnelle: string;
    description_interapplicative: string;
    segmentation_dr: string;
    deploiement: string;
    migration_reprise: string;
    supervision: string;
    sauvegarde_restauration: string;
    contraintes: string;
    niveau_services: string;
    vms: VM[];
    acteurs: Acteur[];
}