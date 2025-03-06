"use client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useSession, signIn } from "next-auth/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import AddBookModal from "@/components/common/addBookModal";

import type { TBook } from "@/components/common/bookList";

export const AddNewBooksHome = () => {
  const { data: session } = useSession();
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [books, setBooks] = useState<TBook[]>([]);
  const handleAddBook = (newBook: TBook) => {
    setBooks(prevBooks => [newBook, ...prevBooks]);
    console.log(books);
  };

  if (session?.user) {
    return (
      <>
        <Button
          onClick={() => setIsAddBookModalOpen(true)}
          className="bg-white hover:bg-gray-200 text-violet"
        >
          <PlusCircle className="mr-2 w-5 h-5" />
          Add New Book
        </Button>
        <AddBookModal
          isOpen={isAddBookModalOpen}
          setIsOpen={setIsAddBookModalOpen}
          userId={session?.user?.id ?? "0"}
          onBookAdded={handleAddBook}
        />
      </>
    );
  } else {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="lg"
            variant="outline"
            className="border-white hover:bg-white/10 text-purple-600 hover:text-white duration-300"
          >
            <span className="flex items-center">
              <PlusCircle className="mr-2 w-5 h-5" />
              Add New Book
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-gray-900 text-white sm:max-w-[425px] mr-4">
          <DialogHeader>
            <DialogTitle>Need to login first</DialogTitle>
            <DialogDescription>
              You need to login to add new books in the library.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                className="my-2 bg-white text-purple-500 hover:bg-purple-500 hover:text-white duration-300 w-full"
                onClick={() => signIn("google")}
              >
                Login
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
};
