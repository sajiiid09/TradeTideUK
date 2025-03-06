import { TBook } from "../bookList";

export interface IAddBookModalProps {
  userId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onBookAdded: (book: TBook) => void;
}
