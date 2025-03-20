import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const formSchema = z.object({
  query: z.string().min(2, {
    message: "Search query must be at least 2 characters.",
  }),
});

const MOCK_DATA = [
  {
    id: 1,
    name: "Apple",
    description: "A sweet fruit often used in pies and salads.",
    image: "https://via.placeholder.com/50?text=Apple",
  },
  {
    id: 2,
    name: "Banana",
    description: "A tropical fruit rich in potassium.",
    image: "https://via.placeholder.com/50?text=Banana",
  },
  {
    id: 3,
    name: "Cherry",
    description: "A small, round fruit that is often red or black.",
    image: "https://via.placeholder.com/50?text=Cherry",
  },
  {
    id: 4,
    name: "Date",
    description: "A sweet fruit commonly found in Middle Eastern cuisine.",
    image: "https://via.placeholder.com/50?text=Date",
  },
  {
    id: 5,
    name: "Elderberry",
    description: "A dark purple berry used in jams and syrups.",
    image: "https://via.placeholder.com/50?text=Elderberry",
  },
  {
    id: 6,
    name: "Fig",
    description: "A soft, sweet fruit often eaten dried.",
    image: "https://via.placeholder.com/50?text=Fig",
  },
  {
    id: 7,
    name: "Grape",
    description: "A small, juicy fruit available in many colors.",
    image: "https://via.placeholder.com/50?text=Grape",
  },
  {
    id: 8,
    name: "Honeydew",
    description: "A melon with a pale green flesh and sweet taste.",
    image: "https://via.placeholder.com/50?text=Honeydew",
  },
];

export function SearchModal({ children }: { children: React.ReactNode }) {
  // 1. Define the form using react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  // 2. State to hold filtered results based on the search query
  const [searchResults, setSearchResults] = useState<
    typeof MOCK_DATA | undefined
  >();

  // 3. Watch the input field for changes and update search results dynamically
  const { watch } = form;
  const query = watch("query");

  useEffect(() => {
    if (query.length >= 2) {
      const filtered = MOCK_DATA.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [query]);

  return (
    <Dialog>
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
              <Link href={`/products/${result.id}`}
                key={index}
                className="flex items-center gap-4 p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <img
                  src={result.image}
                  alt={result.name}
                  className="w-10 h-10 object-cover rounded-full"
                />
                <div>
                  <p className="font-medium text-sm">{result.name}</p>
                  <p className="text-xs text-gray-500">{result.description}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          query.length >= 2 && (
            <p className="text-sm text-gray-500">No results found.</p>
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