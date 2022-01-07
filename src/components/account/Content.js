import Button from '@material-tailwind/react/Button';
import Image from '@material-tailwind/react/Image';
import H3 from '@material-tailwind/react/Heading3';
import Icon from '@material-tailwind/react/Icon';
import InputIcon from '@material-tailwind/react/InputIcon';
import ProfilePicture from 'assets/img/user_640.png';
import { useState } from 'react';
import axios from 'axios'
import config from '../../config'
import AuthService from '../../services/auth.service'
import { store } from 'react-notifications-component';

const API_URL = config.REACT_BACKEND_URL;
const FILE_LIMIT_SIZE = config.REACT_APP_FILE_LIMIT_SIZE;

export default function Content() {

    const [image, setImage] = useState(null);
    const user = AuthService.getCurrentUser();
    const userImage = user.image;
    let currentImage = userImage ? API_URL + userImage : ProfilePicture;

    const selectImage = (e) => {
        console.log('image +++', e.target.files);
        if (e.target.files && e.target.files[0]) {
            const filesize = ((e.target.files[0].size / 1024) / 1024).toFixed(4);
            if (filesize > FILE_LIMIT_SIZE) return store.addNotification({
                title: "cannot upload file!",
                message: `file is bigger than allowed it must ${FILE_LIMIT_SIZE}mb or less`,
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });

            let reader = new FileReader();
            reader.onload = function (ev) {
                setImage(ev.target.result)
            };
            reader.readAsDataURL(e.target.files[0]);

            const formData = new FormData();
            formData.append('image', e.target.files[0])
            axios.post('http://localhost:8080/api/user/upload', formData, { headers: { 'x-access-token': user.accessToken } }).then(({ data }) => {
                const { success, path } = data;
                if (success) {
                    user.image = path;
                    localStorage.setItem("user", JSON.stringify(user));
                    return store.addNotification({
                        title: "profile update",
                        message: `Profile image update success!`,
                        type: "success",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                            duration: 5000,
                            onScreen: true
                        }
                    });
                }
            });
        }
    }

    return (
        <section className="relative py-16 bg-gray-100">
            <div className="container max-w-7xl px-4 mx-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-2xl -mt-64">
                    <div className="px-6">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                <div className="relative">
                                    <div className="w-40 -mt-20">
                                        <label htmlFor="image">
                                            <input
                                                type="file"
                                                name="image"
                                                id="image"
                                                accept="image/*"
                                                onChange={(e) => selectImage(e)}
                                                style={{ display: 'none' }} />
                                            <Image
                                                src={image ? image : currentImage}
                                                alt="Profile picture"
                                                raised
                                                rounded
                                                style={{ width: '160px', height: '160px' }}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center my-8">
                            <H3 color="gray">{user.username}</H3>
                            <div className="mb-5 text-gray-700 mt-10 flex items-center justify-center gap-2">
                                <Icon name="email" size="xl" />
                                {user.email}
                            </div>
                            <div className="mb-2 text-gray-700 flex items-center justify-center gap-2">
                                <Icon name="account_balance" size="xl" />
                                Address
                            </div>
                        </div>

                        <div className="mb-10 py-2 border-t border-gray-200 text-center">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-9/12 px-4 flex flex-col items-center">
                                    <div className="mt-10 mb-10 px-4">
                                        <InputIcon
                                            type="text"
                                            color="lightBlue"
                                            placeholder="Address"
                                            iconName="home"
                                            // value={address}
                                            name="address"
                                            id="address"
                                            // onChange={(event) => onChangeHandler(event)}
                                        />
                                    </div>
                                    <a
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <Button
                                            color="lightBlue"
                                            buttonType="button"
                                            ripple="dark"
                                        >
                                            Update
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
