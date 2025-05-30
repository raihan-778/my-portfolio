"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { useCompletion } from "@ai-sdk/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";

const specialChar = "||";

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar).filter((msg) => msg.trim());
};

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

export default function SendMessage() {
  const [selectedMessage, setSelectedMessage] = useState("");

  const {
    complete,
    completion,
    isLoading: isSuggestLoading,
    error,
  } = useCompletion({
    api: "/api/suggest-message",
    initialCompletion: initialMessageString,
    onFinish: (finalComplition) => {
      console.log("Final completion:", finalComplition);
    },
  });

  const res = await fetch('/api/suggest-message', {...});
console.log('Response status:', res.status);
const text = await res.text();
console.log('Raw response:', text);

const handleMessageClick=()=>{
  console.log("handleMessageClick")
}

}





  const fetchSuggestedMessages = async () => {
    try {
      await complete("");
      console.log("suggested messages Complition:", completion);

      // Using append() instead of complete()
    } catch (error) {
      console.error("Error fetching messages:", error);
      // Handle error appropriately (e.g., show toast notification)
      if (error instanceof Error) {
        toast.error(`Failed to get suggestions: ${error.message}`);
      }
    }
  };

  const suggestedMessages = parseStringMessages(completion);
  console.log("Suggested Messages:", suggestedMessages);

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Public Profile Link
      </h1>


      <div className="space-y-4 my-8">
        <div className="space-y-2">
          <Button
            onClick={fetchSuggestedMessages}
            className="my-4"
            disabled={isSuggestLoading}
          >
            {isSuggestLoading ? "Generating..." : "Suggested Messages"}
          </Button>
          <p>Click on any message below to select it.</p>
        </div>
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Messages</h3>
          </CardHeader>
          {suggestedMessages.length > 0 && (
            <CardContent className="flex flex-col space-y-4">
              {error ? (
                <p className="text-red-500">{error.message}</p>
              ) : (
                suggestedMessages.map((message, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`p-3 border rounded cursor-pointer ${
                      selectedMessage === message
                        ? "bg-blue-50 border-blue-300"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleMessageClick(message)}
                  >
                    {message}
                  </Button>
                ))
              )}
            </CardContent>
          )}
        </Card>
      </div>
      <Separator className="my-6" />
      <div className="text-center">
        <div className="mb-4">Get Your Message Board</div>
        <Link href={"/sign-up"}>
          <Button>Create Your Account</Button>
        </Link>
      </div>

      {/* Debug info (remove in production) */}
      <div className="text-sm text-gray-500">
        <div>Selected: {selectedMessage}</div>
        <div>Form value: {form.watch("content")}</div>
        <div>Completion: {completion}</div>
      </div>
    </div>
  );
}
