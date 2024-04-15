import { Layout, LayoutContent, LayoutHeader, LayoutTitle } from "@/components/layout/layout";
import { Typography } from "@/components/ui/Typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getRequiredAuthSession } from "@/lib/auth";
import { getCourse } from "./course.query";
import Link from "next/link";
import PaginationButton from "@/features/auth/pagination/PaginationButton";
import { buttonVariants } from "@/components/ui/button";

type CoursePageProps = {
	params: { courseId: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

async function CoursePage({ params, searchParams }: CoursePageProps) {
	const pageNb = Number(searchParams.page ?? 0);

	const session = await getRequiredAuthSession();

	const course = await getCourse({
		courseId: params.courseId,
		userId: session.user.id,
		userPage: pageNb
	});

	return (
		<Layout>
			<LayoutHeader>
				<LayoutTitle>Course informations</LayoutTitle>
			</LayoutHeader>

			<LayoutContent className="flex flex-col gap-4 lg:flex-row">
				<Card className="flex-[2]">
					<CardHeader>
						<CardTitle>Users</CardTitle>
					</CardHeader>

					<CardContent className="mt-4">
						<Table className="mb-4">
							<TableHeader>
								<TableRow>
									<TableHead>User avatar</TableHead>
									<TableHead>User mail</TableHead>
								</TableRow>
							</TableHeader>

							<TableBody>
								{course.users?.map(user => {
									return (
										<TableRow>
											<TableCell>
												<Avatar className="rounded">
													<AvatarFallback>{user.email?.[0]}</AvatarFallback>
													{user.image && (
														<AvatarImage
															src={user.image}
															alt={`user: ${user.email} miniature`}
														/>
													)}
												</Avatar>
											</TableCell>

											<TableCell>
												<Typography as={Link} href={`/admin/users/${user.id}`} variant="large">
													{user.email}
												</Typography>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>

						<PaginationButton
							totalPage={Math.floor((course._count?.users ?? 0) / 5)}
							pageNb={pageNb}
							baseUrl={`/admin/courses/${course.id}`}
						/>
					</CardContent>
				</Card>

				<Card className="flex-1">
					<CardHeader className="flex flex-row items-center gap-4 space-y-0">
						<Avatar className="rounded">
							<AvatarFallback>{course.name?.[0]}</AvatarFallback>
							{course.image && <AvatarImage src={course.image} alt={`${course.name} miniature`} />}
						</Avatar>

						<CardTitle>{course.name}</CardTitle>
					</CardHeader>

					<CardContent className="flex flex-col gap-1">
						<Typography>{course._count?.users} users</Typography>
						<Typography>{course._count?.lessons} lessons</Typography>
						<Link
							href={`/admin/course/${course.id}/edit`}
							className={buttonVariants({ variant: "outline" })}>
							Edit
						</Link>{" "}
						<Link
							href={`/admin/course/${course.id}/lessons`}
							className={buttonVariants({ variant: "outline" })}>
							Edit lessons
						</Link>
					</CardContent>
				</Card>
			</LayoutContent>
		</Layout>
	);
}

export default CoursePage;
