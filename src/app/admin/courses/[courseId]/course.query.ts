import { prisma } from "@/db/prisma";

type getCourseParamsType = {
	courseId: string;
	userId: string;
	userPage: number;
};

export const getCourse = async ({ courseId, userId, userPage }: getCourseParamsType) => {
	const courses = await prisma.course.findUnique({
		where: {
			creatorId: userId,
			id: courseId
		},
		select: {
			id: true,
			image: true,
			name: true,
			presentation: true,
			users: {
				take: 5,
				skip: Math.max(0, userPage * 5),
				select: {
					canceledAt: true,
					id: true,
					user: {
						select: {
							email: true,
							id: true,
							image: true
						}
					}
				}
			},
			_count: {
				select: {
					lessons: true,
					users: true
				}
			}
		}
	});

	const users = courses?.users.map(user => {
		return {
			canceled: !!user.canceledAt,
			...user.user
		};
	});

	return {
		...courses,
		users
	};
};
