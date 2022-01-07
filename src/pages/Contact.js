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

export default function Contact() {
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
                                                    <H3 color="gray">Want to work with us?</H3>
                                                    <Paragraph color="blueGray">
                                                        Complete this form and we will get back to you
                                                        in 24 hours.
                                                    </Paragraph>
                                                </div>
                                                <form onSubmit={(e) => e.preventDefault()}>
                                                    <div className="flex gap-8 mt-16 mb-12">
                                                        <Input
                                                            type="text"
                                                            placeholder="Full Name"
                                                            color="lightBlue"
                                                        />
                                                        <Input
                                                            type="email"
                                                            placeholder="Email"
                                                            color="lightBlue"
                                                        />
                                                    </div>

                                                    <Textarea color="lightBlue" placeholder="Message" />

                                                    <div className="flex justify-center mt-10">
                                                        <Button color="lightBlue" ripple="light">
                                                            Send Message
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
