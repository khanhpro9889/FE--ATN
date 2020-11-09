import React from 'react';
import MiniLoadingSpinner from '../../components/MiniLoadingSpinner';
import { Wrapper, Item, Title, ButtonEdit, ButtonPlace, Div, Icon, Info, IconDiv, Span, ClearFix } from './styles';

const Profile = ({profile, setEditProfile, loadingProfile, userProfile}) => {
    return (
        <Wrapper>
            { loadingProfile ? <Div><MiniLoadingSpinner/></Div>
            : userProfile && 
            <>
            <Info>
                <Title>Giới thiệu</Title>
                {userProfile.email && <Item>
                    <IconDiv><Icon icon={['fas', 'envelope']}/></IconDiv>
                    {userProfile.email}
                </Item>}
                {userProfile.phone && 
                <Item>
                    <IconDiv><Icon icon={['fas', 'phone']} /></IconDiv>
                    {userProfile.phone}
                </Item>}
                {userProfile.city && <Item>
                    <IconDiv><Icon icon={['fas', 'map-marker-alt']}/></IconDiv>
                    {userProfile.city.name_with_type}
                </Item>}
                {userProfile.work && <Item>
                    <IconDiv><Icon icon={['fas', 'briefcase']}/></IconDiv>
                    {userProfile.work}
                </Item>}
                {userProfile.about && <ClearFix>
                    <IconDiv><Icon icon={['fas', 'user']}/></IconDiv>
                    <Span>{userProfile.about}</Span>
                </ClearFix>}
            </Info>
            {profile && profile._id === userProfile._id && <ButtonPlace><ButtonEdit text="Sửa" onClick={() => setEditProfile(true)}/></ButtonPlace>}
            </>
            }
        </Wrapper>
    );
};

export default Profile;