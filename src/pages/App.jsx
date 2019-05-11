import React from 'react';
import PropTypes from 'prop-types';
import DiscreteSelect from '../components/DiscreteSelect';
import { connect } from 'react-redux';
import { 
    setAttackTroops,
    setDefendTroops,
    setInitialDefendTroops,
    setInitialAttackTroops,
    attack,
    reset
} from '../reducers/game_reducer';
import DiceList from '../components/DiceList';
import Victory from '../components/Victory';

class App extends React.Component {
    get canAttack () {
        return this.props.initial_troops_attacker > 1 && this.props.initial_troops_defender > 0;
    }

    renderAttacks () {
        return this.props.attacks.map((attack, index) => {
            const losses_attack = attack.losses_attack !== 0 ? '-' + attack.losses_attack : '--';
            const losses_defend = attack.losses_defend !== 0 ? '-' + attack.losses_defend : '--';
            return (
                <div key={index} className="row mt-3">
                    <div className="col-md-6">
                        <DiceList attacker={true} numbers={attack.dices_attack} />
                        <DiceList attacker={false} numbers={attack.dices_defend} />
                    </div>
                    <div className="col-md-3">
                        <div>Attacker</div>
                        <span className="loss">{losses_attack}</span>
                    </div>
                    <div className="col-md-3">
                        <div>Defender</div>
                        <span className="loss">{losses_defend}</span>
                    </div>
                </div>
            );
        });
    }

    render () {
        return [
            <Victory victory={this.props.victory} />,
            (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <img className="frac-img" src="static/attack.svg"></img>
                        <div>Troops</div>
                        <input
                            disabled={this.props.locked}
                            value={this.props.initial_troops_attacker}
                            onChange={e => this.props.setInitialAttackTroops(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <img className="frac-img" src="static/protec.svg"></img>
                        <div>Troops</div>
                        <input
                            disabled={this.props.locked}
                            value={this.props.initial_troops_defender}
                            onChange={e => this.props.setInitialDefendTroops(e.target.value)}
                        />
                    </div>
                </div>
                <hr />
                <div className="row mt-2">
                    <div className="col-md-6">
                        <div>Attack with</div>
                        <DiscreteSelect
                            max={this.props.max_attack_troops}
                            number={this.props.attack_troops}
                            onChange={val => this.props.setAttackTroops(val)}
                        />
                    </div>
                    <div className="col-md-6">
                        <div>Defend with</div>
                        <DiscreteSelect
                            max={this.props.max_defend_troops}
                            number={this.props.defend_troops}
                            onChange={val => this.props.setDefendTroops(val)}
                        />
                    </div>
                </div>
                <hr />
                <div className="row mt-2">
                    <div className="col-md-12">
                        <button
                            className="mb-3"
                            onClick={this.props.reset.bind(this)}>
                            Reset
                        </button>
                        <button
                            disabled={this.props.victory !== 0 || !this.canAttack}
                            onClick={this.props.attack.bind(this)}>
                            Attack
                        </button>
                    </div>
                </div>
                {this.renderAttacks()}
            </div>
            )
        ];
    }
}

App.propTypes = {
    initial_troops_attacker: PropTypes.number,
    initial_troops_defender: PropTypes.number,
    max_attack_troops: PropTypes.number,
    max_defend_troops: PropTypes.number,
    attack_troops: PropTypes.number,
    defend_troops: PropTypes.number,
    locked: PropTypes.bool,
    attacks: PropTypes.array,
    victory: PropTypes.number
};

function mapStateToProps(store) {
    return store;
}

function mapDispatchToProps(dispatch) {
    return {
        setInitialAttackTroops: (troops) => dispatch(setInitialAttackTroops(troops)),
        setInitialDefendTroops: (troops) => dispatch(setInitialDefendTroops(troops)),
        setAttackTroops: (troops) => dispatch(setAttackTroops(troops)),
        setDefendTroops: (troops) => dispatch(setDefendTroops(troops)),
        attack: () => dispatch(attack()),
        reset: () => dispatch(reset())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);