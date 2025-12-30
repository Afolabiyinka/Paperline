import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUser from "../../hooks/useUser";
import { useCloudinary } from "@/utils/cloudinary";
import { useAuthStore } from "@/app/store/authStore";

const Onboarding = () => {
  const { updateProfilePic } = useUser();
  const { authUser } = useAuthStore();
  const { uploadImage } = useCloudinary();
  const [step, setStep] = useState("profile");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);
    const image_url = await uploadImage(file, "paperline/profile_pics");
    if (image_url) updateProfilePic(image_url);
  };

  return (
    <div className="flex h-screen flex-col justify-center items-center w-full border  gap-6">
      <Tabs value={step} className="w-full md:w-1/2">
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Edit your profile</CardTitle>
              <CardDescription className="text-lg">
                Quick polish before you start writing.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6">
              <div className="flex flex-col items-center gap-3">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={avatarPreview ?? authUser?.profilePic} />
                  <AvatarFallback>
                    {authUser?.username.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>

                <Label
                  htmlFor="avatar"
                  className="cursor-pointer text-sm text-muted-foreground underline"
                >
                  Add profile picture
                </Label>
                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
            </CardContent>

            <CardFooter>
              <Button className="w-full" onClick={() => setStep("blog")}>
                Continue
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* STEP 2 — REDIRECT */}
        <TabsContent value="blog">
          <Card>
            <CardHeader>
              <CardTitle>Almost there</CardTitle>
              <CardDescription>Let’s create your first blog.</CardDescription>
            </CardHeader>

            <CardContent className="flex justify-center py-10">
              <Button
                size="lg"
                className="w-full"
                onClick={() => navigate("/blogs/create")}
              >
                Go to Create Blog 🚀
              </Button>
            </CardContent>

            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setStep("profile")}
              >
                Back
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Onboarding;
