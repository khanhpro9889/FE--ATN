import React, { useEffect, useState } from 'react';
import {
    SPReviewBox,
    Rate,
    Star,
    Icon,
    ReviewDesc,
    RateLine,
    RateInfor,
    RateBar
} from './styles';
import { roundNumber } from '../../utils/number';

const ReviewInfo = ({reviews}) => {
    const [one, setOne] = useState(null);
    const [two, setTwo] = useState(null);
    const [three, setThree] = useState(null);
    const [four, setFour] = useState(null);
    const [five, setFive] = useState(null);

    useEffect(() => {
        if (reviews) {
            setOne(reviews.filter(item => item.rating === 1).length);
            setTwo(reviews.filter(item => item.rating === 2).length);
            setThree(reviews.filter(item => item.rating === 3).length);
            setFour(reviews.filter(item => item.rating === 4).length);
            setFive(reviews.filter(item => item.rating === 5).length);
        }
    }, [reviews])

    return (
        <>
            <SPReviewBox>
                <div>
                <Rate>
                    {reviews.length > 0 ? roundNumber(reviews.reduce((sum, item) => {
                        return sum + item.rating;
                    }, 0) / reviews.length) : 0}
                </Rate>
                <Star>
                    <Icon
                    icon={[
                        'fas',
                        'star'
                    ]}
                    />
                </Star>
                </div>
                <ReviewDesc>
                {reviews && reviews.length} đánh giá
                </ReviewDesc>
            </SPReviewBox>
            <RateInfor>
                <RateBar>
                <b>5 sao</b>
                <RateLine
                    variant="determinate"
                    value={
                        five && (five !== 0) ? ((five / reviews.length) * 100) : 0
                    }
                />
                <b>({five})</b>
                </RateBar>
                <RateBar>
                <b>4 sao</b>
                <RateLine
                    variant="determinate"
                    value={
                        four && (four !== 0) ? ((four / reviews.length) * 100) : 0
                    }
                />
                <b>({four})</b>
                </RateBar>
                <RateBar>
                <b>3 sao</b>
                <RateLine
                    variant="determinate"
                    value={
                        three && (three !== 0) ? ((three / reviews.length) * 100) : 0
                    }
                />
                <b>({three})</b>
                </RateBar>
                <RateBar>
                <b>2 sao</b>
                <RateLine
                    variant="determinate"
                    value={
                        two && (two !== 0) ? ((two / reviews.length) * 100) : 0
                    }
                />
                <b>({two})</b>
                </RateBar>
                <RateBar>
                <b>1 sao</b>
                <RateLine
                    variant="determinate"
                    value={
                        one && (one !== 0) ? ((one / reviews.length) * 100) : 0
                    }
                />
                <b>({one})</b>
                </RateBar>
            </RateInfor>
        </>
    );
};

export default ReviewInfo;