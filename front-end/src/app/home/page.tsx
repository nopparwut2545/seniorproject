import React from 'react';
import styles from '../../../styles/Home.module.css';
import hearticon from '../../../assets/bold-like-hearts.png';
import msgicon from '../../../assets/bold-messages-conversation-dialog.png';
import mapicon from '../../../assets/bold-map-location-streets-map-point.png';
import bg1 from '../../../assets/rectangle-19.png';
import exlogo from '../../../assets/mask-group-p3B.png';
import phone from '../../../assets/main-bg-BwF.png';
import bgphone from '../../../assets/space-black-iphone-14-pro-mockup-label.png';
import pc from '../../../assets/main-bg.png';
import bgpc from '../../../assets/new-macbook-pro-mockup-front-view-label.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
type Props = {}

export default function Hoempage({ }: Props) {
  return (

    <div>
      <div className={styles.fullpage}>
        <div className={styles.introtext} >
          <div >
            <div className={styles.textline}>
              <span className={styles.whiteText}>Feel</span> <span className={styles.pinkText}>Free</span> <span className={styles.whiteText}>And</span> <span className={styles.orangeText}>Safe</span>
            </div>
            <div className={styles.textline}  >
              <span className={styles.whiteText}> With</span> <span className={styles.pinkText}>Nanny Right Now</span>
            </div>
            <div className={styles.textlastline}>
              <span className={styles.detailText}> Your Child is Happiness, Our Priority<br />
                Find Trusted Nannies Here</span>
            </div>
          </div>

          <div className={styles.buttonstart} >
            <button  >Get Started</button>
          </div>
        </div>

        <div className={styles.intropic}>
          <div>
            <Image
              src={bg1}
              alt=""
              width={600}
              height={300}
              layout="fixed"
            />
          </div>
        </div>
      </div>

      <div className={styles.navfeature} >
        <div className={styles.box3features}>
          <div className={styles.featurebars} >
            <div className={styles.iconfeature}>
              <Image
                src={msgicon}
                alt=""
                width={50}
                height={20}
              />
            </div>
            <div className={styles.textfeature} >
              <span className={styles.whitetextfeature}> Chat message with nanny</span>
            </div>

          </div>

          <div className={styles.featurebars} >
            <div className={styles.iconfeature}>

              <Image
                src={hearticon}
                alt=""
                width={50}
                height={20}
              />

            </div>
            <div className={styles.textfeature} >
              <span className={styles.whitetextfeature}> Can Add Favorites Nanny</span>
            </div>
          </div>

          <div className={styles.featurebars} >
            <div className={styles.iconfeature}>
              <Image
                src={mapicon}
                alt=""
                width={50}
                height={20}
              />
            </div>
            <div className={styles.textfeaturelast} >
              <span className={styles.whitetextfeature}> Hiring Nanny from anywhere</span>
            </div>
          </div>

        </div>
      </div>


      <div className={styles.textwhynanny}>
        <span className={styles.whiteTextwhynanny}>Why</span> <span className={styles.orangeTextwhynanny}>Nanny Right Now</span> <span className={styles.whiteTextwhynanny}>?</span>
      </div>

      <div className={styles.showdevice}>
        <div className={styles.bigphone}>
          <div className={styles.phoneContainer}>
            <Image src={phone} alt="" width={350} height={400} />
            <Image src={bgphone} alt="" width={210} height={550} />
          </div>
        </div>
        <div className={styles.bigphone2}>
          <div className={styles.textlastline}>
            <span className={styles.devicedetailtext}> Nanny Right Now: Bridging the  Gap Across Platforms <br />Seamlessly
              Caring for Your Children Anytime, Anywhere! </span>
          </div>
          <div className={styles.bigphone3}>
          <div className={styles.pcContainer}>
            <Image src={pc} alt="" width={620} height={320} />
            <Image src={bgpc} alt="" width={470} height={275} />
          </div>
          </div>
        </div>
      </div>

      <div className={styles.servicepart}>
        <div>
          <span className={styles.servicetext}>Services</span>
        </div>

        <div className={styles.servicefeaturebox}>

          <div className={styles.servicedetailbox} >
            <div className={styles.centeredDiv}>
              <Image
                src={exlogo}
                alt=""
                width={120}
                height={120}
              />
            </div>
            <div className={styles.centeredDiv}>
              <span className={styles.servicetextdetail}> Hiring</span>
            </div>
            <div className={styles.centeredDiv} >
              <button className={styles.buttontryit} >TRY IT NOW</button>
            </div>
          </div>

          <div className={styles.servicedetailbox} >
            <div className={styles.centeredDiv}>
              <Image
                src={exlogo}
                alt=""
                width={120}
                height={120}
              />
            </div>
            <div className={styles.centeredDiv}>
              <span className={styles.servicetextdetail}> Ranking Nanny</span>
            </div>
            <div className={styles.centeredDiv} >
              <button className={styles.buttontryit}   >TRY IT NOW</button>
            </div>
          </div>

          <div className={styles.servicedetailbox} >
            <div className={styles.centeredDiv}>
              <Image
                src={exlogo}
                alt=""
                width={120}
                height={120}
              />
            </div>
            <div className={styles.centeredDiv}>
              <span className={styles.servicetextdetail}> xxxxxxx</span>
            </div>
            <div className={styles.centeredDiv} >
              <button className={styles.buttontryit}  >TRY IT NOW</button>
            </div>
          </div>

          <div className={styles.servicedetailbox} >
            <div className={styles.centeredDiv}>
              <Image
                src={exlogo}
                alt=""
                width={120}
                height={120}
              />
            </div>
            <div className={styles.centeredDiv}>
              <span className={styles.servicetextdetail}> Activity Program</span>
            </div>
            <div className={styles.centeredDiv} >
              <button className={styles.buttontryit}  >TRY IT NOW</button>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}