export interface IAccountsController {
  checkPassword: (pwd: string) => void;
  unlock: (pwd: string) => void;
  lock: (pwd: string) => void;
  createAccounts: (symbols: string[]) => Promise<void>;
  createAccount: (
    mnemonic: string,
    symbol: string,
    name: string,
    password: string
  ) => Promise<void>;
  createNewMnemonic: () => Promise<void>;
}
