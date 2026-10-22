export class MazeElement {
  public static createCharacter(): MazeElement {
    return { character: true, empty: false, goal: false };
  }

  public static createEmpty(): MazeElement {
    return { character: false, empty: true, goal: false };
  }

  public static createGoal(): MazeElement {
    return { character: false, empty: false, goal: true };
  }

  public readonly character: boolean;
  public readonly empty: boolean;
  public readonly goal: boolean;
  constructor(character: boolean, empty: boolean, goal: boolean) {
    this.character = character;
    this.empty = empty;
    this.goal = goal;
  }
}
