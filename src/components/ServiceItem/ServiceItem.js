import React from 'react';
import { Wrapper, Description, Price, Name, Icon, DeleteButton } from './styles';
import { numberWithCommas } from '../../utils/number';

const ServiceItem = ({serviceItem, deleteItem}) => {
    return (
        <Wrapper>
            <div>
                <Name>{serviceItem.name}</Name>
                {deleteItem && <DeleteButton onClick={() => deleteItem(serviceItem.id)}>
                    <Icon icon={['fas', 'trash']} />
                </DeleteButton>}
            </div>
            
            <Description><Icon icon={['fas', 'info-circle']} />{serviceItem.description}</Description>
            <Price><Icon icon={['fas', 'dollar-sign']} />{numberWithCommas(serviceItem.price)} <span>{serviceItem.unitPricing}</span></Price>
        </Wrapper>
    );
};

export default ServiceItem;