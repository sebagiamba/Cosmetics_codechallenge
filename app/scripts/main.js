/**
 * The Initial React Setup file
 * ...
 *
 * === CSS
 * The stylesheets are handled seperately using the gulp sass rather than importing them directly into React.
 * You can find these in the ./app/sass/ folder
 *
 * == JS
 * All files in here start from this init point for the React Components.
 *
 *
 * Firstly we need to import the React JS Library
 */
import React from 'react';
import ReactDOM from 'react-dom';

import Menu from './components/menu';
import Home from './components/home';
import {CosmeticsService} from "../services/";

/**
 * We can start our initial App here in the main.js file
 */
class App extends React.Component {
    state = {
        cosmetics: []
    }

    CosmeticsService = new CosmeticsService();

    onSearchCosmetics = search => {
        this.CosmeticsService.get(search,
            response => this.setState({cosmetics: response.data}),
            error => console.log(error)
        )
    }

    componentDidMount() {
        this.onSearchCosmetics("");
    }

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     *
     * @returns JSX
     * @memberof App
    */
    render() {
        const {cosmetics} = this.state;

        return (
            <div className="App">
                <Menu onSearch={this.onSearchCosmetics}/>
                <Home cosmetics={cosmetics}/>
            </div>
        );
    }

}

// Render this out
ReactDOM.render(<App />, document.getElementById('root'));
