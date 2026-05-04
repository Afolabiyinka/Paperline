import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs"
import { Cog, Settings, User } from "lucide-react"
import UpdateProfile from "./updateprofile"


const SettingsTabs = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <Button variant={`ghost`} size={`icon-lg`}>
                    <Cog size={30} />
                </Button>
            </DialogTrigger>

            <DialogContent className="">
                <Tabs>
                    <TabsList variant={`line`}>
                        <TabsTrigger value="update-profile">
                            <User />Update Profile</TabsTrigger>
                        <TabsTrigger value="account-settings">
                            <Settings />Account Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="update-profile" className="p-2">
                        <UpdateProfile />
                    </TabsContent>
                    <TabsContent value="account-settings">
                        Account Settings coming soon!
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}

export default SettingsTabs
