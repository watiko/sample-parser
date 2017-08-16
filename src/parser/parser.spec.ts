import "mocha";
import assert = require("power-assert");

import { Parser } from './parser';

class TestParser extends Parser {
  set position(p: number) {
    super.position = p;
  }
  get position(): number {
    return super.position;
  }
  _mark = super.mark;
  _release = super.release;
}

describe("Parser", ()=> {

  it("markで保持した位置にreleaseで戻ること", () => {
    const p = new TestParser();
    const ps = [100, 101];

    p.position = ps[0];
    p._mark();
    p.position = ps[1];
    p._release();

    assert(p.position === ps[0]);
  });

  it("markで保持した位置にreleaseで戻ることっていうのが入れ子でできること", () => {
    const p = new TestParser();
    const ps = [100, 101, 110];

    p.position = ps[0];
    p._mark();
    p.position = ps[1];
    p._mark();
    p.position = ps[2];
    p._mark();

    assert(p.position === ps[2]);
    p._release();
    assert(p.position === ps[2]);
    p._release();
    assert(p.position === ps[1]);
    p._release();
    assert(p.position === ps[0]);
  });

});
