import { Switch, Route, Redirect } from 'react-router-dom';
import Landing from 'pages/Landing';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Contact from 'pages/Contact';
import Account from 'pages/Account';
import Home from 'pages/Home';
import AddProduct from 'pages/AddProduct';
import ProductList from 'pages/ProductList';
import Cart from 'pages/Cart';

// Font Awesome Style Sheet
import '@fortawesome/fontawesome-free/css/all.min.css';
// Tailwind CSS Style Sheet
import 'assets/styles/tailwind.css';
import AuthService from './services/auth.service';
import AuthVerify from './services/auth-verify';
import GuardedRoute from './services/guarde-route';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

function App() {

    function logOut () {
        AuthService.logout();
    }

    const user = AuthService.getCurrentUser();

    return (
        <>
            <ReactNotification />
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/contact" component={Contact} />
                <GuardedRoute path='/account' component={Account} auth={user} />
                <GuardedRoute path='/home' component={Home} auth={user} />
                <GuardedRoute path='/add' component={AddProduct} auth={user} />
                <GuardedRoute path='/plist' component={ProductList} auth={user} />
                <GuardedRoute path='/cart' component={Cart} auth={user} />
                <Redirect from="*" to="/" />
            </Switch>
            <AuthVerify logOut={logOut} />
        </>
    );
}

export default App;
