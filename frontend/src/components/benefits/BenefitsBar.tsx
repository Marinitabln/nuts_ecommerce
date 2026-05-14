"use client";

import {
  Truck,
  Leaf,
  CreditCard,
} from "lucide-react";

import { useEffect, useState } from "react";
import Container from "../ui/Container";

const benefits = [
  {
    icon: Truck,
    title: "Envíos a domicilio",
    description:
      "Recibí tu pedido rápido y seguro.",
  },

  {
    icon: Leaf,
    title: "Productos naturales",
    description:
      "Calidad seleccionada sin agregados innecesarios.",
  },

  {
    icon: CreditCard,
    title: "Pagos seguros",
    description:
      "Transferencia, débito y crédito.",
  },
];

// duplicar para efecto infinito
const loopBenefits = [
  ...benefits,
  ...benefits,
];

const ITEM_HEIGHT = 110;

export default function BenefitsBar() {
  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [transitionEnabled, setTransitionEnabled] =
    useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentIndex === benefits.length) {
      const timeout = setTimeout(() => {
        setTransitionEnabled(false);
        setCurrentIndex(0);
      }, 700);

      return () => clearTimeout(timeout);
    }
    if (!transitionEnabled) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
        });
      });
    }
  }, [currentIndex, transitionEnabled]);

  return (
    <Container >
      <section
        className="w-full max-w-4xl overflow-hidden h-[110px] mb-10">
        <div
          className={`flex flex-col mx-5 sm:mx-20 md:mx-35 lg:mx-50 border-x
          ${transitionEnabled
              ? "transition-transform duration-700 ease-in-out"
              : ""
            }
        `}
          style={{
            transform: `translateY(-${currentIndex * ITEM_HEIGHT
              }px)`,
          }}
        >
          {loopBenefits.map(
            (benefit, index) => {
              const Icon = benefit.icon;

              return (
                <article
                  key={`${benefit.title}-${index}`}
                  className="h-[110px] flex items-center justify-center gap-5 px-6">

                  <div className="flex items-center justify-center min-w-15 h-15 rounded-full bg-background-secondary text-primary">
                    <Icon size={36} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg text-primary mb-1 -mt-2">
                      {benefit.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {benefit.description}
                    </p>
                  </div>
                </article>
              );
            }
          )}
        </div>
      </section>
    </Container>
  );
}