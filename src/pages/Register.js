import { useState } from "react";
import { useHistory } from "react-router-dom";
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import CardFooter from '@material-tailwind/react/CardFooter';
import H6 from '@material-tailwind/react/Heading6';
import InputIcon from '@material-tailwind/react/InputIcon';
import Checkbox from '@material-tailwind/react/Checkbox';
import Button from '@material-tailwind/react/Button';
import Alert from '@material-tailwind/react/Alert';
import DefaultNavbar from 'components/DefaultNavbar';
import SimpleFooter from 'components/SimpleFooter';
import Page from 'components/login/Page';
import Container from 'components/login/Container';
import AuthService from '../services/auth.service';

export default function Register() {

    const [fullname, setFullName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [roles, setRoles] = useState(false);
    const [error, setError] = useState("");
    let history = useHistory();

    function onChangeHandler(event) {
        const { name, value } = event.currentTarget;
        if (name === "email") {
            setEmail(value);
            AuthService.validateEmail(value) ? setError("") : setError("email address is invalid");
        } else if (name === "fullname") {
            setFullName(value);
        } else if (name === "username") {
            setUserName(value);
        } else if (name === "password") {
            setPassword(value);
            passwordCheck === value ? setError("") : setError("password doesn't match");
        } else if(name === "passwordCheck") {
            setPasswordCheck(value);
            password === value ? setError("") : setError("password doesn't match");
        } else if(name === "checkbox") {
            setRoles(event.target.checked);
        }
    }

    function SignUp(event) {
        event.preventDefault();
        try {
            AuthService.register(email, fullname, username, password, roles).then(res => {
                console.log('user regiser response +++', res);
                if (res.status === 200) {
                    setEmail("");
                    setFullName("");
                    setUserName("");
                    setPassword("");
                    setPasswordCheck("");
                    setRoles(false);
                    history.push('/login');
                }
                
            }).catch(err => {
                console.log('user register post error +++', err);
                setError("name or email is already in use")
            })
            
        }
        catch (err) {
            console.log('user register error +++', err);
            setError('something is wrong, try later.');
        }
    }

    return (
        <Page>
            <DefaultNavbar />
            <Container>
                <Card className="mt-10">
                    <CardHeader color="lightBlue">
                        <H6 color="white" style={{ marginBottom: 0 }}>
                            Join the EthnicEats!
                        </H6>
                    </CardHeader>

                    <CardBody>
                        <div className="mb-10 px-4">
                            <InputIcon
                                type="email"
                                color="lightBlue"
                                placeholder="Email"
                                iconName="email"
                                value={email}
                                name="email"
                                id="email"
                                onChange={(event) => onChangeHandler(event)}
                            />
                        </div>
                        <div className="mb-10 px-4">
                            <InputIcon
                                type="text"
                                color="lightBlue"
                                placeholder="Full Name"
                                iconName="account_circle"
                                value={fullname}
                                name="fullname"
                                id="fullname"
                                onChange={(event) => onChangeHandler(event)}
                            />
                        </div>
                        <div className="mb-10 px-4">
                            <InputIcon
                                type="text"
                                color="lightBlue"
                                placeholder="Display Name"
                                iconName="account_circle"
                                value={username}
                                name="username"
                                id="username"
                                onChange={(event) => onChangeHandler(event)}
                            />
                        </div>
                        <div className="mb-4 px-4">
                            <InputIcon
                                type="password"
                                color="lightBlue"
                                placeholder="Password"
                                iconName="lock"
                                value={password}
                                name="password"
                                id="password"
                                onChange={(event) => onChangeHandler(event)}
                            />
                        </div>
                        <div className="mb-4 px-4">
                            <InputIcon
                                type="password"
                                color="lightBlue"
                                placeholder="Password Repeat"
                                iconName="lock"
                                value={passwordCheck}
                                name="passwordCheck"
                                id="passwordCheck"
                                onChange={(event) => onChangeHandler(event)}
                            />
                        </div>
                        <div className="mb-4 px-4">
                            <Checkbox
                                color="cyan"
                                text="I am customer."
                                value={roles}
                                name="checkbox"
                                id="checkbox"
                                onChange={(event) => onChangeHandler(event)}
                            />
                        </div>
                        {error &&
                            <div className="mb-4 px-4">
                                <Alert color="red">{error}</Alert>
                            </div>
                        }
                    </CardBody>
                    <CardFooter>
                        <div className="flex justify-center">
                            <Button
                                color="pink"
                                buttonType="filled"
                                size="lg"
                                rounded={true}
                                block={false}
                                iconOnly={false}
                                ripple="light"
                                onClick={(event) => { SignUp(event) }}
                                disabled={!fullname || !username || !AuthService.validateEmail(email) || !password || !passwordCheck}
                            >
                                Sign Up
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </Container>
            <SimpleFooter />
        </Page>
    );
}
