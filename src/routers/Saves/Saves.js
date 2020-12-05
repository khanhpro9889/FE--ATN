import React, {useState, useEffect}from 'react';
import { Wrapper, Icon, Title, LoadingDiv } from './styles';
import GymItem from '../../components/GymItem';
import { useParams } from 'react-router-dom';
import ProfileLayout from '../../layouts/ProfileLayout';
import { getSavesByUser } from '../../api/saveApi';
import { getUserProfileApi } from '../../api/userApi';
import MiniLoadingSpinner from '../../components/MiniLoadingSpinner';

const Saves = () => {
    const [saves, setSaves] = useState([]);
    const { id } = useParams();
    const [userProfile, setUserProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {  
        getUserProfile();
        const getSavesByUserApi = async (uid) => {
            try {
              setLoading(true);
              const res = await getSavesByUser(uid);
              const save = res.saves.map(item => {
                  return {
                      ...item._doc.gym,
                      reviews: item.reviews
                  }
              })
              console.log(save)
              setLoading(false);
              setSaves(save);
            } catch(err) {
              setLoading(true);
              console.log(err);
            }
        }
        getSavesByUserApi(id);
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
                {loading ? <LoadingDiv><MiniLoadingSpinner /></LoadingDiv> : saves.length === 0 ? <Title>
                    <Icon icon={['fas', 'folder-open']}></Icon>
                    <div>Chưa lưu phòng gym nào</div>
                </Title> : saves.map(item => {
                    return (
                        <GymItem key={item._id} gym={item}/>   
                    )
                })}
            </Wrapper>
        </ProfileLayout>
    );
};

export default Saves;