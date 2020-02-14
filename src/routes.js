import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Erro from './pages/Erro';
import Sobre from './pages/Sobre';
import Filme from './pages/Filme';

const Routes = () => {
    return (
        <BrowserRouter>
            <Header title="Projeto de Rotas"/>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/sobre" component={Sobre} />
                <Route exact path="/filme/:id" component={Filme} />
                <Route path="*" component={Erro}/>
            </Switch>
            <Footer/>
        </BrowserRouter>
    );
}

export default Routes;