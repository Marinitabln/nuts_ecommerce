import { MessageCircleMore } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const Footer = () => {
    return (
        <footer id="contact" className="bg-primary h-80 sm:h-50 w-full mt-15 text-white p-4 ">
            <div className="max-w-4xl flex flex-col items-center sm:flex-row sm:justify-between sm:items-start my-6 mx-auto ">
                <div className="flex flex-col gap-2">
                    <h4 className="flex gap-2 items-center text-lg mb-4"><MessageCircleMore size={20} color='#fff' />Contactanos</h4>
                    <Link href=''>+54 9 2612 56-0314</Link>
                    <Link href=''>+54 9 2615 54-6708</Link>
                </div>
                <div className="mt-10 sm:mt-0">
                    <span>Sumate a nuestra comunidad</span>

                    <div className="flex justify-center sm:justify-start gap-4">
                        <Image
                            src="/logo_facebook.svg"
                            alt="logo_facebook"
                            width={30}
                            height={30}

                        />
                        <Image
                            src="/logo_instagram.svg"
                            alt="logo_facebook"
                            width={30}
                            height={30}

                        />
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
