import React from 'react'
import Select from 'react-select'

function LevelSelector() {

    const options = [
        {value: 'chocolate', label: 'Chocolate'},
        {value: 'strawberry', label: 'Strawberry'},
        {value: 'vanilla', label: 'Vanilla'}
    ]



    return ( <div>
        <Select options={options} style={{}} />
        <br/>
    </div>);
}

export default LevelSelector