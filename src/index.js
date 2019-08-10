import React from 'react';
import ReactDOM from 'react-dom';


class HeaderInformation extends React.Component {
    render() {
        return <h2>Welcome React CRUD Operation</h2>;
    }
}

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editState: false,
            dataRecord: []
        }
    }

    onSubmitHandle(event) {
        event.preventDefault();
        this.setState({
            dataRecord: [...this.state.dataRecord, {
                id: Date.now(),
                name: event.target.name.value,
                address: event.target.address.value,
            }]
        });
        event.target.name.value = '';
        event.target.address.value = '';
    }

    onDeleteHandle() {
        let id = arguments[0];
        this.setState({
            dataRecord: this.state.dataRecord.filter(dr => {
                if (dr.id !== id) {
                    return dr;
                }
            })
        });
    }

    renderForm() {
        if (this.state.editState) {

            return (<form onSubmit={this.updateRecord.bind(this)}>
                <label>
                    Name: <input type="text" name="name" className="name" defaultValue={this.state.name}/>
                </label>
                <label>
                    Address: <input type="text" name="address" className="address" defaultValue={this.state.address}/>
                </label>
                <input type="submit" className="update-add-item" value="Update"/>
            </form>);
        } else {
            return (<form onSubmit={this.onSubmitHandle.bind(this)}>
                <label>
                    Name:
                </label>
                <label>
                    <input type="text" name="name" className="name"/>
                </label>
                <label>
                    Address:
                </label>
                <label>
                    <input type="text" name="address" className="address"/>
                </label>
                <input type="submit" className="btn-add-record" value="Add"/>
            </form>);
        }
    }

    updateRecord(event) {
        event.preventDefault();
        this.setState({
            dataRecord: this.state.dataRecord.map(dr => {
                if (dr.id === this.state.id) {
                    dr['name'] = event.target.name.value;
                    dr['address'] = event.target.address.value;
                    return dr;
                }
                return dr;
            })
        });

        this.setState({
            editState: false
        });
        event.target.name.value = '';
        event.target.address.value = '';
    }

    onEditHandle() {
        this.setState({
            editState: true,
            id: arguments[0],
            name: arguments[1],
            address: arguments[2]
        });
    }


    renderTableData() {
        return this.state.dataRecord.map((dr) => {
            const {id, name, address} = dr
            return (
                <tr key={id}>
                    <td>{name}</td>
                    <td>{address}</td>
                    <td>
                        <button onClick={this.onDeleteHandle.bind(this, id)}>Delete</button>
                        <button onClick={this.onEditHandle.bind(this, id, name, address)}>Edit</button>

                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <HeaderInformation/>
                {this.renderForm()}

                <table>
                    <tbody>
                    {this.renderTableData()}
                    </tbody>
                </table>

            </div>
        );
    }
}

ReactDOM.render(
    <Form/>
    , document.getElementById('root'));