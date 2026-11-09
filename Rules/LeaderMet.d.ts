import Player from '@civ-clone/core-player/Player';
import Rule from '@civ-clone/core-rule/Rule';
import Unit from '@civ-clone/core-unit/Unit';
/** Processed when a Diplomat (`Unit`) meets `Player`'s leader. */
export declare class LeaderMet extends Rule<[Unit, Player], void> {}
export default LeaderMet;
