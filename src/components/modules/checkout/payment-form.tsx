"use client";

import type React from "react";

import { useState } from "react";
import { ChevronLeft, ChevronRight, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface PaymentFormProps {
  initialData: {
    cardName: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    saveCard: boolean;
  };
  onSubmit: (data: PaymentFormProps["initialData"], method: string) => void;
  onBack: () => void;
}

export default function PaymentForm({
  initialData,
  onSubmit,
  onBack,
}: PaymentFormProps) {
  const [formData, setFormData] = useState(initialData);
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let formattedValue = value;

    // Format card number with spaces
    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
        .slice(0, 19);
    }

    // Format expiry date
    if (name === "expiryDate") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d{0,2})/, "$1/$2")
        .slice(0, 5);
    }

    // Limit CVV to 3-4 digits
    if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, saveCard: checked }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (paymentMethod === "credit") {
      // Card name validation
      if (!formData.cardName.trim()) {
        newErrors.cardName = "Cardholder name is required";
      }

      // Card number validation
      const cardNumberDigits = formData.cardNumber.replace(/\s/g, "");
      if (!cardNumberDigits) {
        newErrors.cardNumber = "Card number is required";
      } else if (!/^\d{16}$/.test(cardNumberDigits)) {
        newErrors.cardNumber = "Please enter a valid 16-digit card number";
      }

      // Expiry date validation
      if (!formData.expiryDate) {
        newErrors.expiryDate = "Expiry date is required";
      } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = "Please enter a valid expiry date (MM/YY)";
      } else {
        const [month, year] = formData.expiryDate.split("/");
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;

        if (Number.parseInt(month) < 1 || Number.parseInt(month) > 12) {
          newErrors.expiryDate = "Invalid month";
        } else if (
          Number.parseInt(year) < currentYear ||
          (Number.parseInt(year) === currentYear &&
            Number.parseInt(month) < currentMonth)
        ) {
          newErrors.expiryDate = "Card has expired";
        }
      }

      // CVV validation
      if (!formData.cvv) {
        newErrors.cvv = "CVV is required";
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = "Please enter a valid CVV";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData, paymentMethod);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
        <p className="text-muted-foreground">
          Choose how you&apos;d like to pay
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <RadioGroup
          value={paymentMethod}
          onValueChange={setPaymentMethod}
          className="space-y-4"
        >
          <Card
            className={`border ${paymentMethod === "credit" ? "border-primary" : ""}`}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 mb-4">
                <RadioGroupItem value="credit" id="credit" />
                <Label
                  htmlFor="credit"
                  className="flex items-center cursor-pointer"
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  <span>Credit / Debit Card</span>
                </Label>
              </div>

              {paymentMethod === "credit" && (
                <div className="space-y-4 pl-7">
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      name="cardName"
                      placeholder="John Doe"
                      value={formData.cardName}
                      onChange={handleChange}
                      className={errors.cardName ? "border-destructive" : ""}
                    />
                    {errors.cardName && (
                      <p className="text-destructive text-sm">
                        {errors.cardName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className={errors.cardNumber ? "border-destructive" : ""}
                    />
                    {errors.cardNumber && (
                      <p className="text-destructive text-sm">
                        {errors.cardNumber}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        className={
                          errors.expiryDate ? "border-destructive" : ""
                        }
                      />
                      {errors.expiryDate && (
                        <p className="text-destructive text-sm">
                          {errors.expiryDate}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleChange}
                        className={errors.cvv ? "border-destructive" : ""}
                      />
                      {errors.cvv && (
                        <p className="text-destructive text-sm">{errors.cvv}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="saveCard"
                      checked={formData.saveCard}
                      onCheckedChange={handleCheckboxChange}
                    />
                    <Label
                      htmlFor="saveCard"
                      className="text-sm cursor-pointer"
                    >
                      Save card for future purchases
                    </Label>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card
            className={`border ${paymentMethod === "cash" ? "border-primary" : ""}`}
          >
            <CardContent className="flex items-center space-x-3 p-4">
              <RadioGroupItem value="cash" id="cash" />
              <Label htmlFor="cash" className="cursor-pointer">
                <div>
                  <p className="font-medium">Cash on Delivery</p>
                  <p className="text-sm text-muted-foreground">
                    Pay when your order is delivered
                  </p>
                </div>
              </Label>
            </CardContent>
          </Card>

          <Card
            className={`border ${paymentMethod === "bkash" ? "border-primary" : ""}`}
          >
            <CardContent className="flex items-center space-x-3 p-4">
              <RadioGroupItem value="bkash" id="bkash" />
              <Label htmlFor="bkash" className="cursor-pointer">
                <div>
                  <p className="font-medium">bKash</p>
                  <p className="text-sm text-muted-foreground">
                    Pay using bKash mobile banking
                  </p>
                </div>
              </Label>
            </CardContent>
          </Card>
        </RadioGroup>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onBack}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Shipping
          </Button>
          <Button type="submit">
            Continue to Review
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
