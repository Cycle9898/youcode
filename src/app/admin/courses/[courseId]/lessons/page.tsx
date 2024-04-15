import { getRequiredAuthSession } from "@/lib/auth";
import { getCourseLessons } from "./lessons.query";
import { notFound } from "next/navigation";
import { Layout, LayoutContent, LayoutHeader, LayoutTitle } from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LessonItem from "./LessonItem";

type CourseLessonsPageProps = {
	params: { courseId: string };
};

async function CourseLessonsPage({ params }: CourseLessonsPageProps) {
	const session = await getRequiredAuthSession();

	const course = await getCourseLessons({ courseId: params.courseId, userId: session.user.id });

	if (!course) {
		notFound();
	}

	return (
		<Layout>
			<LayoutHeader>
				<LayoutTitle>Lessons · {course.name}</LayoutTitle>
			</LayoutHeader>

			<LayoutContent className="flex flex-col gap-4 lg:flex-row">
				<Card className="flex-[2]">
					<CardHeader>
						<CardTitle>Lessons</CardTitle>
					</CardHeader>

					<CardContent className="flex flex-col gap-2">
						{course.lessons.map(lesson => (
							<LessonItem key={lesson.id} lesson={lesson} />
						))}
					</CardContent>
				</Card>
			</LayoutContent>
		</Layout>
	);
}

export default CourseLessonsPage;
