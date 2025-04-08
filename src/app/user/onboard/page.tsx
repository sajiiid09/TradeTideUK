"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Camera, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

export default function UserOnboardingPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    image: "/placeholder.svg?height=200&width=200",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.firstName || !formData.lastName) {
        toast.warning("Please provide both first and last name.");
        return;
      }
    }

    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call to create user profile
      await new Promise(resolve => setTimeout(resolve, 2000));

      setIsComplete(true);

      // After a delay, redirect to profile page
      setTimeout(() => {
        router.push("/user/me");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.warning(
        "There was a problem creating your profile. Please try again.",
      );
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <div className="mb-6">
          <CheckCircle2 className="h-16 w-16 text-primary mx-auto" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Profile Created!</h1>
        <p className="text-muted-foreground mb-6">
          Your profile has been successfully created. You&apos;re now ready to
          explore BDTextileHub.
        </p>
        <p className="text-sm text-muted-foreground">
          Redirecting to your profile...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription>
            Please provide some additional information to complete your profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden">
                    <Image
                      src={formData.image || "/placeholder.svg"}
                      alt="Profile picture"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                  >
                    <Camera className="h-4 w-4" />
                    <span className="sr-only">Upload profile picture</span>
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  Upload Photo
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">
                    First Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">
                    Last Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="+880 1XXX XXXXXX"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">
                  Address <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Your full address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={isSubmitting}
            >
              Back
            </Button>
          ) : (
            <div></div>
          )}

          {step < 2 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isSubmitting ? "Creating Profile..." : "Complete Profile"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
