import "bootstrap/dist/css/bootstrap.min.css"
import "font-awesome/css/font-awesome.min.css"
import "./app.css"
import React from "react"
import {HashRouter} from "react-router-dom"

import Routes from "./routes"
import Home from "../components/home/home"
import Logo from "../components/template/logo"
import Footer from "../components/template/footer"
import Nav from "../components/template/nav"

export default props => 
    <HashRouter>
        <div className="app">
            <Logo />
            <Nav />
            <Routes />
            <Footer />
        </div>
    </HashRouter>