/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';

import { connectWithMetamask, swapNFT } from '../data/contract';
import { oldTokenIds } from '../data/oldNFTs';

const SwapComp = ({ onNofity }) => {
  const [tokenID, setTokenId] = useState(0);
  const [isSwapping, setSwapping] = useState(false);

  const handleSwap = async () => {
    if (!oldTokenIds.includes(tokenID)) {
      onNofity('Invalid tokenID', false);
      return;
    }
    const acc = await connectWithMetamask();
    if (acc && tokenID !== '') {
      setSwapping(true);
      try {
        await swapNFT(acc, tokenID);
        onNofity('NFT swapped successfully', true);
      } catch (e) {
        onNofity('Not swapped. Errors occurred', false);
      }
      setSwapping(false);
    }
  };

  return (
    <>
      <p style={{ marginTop: '50px' }}>
        If you have old Phantz NFT, you can swap without paying fees.
      </p>
      <input
        style={{ color: 'black', width: '100%', backgroundColor: 'lightgrey' }}
        type='text'
        placeholder='Please type tokenId of your old NFT'
        value={tokenID}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <div
        onClick={handleSwap}
        disabled={isSwapping || tokenID === ''}
        className={`btn btn-mint btn-lg page-scroll ${
          isSwapping ? '' : 'btn-disabled'
        }`}
      >
        {isSwapping ? 'Swaping' : 'Swap'}
      </div>
    </>
  );
};

export default SwapComp;
