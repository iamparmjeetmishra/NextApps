'use client'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGithub, faYoutube, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa';


const SocialMediaLinks = () => {
    return (
        <div className='flex flex-row gap-4'>
            <a href="#" target="_blank" rel="noopener noreferrer">
                <FaGithub size="2rem" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
                <FaLinkedin  size="2rem" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
                <FaYoutube  size="2rem" />
            </a>
        </div>
    );
};

export default SocialMediaLinks;