"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type TCartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color: string;
}
interface ICartItemProps {
  item: TCartItem; 
  updateQuantity: (id: number, quantity: number)=>void; 
  removeItem: (id: number)=>void;
}

export const CartItems = ({item, updateQuantity, removeItem}: ICartItemProps)=>{
  return(
    <div
    className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg"
  >
    <div className="relative w-full sm:w-24 h-24 flex-shrink-0">
      <Image
        src={item.image || "https://picsum.photos/200/300"}
        alt={item.name}
        fill
        className="object-cover rounded-md"
      />
    </div>
    <div className="flex-1 space-y-2">
      <div className="flex justify-between">
        <Link
          href={`/products/${item.id}`}
          className="font-medium hover:underline"
        >
          {item.name}
        </Link>
        <p className="font-semibold">
          ৳{(item.price * item.quantity).toLocaleString()}
        </p>
      </div>
      <p className="text-sm text-muted-foreground">
        Color: {item.color}
      </p>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() =>
              updateQuantity(item.id, item.quantity - 1)
            }
          >
          <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() =>
              updateQuantity(item.id, item.quantity + 1)
            }
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
          onClick={() => removeItem(item.id)}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Remove
        </Button>
      </div>
    </div>
  </div>
  )
}
