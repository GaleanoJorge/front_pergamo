import { NbMenuItem } from '@nebular/theme';
import { icon } from 'leaflet';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Inicio',
    group: true,
  },
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Componentes',
    group: true,
  },
  {
    title: 'Categorías',
    link: '/pages/category/categories',
    icon: 'folder-outline',
  },
  {
    title: 'Estudiantes',
    link: '/pages/student/students',
    icon: 'people-outline',
  },
  {
    title: 'Profesores',
    link: '/pages/teacher/teachers',
    icon: 'person-done-outline',
  },
  {
    title: 'Reportes',
    icon: 'bar-chart-outline',
    children: [
      {
        title: 'Generales',
        icon: 'bar-chart-outline',
        link: '/pages/report/general',
      },
      {
        title: 'Demográficos',
        icon: 'map-outline',
      },
      {
        title: 'Competencias',
        icon: 'award-outline',
      },
      {
        title: 'Georreferenciación',
        icon: 'pin-outline',
      },
    ]
  },
  {
    title: 'Configuración',
    group: true,
  },
  {
    title: 'Configuración',
    icon: 'settings-2-outline',
    children: [
      {
        title: 'Configuracion del sistema',
        icon: 'settings-2-outline',
        children: [
          {
            title: 'Usuarios',
            icon: 'person-outline',
            link: '/pages/setting/users',
          },
          {
            title: 'Usuarios',
            icon: 'person-outline',
            link: '/pages/setting/users',
          },
          {
            title: 'Categorías',
            link: '/pages/setting/categories',
            icon: 'folder-outline',
          },
          {
            title: 'Cursos',
            icon: 'folder-add-outline',
          },
          {
            title: 'Profesores',
            icon: 'person-done-outline',
          },
          {
            title: 'Estudiantes',
            icon: 'people-outline',
          },
          {
            title: 'Roles',
            icon: 'layers-outline',
            link: '/pages/setting/roles',
          },
          {
            title: 'Permisos',
            icon: 'person-done-outline',
            link: '/pages/setting/permissions',
          },
          {
            title: 'Items',
            icon: 'layers-outline',
            link: '/pages/setting/items',
          },
          {
            title: 'Instituciones Educativas',
            icon: 'map-outline',
            link: '/pages/setting/institutions',
          },
          {
            title: 'Consejos',
            icon: 'map-outline',
            link: '/pages/setting/sectional-council',
          },
          {
            title: 'Distritos',
            link: '/pages/setting/district',
            icon: 'map-outline',
          },
          {
            title: 'Especialidad',
            link: '/pages/setting/specialty',
            icon: 'map-outline',
          },
          {
            title: 'Despacho',
            link: '/pages/setting/office',
            icon: 'map-outline',
          },
          {
            title: 'Dependencia',
            link: '/pages/setting/dependence',
            icon: 'map-outline',
          },
          {
            title: 'Cargos',
            link: '/pages/setting/position',
            icon: 'map-outline',
          },
          {
            title: 'Entidades',
            link: '/pages/setting/entity',
            icon: 'map-outline',
          },
          {
            title: 'Circuitos',
            link: '/pages/setting/circuit',
            icon: 'map-outline',
          },
          {
            title: 'Departamentos',
            link: '/pages/setting/region',
            icon: 'map-outline',
          },
          {
            title: 'Ciudades',
            link: '/pages/setting/municipality',
            icon: 'map-outline',
          },
          {
            title: 'Areas',
            link: '/pages/setting/area',
            icon: 'map-outline',
          },
          {
            title: 'Subareas',
            link: '/pages/setting/subarea',
            icon: 'map-outline',
          },
          {
            title: 'Vigencia',
            link: '/pages/setting/validity',
            icon: 'map-outline',
          },
        ],

      },
      {
        title: 'Configuracion asistencial',
        icon: 'settings-2-outline',
        children: [
          {
            title: 'Usuarios',
            icon: 'person-outline',
            link: '/pages/setting/users',
          },
          {
            title: 'Usuarios',
            icon: 'person-outline',
            link: '/pages/setting/users',
          },
          {
            title: 'Categorías',
            link: '/pages/setting/categories',
            icon: 'folder-outline',
          },
          {
            title: 'Cursos',
            icon: 'folder-add-outline',
          },
          {
            title: 'Profesores',
            icon: 'person-done-outline',
          },
          {
            title: 'Estudiantes',
            icon: 'people-outline',
          },
          {
            title: 'Roles',
            icon: 'layers-outline',
            link: '/pages/setting/roles',
          },
          {
            title: 'Permisos',
            icon: 'person-done-outline',
            link: '/pages/setting/permissions',
          },
          {
            title: 'Items',
            icon: 'layers-outline',
            link: '/pages/setting/items',
          },
          {
            title: 'Instituciones Educativas',
            icon: 'map-outline',
            link: '/pages/setting/institutions',
          },
          {
            title: 'Consejos',
            icon: 'map-outline',
            link: '/pages/setting/sectional-council',
          },
          {
            title: 'Distritos',
            link: '/pages/setting/district',
            icon: 'map-outline',
          },
          {
            title: 'Especialidad',
            link: '/pages/setting/specialty',
            icon: 'map-outline',
          },
          {
            title: 'Despacho',
            link: '/pages/setting/office',
            icon: 'map-outline',
          },
          {
            title: 'Dependencia',
            link: '/pages/setting/dependence',
            icon: 'map-outline',
          },
          {
            title: 'Cargos',
            link: '/pages/setting/position',
            icon: 'map-outline',
          },
          {
            title: 'Entidades',
            link: '/pages/setting/entity',
            icon: 'map-outline',
          },
          {
            title: 'Circuitos',
            link: '/pages/setting/circuit',
            icon: 'map-outline',
          },
          {
            title: 'Departamentos',
            link: '/pages/setting/region',
            icon: 'map-outline',
          },
          {
            title: 'Ciudades',
            link: '/pages/setting/municipality',
            icon: 'map-outline',
          },
          {
            title: 'Areas',
            link: '/pages/setting/area',
            icon: 'map-outline',
          },
          {
            title: 'Subareas',
            link: '/pages/setting/subarea',
            icon: 'map-outline',
          },
          {
            title: 'Vigencia',
            link: '/pages/setting/validity',
            icon: 'map-outline',
          },
        ],
      },

    ],
  },
  {
    title: "Mipres",
    group: true,
  },
  {
    title: "Mipres",
    icon: 'arrow-right-outline',
    children: [
      {
        title: 'Suministros',
        icon: 'npm-outline',
        link: 'nn'
      },
      {
        title: 'Facturación',
        icon: 'clipboard-outline',
        link: 'nn' 
      }
    ]
  }
]
