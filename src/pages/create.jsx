import Head from 'next/head'
import { Header } from '../components/Header'
import { Button } from '../components/Button'


import { app, database } from '../../firebaseconfig';
import { collection, addDoc, setDoc, doc} from 'firebase/firestore';
import { useState } from 'react'
import { useRouter } from 'next/router'

function Create() {
    const [newCard, setNewCard] = useState({"links": {}});
    const router = useRouter();

    const communication_platforms = [
        {title: "Email", name: "email"},
        {title: "Whatsapp", name: "whatsapp"},
        {title: "Instagram", name: "instagram"},
        {title: "Facebook", name: "facebook"},
        {title: "Reddit", name: "reddit"},
        {title: "Github", name: "github"},
        {title: "LinkedIn", name: "linkedin"},
        {title: "Zoom", name: "zoom"},
    ]

    const saveNote = (card) => {
        const docRef = doc(database, 'cards', `${card.first.toLowerCase()}-${card.last.toLowerCase()}`);
        
        setDoc(docRef, {
            "first": card.first,
            "last": card.last,
            "id": 11,
            "links": card.links,
            "picture": "/collection/document1",
            "organization": card.organization
        })
        router.push(router.basePath + "card/" + `${card.first.toLowerCase()}-${card.last.toLowerCase()}`)
    }

    const handleChange = (event) => {
        const property = event.target.name;
        if(property == "first" || property == "last" || property == "organization"){
            console.log(property);
            const copy = newCard;
            copy[property] = event.target.value;
            setNewCard(copy);
        } else {
            console.log("Link:" + property);
            const copy = newCard;
            copy.links[property] = event.target.value;
            setNewCard(copy);
        }
      }

    return (
        <>
        <Head>
            <title>Pocket - Invest at the perfect time.</title>
            <meta
            name="description"
            content="By leveraging insights from our network of industry insiders, you’ll know exactly when to buy to maximize profit, and exactly when to sell to avoid painful losses."
            />
        </Head>
        <Header />
        <main>
            <div className="grid place-items-center w-screen py-4">
                <div className='m-auto'>
                <div className="space-y-6">
                    <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                            <p className="mt-1 text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
                        </div>
                        <div className="mt-5 md:mt-0 md:col-span-2">
                            <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                First name
                                </label>
                                <input
                                type="text"
                                name="first"
                                id="first-name"
                                autoComplete="given-name"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                value={newCard.first}
                                onChange={handleChange}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                Last name
                                </label>
                                <input
                                type="text"
                                name="last"
                                id="last-name"
                                autoComplete="family-name"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                value={newCard.last}
                                onChange={handleChange}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-4">
                                <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
                                    Organization
                                </label>
                                <input
                                type="text"
                                name="organization"
                                id="organization"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                value={newCard.organization}
                                onChange={handleChange}
                                />
                            </div>

                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Contact Links</h3>
                            <p className="mt-1 text-sm text-gray-500">Different links to use in your business card. If you dont want to use one, simply leave empty.</p>
                        </div>
                        <div className="mt-5 md:mt-0 md:col-span-2">
                            <div className="grid grid-cols-6 gap-6">
                            {communication_platforms.map((platform) => {
                                return (
                            <div key={platform.name} className="col-span-6 sm:col-span-4">
                                <label htmlFor={platform.name} className="block text-sm font-medium text-gray-700">
                                {platform.title}
                                </label>
                                <input
                                type="text"
                                name={platform.name}
                                id={platform.name}
                                autoComplete={platform.name}
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                value={newCard.links[platform.name]}
                                onChange={handleChange}
                                />
                            </div>)
                            })}
                            {/* <div className="col-span-6 sm:col-span-4">
                                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                Email address
                                </label>
                                <input
                                type="text"
                                name="email"
                                id="email-address"
                                autoComplete="email"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                value={newCard.links.email}
                                onChange={handleChange}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-4">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Whatsapp Number (optional)
                                </label>
                                <input
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                                autoComplete="phone"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                value={newCard.links.whatsapp}
                                onChange={handleChange}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-4">
                                <label htmlFor="link" className="block text-sm font-medium text-gray-700">
                                Facebook Link (optional)
                                </label>
                                <input
                                type="text"
                                name="facebook"
                                id="facebook"
                                autoComplete="phone"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                value={newCard.links.facebook}
                                onChange={handleChange}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-4">
                                <label htmlFor="link" className="block text-sm font-medium text-gray-700">
                                Instagram Link (optional)
                                </label>
                                <input
                                type="text"
                                name="instagram"
                                id="instagram"
                                autoComplete="phone"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                value={newCard.links.instagram}
                                onChange={handleChange}
                                />
                            </div> */}

                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                        Cancel
                        </button>
                        <Button
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => saveNote(newCard)}
                        >
                        Save
                        </Button>
                    </div>
                    </div>
                </div>
            </div>
        </main>
        </>
    )
}

export default Create;
