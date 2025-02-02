// @ts-nocheck

import React, { useEffect, useState, useRef } from 'react';
import styles from './index.scss';
import { Link } from 'react-router-dom';
import Header from '~components/Header';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
//import bg_wallet_details from '~assets/images/bg_wallet_details.png';
import icon_rec from '~assets/images/icon_rec.svg';
import icon_send from '~assets/images/icon_send.svg';
import { getSymbol } from '~utils/common';
import clsx from 'clsx';
import { RouteComponentProps, withRouter } from 'react-router';
import { useSelector } from 'react-redux';
import { selectAccountById } from '~state/wallet';
import { getTransactions } from '@earthwallet/keyring';
import { useController } from '~hooks/useController';
import { selectBalanceByAddress } from '~state/wallet';
import { selectAssetBySymbol } from '~state/assets';

import { useHistory } from 'react-router-dom';
import ICON_NOTICE from '~assets/images/icon_notice.svg';
import { selectAssetsICPCountByAddress } from '~state/wallet';
import { ClipLoader } from 'react-spinners';
import ICON_GRID from '~assets/images/icon_grid.svg';
import ICON_LIST from '~assets/images/icon_list.svg';
import { selectAssetsICPByAddress } from '~state/wallet';
import Swiper from 'react-id-swiper';
import { getTokenCollectionInfo, getTokenImageURL } from '~global/nfts';
import { LIVE_SYMBOLS_OBJS } from '~global/constant';
import ICON_FORWARD from '~assets/images/icon_forward.svg';
import { AssetsList, AssetsCoverflow } from '../NFTList';
//import { selectAccountGroups, selectBalanceByAddress, selectGroupBalanceByAddress } from '~state/wallet';

interface Props extends RouteComponentProps<{ address: string }> {
}
interface keyable {
  [key: string]: any
}

