import { NavItem } from './nav-item/nav-item';

export const navItems3: NavItem[] = [
    {
        navCap: 'Espace administrateur',
    }, {
        displayName: 'managers',
        iconName: 'list',
        route: '/dashboard/managers',
    }, {
        displayName: 'CreateCompte',
        iconName: 'poker-chip',
        route: '/dashboard/CreateCompte',
    }, {
        displayName:'AffectCompteToCollab' ,
        iconName: 'user-plus',
        route: '/dashboard/AffectCompteToCollab',
    },
    {
        displayName:'Importation et Exporation' ,
        iconName: 'user',
        route: '/dashboard/Import_Export/Excel',
    },
    
]