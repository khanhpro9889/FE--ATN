import React from 'react';
import { Wrapper, Description, Name, Icon, DeleteButton } from './styles';

const ServiceItem = ({serviceItem, deleteItem}) => {
    return (
        <Wrapper>
            <div>
                <Name>{serviceItem.name}</Name>
                {deleteItem && <DeleteButton onClick={() => deleteItem(serviceItem.id)}>
                    <Icon icon={['fas', 'trash']} />
                </DeleteButton>}
            </div>
            
            <Description>{serviceItem.description}</Description>
            {/* <Price><Icon icon={['fas', 'dollar-sign']} />{numberWithCommas(serviceItem.price)} <span>{serviceItem.unitPricing}</span></Price> */}
        </Wrapper>
    );
};

export default ServiceItem;