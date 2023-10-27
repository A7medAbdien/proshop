import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, text, color }) => {
    const starsArray = Array.from({ length: 5 }).fill(0);

    return (
        <div className='rating'>
            {starsArray.map((_, i) =>
                <span key={i}>
                    {value >= i + 1 ? (
                        <FaStar />
                    ) : value >= i + 0.5 ? (
                        <FaStarHalfAlt />
                    ) : (
                        <FaRegStar />
                    )}
                </span>
            )}
            <span className='rating-text'>{text && text}</span>
        </div>
    );
};

Rating.defaultProps = {
    color: '#f8e825',
};

export default Rating;