import React from 'react';
import PropTypes from 'prop-types';
import Dice from './Dice';

const DiceList = ({ attacker, numbers }) => {
    return numbers.map((dice, index) => {
        return (
            <Dice
                attacker={attacker}
                number={dice}
                key={index} />
        );
    })
}

DiceList.propTypes = {
    attacker : PropTypes.bool.isRequired,
    numbers  : PropTypes.array.isRequired
}

export default DiceList;