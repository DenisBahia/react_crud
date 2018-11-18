import React, {Component} from "react"
import Main from "../template/main"
import Axios from "axios"

const headerProps = {
    icon: "users",
    title: "Usuários",
    subtitle: "Cadastro de Usuários"
}

const baseUrl = "http://localhost:3001/users"
const initialState = {
    user: {name: "", email: ""},
    list: []
}

export default class UserCRUD extends Component {

    state = {...initialState}

    componentWillMount(){
        Axios(baseUrl).then(resp => {
            this.setState({list: resp.data})
        })  
    }

    clear(){
        this.setState({user: initialState.user, email: initialState.email})
    }

    save(){

        const user = this.state.user
        const method = user.id ? "put" : "post"
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        
        Axios[method](url, user).then(resp => {
            const list = this.getUpdatedList(resp.data)
            this.setState({user: initialState.user, email: initialState.email, list})
        })

    }

    updateField(event){
        const user = {... this.state.user}
        user[event.target.name] = event.target.value
        this.setState({user})
    }

    renderForm(){
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control" name="name" value={this.state.user.name}
                            onChange={e => this.updateField(e)} placeholder="Digite o Nome" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control" name="email" value={this.state.user.email}
                            onChange={e => this.updateField(e)} placeholder="Digite o Email" />
                        </div>
                    </div>
                </div>
                <hr></hr>
                <dir className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e => this.save(e)}>Salvar</button>
                        <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)}>Cancelar</button>
                    </div>
                </dir>
            </div>
        )
    }

    renderTable(){
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRow()}
                </tbody>
            </table>
        )
    }

    renderRow(){

        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning" onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2" onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })

    }

    load(user){
        this.setState({user})
    }

    remove(user){
        Axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.state.list.filter(u => u !== user)
            this.setState({list})
        })
    }

    getUpdatedList(user){
        //apenas troca posicao do user criado para que ele fique no inicio da lista
        const list = this.state.list.filter(u => u.id != user.id)
        list.unshift(user)
        return list
    }

    render(){
        console.log(this.state.list)
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }

}