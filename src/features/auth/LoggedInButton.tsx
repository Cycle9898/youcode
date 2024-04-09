"use client";

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Loader from "@/components/ui/loader";
import { useMutation } from "@tanstack/react-query";
import { LogOut, UserRoundCog } from "lucide-react";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";

export type LoggedInButtonProps = {
	user: Session["user"];
};

function LoggedInButton({ user }: LoggedInButtonProps) {
	const mutation = useMutation({
		mutationFn: async () => signOut()
	});

	return (
		<DropdownMenu>
			<AlertDialog>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="sm">
						<Avatar className="mr-2 size-6">
							<AvatarFallback>{user?.name?.[0]}</AvatarFallback>
							{user.image && <AvatarImage src={user.image} alt={`${user.name ?? "user"} profile pic`} />}
						</Avatar>
						{user.name}
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent>
					<DropdownMenuItem asChild>
						<Link href="/account">
							<UserRoundCog className="mr-2" size={12} />
							My account
						</Link>
					</DropdownMenuItem>

					<DropdownMenuSeparator />

					<AlertDialogTrigger asChild>
						<DropdownMenuItem>
							<LogOut className="mr-2" size={12} />
							Logout
						</DropdownMenuItem>
					</AlertDialogTrigger>
				</DropdownMenuContent>

				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure you want to logout ?</AlertDialogTitle>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<Button variant="destructive" disabled={mutation.isPending} onClick={() => mutation.mutate()}>
							{mutation.isPending ? (
								<Loader className="mr-2" size={12} />
							) : (
								<LogOut className="mr-2" size={12} />
							)}
							Logout
						</Button>

						<AlertDialogCancel asChild>
							<Button variant="secondary">Cancel</Button>
						</AlertDialogCancel>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</DropdownMenu>
	);
}

export default LoggedInButton;
