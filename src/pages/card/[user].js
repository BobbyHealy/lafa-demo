import { useRouter } from 'next/router'
import { database } from '../../../firebaseconfig';
import { getDoc, doc } from 'firebase/firestore';
import { UserCard } from '../../components/UserCard';
import { useEffect, useState } from 'react';
import { Loading } from '../../components/Loading';
import Modal from '../../components/Modal';

const User = () => {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState(<Loading/>)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    const { user } = router.query;

    const openModal = () => {
        setOpen(true);
    }

    useEffect(() => {
        const docRef = doc(database, 'cards', `${user}`);
        getDoc(docRef)
        .then((snap) => {
            console.log(snap.data())
            if(snap.exists()){
                console.log("Hey")
                setContent(<UserCard user={snap.data()} openModal={openModal}/>);
                setIsLoading(false);
            } else {
                if(user !== undefined){
                    setIsLoading(false);
                    setContent(<p>Error</p>);
                } else {
                    setIsLoading(true);
                }
            }
        })
        .catch((e) => console.log(e))},[user])
    return (
        <>
        {isLoading ? <Loading/> : content}
        <Modal open={open} setOpen={setOpen} link={router.basePath + router.asPath}/>
        </>
    )
}

export default User