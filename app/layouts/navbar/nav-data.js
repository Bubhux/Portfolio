// app/layouts/navbar/nav-data.js
import config from '~/config.json';


export const navLinks = [
    {
        label: 'Skills',
        pathname: '/#skills',
    },
    {
        label: 'Projects',
        pathname: '/#project-1',
    },
    {
        label: 'Details',
        pathname: '/#details',
    },
    {
        label: 'Contact',
        pathname: '/contact',
    },
];

export const socialLinks = [
    {
        label: 'Twitter',
        url: `https://twitter.com/${config.twitter}`,
        icon: 'twitter',
    },
    {
        label: 'Instagram',
        url: `https://www.instragram.com/${config.instagram}`,
        icon: 'instagram',
    },
    {
        label: 'Github',
        url: `https://github.com/${config.github}`,
        icon: 'github',
    },
];
