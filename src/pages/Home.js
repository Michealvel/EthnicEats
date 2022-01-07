import H6 from '@material-tailwind/react/Heading6';
import InputIcon from '@material-tailwind/react/InputIcon';
import DataCard from 'components/home/DataCard';
import Image1 from 'assets/img/res.png';
import DefaultNavbar from 'components/DefaultNavbar';
import DefaultFooter from 'components/DefaultFooter';
import Header from 'components/home/Header';
import Profile from 'components/home/profile';
import { useState } from 'react';
import axios from 'axios';
import config from '../config';

export default function Home() {

    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");

    const apiUri = "https://maps.googleapis.com/maps/api/place/textsearch/json?key=" + config.API_KEY + "&query=" + search;

    const getData = () => {
        axios.get(apiUri).then(res => {
            console.log('res +++', res);
            if (res.data.results.length) {
                setData(res.data.results);
            }
        });
    }

    function onChangeHandler(event) {
        event.preventDefault();
        const { name, value } = event.currentTarget;
        if (name === "search") {
            setSearch(value);
        }
    }

    function onKeyPress(event) {
        if (event.key === 'Enter') {
            console.log('search key +++', search);
            if (search) {
                getData();
            }
        }
    }

    return (
        <>
            <div className="absolute w-full z-20">
                <DefaultNavbar />
            </div>
            <main>
                <Header />
            </main>
            <Profile />
            <section className="pt-20 pb-48">
                <div className="container max-w-7xl mx-auto px-4 text-center">
                    <H6 color="gray">Place API Result</H6>
                    <div className="flex mb-12">
                        <div className="flex-1 text-center px-4 py-2 m-2">
                            <InputIcon
                                type="text"
                                color="lightBlue"
                                placeholder="Type search key and press enter..."
                                iconName="search"
                                value={search}
                                name="search"
                                id="search"
                                onChange={(event) => onChangeHandler(event)}
                                onKeyPress={(e) => onKeyPress(e)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap mt-12">
                        {data && data.map((ele, idx) => {
                            return (
                                <DataCard
                                    img={Image1}
                                    name={ele.name}
                                    position={ele.formatted_address}
                                    key={idx}
                                />
                            )
                        })}
                    </div>
                </div>
            </section>
            <DefaultFooter />
        </>
    );
}
