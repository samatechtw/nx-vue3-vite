import { parseTags } from './utils';

describe('utilities', () => {
  describe('parseTags()', () => {
    it('parses empty tag list', () => {
      const parsedEmpty = parseTags('');
      expect(parsedEmpty).toEqual([]);

      const parsedNull = parseTags(null);
      expect(parsedNull).toEqual([]);

      const parsedUndefined = parseTags(undefined);
      expect(parsedUndefined).toEqual([]);
    });

    it('parses tag list', () => {
      const parsedEmpty = parseTags('scope:test,type:util');
      expect(parsedEmpty).toEqual(['scope:test', 'type:util']);
    });
  });
});
