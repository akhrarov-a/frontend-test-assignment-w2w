import classNames from 'classnames';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { hoc } from '@utils';
import { useStore } from '@store';
import { links } from './header.constants';
import styles from './header.module.scss';

/**
 * <Header />
 */
const Header = hoc.observer(useStore, ({ auth: { logout } }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.links}>
          {links.map(link => (
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                classNames(styles.link, {
                  [styles.link_active]: isActive
                })
              }
            >
              <p>{link.label}</p>
            </NavLink>
          ))}
        </div>
        <Button
          className={styles.logout}
          type='primary'
          onClick={() => logout(navigate)}
        >
          Выйти
        </Button>
      </div>
    </div>
  );
});

export { Header };
