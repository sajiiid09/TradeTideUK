"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Camera, Loader2, CheckCircle2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { uploadImages } from "@/lib/uploadImages";
import { useSession } from "next-auth/react";
import { createUserWithProfile } from "@/lib/repositories/profile.repository";

// Define the form schema with Zod
const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  image: z.instanceof(File).optional(), // Allow File type for image
});

type FormValues = z.infer<typeof formSchema>;

export default function UserOnboardingPage() {
  const { data: session } = useSession();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>(
    "/placeholder.svg?height=200&width=200",
  );
  const router = useRouter();

  // Initialize form with React Hook Form and Zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      image: undefined, // Initialize image as undefined
    },
  });

  // Setup React Dropzone for image upload
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 1,
    noClick: true,
    noKeyboard: true,
    onDrop: acceptedFiles => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const imageUrl = URL.createObjectURL(file); // Create a temporary preview URL
        setPreviewImage(imageUrl);
        form.setValue("image", file); // Store the file in the form state
      }
    },
  });

  const handleNext = () => {
    if (step === 1) {
      // Validate first step fields
      const stepOneValid = form.trigger(["firstName", "lastName"]);
      if (!stepOneValid) return;
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      // Upload the image to the API if it exists
      let uploadedImageUrl = null;
      if (data.image instanceof File) {
        uploadedImageUrl = await uploadImages([data.image]);
      }

      if (!uploadedImageUrl) {
        toast.warning("Please upload a profile picture.");
        return;
      }

      const finalFormData = {
        ...data,
        image: uploadedImageUrl[0] ?? null,
      };

      console.log("Form submitted with data:", finalFormData);
      const response = await createUserWithProfile({
        userId: session?.user?.id ?? "test",
        profileData: finalFormData,
      });
      console.log(response);
      // After a delay, redirect to profile page
      setIsComplete(true);
      router.push("/user/me");
    } catch (error) {
      console.error(error);
      toast.warning(
        "There was a problem creating your profile. Please try again.",
      );
    } finally {
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex flex-col items-center mb-6">
                    <div {...getRootProps()} className="relative mb-4">
                      <input {...getInputProps()} />
                      <div className="relative w-32 h-32 rounded-full overflow-hidden">
                        <Image
                          src={previewImage || "/placeholder.svg"}
                          alt="Profile picture"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                        onClick={open}
                      >
                        <Camera className="h-4 w-4" />
                        <span className="sr-only">Upload profile picture</span>
                      </Button>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={open}
                    >
                      Upload Photo
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            First Name{" "}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Last Name{" "}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Phone Number{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="+880 1XXX XXXXXX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Address <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Your full address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {step > 1 ? (
                <Button
                  type="button"
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
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isSubmitting ? "Creating Profile..." : "Complete Profile"}
                </Button>
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
