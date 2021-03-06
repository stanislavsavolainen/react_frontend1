
// ./node_modules/.bin/webpack -d 

//react

import React from 'react';
import { render } from 'react-dom';

//material-ui
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';

import Table, {
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
} from 'material-ui/Table';


//redux
import { createAction, createReducer } from 'redux-act';

import reduxApi from 'redux-api';
import thunk from 'redux-thunk'; //for midleware -> redux-api
import adapterFetch from 'redux-api/lib/adapters/fetch';

import { connect, Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';

//======== redux api reducers ==============

const page_url = "http://127.0.0.1:5659";

const rest = reduxApi({
    book: {
        url: `${page_url}/book`,
        options: {
            method: 'post',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json'
            },
        },
        transformer(data, prevData) {
            console.log("transformer called")
            return { serverReply: data };
        }

        //...
    },
    car: {
        url: `${page_url}/car`,
        options: {
            method: 'post',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json'
            },
        },
        transformer(data, prevData) {
            console.log("transformer called")
            return { serverReply: data };
        }

        //...
    },
    dvd: {
        url: `${page_url}/dvd`,
        options: {
            method: 'post',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json'
            },
        },
        transformer(data, prevData) {
            console.log("transformer called")
            return { serverReply: data };
        }

        //...
    },
    savedata1: {
        url: `${page_url}/save_to_database1`,
        options: {
            method: 'post',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json'
            },
        },
        transformer(data, prevData) {
            console.log("transformer called")
            return { serverReply: data };
        }

        //...
    },



}).use('fetch', adapterFetch(fetch));

//---------------------------------------------

const initialState = {
    textFieldValue: 'not defined'
};

const reduxAction1 = createAction("myframework-redux_action1");

const reducer = createReducer(

    //function parameter 1 (action)
    {
        //-----
        [reduxAction1]: (state, modifiedValue) => {

            return ({
                textFieldValue: modifiedValue
            })
        },
    },
    //function parameter 2 (initialState)
    initialState

);


//const store = createStore(reducer);
const redux_store = createStore(combineReducers({ ...rest.reducers, textFieldReducer: reducer }), undefined, applyMiddleware(thunk));

const mapStateToProps = state => ({
    server_answer1: state.book.data,
    server_answer2: state.car.data,
    server_answer3: state.dvd.data

});

const mapDispatchToProps = (dispatch) => ({

    buttonListener1() {
        console.log("Buy book");
        let postBody = { check: 'book' }; //value from props, check mapStateToProps
        dispatch(rest.actions.book({}, { body: JSON.stringify(postBody) }));
    },

    buttonListener2() {
        console.log("Buy car");
        let postBody = { check: 'car' }; //value from props, check mapStateToProps
        dispatch(rest.actions.car({}, { body: JSON.stringify(postBody) }));
    },

    buttonListener3() {
        console.log("buy DVD-R");
        let postBody = { check: 'dvd' }; //value from props, check mapStateToProps
        dispatch(rest.actions.dvd({}, { body: JSON.stringify(postBody) }));
    },

    savedatatodb1() {
        let postBody = { value_a: 'client_a', value_b: 'client_b' }; //value from props, check mapStateToProps
        dispatch(rest.actions.savedata1({}, { body: JSON.stringify(postBody) }));
    }


});


class App extends React.Component {

    drawUI() {
        return (
            <div>
                <TextField style={{ backgroundColor: '#FFFF66' }}> </TextField>
                <Button style={{ backgroundColor: '#FF9933' }}> Click me ! </Button>
            </div>);
    }


    drawUIpage() {
        return (
            <div>
                <Table>
                    <TableBody>
                        <TableRow> <TableCell> Book </TableCell> <TableCell> <Button style={{ backgroundColor: '#FF9933' }} onClick={() => this.props.buttonListener1()}> Book -> price 10 € </Button> </TableCell> </TableRow>
                        <TableRow> <TableCell> Car </TableCell> <TableCell> <Button style={{ backgroundColor: '#FF9933' }} onClick={() => this.props.buttonListener2()}> Car -> price 3000 € </Button> </TableCell> </TableRow>
                        <TableRow> <TableCell> DVD-R </TableCell> <TableCell> <Button style={{ backgroundColor: '#FF9933' }} onClick={() => this.props.buttonListener3()} > DVD-R -> not available </Button> </TableCell> </TableRow>
                    </TableBody>
                </Table>
            </div>);
    }


    drawServerAnswer() {
        return (
            <div>
                <br /><br />
                <font color="orange"><h1> Server answers (each endpoint have their own field for http-resoponse -> many http-response) </h1></font>
                <br /> <font color="red"> Server response 1 : {JSON.stringify(this.props.server_answer1)} </font>
                <br /> <font color="green"> Server response 2 : {JSON.stringify(this.props.server_answer2)} </font>
                <br /> <font color="blue"> Server response 3 : {JSON.stringify(this.props.server_answer3)} </font>
            </div>
        );

    }


    render() {
        return <p> Hello React!
             <AppBar>
                <Toolbar style={{ backgroundColor: '#994C00' }} > {this.drawUI()}  </Toolbar>
                <Toolbar style={{ backgroundColor: '#FFCC99' }} > {this.drawUIpage()} </Toolbar>
            </AppBar>
            <br />< br /><br />< br /><br />< br /><br />< br /><br />< br /><br />
            {this.drawUIpage()}
            {this.drawServerAnswer()}
            <br /><br />
            <Button style={{ backgroundColor: '#FF9933' }} onClick={() => this.props.savedatatodb1()}> Save to database 1 </Button>
        </p>;
    }

}

const ReduxApp = connect(mapStateToProps, mapDispatchToProps)(App)

render(
    <Provider store={redux_store}>
        <ReduxApp />
    </Provider>
    , document.getElementById('app'));
