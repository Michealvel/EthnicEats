import { useState } from "react";
import { useHistory } from "react-router-dom";
import Card from '@material-tailwind/react/Card';
import CardBody from '@material-tailwind/react/CardBody';
import CardFooter from '@material-tailwind/react/CardFooter';
import InputIcon from '@material-tailwind/react/InputIcon';
import Button from '@material-tailwind/react/Button';
import Alert from '@material-tailwind/react/Alert';
import DefaultNavbar from 'components/DefaultNavbar';
import SimpleFooter from 'components/SimpleFooter';
import Page from 'components/login/Page';
import Container from 'components/login/Container';
import AuthService from '../services/auth.service';

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    let history = useHistory();

    function onChangeHandler(event) {
        const { name, value } = event.currentTarget;
        if (name === "email") {
            setEmail(value);
            AuthService.validateEmail(value) ? setError("") : setError("email address is invalid");
        } else if (name === "password") {
            setPassword(value);
        }
    }

    function signIn(event) {
        event.preventDefault();
        try {
            AuthService.login(email, password).then(res => {
                // console.log('user signIn response +++', res);
                setEmail("");
                setPassword("");
                history.push('/stream');
            }).catch(err => {
                console.log('user signIn post error +++', err);
                setError("Invalid credential")
            })
            
        }
        catch (err) {
            console.log('user signIn error +++', err);
            setError('something is wrong, try later.');
        }
    }

    return (
        <Page>
            <DefaultNavbar />
            <Container>
                <Card className="mt-10">
                    <CardBody>
                        <div className="mt-12 mb-12 px-4 bg-bb">
                            <InputIcon
                                type="email"
                                color="lightBlue"
                                placeholder="Email Address"
                                iconName="email"
                                value={email}
                                name="email"
                                id="email"
                                onChange={(event) => onChangeHandler(event)}
                            />
                        </div>
                        <div className="mb-8 px-4">
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
                        {error &&
                            <div className="mb-4 px-4">
                                <Alert color="red">{error}</Alert>
                            </div>
                        }
                    </CardBody>
                    <CardFooter>
                        <div className="flex justify-center bg-bb">
                            <Button
                                color="lightBlue"
                                buttonType="filled"
                                size="lg"
                                rounded={true}
                                block={false}
                                iconOnly={false}
                                ripple="light"
                                onClick={(event) => { signIn(event) }}
                                disabled={!AuthService.validateEmail(email) || !password}
                            >
                                Sign In
                            </Button>
                        </div>
                        <div className="flex justify-center bg-bb mt-5">
                            <a
                                href="/register"
                                rel="noreferrer"
                            >
                                <Button
                                    color="pink"
                                    buttonType="filled"
                                    size="lg"
                                    rounded={true}
                                    block={false}
                                    iconOnly={false}
                                    ripple="light"
                                    
                                >
                                    Sign Up
                                </Button>
                            </a>
                        </div>
                    </CardFooter>
                </Card>
            </Container>
            <SimpleFooter />
        </Page>
    );
}
