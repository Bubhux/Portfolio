import { DecoderText } from '~/components/decoder-text';
import { Heading } from '~/components/heading';


export default {
    title: 'DecoderText',
    args: {
        text: 'Slick cyberpunk text',
    },
};

export const Text = ({ text }) => (
    <Heading level={3}>
        <DecoderText delay={0} text={text} />
    </Heading>
);
