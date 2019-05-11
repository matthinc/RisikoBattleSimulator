import React from 'react';
import PropTypes from 'prop-types';

const Victory = ({ victory }) => {
    if (victory === 0) return null;
    if (victory === 1) {
        return (
            <div className="victory-attack">
                Attacker won!
            </div>
        );
    }
    if (victory === 2) {
        return (
            <div className="victory-defend">
                Defender won!
            </div>
        );
    }
    if (victory === 3) {
        return (
            <div className="victory-oot">
                Attacker ran out of troops!
            </div>
        );
    }
}

Victory.propTypes = {
    victory: PropTypes.oneOf([0,1,2]).isRequired    // 0: no victory, 1: attacker, 2: defender
}

export default Victory;