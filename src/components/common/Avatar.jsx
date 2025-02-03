import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar";

export function MyAvatar ({ avatarURL, avatarFb, size }) {
	return (
		<Avatar className={`w-${size} h-${size}`}>
			<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
			<AvatarFallback>{avatarFb}</AvatarFallback>
		</Avatar>
	);
}
