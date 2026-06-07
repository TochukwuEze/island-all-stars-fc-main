"use client";

import React from "react";
import Image from "next/image";
import President from "../../../public/images/executives/president1.webp";
import VicePresident from "../../../public/images/executives/vp1.webp";
import SecretaryGeneral from "../../../public/images/executives/secretaryGeneral1.webp";
import AssistantSecretaryGeneral from "../../../public/images/executives/assistantSecretaryGeneral1.webp";
import FinancialSecretary from "../../../public/images/executives/financialSecretary1.webp";
import AssistantFinancialSecretary from "../../../public/images/executives/assistantFinancialSecretary1.webp";
import WelfareDirector from "../../../public/images/executives/welfareDirector1.webp";
import AssistantWelfareDirector from "../../../public/images/executives/assistantWelfareDirector1.webp";
import PRO from "../../../public/images/executives/PRO1.webp";
import AssistantPRO from "../../../public/images/executives/assistantPRO1.webp";
import Provost from "../../../public/images/executives/provost1.webp";
import AssistantProvost from "../../../public/images/executives/assistantProvost1.webp";
import { Montserrat } from "next/font/google";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

const experts = [
  {
    name: "Mr Okeke Azubugwu Kenneth",
    role: "President",
    image: President,
  },
  {
    name: "Mr Ijezie Ben",
    role: "Vice President",
    image: VicePresident,
  },
  {
    name: "Mr Uche Onoro",
    role: "Secretary General",
    image: SecretaryGeneral,
  },
  {
    name: "Mr Nwankwo Reginald Emeka",
    role: "Assistant Secretary General",
    image: AssistantSecretaryGeneral,
  },
  {
    name: "Mr Celestine Agba",
    role: "Financial Secretary",
    image: FinancialSecretary,
  },
  {
    name: "Mr Ezeude Emmanuel Chukwunonso",
    role: "Assistant Financial Secretary",
    image: AssistantFinancialSecretary,
  },
  {
    name: "Mr Anthony Molokwu",
    role: "Welfare Director",
    image: WelfareDirector,
  },
  {
    name: "Mr Oscar Egwuonwu",
    role: "Assistant Welfare Director",
    image: AssistantWelfareDirector,
  },
  {
    name: "Mr Emmanuel Emeka Agukwe",
    role: "P.R.O",
    image: PRO,
  },
  {
    name: "Mr Obidike Nonso Christian",
    role: "Assistant P.R.O",
    image: AssistantPRO,
  },
  {
    name: "Mr Okumbele Ogadi",
    role: "Provost",
    image: Provost,
  },
  {
    name: "Mr Ernest Onyekwere",
    role: "Assistan Provost",
    image: AssistantProvost,
  },
];

const OurExpertsLead = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-gray-500 text-[10px] font-bold tracking-[0.4em] uppercase mb-3">
            Meet the Team
          </p>
          <h2
            className={`${montserrat.className} text-4xl md:text-5xl font-semibold text-black tracking-tight uppercase leading-tight`}
          >
            Our Club Executive Council (EXCOS)
          </h2>
        </div>

        {/* Experts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {experts.map((expert, index) => (
            <div key={index} className="group cursor-pointer">
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <Image
                  src={expert.image}
                  alt={expert.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Expert Info */}
              <div className="mt-6">
                <h3
                  className={`${montserrat.className} text-base font-medium text-black uppercase tracking-tight`}
                >
                  {expert.name}
                </h3>
                <p className={`text-gray-400 text-sm font-medium mt-1`}>
                  {expert.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurExpertsLead;
