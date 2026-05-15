import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

interface ArrowsCarouselProps {
    scrollPrev: ()=> void;
    scrollNext: ()=> void;
}

const ArrowsCarousel = ({scrollPrev, scrollNext}: ArrowsCarouselProps) => {
  return (
    <>
        <button
                onClick={scrollPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20  hover:text-white transition-colors p-2 text-white/30">
                <ChevronLeft />
            </button>

            <button
                onClick={scrollNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hover:text-white transition-colors p-2 text-white/30">
                <ChevronRight />
            </button>
    </>
  )
}

export default ArrowsCarousel
