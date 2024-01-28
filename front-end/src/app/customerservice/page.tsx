// CustomerService.tsx
'use client'
import RootLayout from "../layout";
import styles from "../../../styles/CustomerService.module.css";
import message from "../../../assets/Dialog.png"
import phonesignal from "../../../assets/phonesignal.png"
import Image from "next/image";

export default function CustomerService() {
    return (
        <RootLayout showNavbar={true}>
        <div className={styles.rootContainer}>
            <div className="mt-10 text-center text-4xl sm:text-xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-5xl font-bold">
                <span style={{ fontFamily: 'Montserrat', }} className="text-white">Customer Service</span>
            </div>
            <div className={styles.headerBanner}>
                Choose one method to contact us
            </div>
            <div className={styles.container}>
                <div className={styles.left}>
                    <Image
                        src={message}
                        alt={""}
                        className={styles.centeredImage}
                    />
                    <p className={styles.chatMessage}>Chat with us via email nanny.rightnow@hotmail.com</p>
                </div>
                <div className={styles.right}>
                    <Image
                        src={phonesignal}
                        alt={""}
                        className={styles.centeredImage}
                    />
                    <p className={styles.chatMessage}>Call with our call-center +66-xxxxxxxxxxxx</p>
                </div>
            </div>
        </div>
        </RootLayout>
    );
}
