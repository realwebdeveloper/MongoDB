import React from 'react'

export default class inputField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validateMessage: ''
        }
    }
    validate = (value) => {
        let validateList = this.props.validateList;
        for (let i = 0; i < validateList.length; ++i) {
            let RegularExp = new RegExp(validateList[i].regExp);
            if (RegularExp.test(value) === validateList[i].check) return validateList[i].validateMessage;
        }
        return 'Valid Input';
    }
    handleInputChange = (event) => {
        let newValue = event.target.value;
        newValue = newValue.split(" ").filter(function (w) { return w != "" }).join(' ');

        let validateMessage = this.validate(newValue);
        this.setState({
            validateMessage: validateMessage
        }, this.props.handleChange(this.props.variable, newValue, (this.state.validateMessage === 'Valid Input')));
    }
    render() {
        let props = this.props;
        let state = this.state;
        return (
            <div>
                <div>
                    <p>{props.label} :</p>
                </div>
                <div>
                    <input
                        type={props.type}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputChange}
                        value={props.value}
                    ></input>
                    <div>
                        {(state.validateMessage != '') &&
                            <p>
                                {state.validateMessage}
                            </p>
                        }
                    </div>
                </div>
            </div>
        );
    }
}