import React, { useState, useEffect} from 'react';
import { Form, StarsBox, Icon, Textarea, Title, Button, ButtonWrapper } from './styles';
import { useForm } from 'react-hook-form';

const ReviewForm = ({onSubmit, review, cancel}) => {
    const [activeStar, setActiveStar] = useState({
        one: false,
        two: false,
        three: false,
        four: false,
        five: false
    });
    const [rating, setRating] = useState(null);

    const {
        register,
        handleSubmit,
        watch,
        setValue
    } = useForm({
        mode: 'onBlur',
        nativeValidation: false
    })

    useEffect(() => {
        if (review) {
            setValue('message', review.body, {shouldValidate: false});
            switch (review.rating) {
                case 1:
                    setRating(1);
                    setActiveStar({
                        one: true,
                        two: false,
                        three: false,
                        four: false,
                        five: false
                    })
                    break;
                case 2:
                    setRating(2);
                    setActiveStar({
                        one: true,
                        two: true,
                        three: false,
                        four: false,
                        five: false
                    })
                    break;
                case 3:
                    setRating(3);
                    setActiveStar({
                        one: true,
                        two: true,
                        three: true,
                        four: false,
                        five: false
                    })
                    break;
                case 4:
                    setRating(4);
                    setActiveStar({
                        one: true,
                        two: true,
                        three: true,
                        four: true,
                        five: false
                    })
                    break;
                case 5:
                    setRating(5);
                    setActiveStar({
                        one: true,
                        two: true,
                        three: true,
                        four: true,
                        five: true
                    })
                    break;
                default:
                    break;
            }
        }
    }, [review, setValue])

    const handleSubmitForm = (value) => {
        if (review) {
            return onSubmit({...value, rating: rating}, review._id)
        }
        onSubmit({...value, rating: rating})
    }

    const handleClickOneStar = () => {
        setRating(1);
        setActiveStar({
            one: true,
            two: false,
            three: false,
            four: false,
            five: false
        })
    }

    const handleClickTwoStar = () => {
        setRating(2);
        setActiveStar({
            one: true,
            two: true,
            three: false,
            four: false,
            five: false
        })
    }

    const handleClickThreeStar = () => {
        setRating(3);
        setActiveStar({
            one: true,
            two: true,
            three: true,
            four: false,
            five: false
        })
    }

    const handleClickFourStar = () => {
        setRating(4);
        setActiveStar({
            one: true,
            two: true,
            three: true,
            four: true,
            five: false
        })
    }

    const handleClickFiveStar = () => {
        setRating(5);
        setActiveStar({
            one: true,
            two: true,
            three: true,
            four: true,
            five: true
        })
    }

    return (
        <Form>
            {!review && <Title>Thêm nhận xét của bạn</Title>}
            <StarsBox>
                <Icon onClick={handleClickOneStar} icon={[activeStar.one ? 'fas' : 'far', 'star']}/>
                <Icon onClick={handleClickTwoStar} icon={[activeStar.two ? 'fas' : 'far', 'star']}/>
                <Icon onClick={handleClickThreeStar} icon={[activeStar.three ? 'fas' : 'far', 'star']}/>
                <Icon onClick={handleClickFourStar} icon={[activeStar.four ? 'fas' : 'far', 'star']}/>
                <Icon onClick={handleClickFiveStar} icon={[activeStar.five ? 'fas' : 'far', 'star']}/>
            </StarsBox>
            <Textarea
                rowsMin={5}
                aria-label="content"
                // defaultValue={event.content || null}
                name="message"
                ref={register}
            />
            <ButtonWrapper>
                <Button disabled={!rating || !watch('message')} onClick={handleSubmit(handleSubmitForm)} icon={['fas', 'pen']} text={review ? 'Sửa' : "Nhận xét"}/>
                {review && <Button onClick={() => cancel()} text="Hủy"/>}
            </ButtonWrapper>
        </Form>
    );
};

export default ReviewForm;