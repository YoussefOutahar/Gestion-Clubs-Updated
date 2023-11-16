import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Test',
  },
  {
    displayName: 'managers',
    iconName: 'layout-dashboard',
    route: '/dashboard/managers',
  },
  {
    navCap: 'Test 2',
  },
  {
    displayName: 'nonManagers',
    iconName: 'rosette',
    route: '/dashboard/nonManagers',
  },
  {
    displayName: 'nonAffectedCollabs',
    iconName: 'poker-chip',
    route: '/dashboard/GetnonAffectedCollabs',
  },
  {
    displayName: 'MaleFemaleRatio',
    iconName: 'list',
    route: '/dashboard/MaleFemaleRatio',
  },
  {
    displayName: 'ManagerWithoutAcc',
    iconName: 'layout-navbar-expand',
    route: '/dashboard/ManagerWithoutAcc',
  },
  {
    displayName: 'VisualizeRatio',
    iconName: 'tooltip',
    route: '/dashboard/VisualizeRatio',
  },
  {
    navCap: 'Test 3',
  },
  {
    displayName: 'PourcentageEcole',
    iconName: 'lock',
    route: '/dashboard/PourcentageEcole',
  },
  {
    displayName: 'recruitment',
    iconName: 'user-plus',
    route: '/dashboard/recruitment',
  },
  {
    navCap: 'Hadchi zwin',
  },
  {
    displayName: 'collaborateurs',
    iconName: 'mood-smile',
    route: '/dashboard/collaborateurs',
  },
  {
    displayName: 'diplomeRatio',
    iconName: 'aperture',
    route: '/dashboard/diplomeRatio',
  },
  {
    displayName: 'salaryEvolution',
    iconName: 'aperture',
    route: '/dashboard/salaryEvolution/:id',
  },
  {
    displayName: 'TurnOver',
    iconName: 'aperture',
    route: '/dashboard/TurnOver',
  },
  {
    displayName: 'Technologies',
    iconName: 'aperture',
    route: '/dashboard/Technologies',
  },
  {
    displayName: 'salaryEvolution',
    iconName: 'aperture',
    route: '/dashboard/salaryEvolution',
  },
  {
    displayName: 'AffectedCollabs',
    iconName: 'poker-chip',
    route: '/dashboard/AffectedCollabs',},
  {
    displayName: 'Add collaboarteur',
    iconName: 'poker-chip',
    route: '/dashboard/add',
  },
  {
    displayName: 'collaborateurs list',
    iconName: 'list',
    route: '/dashboard/listofcollaboratorstoupdate',
  }
  ,
  {
    displayName: 'Managers RH Activated',
    iconName: 'list',
    route: '/dashboard/ManagersRH/Activated',
  }
  ,
  {
    displayName: 'Managers RH Desactivated',
    iconName: 'list',
    route: '/dashboard/ManagersRH/Desactivated',
  }
  ,
  {
    displayName: 'Importer ou Exporter',
    iconName: 'tooltip',
    route: '/dashboard/Import_Export/Excel',
  }


];
