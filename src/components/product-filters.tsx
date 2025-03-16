"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export default function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 15000]);

  const categories = [
    { id: "clothing", label: "Clothing" },
    { id: "home-decor", label: "Home Decor" },
    { id: "accessories", label: "Accessories" },
    { id: "gifts", label: "Gifts" },
  ];

  const materials = [
    { id: "cotton", label: "Cotton" },
    { id: "silk", label: "Silk" },
    { id: "jute", label: "Jute" },
    { id: "bamboo", label: "Bamboo" },
    { id: "clay", label: "Clay" },
    { id: "wood", label: "Wood" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Filters</h3>
        <Button variant="outline" size="sm" className="w-full">
          Clear All
        </Button>
      </div>

      <Accordion
        type="multiple"
        defaultValue={["categories", "price", "materials"]}
      >
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {categories.map(category => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox id={category.id} />
                  <Label htmlFor={category.id}>{category.label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={[0, 15000]}
                max={15000}
                step={500}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex items-center justify-between">
                <span>৳{priceRange[0].toLocaleString()}</span>
                <span>৳{priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="materials">
          <AccordionTrigger>Materials</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {materials.map(material => (
                <div key={material.id} className="flex items-center space-x-2">
                  <Checkbox id={material.id} />
                  <Label htmlFor={material.id}>{material.label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
