export const navigations = [
    {
        label: 'Gestion immobilisation',
        type: 'label',
    },
    {
        name: 'Paramétrage',
        path: '/parametrage',
        icon: 'dashboard',
        children: [
            {
                name: 'Paramètres généraux',
                path: '/parametrage/parametresgeneraux',
                iconText: 'PG',
            },
            {
                name: 'Vocabulaire',
                path: '/parametrage/vocabulaire',
                iconText: 'VC',
            },
            {
                name: 'Structures de l\'organisation',
                path: '/parametrage/structure',
                iconText: 'ST',
            },
            {
                name: 'Marques modèles',
                path: '/parametrage/marque-modele',
                iconText: 'MM',
            },
            {
                name: 'Catalogue de l\'organisation',
                path: '/parametrage/catalogue',
                iconText: 'CT',
            },
            {
                name: 'Acquéreurs',
                path: '/parametrage/acquereur',
                iconText: 'AQ',
            },
            {
                name: 'Comptes comptable',
                path: '/parametrage/comptecomptable',
                iconText: 'CP',
            },
            {
                name: 'Fournisseurs',
                path: '/parametrage/fournisseur',
                iconText: 'FN',
            },
            {
                name: 'Caractéristiques',
                path: '/parametrage/caracteristique',
                iconText: 'CR',
            }
        ]
    },
    {
        name: 'Prise en charge',
        path: '/prise-en-charge',
        icon: 'open_in_browser',
        children: [
            {
                name: 'Saisie immobilisation',
                path: '/prise-en-charge/p-immo',
                iconText: 'PR',
            },
            {
                name: 'Fiche immobilisation',
                path: '/prise-en-charge/f-immo',
                iconText: 'FC',
            },
            {
                name: 'Etiquettes',
                path: '/prise-en-charge/etiquettes',
                iconText: 'ET',
            },
            {
                name: 'Amortissement',
                path: '/prise-en-charge/amortissement',
                iconText: 'AM',
            }
        ]
    },
    {
        name: 'Suivi',
        path: '/suivi',
        icon: 'autorenew',
        children: [
            {
                name: 'Décisions',
                path: '/suivi/decisions',
                iconText: 'SI',
            },
            {
                name: 'Prélèvements',
                path: '/suivi/prelevements',
                iconText: 'SI',
            },
            {
                name: 'Transferts',
                path: '/suivi/transferts',
                iconText: 'SI',
            },
            {
                name: 'Cessions',
                path: '/suivi/cessions',
                iconText: 'SI',
            },
            {
                name: 'Cessions',
                path: '/suivi/cessions',
                iconText: 'SI',
            },
            {
                name: 'Mise hors exploitation',
                path: '/suivi/mise-hors-exploi',
                iconText: 'SI',
            }
        ]
    },
    {
        name: 'Inventaire',
        path: '/inventaire',
        icon: 'work',
        children: [
            {
                name: 'Planning',
                path: '/inventaire/planning',
                iconText: 'SI',
            },
            {
                name: 'Préparation',
                path: '/inventaire/preparation',
                iconText: 'SI',
            },
            {
                name: 'Saisie',
                path: '/inventaire/saisie',
                iconText: 'SI',
            },
            {
                name: 'Comparatifs',
                path: '/inventaire/comparatif',
                iconText: 'SI',
            },
            {
                name: 'Anomalies',
                path: '/inventaire/anomalies',
                iconText: 'SI',
            },
            {
                name: 'Réajustement',
                path: '/inventaire/reajustement',
                iconText: 'SI',
            },
            {
                name: 'Clôture',
                path: '/inventaire/cloture',
                iconText: 'SI',
            }
        ]
    },
    {
        name: 'Sécurité',
        path: '/securite',
        icon: 'group',
        children: [
        ]
    },
    {
        name: 'Traçabilité',
        path: '/tracabilite',
        icon: 'toc',
        children: [
        ]
    },
    {
        name: 'Statistiques',
        path: '/statistiques',
        icon: 'pie_chart',
        children: [
        ]
    }    
]
