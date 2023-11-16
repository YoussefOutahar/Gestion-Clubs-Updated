import { NavItem } from './nav-item/nav-item';
//managerRH
export const navItems1: NavItem[] = [
    {
        navCap: 'Espace ManagerRH',
    },
    {
        navCap: 'Listing & update',
    },
    {
        displayName: 'collaborateurs',
        iconName: 'list',
        route: '/dashboard/AffectedCollabs/12387',
    },
  
    {
        navCap: 'Reporting',
    },
   {
        displayName: 'TurnOver',
        iconName: 'chart-line',
        route: '/dashboard/TurnOver',
    }, 
    {
        displayName: 'diplomeRatio',
        iconName: 'chart-donut',
        route: '/dashboard/diplomeRatio',
    },
    {
        displayName: 'recruitment',
        iconName: 'trending-up',
        route: '/dashboard/recruitment',
    },{
        displayName: 'PourcentageEcole',
        iconName: 'percentage',
        route: '/dashboard/PourcentageEcole',
    },
    {
        displayName: 'MaleFemaleRatio',
        iconName: 'chart-donut',
        route: '/dashboard/MaleFemaleRatio',
    },
    
]