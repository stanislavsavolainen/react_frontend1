# my front-end framework
# using react, material-ui and many redux-libraries
# http-request via reduxApi



# step 1: console : sh react_proj_setup.sh ( build default project)
#-----------------------------------------------
# script is selfmade following tutorial about how to make basic hello world program at ReactJS
# ********** more info here about it ... *******
#-----------------------------------------------
# step 2 : update Package.json using npm install or copy library text to Package.json file
# step 2A : add material-ui library to Pacakage.json then in console at project folder: npm install
----------------------------------------------
# add to Package.json >>>>>
 "material-ui": "^1.0.0-beta.2",
 "material-ui-icons": "^1.0.0-alpha.19", 
----------------------------------------------
console > npm install
---------------------------------------------- 
# step 2B : import some material-ui component at project index.jsx file
----------------------------------------------
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
----------------------------------------------
# step 2C : add drawGUI function with return '<div> print data </div>' at index.jsx inside main class
----------------------------------------------
drawUI(){
        return <div> print text </div>
    }
----------------------------------------------
# step 2D: call drawUI function at render function
-----------------------------------------------
 render() {
        return <p> Hello React! {this.drawUI()} </p>;
    }
-----------------------------------------------
#step 2E : compile project (at project folder) :
console >  ./node_modules/.bin/webpack -d 
-----------------------------------------------
#step 2F: open index.html page and check result

#step 2G: use materil-ui componet inside drawUI - function and return them, 
#also css-style can be used inline way inside each meterial-ui component (for example backgourColor with rgb value like #FF9933)
#then compile project in console using webpack-command as mentioned previously
#drawGUI function look like this :
-----------------------------------------------
drawUI(){
        return (
             <div> 
            <TextField style={{ backgroundColor: '#FFFF66' }}> </TextField> 
            <Button style={{ backgroundColor: '#FF9933' }}> Click me ! </Button> 
        </div> );
    }

-----------------------------------------------  

# step 3 : continue update front-end framework (ReactJS, materila-ui and Redux)

# step 3A : check more material-ui component to make nice layout. Make " UI-template" and put materila-ui component inside it


-----------------------------------------------


# ========== REDUX ============================


# step ?? : add Redux libraries (same way as material-ui), update Package.json

# -> redux
# -> react-redux
# -> redux-act
# -> redux-api
# -> redux-thunk 

-----------------------------------------------
# add to Package.json >>>>>>
"react-redux": "^5.0.5",
"redux": "^3.7.2",
"redux-act": "^1.3.0",
"redux-api": "^0.10.6",
"redux-thunk": "^2.2.0",

----------------------------------------------

# step ?? A : import Redux libraries to index.jsx file to use redux libraries in React project

----------------------------------------------


import { createAction, createReducer } from 'redux-act';

import reduxApi from 'redux-api';

import thunk from 'redux-thunk'; //for midleware -> redux-api

import adapterFetch from 'redux-api/lib/adapters/fetch';

import { connect, Provider } from 'react-redux';

import { createStore, combineReducers, applyMiddleware } from 'redux';

----------------------------------------------

# step ?? B : create Redux store at index.jsx file
# createStore function come from normal redux library, as you can see from import

----------------------------------------------

const store = createStore( reducerFunction );

----------------------------------------------

# step ?? C : createReducer function and link it to this store
# You can create reducerFunction using redux-act libray or normal redux
# reducerfunction purpose is holding actions inside it, when dispatch-action will be called from somewhere, then special action can be triggered via reducerFunction

#redux-act createReducer and actions look like this (redux-act library) :

#initialState is global variable, but placed inside reducerFunction with default values

----------------------------------------------
const initialState = { interestingData : 'unknown' };

const reduxAction1 = createAction("test-redux-action-1");
const reduxAction2 = createAction("test-redux-action-2");
const reduxAction3 = createAction("test-redux-action-3");
const reduxAction4 = createAction("test-redux-action-4");


const reducer = createReducer(
  
  { [reduxAction1]: state => { } , initialState },
  { [reduxAction2]: state => { } , initialState },
  { [reduxAction3]: state => { } , initialState },
  { [reduxAction4]: state => { } , initialState },
      
);

----------------------------------------------

# step ?? D : use react-redux library and link connect - function with two function parameter to this react page index.jsx
# use Provider to make reference to redux store


class MyReactClass1 extends React.Component {
 //.... react data ....
}


//insted of using @connect annotation above class. We can export connect with this class
const ReduxApp = connect(mapStateToProps, mapDispatchToProps)(MyReactClass1)



render(
    <Provider store={store}>
        <ReduxApp />
    </Provider>
, document.getElementById('MyreactClass1'));

  
-----------------------------------------------

# step ?? E: create mapDispatchToProps-function and add dispatch-action to it
# for example when user doing something in material-ui component then dispatch-action
#like triggering UI-component eventListener at other programming languages

-----------------------------------------------
 const mapDispatchToProps = dispatch => ({

	eventFunction1(){
		dispatch(reduxAction1());
	}

	eventFunction2(function_parameter){
# come from TextField -> handle this value somehow inside this function, each time when value cahnged at this TextField.
# this eventFunction will be called again  
		dispatch(reduxAction2());
	}

	eventFunction3(){
		dispatch(reduxAction3());
	}

       eventFunction4(){
		dispatch(reduxAction4());
	}
		
 });
-----------------------------------------------

# material-ui button cause eventListener and this event triggering dispatch-action
# redux store will be updated and new value inserted in (immutable store -> more explanation + js spread operator )
# to use reduxFunction -> required put props before function
-----------------------------------------------

<Button onClick = { () => this.props.eventFunction1() } > Event 1 </Button>

# material-ui TextField component can save value from input and eventListener happen each time when input value of TextField component will be changed

<TextField onChange = { (event) => this.props.eventFunction2 (event.target.value) } />

-----------------------------------------------

INFO NOT DONE.  	

 











 





