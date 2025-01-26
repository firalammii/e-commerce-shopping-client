import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar";

export function MyAvatar ({ avatarURL, avatarFb }) {
	return (
		<Avatar>
			<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
			<AvatarFallback>{avatarFb}</AvatarFallback>
		</Avatar>
	);
}
