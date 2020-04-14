import React from 'react';
import NavBarContainer from '../nav_bar/nav_bar_container';
import MainContent from '../main_content/main_content';
import { Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from '../../util/route_util';


class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <div id="home">
                    <NavBarContainer />
                    <Switch>
                        <Route exact path="/" component={ MainContent }/>
                    </Switch>
                </div>
            </>
        );
    }
}

export default Home;