import React, {useState}from 'react';
import {
    Wrapper,
    FlexBox,
    Left,
    LeftRight,
    Right,
    RightRight,
    Img,
    FlexBoxRight,
    RightRightTop,
    Button,
    Div
} from './styles';
import ImageView from './ImageView';

const ImageGallery = ({images}) => {
    const [currentImage, setCurrentImage] = useState(null);
    const [currentPosition, setCurrentPosition] = useState(null);

    const previous = () => {
        setCurrentImage(images[currentPosition - 1]);
        setCurrentPosition(currentPosition - 1);
    }

    const next = () => {
        setCurrentImage(images[currentPosition + 1]);
        setCurrentPosition(currentPosition + 1);
    }

    return (
        <Wrapper>
            <FlexBox>
                <Left onClick={() => {
                    setCurrentImage(images[0]);
                    setCurrentPosition(0);
                }}>
                    <Div><Img src={images[0].path}/></Div>
                </Left>
                <Right>
                    {images[4] &&
                        <><FlexBoxRight>
                            <LeftRight onClick={() => {
                                setCurrentImage(images[1])
                                setCurrentPosition(1)
                            }}>
                                <Div><Img src={images[1].path}/></Div>
                            </LeftRight>
                            <RightRightTop onClick={() => {
                                setCurrentImage(images[2])
                                setCurrentPosition(2)
                            }}>
                                <Div><Img src={images[2].path}/></Div>
                            </RightRightTop>
                        </FlexBoxRight>
                        <FlexBoxRight>
                            <LeftRight onClick={() => {
                                setCurrentImage(images[3])
                                setCurrentPosition(3)
                            }}>
                                <Div><Img src={images[3].path}/></Div>
                            </LeftRight>
                            <RightRight onClick={() => {
                                setCurrentImage(images[4])
                                setCurrentPosition(4)
                            }}>
                                <Div><Img src={images[4].path}/></Div>
                                <Button onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentImage(images[0])
                                    setCurrentPosition(0)
                                }}>Tất cả</Button>
                            </RightRight>
                        </FlexBoxRight></>
                    }
                </Right>
            </FlexBox>
            {currentImage && <ImageView 
                currentPosition={currentPosition} 
                currentImage={currentImage} 
                setCurrentImage={setCurrentImage} 
                previous={previous} 
                next={next}
                length={images.length}
            />}
        </Wrapper>
    );
};

export default ImageGallery;