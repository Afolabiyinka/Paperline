import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function PricingCard() {
  const navigate = useNavigate();

  return (
    <Card className="w-full md:w-[80%] mx-auto flex flex-col md:flex-row border-neutral-200">

      {/* Left */}
      <CardHeader className="flex-1 py-16 px-8 text-center md:text-left space-y-3">

        <h1 className="text-2xl md:text-3xl font-serif font-normal text-black">
          Free access
        </h1>

        <p className="text-sm text-neutral-500 max-w-sm">
          Read and write without limits. No subscription required.
        </p>

      </CardHeader>

      {/* Right */}
      <div className="flex-1 border-t md:border-t-0 md:border-l border-neutral-200">

        <CardContent className="grid gap-3 px-8 py-8">

          {[
            "Unlimited reading",
            "Weekly updates",
            "Save bookmarks",
            "Clean reading experience",
          ].map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-3 text-sm text-neutral-700"
            >

              <CheckCircle className="w-4 h-4 text-neutral-400" />

              <p>{feature}</p>

            </div>
          ))}

          <Button
            onClick={() => navigate("/blogs")}
            variant="ghost"
            className="mt-4 text-sm w-fit"
          >
            Start reading
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

        </CardContent>

      </div>

    </Card>
  );
}