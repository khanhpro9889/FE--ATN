import React, {useState, useEffect}from 'react';
import { Wrapper, Icon, Title, LoadingDiv, WrapperItem, TitleGym, HeaderLeft, Body, IconStar, Stars, Name, Date } from './styles';
import { useParams } from 'react-router-dom';
import ProfileLayout from '../../layouts/ProfileLayout';
import { getReviewsByUser } from '../../api/reviewApi';
import { getUserProfileApi } from '../../api/userApi';
import MiniLoadingSpinner from '../../components/MiniLoadingSpinner';
import { parseDate } from '../../utils/date';
import { Link } from 'react-router-dom';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();
    const [userProfile, setUserProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {  
        getUserProfile();
        const getReviewsByUserApi = async (uid) => {
            try {
              setLoading(true);
              const res = await getReviewsByUser(uid);
              setLoading(false);
              setReviews(res.reviews);
            } catch(err) {
              setLoading(true);
              console.log(err);
            }
        }
        getReviewsByUserApi(id);
         // eslint-disable-next-line
    }, [id])

    const getUserProfile = async () => {
        try {
            setLoadingProfile(true);
            const res = await getUserProfileApi(id);
            setLoadingProfile(false);
            setUserProfile(res);
        } catch (error) {
            setLoadingProfile(false);
            console.log(error);
        }
    } 

    return (
        <ProfileLayout userProfile={userProfile} loadingProfile={loadingProfile} getUserProfile={getUserProfile} id={id}>
            <Wrapper>
                {loading ? <LoadingDiv><MiniLoadingSpinner /></LoadingDiv> : reviews && reviews.length === 0 ? <Title>
                    <Icon icon={['fas', 'folder-open']}></Icon>
                    <div>Chưa có đánh giá nào</div>
                </Title> : reviews && reviews.map(item => {
                    return (
                        <WrapperItem>
                            <TitleGym>
                                <Link to={`/detail/${item.gym._id}`}>{item.gym.title}</Link>
                            </TitleGym>
                            <HeaderLeft>
                                <Name>{item.author.name}</Name>
                                {item.rating === 1 && <Stars>
                                    <IconStar icon={['fas', 'star']} />
                                    <IconStar icon={['far', 'star']} />
                                    <IconStar icon={['far', 'star']} />
                                    <IconStar icon={['far', 'star']} />
                                    <IconStar icon={['far', 'star']} />
                                </Stars>}
                                {item.rating === 2 && <Stars>
                                    <IconStar icon={['fas', 'star']} />
                                    <IconStar icon={['fas', 'star']} />
                                    <IconStar icon={['far', 'star']} />
                                    <IconStar icon={['far', 'star']} />
                                    <IconStar icon={['far', 'star']} />
                                </Stars>}
                                {item.rating === 3 && <Stars>
                                    <IconStar icon={['fas', 'star']} />
                                    <IconStar icon={['fas', 'star']} />
                                    <IconStar icon={['fas', 'star']} />
                                    <IconStar icon={['far', 'star']} />
                                    <IconStar icon={['far', 'star']} />
                                </Stars>}
                                {item.rating === 4 && <Stars>
                                    <IconStar icon={['fas', 'star']} />
                                    <IconStar icon={['fas', 'star']} />
                                    <IconStar icon={['fas', 'star']} />
                                    <IconStar icon={['fas', 'star']} />
                                    <IconStar icon={['far', 'star']} />
                                </Stars>}
                                {item.rating === 5 && <Stars>
                                    <IconStar icon={['fas', 'star']} />
                                    <IconStar icon={['fas', 'star']} />
                                    <IconStar icon={['fas', 'star']} />
                                    <IconStar icon={['fas', 'star']} />
                                    <IconStar icon={['fas', 'star']} />
                                </Stars>}
                                <Date>{parseDate(item.createAt)}</Date>
                            </HeaderLeft>
                            <Body>
                                {item.body}
                            </Body>
                        </WrapperItem>
                    )
                })}
            </Wrapper>
        </ProfileLayout>
    );
};

export default Reviews;