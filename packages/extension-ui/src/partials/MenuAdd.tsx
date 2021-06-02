// Copyright 2021 @earthwallet/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ThemeProps } from '../types';

import { faFileExport, faFileUpload, faKey, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback } from 'react';
import styled from 'styled-components';

import { Link, Menu, MenuDivider, MenuItem } from '../components';
import useIsPopup from '../hooks/useIsPopup';
import useTranslation from '../hooks/useTranslation';
import { windowOpen } from '../messaging';

interface Props extends ThemeProps {
  className?: string;
  reference: React.MutableRefObject<null>;
}

const jsonPath = '/account/restore-json';

function MenuAdd ({ className, reference }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const isPopup = useIsPopup();

  const _openJson = useCallback(
    () => windowOpen(jsonPath)
    , []);

  return (
    <Menu
      className={className}
      reference={reference}
    >
      <MenuItem className='menuItem'>
        <Link to={'/account/create'}>
          <FontAwesomeIcon icon={faPlusCircle} />
          <span>{ t('Create new account')}</span>
        </Link>
      </MenuItem>
      <MenuDivider />
      <MenuItem className='menuItem'>
        <Link to={'/account/export-all'}>
          <FontAwesomeIcon icon={faFileExport} />
          <span>{t<string>('Export all accounts')}</span>
        </Link>
      </MenuItem>
      <MenuItem className='menuItem'>
        <Link to='/account/import-seed'>
          <FontAwesomeIcon icon={faKey} />
          <span>{t<string>('Import account from pre-existing seed')}</span>
        </Link>
      </MenuItem>
      <MenuItem className='menuItem'>
        <Link
          onClick={isPopup ? _openJson : undefined}
          to={isPopup ? undefined : jsonPath}
        >
          <FontAwesomeIcon icon={faFileUpload} />
          <span>{t<string>('Restore account from backup JSON file')}</span>
        </Link>
      </MenuItem>
    </Menu>
  );
}

export default React.memo(styled(MenuAdd)(({ theme }: Props) => `
  margin-top: 50px;
  right: 50px; // 24 + 18 + 8
  user-select: none;

  .menuItem {
    span:first-child {
      height: 20px;
      margin-right: 8px;
      opacity: 0.5;
      width: 20px;
    }

    span {
      vertical-align: middle;
    }

    .svg-inline--fa {
      color: ${theme.iconNeutralColor};
      margin-right: 0.3rem;
      width: 0.875em;
    }
  }
`));
