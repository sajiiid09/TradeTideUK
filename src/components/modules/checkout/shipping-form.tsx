"use client";

import type React from "react";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";

interface ShippingFormProps {
  initialData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  onSubmit: (data: ShippingFormProps["initialData"]) => void;
  shippingMethod: string;
  onShippingMethodChange: (method: string) => void;
}

export default function ShippingForm({
  initialData,
  onSubmit,
  shippingMethod,
  onShippingMethodChange,
}: ShippingFormProps) {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "postalCode",
    ];

    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData].trim()) {
        newErrors[field] = "This field is required";
      }
    });

    // Email validation
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (formData.phone && !/^\+?[0-9\s-]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>
        <p className="text-muted-foreground">
          Please enter your shipping details
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">
              First Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={errors.firstName ? "border-destructive" : ""}
            />
            {errors.firstName && (
              <p className="text-destructive text-sm">{errors.firstName}</p>
            )}
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
              className={errors.lastName ? "border-destructive" : ""}
            />
            {errors.lastName && (
              <p className="text-destructive text-sm">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-destructive text-sm">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? "border-destructive" : ""}
            />
            {errors.phone && (
              <p className="text-destructive text-sm">{errors.phone}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">
            Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={errors.address ? "border-destructive" : ""}
          />
          {errors.address && (
            <p className="text-destructive text-sm">{errors.address}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">
              City <span className="text-destructive">*</span>
            </Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={errors.city ? "border-destructive" : ""}
            />
            {errors.city && (
              <p className="text-destructive text-sm">{errors.city}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">
              State/Division <span className="text-destructive">*</span>
            </Label>
            <Input
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={errors.state ? "border-destructive" : ""}
            />
            {errors.state && (
              <p className="text-destructive text-sm">{errors.state}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="postalCode">
              Postal Code <span className="text-destructive">*</span>
            </Label>
            <Input
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className={errors.postalCode ? "border-destructive" : ""}
            />
            {errors.postalCode && (
              <p className="text-destructive text-sm">{errors.postalCode}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            disabled
          />
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Shipping Method</h3>
          <RadioGroup
            value={shippingMethod}
            onValueChange={onShippingMethodChange}
            className="space-y-4"
          >
            <Card
              className={`border ${shippingMethod === "standard" ? "border-primary" : ""}`}
            >
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard" className="cursor-pointer">
                    <div>
                      <p className="font-medium">Standard Shipping</p>
                      <p className="text-sm text-muted-foreground">
                        3-5 business days
                      </p>
                    </div>
                  </Label>
                </div>
                <div className="font-medium">
                  {formData.country === "Bangladesh" && subtotal > 5000
                    ? "Free"
                    : "৳150"}
                </div>
              </CardContent>
            </Card>
            <Card
              className={`border ${shippingMethod === "express" ? "border-primary" : ""}`}
            >
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="express" id="express" />
                  <Label htmlFor="express" className="cursor-pointer">
                    <div>
                      <p className="font-medium">Express Shipping</p>
                      <p className="text-sm text-muted-foreground">
                        1-2 business days
                      </p>
                    </div>
                  </Label>
                </div>
                <div className="font-medium">৳350</div>
              </CardContent>
            </Card>
          </RadioGroup>
        </div>

        <div className="pt-4">
          <Button type="submit" className="w-full sm:w-auto">
            Continue to Payment
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}

// Dummy value for subtotal to determine free shipping
const subtotal = 6000;
