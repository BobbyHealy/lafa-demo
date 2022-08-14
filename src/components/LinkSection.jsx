import { MailIcon, PhoneIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import Image from "next/image";
import whatsapp from "../images/logos/super-tiny-icons/whatsapp.svg"
import email from "../images/logos/super-tiny-icons/email.svg"
import facebook from "../images/logos/super-tiny-icons/facebook.svg"
import instagram from "../images/logos/super-tiny-icons/instagram.svg"
import linkedin from "../images/logos/super-tiny-icons/linkedin.svg"
import github from "../images/logos/super-tiny-icons/github.svg"
import reddit from "../images/logos/super-tiny-icons/reddit.svg"
import youtube from "../images/logos/super-tiny-icons/youtube.svg"
import zoom from "../images/logos/super-tiny-icons/zoom.svg"

const getImage = (name) => {
    switch(name){
        case "whatsapp":
            return whatsapp;
        case "email":
            return email;
        case "facebook":
            return facebook;
        case "instagram":
            return instagram;
        case "linkedin":
            return linkedin;
        case "github":
            return github;
        case "reddit":
            return reddit;
        case "youtube":
            return youtube;
        case "zoom":
            return zoom;
    }
}

export default function LinkSection({links}) {
    const keys = Object.keys(links);
  return (
    <ul role="list" className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {keys.map((key) => (
        <li
          key={key}
          className="flex flex-col text-center"
        >
          <div className="col-span-1 flex justify-center lg:pt-4 pt-4 pb-0">
                <div className="px-3 lg:px-1 text-center">
                    <Link href={links[key]}>
                        <Image alt="" src={getImage(key)} width={60} height={60}/>
                    </Link>
                </div>
            </div> 
        </li>
      ))}
    </ul>
  )
}