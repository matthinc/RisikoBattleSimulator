import React from 'react';
import PropTypes from 'prop-types';

const DiscreteSelect = ({ number, max, onChange }) => {
    return [...Array(max).keys()].map(current => {
        const sClass = number === (current + 1) ? "ds-selected" : "ds-unselected";
        return (
            <span
                onClick={() => onChange(current + 1)}
                key={current}
                className={sClass}>
                    {current + 1}
            </span>
        );
    });
}

DiscreteSelect.propTypes = {
    onChange : PropTypes.func.isRequired,
    number   : PropTypes.number.isRequired,
    max      : PropTypes.number.isRequired
}

export default DiscreteSelect;