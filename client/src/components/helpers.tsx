import paths from './paths';
import { FaTwitter, FaFacebook, FaInstagram, FaGithub } from 'react-icons/fa';

export const jumbotronData = {
  title: 'Risk Warning',
  content:
    "At MyFXai.com, we're committed to providing our clients with the information and tools they need to trade smarter and more confidently. Please be aware that trading Forex and Leveraged Financial Instruments involves significant risk and can result in the loss of your invested capital. We strongly advise that you do not invest more than you can afford to lose and ensure that you fully understand the risks involved before trading. Trading leveraged products may not be suitable for all investors, and it's important to note that trading non-leveraged products such as stocks also involves risk. It is the responsibility of the client to ascertain whether they are permitted to use the services of the MyFXai.com brand based on the legal requirements in their country of residence. Thank you for choosing MyFXai.com. We're here to support you every step of the way.",
};

export const footerInfo = [
  {
    title: 'LOGO',
    content:
      'Clarity gives you the blocks and components you need to create a truly professional website.',
    icons: [<FaTwitter />, <FaFacebook />, <FaInstagram />, <FaGithub />],
  },
  {
    title: 'COMPANY',
    menu: [
      {
        name: 'About',
        path: paths.about,
      },
      {
        name: 'Features',
        path: paths.about,
      },
    ],
  },
  {
    title: 'HELP',
    menu: [
      {
        name: 'Customer Support',
        path: paths.about,
      },
      {
        name: 'Terms & Conditions',
        path: paths.about,
      },
      {
        name: 'Privacy Policy',
        path: paths.about,
      },
    ],
  },
  {
    title: 'RESOURCES',
    menu: [
      {
        name: 'FAQ',
        path: paths.about,
      },
      {
        name: 'Blog',
        path: paths.about,
      },
      {
        name: 'How to use MyFXai.com',
        path: paths.about,
      },
    ],
  },
];
