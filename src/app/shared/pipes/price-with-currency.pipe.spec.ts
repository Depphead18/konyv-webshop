import { PriceWithCurrencyPipe } from './price-with-currency.pipe';

describe('PriceWithCurrencyPipe', () => {
  it('create an instance', () => {
    const pipe = new PriceWithCurrencyPipe();
    expect(pipe).toBeTruthy();
  });
});
