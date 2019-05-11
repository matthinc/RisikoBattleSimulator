import React from 'react';
import PropTypes from 'prop-types';

const Dice = ({ attacker, number }) => {
    const background = attacker ? '#ff0000' : '#000000';
    return (
        <span className="dice" style={{ background }}>
            <img src={`static/d-${number}.svg`}></img>
        </span>
    );
}

Dice.propTypes = {
    attacker : PropTypes.bool.isRequired,
    number   : PropTypes.oneOf([1,2,3,4,5,6]).isRequired
}

export default Dice;