import React from 'react';
import InputForm from './InputForm.jsx';
import Table from './Table.jsx'

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            peopleList: []
        }
    }
    updatePeopleList = (data) => {
        this.setState({
            peopleList: data
        })
    }
    get = () => {
        let updatePeopleList = this.updatePeopleList;

        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                updatePeopleList(JSON.parse(this.responseText))
            }
        })

        xhr.open("GET", "http://localhost:8080/api/peopleList");
        xhr.setRequestHeader("accept", "application/json");
        xhr.send();

    }
    render() {
        return (
            <div>
                <InputForm></InputForm>
                <button
                    onClick = {this.get}
                >Get peopleList</button>
                <Table
                    list = {this.state.peopleList}
                >
                </Table>
            </div>
        );
    }
}