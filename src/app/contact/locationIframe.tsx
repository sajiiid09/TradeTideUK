"use client";

import { LoadingSpinner } from "@/components/common/loadingSpinner";
import { Suspense } from "react";

export default function LocationFrame(): JSX.Element {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="rounded-lg overflow-hidden h-[400px] relative">
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <p className="text-muted-foreground">
            <Location />
          </p>
        </div>
      </div>
    </Suspense>
  );
}

const Location = () => {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d559.7619677964865!2d-4.265410206757363!3d55.86183583755367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4888469d579aaaab%3A0x98fc15c9003d7a23!2sGlasgow%20Central%20Station%20SKYLINE%20Apartment%20with%20Parking%20(2%20bedrooms%2C%202%20bathrooms%2C%201%20living%20room-Kitchen)!5e0!3m2!1sen!2sbd!4v1742240096031!5m2!1sen!2sbd"
      className="w-[80vw] md:w-[70vw] md:h-[42vh] h-[45vh]"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
};
