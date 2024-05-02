"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import LoginButton from "@/components/features/auth/LoginButton";
import { useEffect } from "react";

type ErrorProps = {
	error: Error & { digest?: string };
	reset: () => void;
};

function Error({ error, reset }: ErrorProps) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<main>
			<Card className="m-auto mt-4 max-w-lg">
				<CardHeader>
					<CardTitle>You need to be logged in to access this page</CardTitle>
				</CardHeader>

				<CardFooter className="flex justify-center">
					<LoginButton />
				</CardFooter>
			</Card>
		</main>
	);
}

export default Error;
