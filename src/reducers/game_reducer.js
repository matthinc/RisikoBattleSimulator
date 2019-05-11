import update from 'immutability-helper';
import { isNumber } from 'util';

const SET_INITIAL_ATTACK_TROOPS = 'SET_INITIAL_ATTACK_TROOPS';
const SET_INITIAL_DEFEND_TROOPS = 'SET_INITIAL_DEFEND_TROOPS';
const SET_ATTACK_TROOPS = 'SET_ATTACK_TROOPS';
const SET_DEFEND_TROOPS = 'SET_DEFEND_TROOPS';
const ATTACK = 'ATTACK';
const RESET = 'RESET';

/////////////////////////////////
//////////// Actions ////////////
/////////////////////////////////

export function setInitialAttackTroops(troops) {
    if (!/^[0-9]*$/.test(troops)) troops = 2;
    return {
        type: SET_INITIAL_ATTACK_TROOPS,
        troops: troops
    }
}

export function setInitialDefendTroops(troops) {
    if (!/^[0-9]*$/.test(troops)) troops = 2;
    return {
        type: SET_INITIAL_DEFEND_TROOPS,
        troops: troops
    }
}

export function setAttackTroops(troops) {
    return {
        type: SET_ATTACK_TROOPS,
        troops: troops
    }
}

export function setDefendTroops(troops) {
    return {
        type: SET_DEFEND_TROOPS,
        troops: troops
    }
}


export function attack() {
    return {
        type: ATTACK
    }
}

export function reset() {
    return {
        type: RESET
    }
}

/////////////////////////////////
///////// Initial state /////////
/////////////////////////////////

const initialState = {
    initial_troops_attacker: 2,
    initial_troops_defender: 1,
    max_attack_troops: 1,
    max_defend_troops: 1,
    attack_troops: 1,
    defend_troops: 1,
    attacks: [],
    locked: false,
    victory: 0 // 1: Attacker, 2: Defender, 3: out of troops
};

/////////////////////////////////
//////////// Reducer ////////////
/////////////////////////////////

export default function (state, action) {
    if (!state) {
        return initialState;
    }
    switch (action.type) {
        case SET_ATTACK_TROOPS: {
            return {
                ...state,
                attack_troops: action.troops
            }
        }
        case SET_DEFEND_TROOPS: {
            return {
                ...state,
                defend_troops: action.troops
            }
        }
        case SET_INITIAL_ATTACK_TROOPS: {
            let attack_troops = state.attack_troops;
            if (state.attack_troops > action.troops -1) {
                attack_troops =1;
            }
            return {
                ...state,
                initial_troops_attacker: action.troops,
                max_attack_troops: Math.min(2, (action.troops ? action.troops -1 : 1)),
                attack_troops
            };
        }
        case SET_INITIAL_DEFEND_TROOPS: {
            let defend_troops = state.defend_troops;
            if (state.defend_troops > action.troops) {
                defend_troops = 1;
            }
            return {
                ...state,
                initial_troops_defender: action.troops,
                max_defend_troops: Math.min(3, (action.troops ? action.troops : 1)),
                defend_troops
            };
        }
        case RESET: {
            return initialState;
        }
        case ATTACK: {
            const dices_attack = [...Array(state.attack_troops)]
                .map(item => Math.floor(Math.random() * 6) + 1)
                .sort((a,b) => a < b)

            const dices_defend = [...Array(state.defend_troops)]
                .map(item => Math.floor(Math.random() * 6) + 1)
                .sort((a,b) => a < b)

            let losses_attack = 0;
            let losses_defend = 0;

            // The fight!!!
            let current_defend_index = 0;
            dices_attack.forEach((item) => {
                if (!dices_defend[current_defend_index]) return;
                if (dices_defend[current_defend_index] >= item) {
                    // Attack failed
                    losses_attack++;
                    current_defend_index++;
                } else {
                    // Attack successful
                    losses_defend++;
                    current_defend_index++;
                }
            });

            const initial_troops_attacker = state.initial_troops_attacker - losses_attack;
            const initial_troops_defender = state.initial_troops_defender - losses_defend;
            const max_defend_troops = Math.min(3, initial_troops_defender);
            const max_attack_troops = Math.min(2, initial_troops_attacker - 1);

            let attack_troops = state.attack_troops;
            if (attack_troops > max_attack_troops) attack_troops = max_attack_troops;

            let defend_troops = state.defend_troops;
            if (defend_troops > max_defend_troops) defend_troops = max_defend_troops;

            let victory = 0;

            if (initial_troops_attacker === 1) {
                victory = 3;
            } 

            if (initial_troops_defender === 0) {
                victory = 1;
            } else if (initial_troops_attacker === 0) {
                victory = 2;
            }

            // console.log({
            //     losses_attack, losses_defend
            // });

            return {
                ...state,
                locked: true,
                initial_troops_attacker,
                initial_troops_defender,
                max_defend_troops,
                max_attack_troops,
                attack_troops,
                defend_troops,

                victory,

                attacks: update(state.attacks, {
                    $unshift: [{
                        losses_attack,
                        losses_defend,
                        dices_defend,
                        dices_attack
                    }]
                })
            };
        }
    }
}