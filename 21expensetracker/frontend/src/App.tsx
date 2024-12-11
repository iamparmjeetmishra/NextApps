import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function App() {
  return (
    <div>
      <Button>Button</Button>
      <Card className={"w-[380px]"} >
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
    I am content
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          Mark all as read
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}
