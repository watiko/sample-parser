export abstract class AbstractParser {
  protected position: number = 0;
  private markers: number[] = [];

  abstract parse(input: string): void;

  protected mark(): void {
    this.markers.push(this.position);
  }

  protected release(): void {
    const current = this.markers.pop();
    if (current != undefined) {
      this.seek(current);
    }
  }

  private seek(position: number): void {
    this.position = position;
  }
}
