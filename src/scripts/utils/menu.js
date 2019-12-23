import ext from "./ext"

export const MENU_CHILD = 'ae-child'
export const MENU_PARENT = 'ae-parent'

export const AETERNAL_URL = 'https://mainnet.aeternal.io/middleware'
export const NODE_URL = 'https://mainnet.aeternal.io/v2'

// Menu items schema (build and validate)
export const MENU_ITEMS = {
  ['ak']: {
    validate: (accountId) => true,
    build: (accountId) => [
      { title: 'Get all transactions for this account', url: `${AETERNAL_URL}/transactions/account/${accountId}` },
      { title: 'Get all name bids for this account', url: `${AETERNAL_URL}/names/auctions/bids/account/${accountId}` },
    ]
  },
  ['nm']: {
    validate: (nameHash) => true,
    build: (nameHash) => [
      { title: 'Info for this name', url: `${AETERNAL_URL}/names/hash/${nameHash}` },
      { title: 'Reverse pointers for this name', url: `${AETERNAL_URL}/names/reverse/${nameHash}` },
    ]
  },
  ['ct']: {
    validate: (contractId) => true,
    build: (contractId) => [
      { title: 'Show contract', url: `${NODE_URL}/contracts/${contractId}` },
      { title: 'Contract code', url: `${NODE_URL}/contracts/${contractId}/code` },
      { title: 'Contract POI', url: `${NODE_URL}/contracts/${contractId}/poi` },
      { title: 'Contract Store', url: `${NODE_URL}/contracts/${contractId}/store` },
      { title: 'Transactions for contract address', url: `${AETERNAL_URL}/contracts/transactions/address/${contractId}` },
      { title: 'Contract creation transaction', url: `${AETERNAL_URL}/contracts/creation/address/${contractId}` },
      { title: 'Calls to this contract', url: `${AETERNAL_URL}/contracts/calls/address/${contractId}` },
    ]
  },
   ['mh']: {
     validate: (mbHash) => true,
     build: (mbHash) => [
       { title: 'Transactions in micro block', url: `${NODE_URL}/micro-blocks/hash/${mbHash}/transactions` },
       { title: 'Micro block header', url: `${NODE_URL}/micro-blocks/hash/${mbHash}/header` },
       { title: 'Transaction count in micro block', url: `${NODE_URL}/micro-blocks/hash/${mbHash}/transactions/count` },
     ]
   },
   ['kh']: {
     validate: (kbHash) => true,
     build: (kbHash) => [
       { title: 'Show generation', url: `${NODE_URL}/generations/hash/${kbHash}` },
       { title: 'Key block', url: `${NODE_URL}/key-blocks/hash/${kbHash}` },
     ]
   },
   ['th']: {
     validate: (txHash) => true,
     build: (txHash) => [
       { title: 'View transaction', url: `${NODE_URL}/transactions/${txHash}` },
       { title: 'Transaction info', url: `${NODE_URL}/transactions/${txHash}/info` },
     ]
   }
}


// Go to url
export const goTo = (url, tab) => {
  ext.tabs.update(tab.id, { url })
}

// Clear all menu items created by extension
export const clearMenu = (cb) => {
  ext.contextMenus.removeAll(cb)
}

// Generate Menu items
export const generateMenuItems = (selection) => {
  // Clear all items
  clearMenu(() => {
    const [prefix,] = selection.split('_')
    if (!prefix || !MENU_ITEMS[prefix]) return

    // Validate selection
    if (MENU_ITEMS[prefix].validate(selection)) {
      // Parent Item
      ext.contextMenus.create(
        {
          'id': MENU_PARENT,
          'enabled': true,
          'title': 'AEternal',
          "contexts": ["all"]
        },
        // Created callback
        () => {
          // Generate sub items
          MENU_ITEMS[prefix]
            .build(selection)
            .forEach(
              ({ title, url }, i) => ext.contextMenus.create({
                title,
                parentId: MENU_PARENT,
                id: `${MENU_CHILD}_${i}`,
                enabled: true,
                contexts: ['all'],
                onclick: (params, tab) => goTo(url, tab)
              })
            )
        }
      )
    }
  })
}
