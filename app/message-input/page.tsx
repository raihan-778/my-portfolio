"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Loader2, Send, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isSummarizeMode, setIsSummarizeMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/suggest-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          mode: isSummarizeMode ? "summarize" : "chat",
        }),
      });

      const { content } = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Failed to get response. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] max-w-3xl mx-auto p-4 gap-4">
      {/* Mode Toggle */}
      <div className="flex items-center gap-2">
        <Label htmlFor="mode-toggle">Chat Mode</Label>
        <Switch
          id="mode-toggle"
          checked={isSummarizeMode}
          onCheckedChange={setIsSummarizeMode}
        />
        <Label htmlFor="mode-toggle">Summarize Mode</Label>
        {isSummarizeMode && <Sparkles className="w-4 h-4 text-yellow-500" />}
      </div>

      {/* Messages Container */}
      <ScrollArea className="flex-1 rounded-lg border p-4">
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 sticky bottom-4 bg-background pt-2"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            isSummarizeMode
              ? "Paste text to summarize..."
              : "Type your message..."
          }
          className="flex-1"
          disabled={isLoading}
        />
        <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>
    </div>
  );
}
