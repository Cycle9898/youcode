"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type PaginationButtonProps = {
	totalPage: number;
	pageNb: number;
	baseUrl: string;
};

function PaginationButton({ totalPage, pageNb, baseUrl }: PaginationButtonProps) {
	const router = useRouter();

	const handlePreviousPage = () => {
		const searchParams = new URLSearchParams({
			page: String(pageNb - 1)
		});

		const url = `${baseUrl}?${searchParams.toString()}`;

		router.push(url);
	};

	const handleNextPage = () => {
		const searchParams = new URLSearchParams({
			page: String(pageNb + 1)
		});

		const url = `${baseUrl}?${searchParams.toString()}`;

		router.push(url);
	};

	return (
		<div className="flex gap-2">
			<Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={pageNb <= 0}>
				Previous
			</Button>

			<Button variant="outline" size="sm" onClick={handleNextPage} disabled={pageNb > totalPage - 2}>
				Next
			</Button>
		</div>
	);
}

export default PaginationButton;
