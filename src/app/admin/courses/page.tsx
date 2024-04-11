import { Layout, LayoutContent, LayoutHeader, LayoutTitle } from "@/components/layout/layout";
import { Typography } from "@/components/ui/Typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { prisma } from "@/db/prisma";
import { getRequiredAuthSession } from "@/lib/auth";
import Link from "next/link";

async function CoursesPage() {
	const session = await getRequiredAuthSession();

	const courses = await prisma.course.findMany({
		where: {
			creatorId: session.user.id
		}
	});

	return (
		<Layout>
			<LayoutHeader>
				<LayoutTitle>My courses</LayoutTitle>
			</LayoutHeader>

			<LayoutContent>
				<Card>
					<CardContent className="mt-4">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Course miniature</TableHead>
									<TableHead>Course name</TableHead>
								</TableRow>
							</TableHeader>

							<TableBody>
								{courses.map(course => {
									return (
										<TableRow>
											<TableCell>
												<Avatar className="rounded">
													<AvatarFallback>{course.name[0]}</AvatarFallback>
													{course.image && (
														<AvatarImage
															src={course.image}
															alt={`${course.name} miniature`}
														/>
													)}
												</Avatar>
											</TableCell>

											<TableCell>
												<Typography
													as={Link}
													href={`/admin/courses/${course.id}`}
													variant="large">
													{course.name}
												</Typography>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</LayoutContent>
		</Layout>
	);
}

export default CoursesPage;
