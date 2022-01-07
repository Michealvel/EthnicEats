import Paragraph from '@material-tailwind/react/Paragraph';
import DefaultNavbar from 'components/DefaultNavbar';
import SimpleFooter from 'components/SimpleFooter';
import Card from '@material-tailwind/react/Card';
import CardBody from '@material-tailwind/react/CardBody';
import Image from '@material-tailwind/react/Image';
import H6 from '@material-tailwind/react/Heading6';
import Button from '@material-tailwind/react/Button';
import Page from 'components/login/Page';
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import authService from 'services/auth.service';
import { store } from 'react-notifications-component';
import img from 'assets/img/item.png';

export default function ProductList() {

    const [data, setData] = useState([]);
    const user = authService.getCurrentUser();
    const isAdmin = !user ? false : user.roles.includes("ROLE_ADMIN");
    const token = user.accessToken;

    useEffect(() => {
        axios.get(config.REACT_APP_BASE_URL + 'item/all', {
            headers: {
                'x-access-token': `${token}`
            }
        }).then(res => {
            if (res.status === 200) {
                setData(res.data);
            } else {
                setData([]);
            }
        })
    }, [token]);

    function handleClick(event, item) {
        event.preventDefault();
        console.log('item +++', item);
        if (isAdmin) {
            // TODO: edit item
        } else {
            let products = [];
            if (localStorage.getItem('products')) {
                products = JSON.parse(localStorage.getItem('products'));
            }
            const found = products.some(el => el._id === item._id);
            if (!found) {
                products.push(item);
                localStorage.setItem('products', JSON.stringify(products));
                return store.addNotification({
                    title: "Add Item",
                    message: `Item added sucessfully to the cart!`,
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
            } else {
                return store.addNotification({
                    title: "Add Item",
                    message: `Item exist already in the cart!`,
                    type: "warning",
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
        }
    }

    return (
        <Page>
            <DefaultNavbar />
            <div className="ml-5 mr-5">
                <Card>
                    <CardBody>
                        <section className="pt-20 pb-48">
                            <div className="container max-w-7xl mx-auto px-4">
                                <div className="flex flex-wrap">
                                    {data && data.map((ele, idx) => {
                                        return (
                                            <div className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 mb-12 px-4" key={idx}>
                                                <div className="px-6">
                                                    <Image src={img} alt={ele.name} raised />
                                                    <div className="pt-6 text-center">
                                                        <H6 color="gray">
                                                            {ele.name}
                                                        </H6>
                                                        <H6 color="gray">
                                                            $ {ele.price}
                                                        </H6>
                                                        <Paragraph color="blueGray">{ele.description}</Paragraph>
                                                        <div className="flex justify-center mt-10">
                                                            <Button color="lightBlue" ripple="light" onClick={(event) => { handleClick(event, ele) }}>
                                                                {isAdmin ? 'Edit Item' : 'Add To Cart'}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
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
