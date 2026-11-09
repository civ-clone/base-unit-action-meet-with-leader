import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import Action from '@civ-clone/core-unit/Action';
import LeaderMet from './Rules/LeaderMet';
import Moved from '@civ-clone/core-unit/Rules/Moved';
import Player from '@civ-clone/core-player/Player';
import Tile from '@civ-clone/core-world/Tile';
import Unit from '@civ-clone/core-unit/Unit';

/** A Diplomat asks to meet `player()`'s leader. What follows is up to the `LeaderMet` rules. The Diplomat isn't used up. */
export class MeetWithLeader extends Action {
  private _player: Player;

  constructor(
    from: Tile,
    to: Tile,
    unit: Unit,
    player: Player,
    ruleRegistry: RuleRegistry = ruleRegistryInstance
  ) {
    super(from, to, unit, ruleRegistry);

    this._player = player;
  }

  player(): Player {
    return this._player;
  }

  // `Action.forUnit` rebuilds an action from `(from, to, unit, ruleRegistry)`, which would put the `RuleRegistry` where
  // the `Player` goes.
  forUnit(unit: Unit): MeetWithLeader {
    return new MeetWithLeader(
      this.from(),
      this.to(),
      unit,
      this._player,
      this.ruleRegistry()
    );
  }

  perform(): void {
    this.ruleRegistry().process(LeaderMet, this.unit(), this._player);

    this.ruleRegistry().process(Moved, this.unit(), this);
  }
}

export default MeetWithLeader;
