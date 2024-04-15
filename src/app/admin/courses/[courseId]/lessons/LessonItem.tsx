import { Typography } from "@/components/ui/Typography";
import { Badge } from "@/components/ui/badge";
import { Lesson } from "@prisma/client";

type LessonItemProps = {
	lesson: Lesson;
};

function LessonItem({ lesson }: LessonItemProps) {
	return (
		<div className="flex items-center justify-between rounded border-border bg-card px-4 py-2 transition-colors hover:bg-accent">
			<Typography variant="large">{lesson.name}</Typography>
			<Badge>{lesson.state}</Badge>
		</div>
	);
}

export default LessonItem;
