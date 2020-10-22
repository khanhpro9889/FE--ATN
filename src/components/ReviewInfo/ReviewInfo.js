import React from 'react';
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

const ReviewInfo = () => {
    return (
        <>
            <SPReviewBox>
                <div>
                <Rate>2.5</Rate>
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
                3 đánh giá
                </ReviewDesc>
            </SPReviewBox>
            <RateInfor>
                <RateBar>
                5 stars
                <RateLine
                    variant="determinate"
                    value={
                    10
                    }
                />
                ({5})
                </RateBar>
                <RateBar>
                4 stars
                <RateLine
                    variant="determinate"
                    value={
                    20
                    }
                />
                ({31})
                </RateBar>
                <RateBar>
                3 stars
                <RateLine
                    variant="determinate"
                    value={
                    40
                    }
                />
                ({22})
                </RateBar>
                <RateBar>
                2 stars
                <RateLine
                    variant="determinate"
                    value={
                    15
                    }
                />
                ({32})
                </RateBar>
                <RateBar>
                1 stars
                <RateLine
                    variant="determinate"
                    value={
                    15
                    }
                />
                ({11})
                </RateBar>
            </RateInfor>
        </>
    );
};

export default ReviewInfo;