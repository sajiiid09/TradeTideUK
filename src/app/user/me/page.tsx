"use client";
import { useState, useEffect } from "react";

import Dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

import { Edit, MapPin, Phone, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import { getOneUserWithProfile } from "@/lib/repositories/profile.repository";

import type { IOrder, IUser, IWishlist } from "@/types/user.types";

export default function UserProfilePage() {
  const { data: session } = useSession();
  const [userProfile, setUserProfile] = useState<IUser | null>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!session?.user?.id) return;

        const response = await getOneUserWithProfile({ id: session.user.id });
        if (!response.data) return null;
        setUserProfile(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [session?.user?.id]);

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
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Still loading...</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-100 text-green-800";
      case "PROCESSING":
        return "bg-blue-100 text-blue-800";
      case "DISCONTINUED":
        return "bg-purple-100 text-purple-800";
      case "OUT_OF_STOCK":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const joining_date = Dayjs(userProfile.profiles[0].createdAt).format(
    "DD MMM YYYY",
  );
  const _userProfile = userProfile.profiles[0];

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
                src={_userProfile.image || "/placeholder.svg"}
                alt={`${_userProfile.firstName} ${_userProfile.lastName}`}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2">
                {_userProfile.firstName} {_userProfile.lastName}
              </h2>
              <Badge variant="outline" className="mb-4">
                Customer
              </Badge>
              <div className="space-y-2">
                <div className="flex items-center justify-center md:justify-start text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{_userProfile.address}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start text-muted-foreground">
                  <Phone className="mr-2 h-4 w-4" />
                  <span>{_userProfile.phoneNumber}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start text-muted-foreground">
                  <Mail className="mr-2 h-4 w-4" />
                  <span>{userProfile.email}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Member since {joining_date}</span>
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
            {_userProfile.orders.map((order: IOrder) => (
              <Card key={order.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row justify-between mb-4">
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-semibold">Order #{order.id}</h3>
                        <Badge
                          className={`ml-2 ${getStatusColor(order.orderStatus)}`}
                        >
                          {order.orderStatus}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Placed on {Dayjs(order.createdAt).format("DD MMM YYYY")}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      {/* 
                      <p className="font-semibold">
                        ৳{order.total.toLocaleString()}
                      </p> 
                      */}
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
                    {/* 
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>
                          {item.name} × {item.quantity}
                        </span>
                        <span>৳{item.price.toLocaleString()}</span>
                      </div>
                    ))} 
                    */}
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
          {_userProfile.wishlists.map((wishlist: IWishlist) => (
            <Card key={wishlist.id}>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row justify-between mb-4">
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-semibold">
                        Wishlist id #{wishlist.id}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Number of items {wishlist.productId.length}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Placed on{" "}
                      {Dayjs(wishlist.createdAt).format("DD MMM YYYY")}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 h-auto"
                      asChild
                    >
                      <Link href={`/user/wishlist/${wishlist.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
                <Separator className="my-2" />
                <div className="space-y-2"></div>
              </CardContent>
            </Card>
          ))}
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
