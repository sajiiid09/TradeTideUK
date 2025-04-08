"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Mock orders data
const mockOrders = [
  {
    id: "ord123",
    orderNumber: "BD12345",
    status: "DELIVERED",
    total: 14000,
    createdAt: "2023-05-10T09:15:00Z",
    items: [
      { name: "Jamdani Saree", quantity: 1, price: 12500 },
      { name: "Jute Handbag", quantity: 1, price: 1500 },
    ],
  },
  {
    id: "ord456",
    orderNumber: "BD12346",
    status: "PROCESSING",
    total: 3500,
    createdAt: "2023-06-18T11:30:00Z",
    items: [{ name: "Nakshi Kantha", quantity: 1, price: 3500 }],
  },
  {
    id: "ord789",
    orderNumber: "BD12347",
    status: "SHIPPED",
    total: 4500,
    createdAt: "2023-07-22T14:45:00Z",
    items: [{ name: "Silk Panjabi", quantity: 1, price: 4500 }],
  },
  {
    id: "ord101",
    orderNumber: "BD12348",
    status: "CANCELLED",
    total: 1800,
    createdAt: "2023-08-05T10:20:00Z",
    items: [{ name: "Terracotta Jewelry Set", quantity: 1, price: 1800 }],
  },
  {
    id: "ord102",
    orderNumber: "BD12349",
    status: "DELIVERED",
    total: 2200,
    createdAt: "2023-09-12T16:30:00Z",
    items: [{ name: "Wooden Jewelry Box", quantity: 1, price: 2200 }],
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<typeof mockOrders>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    // Simulate API fetch
    const fetchOrders = async () => {
      try {
        // In a real app, you would fetch from your API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setOrders(mockOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "PROCESSING":
        return "bg-blue-100 text-blue-800";
      case "SHIPPED":
        return "bg-purple-100 text-purple-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesStatus =
      statusFilter === "ALL" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="pl-9"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Orders</SelectItem>
              <SelectItem value="PROCESSING">Processing</SelectItem>
              <SelectItem value="SHIPPED">Shipped</SelectItem>
              <SelectItem value="DELIVERED">Delivered</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-12 bg-muted rounded-lg">
          <h2 className="text-xl font-semibold mb-2">No Orders Found</h2>
          <p className="text-muted-foreground mb-6">
            {searchQuery || statusFilter !== "ALL"
              ? "No orders match your search criteria. Try adjusting your filters."
              : "You haven't placed any orders yet."}
          </p>
          <Button asChild>
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map(order => (
            <Card key={order.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-muted p-4 flex flex-col sm:flex-row justify-between">
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-semibold">
                        Order #{order.orderNumber}
                      </h3>
                      <Badge className={`ml-2 ${getStatusColor(order.status)}`}>
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0 text-right">
                    <p className="font-semibold">
                      ৳{order.total.toLocaleString()}
                    </p>
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 h-auto"
                      asChild
                    >
                      <Link href={`/user/orders/${order.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-medium mb-2">Items</h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>
                          {item.name} × {item.quantity}
                        </span>
                        <span>৳{item.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
