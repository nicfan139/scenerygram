type TUser = {
	id: string;
	firstName: string;
	lastName: string;
	username: string;
	lastname: string;
	avatarUrl: string;
	posts: TPost[];
	createdAt: string;
	updatedAt: string;
};

type TPost = {
	id: string;
	imgUrl: string;
	caption: string;
	liks: TUser[];
	comments: TComment[];
	createdAt: string;
	updatedAt: string;
};

type TComment = {
	id: string;
	text: string;
	author: TUser;
	likes: TUser[];
};
