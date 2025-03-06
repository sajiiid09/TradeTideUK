"use client";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import { addBookFormSchemaResolver } from "./addBookModal.helper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { createBook } from "@/lib/repositories/book.repository";
import { v4 } from "uuid";
import type { TAddBookFormType } from "./addBookModal.helper";
import type { IAddBookModalProps } from "./addBookModal.types";

import "react-quill/dist/quill.snow.css";
import { toast } from "sonner";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function AddBookModal({
  isOpen,
  setIsOpen,
  userId,
  onBookAdded,
}: IAddBookModalProps) {
  const { control, handleSubmit, reset } = useForm<TAddBookFormType>({
    resolver: addBookFormSchemaResolver,
  });

  const onSubmit = async (data: TAddBookFormType) => {
    const newBook = {
      ...data,
      userId,
      id: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await createBook(newBook);
    reset();
    setIsOpen(false);
    onBookAdded(newBook);
    toast.success("Book added successfully!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-gray-900 sm:max-w-[425px] text-white overflow-y-auto h-[70vh]">
        <DialogHeader>
          <DialogTitle>Add a New Book</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="my-2 flex flex-col gap-4"
        >
          <div>
            <Label htmlFor="title" className="block mb-1 font-medium text-sm">
              Title
            </Label>
            <Controller
              control={control}
              name="title"
              render={({ field, fieldState }) => (
                <>
                  <Input
                    id="title"
                    {...field}
                    className={`border-gray-700 bg-gray-800 text-white ${
                      fieldState.error ? "border-red-500" : ""
                    }`}
                  />
                  {fieldState.error && (
                    <span className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>

          <div>
            <Label htmlFor="author" className="block mb-1 font-medium text-sm">
              Author
            </Label>
            <Controller
              control={control}
              name="author"
              render={({ field, fieldState }) => (
                <>
                  <Input
                    id="author"
                    {...field}
                    className={`border-gray-700 bg-gray-800 text-white ${
                      fieldState.error ? "border-red-500" : ""
                    }`}
                  />
                  {fieldState.error && (
                    <span className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>

          <div>
            <Label htmlFor="rating" className="block mb-1 font-medium text-sm">
              Rating (0-5)
            </Label>
            <Controller
              control={control}
              name="rating"
              render={({ field, fieldState }) => (
                <div className="my-4">
                  <Slider
                    id="rating"
                    defaultValue={[0]}
                    max={5}
                    step={1}
                    value={[field.value]}
                    onValueChange={(value: number[]) =>
                      field.onChange(value[0])
                    }
                    className="w-full"
                  />
                  <span>⭐{field.value}</span>
                  {fieldState.error && (
                    <span className="text-red-500 text-sm font-semibold">
                      {fieldState.error.message}, Please use the slider to set
                      rating
                    </span>
                  )}
                </div>
              )}
            />
          </div>

          <div>
            <Label
              htmlFor="description"
              className="block mb-1 font-medium text-sm"
            >
              Description
            </Label>
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <ReactQuill
                  theme="snow"
                  {...field}
                  onChange={field.onChange}
                  className="bg-gray-800 text-white border border-gray-700 rounded-md"
                />
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-white text-purple-500 hover:bg-black hover:text-white"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Book
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
