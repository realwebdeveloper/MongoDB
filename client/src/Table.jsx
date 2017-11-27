import React from 'react';

export default class Table extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    render() {
        const list = this.props.list;
        return (
            <div>
                {(list.length > 0) &&
                    <table>
                        <thead>
                            <th>Firstname</th>
                            <th>Lastname</th>
                        </thead>
                        <tbody>
                            {
                                list.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{item.firstname}</td>
                                            <td>{item.lastname}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                }
            </div>
        );
    }
}