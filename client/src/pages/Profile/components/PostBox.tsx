import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

interface IPostBoxProps {
  post: TPost,
  className?: string;
}

const PostBox = ({
  post: {
    id,
    caption,
    createdAt,
    imgUrl
  },
  className
}: IPostBoxProps): React.ReactElement => (
  <Link
    to={`/posts/${id}`}
    className={twMerge("flex justify-between items-center my-2 px-4 py-2 border", className)}
  >
    <div className="flex flex-col">
      <label>{caption}</label>

      <label className="text-slate-500">
        {dayjs(createdAt).format('DD/MM/YYYY')}
      </label>
    </div>

    <img src={imgUrl} alt={imgUrl} className="h-24 w-40 object-cover" />
  </Link>
);

export default PostBox;