"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ArrowsCarousel from "./ArrowsCarousel";
import { useRouter } from "next/navigation";

const slides = [
    {
        id: 1,
        image:
            "/slide_1.jpg",
        title:
            "Alimentación natural para todos los días",
        description:
            "Frutos secos, cereales y semillas seleccionadas.",
        callToAction: ""
    },

    {
        id: 2,
        image:
            "/slide_2.jpg",
        title: "Combos saludables",
        description:
            "Ahorra comprando tus mixes favoritos.",
        callToAction: ""
    },

    {
        id: 3,
        image:
            "/slide_3.jpg",
        title: "Productos premium",
        description:
            "Calidad seleccionada para una mejor alimentación.",
        callToAction: ""
    },
];

export default function HeroCarousel() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const router = useRouter()

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setSelectedIndex(
                emblaApi.selectedScrollSnap()
            );
        };

        onSelect();

        emblaApi.on("select", onSelect);

        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi]);

    return (
        <section className="relative w-screen overflow-hidden mb-10 ">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">

                    {slides.map((slide) => (
                        <div
                            key={slide.id}
                            className="relative min-w-full h-[350px] sm:h-[420px] lg:h-[520px]">

                            <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                priority
                                className="object-cover"
                            />

                            <div className="absolute inset-0 bg-black/40" />

                            <div className="absolute inset-0 flex flex-col justify-center px-15 sm:px-20 lg:px-30 text-white max-w-3xl">
                                <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">
                                    {slide.title}
                                </h1>

                                <p className="text-sm sm:text-lg text-white/90 mb-6 max-w-xl">
                                    {slide.description}
                                </p>

                                <button className="w-fit bg-primary hover:opacity-90 transition-opacity text-white px-6 py-3 rounded-xl font-semibold" onClick={() => { router.push(`/${slide.callToAction}`) }}>
                                    Ver productos
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ArrowsCarousel scrollNext={scrollNext} scrollPrev={scrollPrev} />

            <div
                className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() =>
                            emblaApi?.scrollTo(index)
                        }
                        className={`h-2.5 rounded-full transition-all
              ${selectedIndex === index
                                ? "w-8 bg-white"
                                : "w-2.5 bg-white/50"
                            }
            `}
                    />
                ))}
            </div>
        </section>
    );
}