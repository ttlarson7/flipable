import React from 'react'
import Navbars from '../components/Navbars';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

function ProfilePage() {


    return (
        <div>
            <Navbars page={'profile'}></Navbars>
            <Loading></Loading>
            <Footer></Footer>
        </div>
    )
    
}

export default ProfilePage;