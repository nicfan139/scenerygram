import { useNavigate, Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';

interface IBackLinkProps {
	to: string | number;
	label: string;
}

const BackLink = ({ to, label }: IBackLinkProps): React.ReactElement => {
	const navigate = useNavigate();
	return (
		<div className="mb-4">
			{typeof to === 'number' && (
				<a onClick={() => navigate(to)} className="flex gap-1 items-center">
					<FiChevronLeft />
					{label}
				</a>
			)}

			{typeof to === 'string' && (
				<Link to="/posts" className="flex gap-1 items-center">
					<FiChevronLeft />
					{label}
				</Link>
			)}
		</div>
	);
};

export default BackLink;
