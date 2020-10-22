import React, {useState}from 'react';
import { 
    WrapperImageView, 
    ImgImageView, 
    WrapperImg, 
    Info, 
    IconButtonWrap, 
    BtnIcon,
    CloseBtn,
    Parents
} from './styles';
import {Animated} from "react-animated-css";

const ImageView = ({currentImage, currentPosition, length, setCurrentImage, next, previous}) => {
    const [visible, setVisible] = useState(true);
    return (
        <>
        <Parents>
            <Animated
                animationIn="slideInUp" 
                animationOut="slideOutDown"
                animationInDuration={600} 
                animationOutDuaration={600}
                isVisible={visible}
            >
                <WrapperImageView>
                    <CloseBtn
                        component="span"
                        hidden={currentPosition + 1 > 1} 
                        onClick={() => {
                            setVisible(false);
                            setTimeout(() => {
                                setCurrentImage(null);
                            }, 600);
                        }}
                    >
                        <BtnIcon icon={['fas', 'times']}/>
                    </CloseBtn>
                    <Info>{currentPosition + 1}/{length}</Info>
                    <IconButtonWrap
                        component="span"
                        hidden={currentPosition + 1 > 1} 
                        onClick={() => {
                            previous();
                        }}
                    >
                        <BtnIcon icon={['fas', 'chevron-left']} />
                    </IconButtonWrap>
                    <WrapperImg>
                        <ImgImageView src={currentImage.path}/>
                    </WrapperImg>
                    <IconButtonWrap
                        component="span"
                        hidden={currentPosition + 1 < length}
                        onClick={() => {
                            next();
                        }}
                    >
                        <BtnIcon icon={['fas', 'chevron-right']} />
                    </IconButtonWrap>
                </WrapperImageView>
            </Animated>
        </Parents>
        </>
    );
};

export default ImageView;