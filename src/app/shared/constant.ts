

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
        title:'Garçon',
        path:'/categories/Garcon'
    },
    {
        title:'Fille',
        path:'/categories/Fille'
    },
    {
        title:'Jouets',
        path:'/categories/Jouet'
    },
    {
        title:'Accéssoires',
        path:'/categories/accessoire'
    },
    // {
    //     title:'Contact',
    //     path:'/categories/Beverages'
    // },
    // {
    //     title:'Electronics',
    //     path:'/categories/Electronics'
    // }
]

