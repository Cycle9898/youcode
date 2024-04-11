import { Layout, LayoutContent, LayoutHeader, LayoutTitle } from "@/components/layout/layout";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

async function AdminDashboardPage() {
	return (
		<Layout>
			<LayoutHeader>
				<LayoutTitle>Admin dashboard</LayoutTitle>
			</LayoutHeader>

			<LayoutContent>
				<Link className={cn(buttonVariants({ variant: "secondary" }), "w-full p-7")} href="/admin/courses">
					My courses
				</Link>
			</LayoutContent>
		</Layout>
	);
}

export default AdminDashboardPage;
