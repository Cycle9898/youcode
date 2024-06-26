import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";
import { Typography } from "../ui/Typography";

export function Layout(props: ComponentPropsWithoutRef<"div">) {
	return (
		<div {...props} className={cn("max-w-3xl flex-wrap w-full flex gap-4 m-auto px-4 mt-4", props.className)}>
			{props.children}
		</div>
	);
}

export function LayoutHeader(props: ComponentPropsWithoutRef<"div">) {
	return (
		<div
			{...props}
			className={cn("flex items-start gap-1 flex-col w-full md:flex-1 min-w-[200px]", props.className)}>
			{props.children}
		</div>
	);
}

export function LayoutTitle(props: ComponentPropsWithoutRef<"h1">) {
	return <Typography {...props} variant="h2" className={cn(props.className)} />;
}

export function LayoutDescription(props: ComponentPropsWithoutRef<"p">) {
	return <Typography {...props} className={cn(props.className)} />;
}

export function LayoutActions(props: ComponentPropsWithoutRef<"div">) {
	return (
		<div {...props} className={cn("flex items-center", props.className)}>
			{props.children}
		</div>
	);
}

export function LayoutContent(props: ComponentPropsWithoutRef<"div">) {
	return (
		<div {...props} className={cn("w-full", props.className)}>
			{props.children}
		</div>
	);
}
