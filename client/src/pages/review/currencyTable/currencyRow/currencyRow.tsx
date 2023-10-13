import React from 'react';
import {ICurrency} from "../../../../store/currencySlice";
function CurrencyRow(item:ICurrency) {
    return (
        <tr key={item.value}>
            <td>{item.name}</td>
            <td>{item.rus}</td>
            <td>{item.value}</td>
        </tr>
    );
}

export default CurrencyRow;