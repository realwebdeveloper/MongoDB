import React from 'react';
import InputField from './InputField.jsx';


export default class InputForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            firstname: { value: '', valid: false },
            lastname: { value: '', valid: false },
        }
    }
    post = (data) => {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
            }
        })

        xhr.open("POST", "http://localhost:8080/api/people");
        xhr.setRequestHeader("accept", "application/json");
        xhr.send(JSON.stringify(data));
        
    }
    submit = () => {
        let state = this.state;
        let person = {};
        let valid = true;
        for (let prop in state){
            valid &= state[prop].valid;
            person[prop] = state[prop].value;
        }
        if (!valid){
            alert('All fields must be valid!');
        }
        else {
            this.post(person);
        }
    }
    handleChange = (variable, value, valid) => {
        this.setState({
            [variable]: { value: value, valid: valid }
        });
    }
    render() {
        const user = this.state;
        return (
            <div>
                <InputField
                    type='text'
                    variable='firstname'
                    label='Firstname'
                    value={this.state.firstname.value}
                    valid={this.state.firstname.valid}
                    validateList={[
                        { regExp: '^.{0,0}$', check: true, validateMessage: "your firstname can't be empty" },
                        { regExp: '(?:^| )[a-z]', check: true, validateMessage: "your firstname must be capitalized" }
                    ]}
                    handleChange={this.handleChange}
                ></InputField>
                <InputField
                    type='text'
                    variable='lastname'
                    label='Lastname'
                    value={this.state.lastname.value}
                    valid={this.state.lastname.valid}
                    validateList={[
                        { regExp: '^.{0,0}$', check: true, validateMessage: "your lastname can't be empty" },
                        { regExp: '(?:^| )[a-z]', check: true, validateMessage: "your lastname must be capitalized" }
                    ]}
                    handleChange={this.handleChange}
                ></InputField>
                <button onClick={this.submit}>Submit</button>
            </div>  
        );
    }
}