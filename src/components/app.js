import 'materialize-css/dist/css/materialize.min.css';
import React, {Component} from 'react';
import AddItem from './add_item';
import List from './list';
// import listData from '../data/list';
import axios from 'axios';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        };
        this.base_url = 'http://api.reactprototypes.com';
        this.api_key = '?key=c418keykey';
    }

    componentDidMount(){
        this.getListData();
    }

    // addItem(item){
        // this.setState({
        //     list: [item, ...this.state.list]
        // });

    // }

    async addItem(item){ 
       try {
            await axios.post(`${this.base_url}/todos${this.api_key}`, item);
            this.getListData();
       } catch(err) {
            console.log('Error adding item: ', err.response.data);
       }
    }

    // getListData(){
        //Using dummy data
        // this.setState({
        //     list: listData
        // });

        //Make call to server to get data
        // axios.get(`${this.base_url}/todos${this.api_key}`).then(resp => {
        //     console.log('Get Todos Response: ', resp.data.todos);
        //     this.setState({
        //         list: resp.data.todos
        //     })
        // }).catch(err => {
        //     console.log('Get todos error: ', err.message);
        // });
    // }

    async deleteItem(id){
        const resp = await axios.delete(`${this.base_url}/todos/${id+this.api_key}`);
        this.getListData();
    } 

    //Async await.  Have to include async and await words.  Biggest benefit makes code looks like it's executing in a line
    async getListData() {
        //try catch block
        try {
            const resp = await axios.get(`${this.base_url}/todos${this.api_key}`);
            this.setState({
                list: resp.data.todos
            });
        } catch (err) {
            console.log('Get Data Error:', err.message);
        }
    }

    render(){
        // console.log('App state: ', this.state);
        return (
            <div className='container'>
                <h1 className='center'>To Do List</h1>
                <AddItem add={this.addItem.bind(this)}/>
                <List data={this.state.list} delete={this.deleteItem.bind(this)}/>
            </div>
        )
    }
}

export default App;
