import React from 'react';
import RootLayout from "../layout";
import styles from '../../../styles/Home.module.css';
import hearticon from '../../../assets/bold-like-hearts.png';
import msgicon from '../../../assets/bold-messages-conversation-dialog.png';
import mac2 from '../../../assets/mac2.png';
import homephone from '../../../assets/homephone.png';
import mapicon from '../../../assets/bold-map-location-streets-map-point.png';
import bg1 from '../../../assets/rectangle-19.png';
import hiring from '../../../assets/hiring.png'
import hanni from '../../../assets/hanni.png'
import phone2 from '../../../assets/homephone.png';
import mac from '../../../assets/mac.png'
import exlogo from '../../../assets/mask-group-p3B.png';
import phone from '../../../assets/main-bg-BwF.png';
import bgphone from '../../../assets/space-black-iphone-14-pro-mockup-label.png';
import pc from '../../../assets/main-bg.png';
import bgpc from '../../../assets/new-macbook-pro-mockup-front-view-label.png';
import Image from 'next/image';
// import Navbar from '../../../Component/navigationbar/page';
import { useRouter } from 'next/router';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
type Props = {}

export default function Hoempage() {
  return (
    <div className={styles.rootContainer}>
       <RootLayout showNavbar={true}>
      <div className="container px-4 py-10">
        <div className="row gx-5">
          <div className="col mt-2">
            <div className="text-4xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-semibold">
              <span style={{fontFamily: 'Montserrat'}} className={styles.whiteText}>Feel</span> <span className={styles.pinkText}>Free</span>{" "}
              <span style={{fontFamily: 'Montserrat'}} className="text-white">And</span> <span className={styles.orangeText}>Safe</span>
            </div>
            <div className="text-4xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold">
              <span className="text-white">With</span> <span className={styles.pinkText}>Find Us Nanny</span>
            </div>
            <div className={`mt-2 text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-normal ${styles.shortWord}`}>
              Your Child&apos;s Happiness, Our Priority Find Trusted Nannies Here
            </div>
            <div className="flex justify-start mt-5">
              <button className={`flex items-center ${styles.editButt}`}>GET STARTED</button>
            </div>
          </div>
          <div className="col">
          <div className={`p-3 ml-3 ${styles.editImgContainer}`}>
              <Image 
                className="rounded-lg overflow-hidden"
                src={bg1} 
                alt={'bg1'} 
              />
            </div>
          </div>
        </div>
      </div>

    <div className={`container p-5 mx-auto ${styles.bgContainer}`}>
      <div className='row align-items-center'>
        <div className={`col text-center d-flex align-items-center ${styles.textPinkBG}`}>
          <Image 
            className="rounded-lg overflow-hidden"
            src={msgicon} 
            alt={'bg1'}
            width={50}
            height={20} 
          />
          <span className="ms-2">Chat Message With Nanny</span>
        </div>
        <div className={`col text-center d-flex align-items-center ${styles.textPinkBG}`}>
          <Image 
            className="rounded-lg overflow-hidden"
            src={hearticon} 
            alt={'bg1'}
            width={50}
            height={20} 
          />
          <span className="ms-2">Can Add Favorites Nanny</span>
        </div>
        <div className={`col text-center d-flex align-items-center ${styles.textPinkBG}`}>
          <Image 
            className="rounded-lg overflow-hidden"
            src={mapicon} 
            alt={'bg1'}
            width={50}
            height={20} 
          />
          <span className="ms-2">Hiring Nanny From Anywhere</span>
        </div>
      </div>
    </div>

    <div className="ml-5 mt-10 p-5 text-4xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-semibold">
              <span className={styles.whiteText}>Why</span> <span className={styles.orangeText}>Find Us Nanny</span>{" "} <span className={styles.whiteText}>?</span>
    </div>
    
    <div className="container overflow-hidden">
      <div className="row gx-5">
        <div className="col-6 d-flex justify-content-center">
          <div className="p-3">
            <Image
              className="rounded-lg overflow-hidden"
              src={homephone}
              alt={'bg1'}
              width={300}
              height={250}
            />
          </div>
        </div>
        <div className="col-6">
          <div className="row gx-5">
            <div className="col-12">
              <div className={`p-2 ${styles.textPromote}`}>
                Find Us Nanny: Bridging the Gap Across Platforms – Seamlessly Caring for Your Children Anytime, Anywhere!
              </div>
            </div>
            <div className="col-12">
              <div className={`p-2 mt-5 ${styles.textPromote}`}>
                <Image
                className="rounded-lg overflow-hidden"
                src={mac2}
                alt={'bg1'}
                width={700}
                height={500}
              />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div className="ml-5 mt-10 p-5 text-4xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-semibold">
        <div className={styles.serviceText}>Service</div>
    </div>


    <div className="d-flex justify-content-center flex-grow-1">
        <div className="row p-2">
          <div className={`col text-white ${styles.editServiceHome}`}>
            <Image
              src={hiring}
              alt='..'
              width={120}
              height={80}
            />
            <span className='text-xl md:text-xl lg:text-xl xl:text-2xl 2xl:text-2xl font-medium'>Hiring</span>
            <a href="/hiring" className={`mt-5 p-3 text-l md:text-l lg:text-l xl:text-xl 2xl:text-xl font-semibold text-black ${styles.tryButton}`}>Try it now</a>
          </div>
          <div className={`col text-white ${styles.editServiceHome}`}>
            <Image
              src={hiring}
              alt='..'
              width={120}
              height={80}
            />
            <span className='text-xl md:text-xl lg:text-xl xl:text-2xl 2xl:text-2xl font-medium'>Ranking</span>
            <a href="/hiring" className={`mt-5 p-3 text-l md:text-l lg:text-l xl:text-xl 2xl:text-xl font-semibold text-black ${styles.tryButton}`}>Try it now</a>
          </div>
          <div className={`col text-white ${styles.editServiceHome}`}>
            <Image
              src={hiring}
              alt='..'
              width={120}
              height={80}
            />
            <span className='text-xl md:text-xl lg:text-xl xl:text-2xl 2xl:text-2xl font-medium'>Activity Program</span>
            <a href="/pre-activityprogram" className={`mt-3 p-3 text-l md:text-l lg:text-l xl:text-xl 2xl:text-xl font-semibold text-black ${styles.tryButton}`}>Try it now</a>
          </div>
        </div>
    </div>


    <footer style={{ backgroundColor: '#FFB7C9' }} className="footer footer-center text-base-content mt-4">
      <aside>
        <p>Copyright © 2023 - All right reserved by Mhoomind - Mek - DDay</p>
      </aside>
    </footer>

    </RootLayout>
    </div>
  );
}