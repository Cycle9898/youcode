import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import LogoutButton from "@/components/features/auth/LogoutButton";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";

async function AccountPage() {
	const session = await getAuthSession();
	const user = session?.user;

	if (!session) {
		throw new Error("User not logged in !");
	}

	return (
		<main>
			<Card className="m-auto mt-4 max-w-lg">
				<CardHeader className="flex flex-row gap-4 space-y-0">
					<Avatar>
						<AvatarFallback>{user?.name?.[0]}</AvatarFallback>
						{user?.image && <AvatarImage src={user.image} alt={`${user.name ?? "user"} profile pic`} />}
					</Avatar>

					<div className="flex flex-col gap-1">
						<CardTitle>{user?.email}</CardTitle>
						<CardDescription>{user?.name}</CardDescription>
					</div>
				</CardHeader>

				<CardContent className="flex flex-col gap-2">
					<Link href="/account/settings" className={buttonVariants({ variant: "outline", size: "lg" })}>
						Settings
					</Link>

					<Link href="/admin" className={buttonVariants({ variant: "outline", size: "lg" })}>
						Admin
					</Link>
				</CardContent>

				<CardFooter className="flex justify-end">
					<LogoutButton />
				</CardFooter>
			</Card>
		</main>
	);
}

export default AccountPage;
