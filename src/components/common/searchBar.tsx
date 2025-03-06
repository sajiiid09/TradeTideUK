"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getBooksBySearch } from "@/lib/repositories/book.repository";
import { TBook } from "./bookList";
import Link from "next/link";
import { toast } from "sonner";

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<TBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchBooks = async (query: string, pageNum = 1) => {
    setLoading(true);
    setError(null);

    try {
      const result = await getBooksBySearch(query, pageNum);
      if (result) {
        setSearchResults(result.books);
        setTotalPages(result.totalPages);
        setTotalResults(result.total);
        setPage(pageNum);
        toast.success(`Search returned ${result.total} books`);
      } else {
        setError("No books found.");
        toast.error("No books found.");
      }
    } catch (err) {
      setError("Failed to fetch search results.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    await fetchBooks(searchQuery, 1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-white/10 hover:bg-white/20 text-white"
        >
          <Search className="mr-2 w-4 h-4" />
          Search Books
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 sm:max-w-[425px] text-white">
        <DialogHeader>
          <DialogTitle>Search Books</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Enter book title or author"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="border-gray-700 bg-gray-800 text-white"
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </form>

        {error && <p className="text-red-500">{error}</p>}

        {searchResults.length > 0 && (
          <div className="mt-4">
            <h3 className="mb-2 font-semibold text-lg">
              Results ({totalResults} found):
            </h3>
            <ul className="space-y-2">
              {searchResults.map(book => (
                <li key={book.id} className="text-md my-2">
                  <Link href={`/book/${book.id}`}>
                    <strong className="underline">{book.title}</strong> by{" "}
                    {book.author}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Pagination Controls */}
            <div className="flex justify-between mt-4">
              <Button
                variant="outline"
                disabled={page <= 1 || loading}
                onClick={() => fetchBooks(searchQuery, page - 1)}
              >
                Previous
              </Button>
              <span>
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                disabled={page >= totalPages || loading}
                onClick={() => fetchBooks(searchQuery, page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
