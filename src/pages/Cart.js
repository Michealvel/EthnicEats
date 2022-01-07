import DefaultNavbar from 'components/DefaultNavbar';
import SimpleFooter from 'components/SimpleFooter';
import Card from '@material-tailwind/react/Card';
import CardBody from '@material-tailwind/react/CardBody';
import Image from '@material-tailwind/react/Image';
import Button from '@material-tailwind/react/Button';
import Page from 'components/login/Page';
import { useEffect, useState } from 'react';
import img from 'assets/img/item.png';

export default function Cart() {

    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    // const user = authService.getCurrentUser();

    useEffect(() => {
        if (localStorage.getItem('products')) {
            const products = JSON.parse(localStorage.getItem('products'));
            let sum = 0;
            for (let index = 0; index < products.length; index++) {
                sum = sum + parseFloat(products[index].price);
                setTotal(sum);
            }
            setData(products);
        }
    }, []);

    function handleClick(event) {
        event.preventDefault();
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
                                            <div className="w-full px-4" key={idx}>
                                                <div className="flex bg-gray-200 items-center">
                                                    <div className="flex-1 px-4 py-2 m-2">
                                                        <Image src={img} alt={ele.name} raised style={{ width: '50%' }} />
                                                    </div>
                                                    <div className="flex-1 bg-white px-4 py-2 m-2">
                                                        {ele.name}
                                                    </div>
                                                    <div className="flex-1 bg-white px-4 py-2 m-2">
                                                        {ele.description}
                                                    </div>
                                                    <div className="flex-1 bg-white px-4 py-2 m-2">
                                                        {ele.price}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    <div className="w-full md:w-12/12 lg:w-12/12 mt-12 mb-12 px-4">
                                        <div className="flex">
                                            <div className="flex-1 bg-white px-4 py-2 m-2 text-center">
                                                <strong>Total Price</strong>
                                            </div>
                                            <div className="flex-1 bg-white text-center px-4 py-2 m-2">
                                                <strong>
                                                    $ {total}
                                                </strong>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-12/12 lg:w-12/12 px-4">
                                        <div className="flex">
                                            <div className="flex-1  px-4 py-2 m-2 text-center">
                                                <Button
                                                    color="lightBlue"
                                                    buttonType="filled"
                                                    size="lg"
                                                    rounded={false}
                                                    block={true}
                                                    iconOnly={false}
                                                    ripple="light"
                                                    onClick={(event) => { handleClick(event) }}
                                                >
                                                    Checkout
                                                </Button>
                                            </div>
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
