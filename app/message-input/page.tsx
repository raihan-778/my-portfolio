// "use client";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { useCompletion } from "@ai-sdk/react";
// import Link from "next/link";

// import { toast } from "sonner";

// const specialChar = "||";

// const parseStringMessages = (messageString: string): string[] => {
//   return messageString.split(specialChar).filter((msg) => msg.trim());
// };

// const initialMessageString =
//   "What's your favorite movie?||Do you have any pets?||What's your dream job?";

// export default function SendMessage() {
//   const {
//     complete,
//     completion,
//     isLoading: isSuggestLoading,
//   } = useCompletion({
//     api: "/api/suggest-message",
//     initialCompletion: initialMessageString,
//     onFinish: (finalComplition) => {
//       console.log("Final completion:", finalComplition);
//     },
//   });

//   //   const [isLoading, setIsLoading] = useState(false);

//   const fetchSuggestedMessages = async () => {
//     try {
//       await complete("");
//       console.log("suggested messages Complition:", completion);

//       // Using append() instead of complete()
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//       // Handle error appropriately (e.g., show toast notification)
//       if (error instanceof Error) {
//         toast.error(`Failed to get suggestions: ${error.message}`);
//       }
//     }
//   };

//   const suggestedMessages = parseStringMessages(completion);
//   console.log("Suggested Messages:", suggestedMessages);

//   return (
//     <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
//       <h1 className="text-4xl font-bold mb-6 text-center">
//         Public Profile Link
//       </h1>

//       <div className="space-y-4 my-8">
//         <div className="space-y-2">
//           <Button
//             onClick={fetchSuggestedMessages}
//             className="my-4"
//             disabled={isSuggestLoading}
//           >
//             {isSuggestLoading ? "Generating..." : "Suggested Messages"}
//           </Button>
//           <p>Click on any message below to select it.</p>
//         </div>
//         <Card>
//           <CardHeader>
//             <h3 className="text-xl font-semibold">Messages</h3>
//           </CardHeader>
//           {suggestedMessages.length > 0 && (
//             <CardContent className="flex flex-col space-y-4">
//               {suggestedMessages}
//             </CardContent>
//           )}
//         </Card>
//       </div>
//       <Separator className="my-6" />
//       <div className="text-center">
//         <div className="mb-4">Get Your Message Board</div>
//         <Link href={"/sign-up"}>
//           <Button>Create Your Account</Button>
//         </Link>
//       </div>
//     </div>
//   );
// }
"use client";

import { useChat } from "@ai-sdk/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((message) => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === "user" ? "User: " : "AI: "}
          {message.parts.map((part, i) => {
            switch (part.type) {
              case "text":
                return <div key={`${message.id}-${i}`}>{part.text}</div>;
            }
          })}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
