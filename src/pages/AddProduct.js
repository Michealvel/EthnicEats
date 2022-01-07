import H3 from '@material-tailwind/react/Heading3';
import Paragraph from '@material-tailwind/react/Paragraph';
import Input from '@material-tailwind/react/Input';
import Textarea from '@material-tailwind/react/Textarea';
import Button from '@material-tailwind/react/Button';
import Card from '@material-tailwind/react/Card';
import CardBody from '@material-tailwind/react/CardBody';
import DefaultNavbar from 'components/DefaultNavbar';
import SimpleFooter from 'components/SimpleFooter';
import Page from 'components/login/Page';
import { useState } from 'react';
import axios from 'axios';
import config from '../config';
import authService from 'services/auth.service';
import { store } from 'react-notifications-component';

export default function AddProduct() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const token = authService.getCurrentUser().accessToken;
    // const [error, setError] = useState("");

    function onChangeHandler(event) {
        const { name, value } = event.currentTarget;
        if (name === "name") {
            setName(value);
        } else if (name === "price") {
            setPrice(value);
        } else if (name === 'description') {
            setDescription(value);
        }
    }

    function addItem(event) {
        event.preventDefault();
        const data = {
            name,
            price,
            description
        }
        axios.post(config.REACT_APP_BASE_URL + 'item/add', data, {
            headers: {
                'x-access-token': `${token}`
            }
        }).then(res => {
            console.log('add item +++', res);
            if (res.status === 200) {
                setName("");
                setPrice(0);
                setDescription("");
                return store.addNotification({
                    title: "Add Item",
                    message: `Item added sucessfully!`,
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 3500,
                        onScreen: true
                    }
                });
            }
        });
    }

    return (
        <Page>
            <DefaultNavbar />
            <div className="ml-5 mr-5">
                <Card>
                    <CardBody>
                        <section className="relative">
                            <div className="flex flex-wrap justify-center mt-24">
                                <div className="w-full lg:w-8/12 px-4">
                                    <div className="relative mb-6">
                                        <div className="flex-auto p-5">
                                            <div className="w-full text-center">
                                                <H3 color="gray">Add Restaurant Menu Item</H3>
                                                <Paragraph color="blueGray">
                                                    Please fill forms information.
                                                </Paragraph>
                                            </div>
                                            <form onSubmit={(e) => addItem(e)}>
                                                <div className="flex gap-8 mt-16 mb-12">
                                                    <Input
                                                        type="text"
                                                        placeholder="Item Name"
                                                        color="lightBlue"
                                                        value={name}
                                                        name="name"
                                                        id="name"
                                                        onChange={(event) => onChangeHandler(event)}
                                                    />
                                                    <Input
                                                        type="number"
                                                        placeholder="Price"
                                                        color="lightBlue"
                                                        value={price}
                                                        name="price"
                                                        id="price"
                                                        onChange={(event) => onChangeHandler(event)}
                                                    />
                                                </div>

                                                <Textarea
                                                    color="lightBlue"
                                                    placeholder="Description"
                                                    value={description}
                                                    name="description"
                                                    id="description"
                                                    onChange={(event) => onChangeHandler(event)}
                                                />

                                                <div className="flex justify-center mt-10">
                                                    <Button color="lightBlue" ripple="light" disabled={!name || !price || !description}>
                                                        Add Item
                                                    </Button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </CardBody>
                </Card>
            </div>
            <SimpleFooter />
        </Page>
    );
}
