
'use client'

import { 
  ConnectWallet, 
  Wallet, 
  WalletDropdown,
  WalletDropdownDisconnect 
} from '@coinbase/onchainkit/wallet'
import { 
  Identity, 
  Name, 
  Avatar, 
  Address, 
  EthBalance 
} from '@coinbase/onchainkit/identity'

interface WalletConnectButtonProps {
  onConnect?: (address: string) => void
}

export function WalletConnectButton({ onConnect }: WalletConnectButtonProps) {
  return (
    <Wallet className="w-full">
      <ConnectWallet className="btn-primary w-full">
        <Name className="text-inherit" />
      </ConnectWallet>
      <WalletDropdown>
        <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
          <Avatar />
          <Name />
          <Address />
          <EthBalance />
        </Identity>
        <WalletDropdownDisconnect />
      </WalletDropdown>
    </Wallet>
  )
}
