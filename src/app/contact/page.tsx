import { Metadata } from "next";
import NextHead from "@/components/common/metaData";

import { MapPin, Phone, Mail } from "lucide-react";

import LocationFrame from "./locationIframe";
import ContactForm from "./contactForm";

export const metadata: Metadata = NextHead({
  title: "Contact us",
});

export default function ContactPage() {
  // # replace the static informations with sanity cms
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-muted-foreground">
          We&apos;d love to hear from you. Get in touch with our team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <ContactForm />

        <div>
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium">Our Location</h3>
                <p className="text-muted-foreground">
                  123 Craft Street, Dhaka
                  <br />
                  Bangladesh
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium">Phone Number</h3>
                <p className="text-muted-foreground">+880 1234 567890</p>
                <p className="text-muted-foreground">+880 9876 543210</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium">Email Address</h3>
                <p className="text-muted-foreground">info@madeinbd.com</p>
                <p className="text-muted-foreground">support@madeinbd.com</p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-muted rounded-lg p-6">
            <h3 className="font-medium mb-2">Business Hours</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span>10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span>Closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LocationFrame />
    </div>
  );
}
