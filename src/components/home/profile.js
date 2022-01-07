import AuthService from '../../services/auth.service';

export default function Profile() {
    
    const user = AuthService.getCurrentUser();
    // const image = user.image;
    const name = user.username
    const email = user.email;
    // const roles = user.roles;
    
    return (
        <div className="max-w-3xl w-full align-start  z-10">
            <div className="flex flex-col">
                <div className="bg-white border border-white   rounded-3xl p-4 m-4">
                    <div className="flex-none sm:flex">
                        <div className="flex-auto sm:ml-5 justify-evenly">
                            <div className="flex items-center justify-between sm:mt-2">
                                <div className="flex items-center">
                                    <div className="flex flex-col">
                                        <div className="flex-auto text-gray-500 my-1">
                                            <span className="mr-3 ">{name}</span><span className="mr-3 border-r border-gray-200  max-h-0"></span><span>{email}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}
