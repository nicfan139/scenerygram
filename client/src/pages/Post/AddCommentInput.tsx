import { ReactElement, useState, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import { useAddCommentMutation } from '@/graphql';

interface IAddCommentInputProps {
	postId: string;
}

const AddCommentInput = ({ postId }: IAddCommentInputProps): ReactElement => {
	const { isLoading, addComment } = useAddCommentMutation();

	const [comment, setComment] = useState<string>('');

	const onAddComment = async () => {
		try {
			const response = await addComment(postId as string, comment);
			if (response.data.comment) {
				setComment('');
			}
		} catch (e: unknown) {
			const error = e as ErrorEvent;
			console.log(error);
			toast('Unable to add comment');
		}
	};

	return (
		<div className="flex gap-2 mb-4 p-4 bg-white">
			<input
				placeholder="Add a comment"
				className="w-full m-0"
				onChange={(e: ChangeEvent<HTMLInputElement>) => setComment(e.target.value)}
				value={comment}
				disabled={isLoading}
			/>
			<button type="button" onClick={onAddComment} disabled={isLoading || !comment}>
				Send
			</button>
		</div>
	);
};

export default AddCommentInput;
