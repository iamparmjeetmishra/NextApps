"use client";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Message } from "@/model/User";
import { useToast } from "./ui/use-toast";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";


type MessageCardProps = {
   message: Message,
   onMessageDelete: (messageId: string) => void
}

export default function MessageCard({message, onMessageDelete}: MessageCardProps) {

   const { toast } = useToast()
   
   const handleDeleteConfirm = async () => {
      const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
      toast({
         title: response.data.message,
      })
      onMessageDelete(message._id)
   }

	return (
		<Card>
			<CardHeader>
				<CardTitle>Title</CardTitle>
				<CardDescription>
					description
				</CardDescription>
			</CardHeader>
			<CardContent>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button variant="outline">
							Show Dialog
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								Are you absolutely sure?
							</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be
								undone. This will
								permanently delete your
								account and remove your
								data from our servers.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>
								Cancel
							</AlertDialogCancel>
                     <AlertDialogAction
                        onClick={handleDeleteConfirm}
                     >
								Continue
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</CardContent>
		</Card>
	);
};

// export default MessageCard;
