import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function PricingCard() {
  const navigate = useNavigate();

  return (
    <Card
      className="w-full md:w-[80%] mx-auto flex flex-col md:flex-row"
      size="default"
    >
      <CardHeader className="flex-1 py-20 px-7 text-center md:text-left bg-gray-50 rounded-lg ">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          Free Blog Access
        </h1>
        <p className="mt-3 flex justify-center md:justify-start gap-1 text-5xl sm:text-7xl">
          <span className="mt-2 text-2xl sm:text-4xl">$</span>0
          <span className="self-end text-2xl sm:text-4xl">/mo</span>
        </p>
      </CardHeader>

      <div className="flex-1 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-200">
        <CardContent className="grid gap-4 px-6 sm:px-8 py-8 sm:grid-cols-2">
          {[
            "Unlimited Article Reads",
            "Weekly Newsletter",
            "AI Summaries & Highlights",
            "Bookmark & Save Favorites",
          ].map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="shrink-0  p-2 rounded-full">
                <CheckCircle className="h-8 w-8" />
              </div>
              <p className="text-base sm:text-lg font-medium">{feature}</p>
            </div>
          ))}
          <Button onClick={() => navigate("/blogs")}>Try it Now</Button>
        </CardContent>
      </div>
    </Card>
  );
}
