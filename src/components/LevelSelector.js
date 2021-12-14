import React from 'react'
import Select from 'react-select'

const options = [
    {value: 10, label: 'Facile'},
    {value: 8, label: 'Normal'},
    {value: 6, label: 'Difficile'}
]


class LevelSelector extends React.Component {
    state = {
        selectedOption: options[1],
    };
    handleChange = (selectedOption) => {
        this.setState({selectedOption});
        console.log(`Option selected:`, selectedOption);

    };

    render() {
        const {selectedOption} = this.state;

        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
            />
        );
    }
}

function Selector() {
    return (<LevelSelector/>)
}

export default Selector;
