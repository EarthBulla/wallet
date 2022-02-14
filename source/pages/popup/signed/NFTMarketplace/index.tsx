import React from 'react';
import MarketplaceCard from '~components/MarketplaceCard';
import styles from "./index.scss";
//import img from "~assets/images/marketplaceImg.svg";
import Header from '~components/Header';
import { LIVE_ICP_NFT_LIST } from '~global/nfts';
import { keyable } from '~scripts/Background/types/IMainController';
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAssetBySymbol, selectStatsOfCollections } from '~state/assets';
import { getSymbol } from '~utils/common';
import millify from "millify";


interface Props extends RouteComponentProps<{ address: string }> {
    className?: string;
}

const NFTMarketplace = ({
    match: {
        params: {
            address,
        },
    },
}: Props) => {
    const history = useHistory();
    const LIVE_NFTS_WITH_STATS = useSelector(selectStatsOfCollections(LIVE_ICP_NFT_LIST));
    const currentUSDValue: keyable = useSelector(selectAssetBySymbol(getSymbol("ICP")?.coinGeckoId || ''));
    return (
        <div className={styles.page}>
            <Header
                className={styles.header}
                showMenu
                type={'wallet'}
                text={'💎  Explore NFTs'}
            ><div className={styles.empty} /></Header>
            <div className={styles.mainContainer}>
                {LIVE_NFTS_WITH_STATS
                    .sort((a: keyable, b: keyable) => a.order - b.order)
                    .sort((a: keyable, b: keyable) => b.total - a.total)
                    .map((nftObj: keyable) => <div
                        key={nftObj.id}
                        className={styles.nft}
                        onClick={() => history.push(`/nft/collection/${nftObj.id}?address=${address}`)}
                    >
                        <MarketplaceCard
                            price={nftObj?.floor ? millify(nftObj?.floor * currentUSDValue?.usd, {
                                precision: 2,
                                lowercase: true
                            }) : '-'}
                            volPrice={nftObj.total ? millify(nftObj?.total * currentUSDValue?.usd, {
                                precision: 2,
                                lowercase: true
                            }) : '-'}
                            id={nftObj.id}
                            img={nftObj.icon}
                            text={nftObj.name}
                        /></div>)}
            </div>
        </div>
    )
}

export default withRouter(NFTMarketplace)
