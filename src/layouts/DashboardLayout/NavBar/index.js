/* eslint-disable no-use-before-define */
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  Link,
  List,
  ListSubheader,
  makeStyles,
  Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { BarChart as BarChartIcon, Search as SearchIcon, Star as StarIcon } from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link as RouterLink, matchPath, useLocation } from 'react-router-dom';
import Logo from 'src/components/Logo';
import NavItem from './NavItem';
import avatar from '../../../assets/avatar.png'

const sections = [
  {
    subheader: 'Menu',
    items: [
      {
        title: 'Explorar campañas',
        icon: SearchIcon,
        href: '/app/events/browse'
      },
      {
        title: 'Registrar campañas',
        icon: StarIcon,
        href: '/app/projects/create'
      },
      {
        title: 'Mis Campañas',
        icon: BarChartIcon,
        href: '/app/reports/dashboard'
        /* items:[ 

          {
            title: 'Registrar Campañas',
            icon: FolderIcon,
            href: '/app/reports/dashboard-registrar'
          }
        ] */
      }
      /*{
        title: 'Mi perfil',
        icon: UserIcon,
        href: '/app/reports/dashboard-alternative'
      }*/
    ]
  }
  /*{
    subheader: 'Management',
    items: [
      {
        title: 'Customers',
        icon: UsersIcon,
        href: '/app/management/customers',
        items: [
          {
            title: 'List Customers',
            href: '/app/management/customers'
          },
          {
            title: 'View Customer',
            href: '/app/management/customers/1'
          },
          {
            title: 'Edit Customer',
            href: '/app/management/customers/1/edit'
          }
        ]
      },
      {
        title: 'Products',
        icon: ShoppingCartIcon,
        href: '/app/management/products',
        items: [
          {
            title: 'List Products',
            href: '/app/management/products'
          },
          {
            title: 'Create Product',
            href: '/app/management/products/create'
          }
        ]
      },
      {
        title: 'Orders',
        icon: FolderIcon,
        href: '/app/management/orders',
        items: [
          {
            title: 'List Orders',
            href: '/app/management/orders'
          },
          {
            title: 'View Order',
            href: '/app/management/orders/1'
          }
        ]
      },
      {
        title: 'Invoices',
        icon: ReceiptIcon,
        href: '/app/management/invoices',
        items: [
          {
            title: 'List Invoices',
            href: '/app/management/invoices'
          },
          {
            title: 'View Invoice',
            href: '/app/management/invoices/1'
          }
        ]
      }
    ]
  },
  {
    subheader: 'Applications',
    items: [
      {
        title: 'Projects Platform',
        href: '/app/projects',
        icon: BriefcaseIcon,
        items: [
          {
            title: 'Overview',
            href: '/app/projects/overview'
          },
          {
            title: 'Browse Projects',
            href: '/app/events/browse'
          },
          {
            title: 'Create Project',
            href: '/app/projects/create'
          },
          {
            title: 'View Project',
            href: '/app/projects/1'
          }
        ]
      },
      {
        title: 'Social Platform',
        href: '/app/social',
        icon: ShareIcon,
        items: [
          {
            title: 'Profile',
            href: '/app/social/profile'
          },
          {
            title: 'Feed',
            href: '/app/social/feed'
          }
        ]
      },
      {
        title: 'Kanban',
        href: '/app/kanban',
        icon: TrelloIcon
      },
      {
        title: 'Mail',
        href: '/app/mail',
        icon: MailIcon
      },
      {
        title: 'Chat',
        href: '/app/chat',
        icon: MessageCircleIcon,
        info: () => (
          <Chip
            color="secondary"
            size="small"
            label="Updated"
          />
        )
      },
      {
        title: 'Calendar',
        href: '/app/calendar',
        icon: CalendarIcon,
        info: () => (
          <Chip
            color="secondary"
            size="small"
            label="Updated"
          />
        )
      }
    ]
  },
  {
    subheader: 'Auth',
    items: [
      {
        title: 'Login',
        href: '/login-unprotected',
        icon: LockIcon
      },
      {
        title: 'Register',
        href: '/register-unprotected',
        icon: UserPlusIcon
      }
    ]
  },
  {
    subheader: 'Pages',
    items: [
      {
        title: 'Account',
        href: '/app/account',
        icon: UserIcon
      },
      {
        title: 'Error',
        href: '/404',
        icon: AlertCircleIcon
      },
      {
        title: 'Pricing',
        href: '/pricing',
        icon: DollarSignIcon
      }
    ]
  },
  {
    subheader: 'Extra',
    items: [
      {
        title: 'Charts',
        href: '/app/extra/charts',
        icon: BarChartIcon,
        items: [
          {
            title: 'Apex Charts',
            href: '/app/extra/charts/apex'
          }
        ]
      },
      {
        title: 'Forms',
        href: '/app/extra/forms',
        icon: EditIcon,
        items: [
          {
            title: 'Formik',
            href: '/app/extra/forms/formik'
          },
          {
            title: 'Redux Forms',
            href: '/app/extra/forms/redux'
          },
        ]
      },
      {
        title: 'Editors',
        href: '/app/extra/editors',
        icon: LayoutIcon,
        items: [
          {
            title: 'DraftJS Editor',
            href: '/app/extra/editors/draft-js'
          },
          {
            title: 'Quill Editor',
            href: '/app/extra/editors/quill'
          }
        ]
      }
    ]
  }*/
];

function renderNavItems({ items, pathname, depth = 0 }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, pathname, depth }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({ acc, pathname, item, depth }) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={item.title}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  //const { user } = useAuth();
  const user = {
    name: localStorage.getItem('username'),
    avatar: avatar
  };

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Hidden lgUp>
          <Box p={2} display="flex" justifyContent="center">
            <RouterLink to="/">
              <Logo />
            </RouterLink>
          </Box>
        </Hidden>
        <Box p={2}>
          <Box display="flex" justifyContent="center">
            <RouterLink to="/app/account">
              <Avatar alt="User" className={classes.avatar} src={user.avatar} />
            </RouterLink>
          </Box>
          <Box mt={2} textAlign="center">
            <Link
              component={RouterLink}
              to="/app/account"
              variant="h5"
              color="textPrimary"
              underline="none"
            >
              {user.name}
            </Link>
            <Typography variant="body2" color="textSecondary"></Typography>
          </Box>
        </Box>
        <Divider />
        <Box p={2}>
          {sections.map(section => (
            <List
              key={section.subheader}
              subheader={
                <ListSubheader disableGutters disableSticky>
                  {section.subheader}
                </ListSubheader>
              }
            >
              {renderNavItems({
                items: section.items,
                pathname: location.pathname
              })}
            </List>
          ))}
        </Box>
        <Divider />
        <Box p={2}>
          <Box p={2} borderRadius="borderRadius" bgcolor="background.dark">
            <Typography variant="h5" color="textPrimary">
              Necesita ayuda?
            </Typography>
            <Link
              variant="subtitle1"
              color="secondary"
              component={RouterLink}
              to="/docs"
            >
              <Typography variant="body2" color="primary">
                Mire nuestra documentación
              </Typography>
            </Link>
          </Box>
        </Box>
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default NavBar;
