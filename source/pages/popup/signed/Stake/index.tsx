
import React, { useState } from 'react';
import styles from './index.scss';

import Header from '~components/Header';

import { RouteComponentProps, withRouter } from 'react-router';
import clsx from 'clsx';
//import ICON_EARTH from '~assets/images/icon-512.png';
import { useSelector } from 'react-redux';
import { selectTokenByTokenPair, selectTokensInfo, selectTokensInfoById } from '~state/token';
import NextStepButton from '~components/NextStepButton';
import { keyable } from '~scripts/Background/types/IMainController';

interface Props extends RouteComponentProps<{ address: string, tokenId: string }> {
}


const Stake = ({
  match: {
    params: { address, tokenId },
  },
}: Props) => {

  console.log(address);
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [selectedSecondAmount, setSelectedSecondAmount] = useState<number | undefined>(undefined);
  const [selectedToken, setSelectedToken] = useState<string>('');

  const [tab, setTab] = useState<number>(0);
  const tokenInfo = useSelector(selectTokensInfoById(tokenId));
  const tokenPair = useSelector(selectTokenByTokenPair(address + "_WITH_" + tokenId));
  const tokenInfos = useSelector(selectTokensInfo);
  const [open, setOpen] = useState<boolean>(false);

  console.log(tokenInfos);
  return (
    <div className={styles.page}>
      <Header
        type={'wallet'}
        text={'Stake EARTH'}
      ><div className={styles.empty} /></Header>

      <div className={styles.tabs}>
        <div
          onClick={() => setTab(0)}
          className={clsx(styles.tab, tab === 0 && styles.tab_active)}>
          Stake
        </div>
        <div
          onClick={() => setTab(1)}
          className={clsx(styles.tab, tab === 1 && styles.tab_active)}>
          Unstake
        </div>
      </div>
      <div className={styles.tabcont}>
        <div className={styles.label}>
          Available to Deposit
        </div>
        <div className={styles.inforow}>
          <div className={styles.infocolleft}>
            <div className={styles.eicon}>{tokenInfo?.name?.charAt(0)}
            </div>
            <div className={styles.symbol}>{tokenInfo.symbol}</div>
          </div>
          <div className={styles.infocolright}>{tokenPair.balance}</div>
        </div>
        <div className={styles.inforow}>
          <div className={styles.infocolleft}>
            <div className={styles.eicon}>{selectedToken == "" ? "?" : selectedToken.charAt(0)}
            </div>
            <div className={styles.symbol}>{selectedToken == "" ? "-" : selectedToken}</div>
          </div>
          <div className={styles.infocolright}>{selectedToken == "" ? "-" : tokenPair.balance}</div>
        </div>
        <div className={styles.inputCont}>
          <div className={styles.inputIcon}>
            <div className={styles.eicon}>{tokenInfo?.name?.charAt(0)}
            </div>
          </div>
          <input
            autoCapitalize='off'
            autoCorrect='off'
            autoFocus={false}
            className={clsx(styles.recipientAddress, styles.earthinput)}
            key={'price'}
            max="1.00"
            min="0.00"
            onChange={(e) => setSelectedAmount(parseFloat(e.target.value))}
            placeholder="amount upto 8 decimals"
            required
            step="0.001"
            type="number"
            value={selectedAmount}
          />
          <div className={styles.maxBtn}>Max</div>
        </div>
        <div className={styles.inputCont}>
          <div
            onClick={() => setOpen(true)}
            className={styles.inputIcon}>
            <div className={styles.eicon}>{selectedToken === "" ? "?" : selectedToken.charAt(0)}
            </div>
          </div>

          <input
            autoCapitalize='off'
            autoCorrect='off'
            autoFocus={false}
            className={clsx(styles.recipientAddress, styles.earthinput)}
            key={'price'}
            max="1.00"
            min="0.00"
            onChange={(e) => setSelectedSecondAmount(parseFloat(e.target.value))}
            placeholder={selectedToken == "" ? "Select Token Pair" : "amount upto 8 decimals"}
            required
            step="0.001"
            type="number"
            value={selectedSecondAmount}
          />
          <div className={styles.maxBtn}>Max</div>
          {open && <div className={styles.tokenOptions}>
            {tokenInfos.filter((token: keyable) => token.id !== tokenId).map((token: keyable) => <div
              onClick={() => {
                setSelectedToken(token.symbol);
                setOpen(false);
              }}
              key={token.id}
              className={clsx(styles.sinput, styles.selectDropdown, styles.selectDropdownOption)}>
              <div className={styles.eicon} >{token.symbol.charAt(0)}</div>
              <div className={styles.label}>{token.symbol}</div>
            </div>)}
          </div>}
        </div>
      </div>
      <div className={styles.statsCont}>
        <div className={styles.statsCol}>
          <div className={styles.statKey}>
            LP Fees
          </div>
          <div className={styles.statVal}>
            1%
          </div>
        </div>
        <div className={styles.statsCol}>
          <div className={styles.statKey}>
            Price
          </div>
          <div className={styles.statVal}>
            88
          </div>
          <div className={styles.statKey}>
            {tokenInfo.symbol}/{selectedToken || "?"}
          </div>
        </div>
        <div className={styles.statsCol}>
          <div className={styles.statKey}>
            LP Share
          </div>
          <div className={styles.statVal}>
            2%
          </div>
        </div>
      </div>
      {/* 
      <div className={styles.stats}>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.key}>Staked</div>
            <div className={styles.val}>0</div>
          </div>
          <div className={styles.col}>
            <div className={styles.key}>Next Reward Amount</div>
            <div className={styles.val}>0</div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.key}>Staked</div>
            <div className={styles.val}>0</div>
          </div>
          <div className={styles.col}>
            <div className={styles.key}>Next Reward Amount</div>
            <div className={styles.val}>0</div>
          </div>
        </div>
      </div> */}
      <div className={styles.nextCont}>
        <NextStepButton
          disabled={true}
          onClick={console.log}
        >
          {'Add Stake To Liquidity Pool'}
        </NextStepButton>
      </div>
    </div>
  );
};


export default withRouter(Stake);