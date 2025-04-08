"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Edit, MapPin, Phone, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Mock user data based on the Prisma schema
const mockUserProfile = {
  id: "clq1234567",
  role: "CUSTOMER",
  firstName: "Rahul",
  lastName: "Ahmed",
  phoneNumber: "+880 1712 345678",
  address: "123 Green Road, Dhaka",
  image: "/placeholder.svg?height=200&width=200",
  createdAt: "2023-01-15T08:30:00Z",
  updatedAt: "2023-06-20T14:45:00Z",
  userId: "auth0|123456789",
  orders: [
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
  ],
  wishlists: [
    {
      id: "wl1",
      name: "Silk Panjabi",
      price: 4500,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "wl2",
      name: "Terracotta Jewelry Set",
      price: 1800,
      image: "/placeholder.svg?height=100&width=100",
    },
  ],
};

export default function UserProfilePage() {
  const [userProfile, setUserProfile] = useState<typeof mockUserProfile | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchUserProfile = async () => {
      try {
        // In a real app, you would fetch from your API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUserProfile(mockUserProfile);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">Profile Not Found</h2>
        <p className="text-muted-foreground mb-6">
          We couldn&apos;t find your profile information.
        </p>
        <Button asChild>
          <Link href="/user/onboard">Complete Your Profile</Link>
        </Button>
      </div>
    );
  }

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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <Button asChild>
          <Link href="/user/settings">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Link>
        </Button>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="relative w-32 h-32 rounded-full overflow-hidden">
              <Image
                src={userProfile.image || "/placeholder.svg"}
                alt={`${userProfile.firstName} ${userProfile.lastName}`}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2">
                {userProfile.firstName} {userProfile.lastName}
              </h2>
              <Badge variant="outline" className="mb-4">
                {userProfile.role === "CUSTOMER" ? "Customer" : "Admin"}
              </Badge>
              <div className="space-y-2">
                <div className="flex items-center justify-center md:justify-start text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{userProfile.address}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start text-muted-foreground">
                  <Phone className="mr-2 h-4 w-4" />
                  <span>{userProfile.phoneNumber}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start text-muted-foreground">
                  <Mail className="mr-2 h-4 w-4" />
                  <span>user@example.com</span>
                </div>
                <div className="flex items-center justify-center md:justify-start text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Member since {formatDate(userProfile.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="orders">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="orders">Recent Orders</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-6">
          <div className="space-y-4">
            {userProfile.orders.map(order => (
              <Card key={order.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row justify-between mb-4">
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-semibold">
                          Order #{order.orderNumber}
                        </h3>
                        <Badge
                          className={`ml-2 ${getStatusColor(order.status)}`}
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Placed on {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0">
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
                  <Separator className="my-2" />
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
                </CardContent>
              </Card>
            ))}
            <div className="text-center mt-4">
              <Button variant="outline" asChild>
                <Link href="/user/orders">View All Orders</Link>
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="wishlist" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {userProfile.wishlists.map(item => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm font-semibold mt-1">
                        ৳{item.price.toLocaleString()}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 text-xs"
                        >
                          Add to Cart
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 text-xs text-destructive"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-4">
            <Button variant="outline" asChild>
              <Link href="/user/wishlist">View Full Wishlist</Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
