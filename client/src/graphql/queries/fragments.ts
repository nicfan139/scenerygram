import { gql } from '@apollo/client';

export const POST_FRAGMENT = gql`
	fragment PostDetail on Post {
		id
		imgUrl
		caption
		location
		createdAt
		updatedAt
	}
`;
