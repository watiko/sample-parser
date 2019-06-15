import { AbstractParser, ParseError } from '../parser';

/**
 * positiveInteger -> zero | nonZeroDigit {digit}
 * digit           -> zero | nonZeroDigit
 * zero            -> '0'
 * nonZeroDigit    -> '1' | '2' | ... | '9'
*/
export class PositiveIntegerParser extends AbstractParser {
  private input!: string;

  private get currentChar(): string {
    return this.input[this.position];
  }

  private get isPositionExceeded(): boolean {
    return this.position >= this.input.length;
  }

  parse(input: string): void {
    this.input = input;

    this.positiveInteger();

    if (this.position != input.length) {
      throw new ParseError(`消費していない文字が残っています: ${input.substring(this.position)}`);
    }
  };

  private accept(char: string): string {
    if (!this.isPositionExceeded && char === this.currentChar) {
      this.position++;
      return char;
    }

    if (this.isPositionExceeded) {
      throw new ParseError('入力文字列の長さを超えた個所のチェックを行っています');
    }
    if (char !== this.currentChar) {
      throw new ParseError(`現在の文字は ${char} ではなく ${this.currentChar}です`);
    }
    throw new ParseError('予期せぬエラー');
  }

  private positiveInteger(): void {
    try {
      this.mark();
      return this.zero();
    } catch (e) {
      this.release();

      this.nonZeroDigit();
      while (true) {
        try {
          this.mark();
          this.digit();
        } catch (e) {
          this.release();
          return; // 失敗したら終了
        }
      }
    }
  }

  private digit(): void {
    try {
      this.mark();
      return this.zero();
    } catch (e) {
      this.release();

      this.nonZeroDigit()
    }
  }

  private zero(): void {
    this.accept('0');
  }

  private nonZeroDigit(): void {
    for (let i = 1; i <= 9; i++) {
      try {
        this.mark();
        return void this.accept(i.toString());
      } catch (e) {
        this.release();

        if (i === 9) {
          throw new ParseError(`現在の文字 ${this.currentChar} は[1-9]ではありません`);
        } else {
          continue;
        }
      }
    }
  }
}
