import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs"
import { Cog, User } from "lucide-react"
import UpdateProfile from "./updateprofile"


const SettingsTabs = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <Button variant={`secondary`} size={`icon-lg`}>
                    <Cog />
                </Button>
            </DialogTrigger>

            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <Tabs>
                    <TabsList variant={`line`}>
                        <TabsTrigger value="update-profile">
                            <User />Update Profile</TabsTrigger>

                    </TabsList>
                    <TabsContent value="update-profile" className="p-2">
                        <UpdateProfile />
                    </TabsContent>

                </Tabs>
            </DialogContent>
        </Dialog>
    )
}

export default SettingsTabs
