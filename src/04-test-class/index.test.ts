// Uncomment the code below and write your tests
import { getBankAccount, InsufficientFundsError, TransferFailedError, SynchronizationFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 50;
    const account = getBankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 50;
    const withdrawMoney = 100;
    const account = getBankAccount(initialBalance);
    expect(() => account.withdraw(withdrawMoney)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 50;
    const transferringMoney = 100;
    const accountOrigin = getBankAccount(initialBalance);
    const accountOptional = getBankAccount(0)
    expect(() => accountOrigin.transfer(transferringMoney, accountOptional)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 50;
    const transferringMoney = 100;
    const accountOrigin = getBankAccount(initialBalance);
    //const accountOptional = getBankAccount(0)
    expect(() => accountOrigin.transfer(transferringMoney, accountOrigin)).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const initialBalance = 50;
    const account = getBankAccount(initialBalance);
    const  amountToDeposit = 25;
    account.deposit(amountToDeposit);
    expect(account.getBalance()).toBe(initialBalance + amountToDeposit);
  });

  test('should withdraw money', () => {
    const initialBalance = 50;
    const account = getBankAccount(initialBalance);
    const  amountToWithdraw = 25;
    account.withdraw(amountToWithdraw);
    expect(account.getBalance()).toBe(initialBalance - amountToWithdraw);
  });

  test('should transfer money', () => {
    const initialBalance = 50;
    const transferringMoney = 25;
    const accountOrigin = getBankAccount(initialBalance);
    const accountOptional = getBankAccount(0)
    accountOrigin.transfer(transferringMoney, accountOptional)
    expect(accountOrigin.getBalance()).toBe(25);
    expect(accountOptional.getBalance()).toBe(25);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const initialBalance = 50;
    const account = getBankAccount(initialBalance);
    const balance = await account.fetchBalance();
    if (balance == null) {
      expect(balance).toBe(null);
    } else {
      expect(typeof balance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 50;
    const account = getBankAccount(initialBalance)
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(initialBalance);
    
    await account.synchronizeBalance();
    expect(account.getBalance()).toEqual(initialBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initialBalance = 50;
    const account = getBankAccount(initialBalance);
  
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
  
    await expect(account.synchronizeBalance()).rejects.toThrowError(SynchronizationFailedError);
  });
  
});
