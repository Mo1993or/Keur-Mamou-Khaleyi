

export const breadcrumbsMenu=[
    {
        label:'Categories',
        path:'/categories',
        children:[
            {
                path:':category'
            },
            {
                path:'/product/:id'
            }
        ]
    }
];

export const MENU:{
    title:string;
    path:string;
}[]
=[
    {
        title:'Accueil',
        path:'/'
    },
    {
        title:'Puériculture',
        path:'/categories/Puericulture'
    },
    {
        title:'Chambre',
        path:'/categories/Chambre'
    },
    {
        title:'Vêtement',
        path:'/categories/Vetement'
    },
    {
        title:'Chaussure',
        path:'/categories/Chaussure'
    },
    {
        title:'Hygiène & Soin',
        path:'/categories/Hygiene et Soin'
    },
    {
        title:'Jouet & cadeaux',
        path:'/categories/Jouet et cadeaux'
    },
    {
        title:'Maman',
        path:'/categories/Maman'
    },
    {
        title:'Scolaire',
        path:'/categories/Scolaire'
    },
    {
        title:'Repas Bébé',
        path:'/categories/Repas Bebe'
    }
    // {
    //     title:'Electronics',
    //     path:'/categories/Electronics'
    // }
]

