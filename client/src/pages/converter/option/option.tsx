import React from 'react';
import {IOption} from "../../../utils/IProps/ICurrencyItem";

function Option({name,rus}:IOption) {
    return (
        <option value={name}>{rus}</option>
    );
}

export default Option;