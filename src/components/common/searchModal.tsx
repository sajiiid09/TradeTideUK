import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Link from "next/link";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import SanityImage from "./sanity-image.client";

import { Input } from "@/components/ui/input";
import { searchProduct } from "@/lib/repositories/product.repository";

import type { Product as TProduct } from "@prisma/client";
import { LoadingSpinner } from "./loadingSpinner";

const formSchema = z.object({
  query: z.string().min(2, {
    message: "Search query must be at least 2 characters.",
  }),
});

export function SearchModal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  const [searchResults, setSearchResults] = useState<TProduct[] | undefined>();

  const { watch } = form;
  const query = watch("query");

  useEffect(() => {
    let debounceTimer: NodeJS.Timeout | null = null;

    const fetchSearchResults = async () => {
      if (query.length >= 2) {
        try {
          const results = await searchProduct(query);
          setSearchResults(results);
        } catch (error) {
          console.error("Error fetching search results:", error);
          setSearchResults(undefined);
        }
      } else {
        setSearchResults([]);
      }
    };

    debounceTimer = setTimeout(() => {
      fetchSearchResults();
    }, 800);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>
            Enter a keyword to search through the available items.
          </DialogDescription>
        </DialogHeader>

        {/* Search Input */}
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Input
              id="query"
              {...form.register("query")}
              placeholder="Search..."
              className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md"
            />
          </div>
        </div>

        {/* Display Search Results */}
        {searchResults && searchResults.length > 0 ? (
          <div className="max-h-64 overflow-y-auto border rounded-md p-2 space-y-2">
            {searchResults.map((result, index) => (
              <Link
                href={`/products/${result.id}`}
                key={index}
                onClick={handleCloseModal}
              >
                <div className="flex items-center gap-4 p-2 hover:bg-gray-100 rounded-md transition-colors">
                  <SanityImage
                    image={result.image[0]}
                    alt={result.name}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                  <div>
                    <p className="font-medium text-sm">{result.name}</p>
                    <p className="text-xs text-gray-500">
                      {result.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          query.length >= 2 && (
            <div className="flex items-center justify-center">
              <LoadingSpinner size={8} />
            </div>
          )
        )}

        {/* Show error message if validation fails */}
        {form.formState.errors.query && (
          <p className="text-red-500 text-sm mt-2">
            {form.formState.errors.query.message}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
