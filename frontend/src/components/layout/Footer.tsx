'use client'
import { MapPin, MessageCircleMore } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation";

const Footer = () => {

    const router = useRouter();
    return (
        <footer id="contact" className="bg-primary h-120 sm:h-70 w-full mt-15 text-white p-4 ">
            <div className="max-w-[1200px] flex flex-col items-center text-center sm:text-left sm:flex-row sm:flex-wrap sm:justify-between sm:items-start my-6 mx-auto sm:px-10 md:px-0">
                <div className="flex flex-col gap-2">
                    <h4 className="flex gap-2 items-center justify-center sm:justify-start text-lg text-secondary "><MessageCircleMore size={20} />Contactanos</h4>
                    <div className="flex flex-col border border-secondary/50 p-4 rounded-lg gap-2">
                        <Link href='https://wa.me/+5492615546708' target="_blank" rel="noopener noreferrer">+54 9 2615 54-6708</Link>
                        <Link href='https://wa.me/+5492612560314' target="_blank" rel="noopener noreferrer">+54 9 2612 56-0314</Link>
                    </div>
                </div>
                <div className="flex flex-col gap-2 mt-10 sm:mt-0">
                    <h4 className="flex gap-2 items-center justify-center sm:justify-start text-lg text-secondary"><MapPin size={20} />Puntos de retiro</h4>
                    <span className="text-sm font-light text-secondary">Pedí nuestras direcciones por WhatsApp</span>
                    <p>Luján de Cuyo | Godoy Cruz <br />Mendoza - Argentina</p>

                </div>
                <div className="flex flex-col gap-2 mt-10 sm:mt-6 md:mt-0">
                    <span className=" text-secondary">Sumate a nuestra comunidad</span>
                    <span className="text-sm font-light text-secondary">Síguenos en nuestras redes sociales</span>
                    <div className="flex justify-center sm:justify-start gap-4">
                        <Image
                            src="/logo_facebook.svg"
                            alt="logo_facebook"
                            width={30}
                            height={30}
                            onClick={() => router.push('https://www.facebook.com/nutsmendoza')}
                            className="hover:cursor-pointer hover:opacity-60"


                        />
                        <Image
                            src="/logo_instagram.svg"
                            alt="logo_facebook"
                            width={30}
                            height={30}
                            onClick={() => router.push('https://www.instagram.com/nuts_mendoza/')}
                            className="hover:cursor-pointer hover:opacity-60"
                        />
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
