import React from 'react';

import { Wrapper, Img, WrapperImg, Icon} from './styles';

const ImageView = ({src, setSrc}) => {
    return (
        <>
        {src && <Wrapper>
            <Icon onClick={() => setSrc(null)} icon={['fas', 'times']}/>
            <WrapperImg>
                <Img src={src}/>
            </WrapperImg>
        </Wrapper>}
        </>
    );
};

export default ImageView;