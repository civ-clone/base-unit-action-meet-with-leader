"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetWithLeader = void 0;
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Action_1 = require("@civ-clone/core-unit/Action");
const LeaderMet_1 = require("./Rules/LeaderMet");
const Moved_1 = require("@civ-clone/core-unit/Rules/Moved");
/** A Diplomat asks to meet `player()`'s leader. What follows is up to the `LeaderMet` rules. The Diplomat isn't used up. */
class MeetWithLeader extends Action_1.default {
    constructor(from, to, unit, player, ruleRegistry = RuleRegistry_1.instance) {
        super(from, to, unit, ruleRegistry);
        this._player = player;
    }
    player() {
        return this._player;
    }
    // `Action.forUnit` rebuilds an action from `(from, to, unit, ruleRegistry)`, which would put the `RuleRegistry` where
    // the `Player` goes.
    forUnit(unit) {
        return new MeetWithLeader(this.from(), this.to(), unit, this._player, this.ruleRegistry());
    }
    perform() {
        this.ruleRegistry().process(LeaderMet_1.default, this.unit(), this._player);
        this.ruleRegistry().process(Moved_1.default, this.unit(), this);
    }
}
exports.MeetWithLeader = MeetWithLeader;
exports.default = MeetWithLeader;
//# sourceMappingURL=MeetWithLeader.js.map