import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const main = async () => {
	const users = [];

	// create 10 random users with 1 course for reach
	for (let i = 0; i < 10; i++) {
		users.push(
			await prisma.user.create({
				data: {
					email: faker.internet.email(),
					createdAt: faker.date.past(),
					createdCourses: {
						create: {
							name: faker.lorem.words(3),
							createdAt: faker.date.past(),
							presentation: faker.lorem.paragraph(),
							image: faker.image.url(),
							lessons: {
								createMany: {
									data: [
										{
											name: faker.lorem.words(3),
											content: faker.lorem.paragraph(),
											rank: "aaaaaa"
										},
										{
											name: faker.lorem.words(3),
											content: faker.lorem.paragraph(),
											rank: "aaaaab"
										}
									]
								}
							}
						}
					}
				}
			})
		);
	}

	//link these users to courses
	const courses = await prisma.course.findMany();

	for (const course of courses) {
		const threeRandomUsers = faker.helpers.arrayElements(users, 6);

		for (const user of threeRandomUsers) {
			await prisma.courseOnUser.create({
				data: {
					userId: user.id,
					courseId: course.id
				}
			});
		}
	}
};

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async error => {
		console.log(error);

		await prisma.$disconnect();

		process.exit(1);
	});