const Wallet = ({
  match: {
    params: { address },
  },
}: Props) => {

  const controller = useController();


  const selectedAccount = useSelector(selectAccountById(address));
  const history = useHistory();


  const currentBalance: keyable = useSelector(selectBalanceByAddress(address));
  const currentUSDValue: keyable = useSelector(selectAssetBySymbol(getSymbol(selectedAccount?.symbol)?.coinGeckoId || ''));

  const [walletTransactions, setWalletTransactions] = useState<any>();
  const [nav, setNav] = useState('list');
  const [mainNav, setMainNav] = useState('tokens');




  useEffect(() => {
    const loadTransactions = async (address: string) => {
      const transactions = await getTransactions(address, selectedAccount?.symbol);
      setWalletTransactions(transactions);
    };


    if (selectedAccount && selectedAccount?.id) {
      controller.accounts
        .getBalancesOfAccount(selectedAccount)
        .then(() => {
        });
      loadTransactions(selectedAccount?.id);
    }
  }, [selectedAccount?.id === address]);

  return (
    <div className={styles.page}>
      <Header
        className={styles.header}
        showAccountsDropdown={selectedAccount?.symbol !== 'ICP_Ed25519'}
        showMenu
        type={'wallet'}
        selectedAccount={selectedAccount}
        backOverride={() => history.push('/home')}
      />
      <div>
        <div className={styles.nav}>
          <div
            onClick={() => setMainNav('tokens')}
            className={clsx(styles.tabnav,
              mainNav === 'tokens' && styles.tabnav_active)}>
            Tokens
          </div>
          <div
            onClick={() => setMainNav('nfts')}
            className={clsx(styles.tabnav,
              mainNav === 'nfts' && styles.tabnav_active)}
          >
            NFTs
          </div>
          <div onClick={() => setMainNav('apps')}
            className={clsx(styles.tabnav,
              mainNav === 'apps' && styles.tabnav_active)}>
            Apps
          </div>
          <div className={styles.layoutnav}>
            <img
              onClick={() => setNav('grid')}
              className={
                clsx(
                  styles.layoutnavicon,
                  nav === 'grid' && styles.layoutnavicon_active
                )}
              src={ICON_GRID} />
            <img
              onClick={() => setNav('list')}
              className={
                clsx(
                  styles.layoutnavicon,
                  nav === 'list' && styles.layoutnavicon_active
                )} src={ICON_LIST} />
          </div>
        </div>

        <div className={styles.tabsep}></div>
      </div>
      {mainNav === 'nfts' && <>
        {nav === 'grid' && <AssetsCoverflow address={address} />}
        {nav === 'list' && <AssetsList address={address} />}
      </>}

      {mainNav === 'tokens' && <>
        <div>
          {nav === 'grid' && <TokensGridflow address={address} />}
          {nav === 'list' && <TokensList address={address} />}
        </div>
        <div className={styles.tokenGrid}>
          <div className={clsx(styles.balanceInfo, nav === 'list' && styles.hidden)}>
            <div className={styles.primaryBalanceLabel}>
              {currentBalance?.loading ? (
                <SkeletonTheme color="#222" highlightColor="#000">
                  <Skeleton width={150} />
                </SkeletonTheme>
              ) : (
                <div className={styles.primaryBalanceLabel}>{currentBalance &&
                  `${currentBalance?.value / Math.pow(10, currentBalance?.currency?.decimals)} ${currentBalance?.currency?.symbol}`
                }</div>

              )}
            </div>
            <div className={styles.secondaryBalanceLabel}>
              {currentBalance?.loading ? (
                <SkeletonTheme color="#222" highlightColor="#000">
                  <Skeleton width={100} />
                </SkeletonTheme>
              ) : (
                <span className={styles.secondaryBalanceLabel}>${((currentBalance?.value / Math.pow(10, currentBalance?.currency?.decimals)) * parseFloat(currentUSDValue?.usd))?.toFixed(3)}</span>
              )}
            </div>
          </div>

          {selectedAccount?.symbol !== 'ICP_Ed25519' && <div className={styles.walletActionsView}>
            <div
              className={clsx(styles.tokenActionView, styles.receiveTokenAction)}
            >
              <Link className={styles.transactionsCont} to={"/account/receive/" + selectedAccount?.id}>
                <div className={styles.tokenActionButton}>
                  <img className={styles.iconActions} src={icon_rec} />
                  <div className={styles.tokenActionLabel}>Receive</div>
                </div>
              </Link>
            </div>

            <div className={clsx(styles.tokenActionView, styles.sendTokenAction)}>
              <Link className={styles.transactionsCont} to={"/account/send/" + selectedAccount?.id}>
                <div className={styles.tokenActionButton}>
                  <img className={styles.iconActions} src={icon_send} />
                  <div className={styles.tokenActionLabel}>Send</div>
                </div>
              </Link>
            </div>
          </div>}

          {selectedAccount?.symbol === 'ICP_Ed25519' && <div className={styles.walletNoSupportActionsView}>
            <div className={styles.noSupportText}>
              <img src={ICON_NOTICE} className={styles.noticeIcon}></img>
              Ed25519 address is no longer supported. Please import seed from Export</div>
            <div
              className={clsx(styles.tokenActionView, styles.receiveTokenAction)}
            >
              <Link className={styles.transactionsCont} to={"/account/export/" + selectedAccount?.id}>
                <div className={styles.tokenActionButton}>
                  <img className={clsx(styles.iconActions, styles.exportIcon)} src={icon_send} />
                  <div className={styles.tokenActionLabel}>Export</div>
                </div>
              </Link>
            </div>
          </div>}
        </div>
      </>
      }
      <Link
        className={clsx(styles.resetLink, styles.fixedBottom)}
        to={`/account/transactions/${selectedAccount?.id}`}
      >
        <div className={styles.assetsAndActivityDiv}>
          <div className={styles.tabsPill}></div>
          <div className={styles.tabsView}>
            <div
              className={clsx(
                styles.tabView,
                styles.selectedTabView
              )}
            >
              Transactions {walletTransactions?.total ? `(${walletTransactions?.total})` : ''}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
export const AssetsICPCount = ({ icpAddress }: { icpAddress: string }) => {
  const assetsObj: keyable = useSelector(selectAssetsICPCountByAddress(icpAddress));
  const history = useHistory();


  if (assetsObj?.count === 0 || assetsObj?.count === undefined) return <></>;

  return <div
    onClick={() => history.push('/account/assets/nftlist/' + icpAddress)}
    className={styles.assetsCont}><div className={styles.assetCount}>{assetsObj?.count === 0 ? '' : assetsObj?.count === 1 ? 'See Your 1 NFT' : `See Your ${assetsObj?.count} NFTs`}
      {assetsObj.loading && <span className={styles.assetCountLoading}><ClipLoader color={'#fffff'}
        size={12} />
      </span>}
    </div></div>
}


const TokensList = ({ address }: { address: string }) => {

  const history = useHistory();

  //const currentBalance: keyable = useSelector(selectGroupBalanceByAddress(account?.groupId));


  return (
    <div className={styles.tokensList}>
      <div className={styles.listHeader}>
        <div className={styles.listHeaderTitle}>Total Balance</div>
        <div className={styles.listHeaderSubtitle}>$209,092.22</div>
      </div>
      <div className={styles.listitemscont}>
        {LIVE_SYMBOLS_OBJS?.map((token, i: number) =>
          <div
            onClick={() => history.push('/th/' + address)}
            key={i}
            className={styles.listitem}>
            <img
              className={styles.listicon}
              src={token?.icon} >
            </img>
            <div className={styles.listinfo}>
              <div className={styles.listtitle}>{token?.name}</div>
            </div>
            <div
              className={styles.liststats}
            ><div className={styles.listprice}>{token?.symbol}</div>
              <div className={styles.listsubtitle}>$4,092.22</div>
            </div>
            <img
              className={styles.listforward}
              src={ICON_FORWARD}
            />
          </div>
        )}
      </div>
    </div>
  )
};



const TokensGridflow = ({ address }: { address: string }) => {
  const assets: keyable = useSelector(selectAssetsICPByAddress(address));

  const history = useHistory();
  const ref = useRef(null);

  const params = {
    grabCursor: true,
    centeredSlides: true,
    containerClass: "tokensswipercontainer",
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false
    },
    pagination: {
      el: '.swiper-pagination'
    }
  }
  console.log(ref?.current);

  console.log(ref?.current?.swiper);
  return (
    <Swiper
      ref={ref}
      effect={'coverflow'}
      slidesPerView={'auto'}
      {...params}>
      {LIVE_SYMBOLS_OBJS?.map((token, i: number) =>
        <div
          key={i}
          className={styles.imagecont}>
          <img
            key={i}
            className={styles.imageIcon}
            onClick={() => history.push(`/nftdetails/${token?.id}`)}
            src={token?.icon} >
          </img>
        </div>
      )}
    </Swiper>
  )
};


const BalanceWithUSD = ({ address }: { address: string }) => {
  const currentBalance: keyable = useSelector(selectBalanceByAddress(address));
  return <div className={styles.netlast}>
    <div className={styles.netstats}>${currentBalance?.balanceInUSD?.toFixed(3)}
      {
        currentBalance?.usd_24h_change && currentBalance?.balanceInUSD !== 0
        && <span className={currentBalance?.usd_24h_change > 0 ? styles.netstatspositive : styles.netstatsnegative}>{currentBalance?.usd_24h_change?.toFixed(2)}%</span>
      }
    </div>
  </div>
}

export default withRouter(Wallet);