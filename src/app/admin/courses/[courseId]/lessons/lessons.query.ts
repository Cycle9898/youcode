import { prisma } from "@/db/prisma";

type GetCourseLessonsParams = {
	courseId: string;
	userId: string;
};

export const getCourseLessons = async ({ courseId, userId }: GetCourseLessonsParams) => {
	return await prisma.course.findFirst({
		where: {
			id: courseId,
			creatorId: userId
		},
		select: {
			id: true,
			name: true,
			lessons: true
		}
	});
};
