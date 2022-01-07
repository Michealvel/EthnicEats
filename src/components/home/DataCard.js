import Image from '@material-tailwind/react/Image';
import H6 from '@material-tailwind/react/Heading6';
import Paragraph from '@material-tailwind/react/Paragraph';

export default function DataCard({ img, name, position }) {
    return (
        <div className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 mb-12 px-4">
            <div className="px-6">
                <Image src={img} alt={name} raised />
                <div className="pt-6 text-center">
                    <H6 color="gray">
                        <a href='/plist'>
                            {name}
                        </a>
                    </H6>
                    <Paragraph color="blueGray">{position}</Paragraph>
                </div>
            </div>
        </div>
    );
}
