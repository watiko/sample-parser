import "mocha";
import assert = require("power-assert");

import { PositiveIntegerParser } from './positive-integer-parser';

describe('PositiveIntegerParser', () => {

  it('正常にパースできること', () => {
    const p = () => new PositiveIntegerParser();

    p().parse('0');
    p().parse('10');
    p().parse('128');
    p().parse('9');
    p().parse('9944');

    assert(true);
  })

});
